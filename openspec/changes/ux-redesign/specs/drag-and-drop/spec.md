# Spec Delta

## Purpose

Enables users to reorder tasks by dragging and dropping, with visual feedback during the drag operation and persistent custom order.

## ADDED Requirements

### Requirement: Drag-and-drop task reordering
The system SHALL allow users to reorder tasks by dragging them to a new position within the visible task list.

#### Scenario: Reorder a task via mouse drag
- **WHEN** the user presses and drags a task card to a different position in the list
- **THEN** the task moves to the new position and remaining tasks shift to accommodate it

#### Scenario: Reorder a task via touch drag
- **WHEN** the user presses and drags a task card on a touch device
- **THEN** the task moves to the new position with the same behavior as mouse drag

### Requirement: Visual drag feedback
The system SHALL provide clear visual feedback while a task is being dragged, including a visible drag handle, a lifted/elevated appearance for the dragged item, and a placeholder showing where it will land.

#### Scenario: Drag in progress visual state
- **WHEN** a user is actively dragging a task
- **THEN** the dragged task appears visually elevated with a shadow, the original position shows a placeholder, and the drop target is indicated

### Requirement: Drag order persistence
The system SHALL persist the user-defined order in localStorage so it survives page reloads.

#### Scenario: Custom order preserved after reload
- **WHEN** the user reorders tasks and then reloads the page
- **THEN** the tasks appear in the last user-defined order

### Requirement: Drag-and-drop within filtered and paginated views
The system SHALL allow drag-and-drop reordering within the currently visible page and filter context.

#### Scenario: Reorder within a filtered view
- **WHEN** the user reorders tasks while a status or category filter is active
- **THEN** the new order applies to those tasks and is preserved when the filter is cleared

### Requirement: Drag handle accessibility
The system SHALL provide a keyboard-accessible drag handle so users who cannot use a pointer can still reorder tasks.

#### Scenario: Keyboard reorder
- **WHEN** a user focuses the drag handle and uses keyboard controls (e.g., Space to pick up, arrow keys to move, Space to drop)
- **THEN** the task moves to the indicated position with the same visual feedback as pointer drag
