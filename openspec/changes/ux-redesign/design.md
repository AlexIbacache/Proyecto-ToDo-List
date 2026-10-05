# Design

## Context

The ToDo List application is a functional Next.js 16 app using React 19, Tailwind CSS 4, and localStorage via `useSyncExternalStore`. It currently has a single dark theme with hardcoded hex colors scattered across all components. See proposal.md for full motivation.

Current architecture: `TaskContext` manages all state (tasks, filters, search, modals, view mode, mobile sidebar). `TaskStorageRepository` handles localStorage persistence with a pub/sub pattern. Components use Tailwind utility classes with inline hex values.

## Goals / Non-Goals

**Goals:**
- Design token system supporting dark + light themes via CSS custom properties
- Motion animation layer that wraps existing components without restructuring
- @dnd-kit integration within the existing TaskList/TaskCard architecture
- Pagination logic in context with correct filter/search/CRUD interaction
- Toast notification system as a standalone provider
- Every interactive state (hover, focus, active, disabled) polished consistently

**Non-Goals:**
- Server-side rendering of theme (initial render uses system preference, hydration handles it)
- Multi-language i18n system (keeping existing Spanish strings)
- Database or API persistence (localStorage only)
- Keyboard shortcut system
- Real-time sync between tabs

## Decisions

### 1. Theme Implementation: CSS Custom Properties + data attribute

**Choice**: Use `[data-theme="dark"]` and `[data-theme="light"]` on `<html>` with CSS custom properties defined in `globals.css`. Components reference `var(--color-*)` instead of hardcoded hex.

**Alternatives considered**:
- Tailwind `dark:` variant — requires duplicating every color utility, verbose. Tailwind 4 can read CSS custom properties natively, so tokens give both flexibility and Tailwind integration.
- CSS-in-JS theme — adds runtime overhead, conflicts with RSC model.

**Rationale**: CSS custom properties are zero-runtime, work with SSR, and let Tailwind reference `var(--color-*)`. Theme switch is a single attribute change.

### 2. Theme Provider: Separate from TaskContext

**Choice**: Create a `ThemeContext` with its own provider. Script in `layout.tsx` reads localStorage/system-preference before React hydration to set `data-theme`, preventing flash.

**Rationale**: Theme is orthogonal to tasks. Keeping it separate avoids unnecessary re-renders of the entire task tree when theme changes.

### 3. Animation Library: Motion (framer-motion v11+)

**Choice**: `motion` package. AnimatePresence for enter/exit, `layout` prop for reorder animations, `motion.div` wrappers on TaskCard, Modal, Sidebar, Toast.

**Alternatives considered**:
- CSS animations only — limited enter/exit control, no layout animations, no AnimatePresence equivalent.
- React Spring — heavier API surface for this use case.

**Rationale**: Motion provides AnimatePresence (needed for exit animations on removed tasks), layout animations (needed for drag reorder), and respects `prefers-reduced-motion` natively.

### 4. Drag and Drop: @dnd-kit

**Choice**: `@dnd-kit/core` + `@dnd-kit/sortable` + `@dnd-kit/utilities`. SortableContext wraps the paginated task list. Each TaskCard wraps in `useSortable`.

**Implementation approach**:
- Add `order: number` field to Task type. Storage assigns incrementing order on create.
- `reorderTasks(activeId, overId)` in TaskContext computes new order values and persists.
- DragOverlay renders a styled clone of the dragged card.
- Drag restricted to vertical axis via `restrictToVerticalAxis` modifier.
- Touch sensor with activation delay to distinguish scroll from drag.

**Rationale**: @dnd-kit is the standard React DnD library — accessibility built-in (keyboard support), touch-friendly, and composable with Motion's layout animations.

### 5. Pagination: Context-level state

**Choice**: Add `currentPage` state to `TaskContext`. Computed `paginatedTasks` derived from `filteredTasks` via `useMemo`. Pagination component reads and sets page.

**Edge cases handled in context**:
- Filter/search change → `setCurrentPage(1)`
- Task created → `setCurrentPage(1)` (new task at top)
- Task deleted → if current page > total pages, `setCurrentPage(totalPages)`
- Toggle task with active filter → may reduce page count, same adjustment

### 6. Toast System: Standalone provider with portal

**Choice**: `ToastProvider` wrapping the app, `useToast()` hook returns `toast.success(msg)`, `toast.error(msg)`. Toasts render via portal in bottom-right, stacked, with Motion animations.

**Rationale**: Decoupled from task logic. Portal ensures toasts appear above modals. Motion handles enter/exit.

### 7. Color Palette

**Dark theme** (refined current):
- Background: `#0f1219` (slightly deeper)
- Surface: `#161b27`
- Surface hover: `#1e2535`
- Border: `#252d3f`
- Text primary: `#f0f4f8`
- Text secondary: `#8b9bb4`
- Text muted: `#5e6d84`
- Accent: `#3b82f6`
- Accent hover: `#2563eb`

**Light theme** (Linear-inspired):
- Background: `#f8f9fa`
- Surface: `#ffffff`
- Surface hover: `#f0f1f3`
- Border: `#e2e4e9`
- Text primary: `#1a1d23`
- Text secondary: `#6b7280`
- Text muted: `#9ca3af`
- Accent: `#3b82f6`
- Accent hover: `#2563eb`

### 8. Typography: Inter via next/font

**Choice**: Load Inter via `next/font/google` with variable font support for optimal performance (self-hosted subset, no layout shift).

### 9. Component Migration Strategy

Migrate tokens bottom-up: atoms (Button, Input, Checkbox, Badge) → molecules (TaskCard, Modal, EmptyState) → organisms (Sidebar, Header, TaskList) → layout. Each component replaces `text-[#hex]` / `bg-[#hex]` with `text-[var(--color-text-primary)]` or equivalent Tailwind `@theme` tokens.

## Risks / Trade-offs

- **Bundle size increase**: Motion (~35KB gzipped) + @dnd-kit (~15KB gzipped) add ~50KB. Acceptable for the UX improvement. Tree-shaking keeps it reasonable.
- **Drag + Pagination interaction**: Drag reordering operates only within the current page. Cross-page reorder is not supported — a deliberate scope limit. → Mitigation: clear UX that drag is page-scoped.
- **Theme flash on initial load**: Script-based `data-theme` injection before React hydration mitigates FOUC. Inline `<script>` in layout.tsx reads localStorage and sets attribute synchronously.
- **Reduced motion**: All Motion animations check `prefers-reduced-motion`. Fallback: instant transitions.
- **Tailwind 4 `@theme` compatibility**: Tailwind 4 reads CSS custom properties from `@theme`. The migration replaces `@theme` static values with references to the `[data-theme]` custom properties.
