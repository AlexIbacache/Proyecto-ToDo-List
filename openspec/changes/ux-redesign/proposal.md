# Proposal

## Why

The existing ToDo List application is functionally complete but visually feels like a quickly-assembled interface with hardcoded dark-only colors, no animations, no drag-and-drop, and no pagination. The goal is to transform it into a polished, professional-grade productivity tool inspired by Notion's clean aesthetics — elevating UX/UI quality without adding major new domain features.

## What Changes

- **Design system overhaul**: Replace all hardcoded hex colors with CSS custom property tokens supporting both dark and light themes. Adopt Inter font via Google Fonts. Refine spacing, border-radius, shadow, and typography scales for consistency.
- **Dark/Light theme**: Introduce a ThemeProvider with localStorage-persisted preference and system-preference detection. Dark retains the refined slate-blue palette; Light uses a soft gray Linear-inspired palette.
- **Motion animations**: Add framer-motion (Motion) for task enter/exit, modal open/close, sidebar transitions, filter changes, drag feedback, and subtle micro-interactions.
- **Drag & Drop reordering**: Integrate @dnd-kit for sortable task lists with visual drag feedback, touch support, and order persistence in localStorage.
- **Pagination**: Paginate task lists at 10 items per page with navigation controls that interact correctly with search, filters, and CRUD operations.
- **Enhanced search**: Improve the existing search bar UX — debounced input, clear feedback for no-results and many-results states, integration with pagination reset.
- **UI state feedback**: Add toast notifications for create/edit/delete/toggle actions, loading skeletons, and refined empty/error states.
- **Responsive refinement**: Rework responsive breakpoints so filters, search, pagination, and drag-and-drop remain comfortable on mobile and tablet.
- **Interaction polish**: Audit every interactive element for hover, focus, active, disabled, and destructive-action states with smooth transitions.

## Capabilities

### New Capabilities

- `theme-system`: Dual-theme (dark/light) support with CSS custom properties, theme toggle UI, system-preference detection, and localStorage persistence.
- `drag-and-drop`: Task reordering via @dnd-kit with visual drag handles, sortable animations, touch support, and localStorage persistence of custom order.
- `task-pagination`: Client-side pagination at 10 tasks per page with page navigation, correct interaction with search/filters/CRUD, and edge-case handling (page reduction after delete).
- `motion-animations`: Framer-motion-powered enter/exit/layout animations for tasks, modals, sidebar, filter transitions, and toast notifications.
- `toast-notifications`: Ephemeral success/error feedback messages for task CRUD operations and state changes.

### Modified Capabilities

- `todo-management`: Requirement changes — task display now includes drag handle UI, paginated view, and order field in the Task model; filtered/searched results reset pagination; CRUD operations account for page boundaries.
- `mobile-list-view`: Requirement changes — drag-and-drop and pagination controls must remain usable on mobile viewports; theme toggle accessible from mobile header.

## Impact

- **Dependencies**: Add `motion` (framer-motion), `@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities`. Add Inter font via `next/font/google`.
- **Task model** (`src/types/task.ts`): Add `order: number` field.
- **Storage** (`src/services/taskStorage.ts`): Persist task order; persist theme preference under a separate key.
- **Context** (`src/context/TaskContext.tsx`): Add pagination state, reorder handler, theme state; split into TaskContext + ThemeContext.
- **CSS** (`src/app/globals.css`): Replace hardcoded tokens with CSS custom properties scoped to `[data-theme="dark"]` / `[data-theme="light"]`.
- **Components**: Every component touched for token migration, motion wrapping, and responsive refinement. New components: ThemeToggle, Pagination, Toast, DragHandle.
- **Layout** (`src/app/layout.tsx`): Wire ThemeProvider, load Inter font.
