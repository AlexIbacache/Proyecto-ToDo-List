# Spec Delta

## MODIFIED Requirements

### Requirement: The system SHALL display tasks in a responsive grid or list layout and allow filtering by status (All, Active, Completed) and text search.
The system SHALL display tasks in a responsive grid or list layout with pagination at 10 tasks per page, allow filtering by status (All, Active, Completed) and text search, and present a drag handle on each task for reorder-by-drag. Search, filter, and pagination interact coherently: changing a filter or search query resets to page 1, and creating or deleting a task adjusts the current page when necessary.

#### Scenario: Task list with pagination and filters combined
- **WHEN** there are 25 active tasks and the user selects the "Active" filter
- **THEN** page 1 shows 10 active tasks with pagination indicating 3 pages

#### Scenario: Search within paginated results
- **WHEN** the user searches for "deploy" while viewing a paginated list
- **THEN** the results show matching tasks starting at page 1 with pagination reflecting the reduced count

#### Scenario: Drag handle visible on task card
- **WHEN** the user views a task card in list or grid mode
- **THEN** a drag handle is visible on the card allowing drag-and-drop reordering

### Requirement: The system SHALL automatically save tasks in browser localStorage to preserve them after page reload.
The system SHALL automatically save tasks, their completion status, their user-defined order, and the user's theme preference in browser localStorage to preserve the full experience after page reload.

#### Scenario: Tasks and order persist
- **WHEN** the user reorders tasks and reloads the page
- **THEN** tasks appear in the last user-defined order with all statuses intact

#### Scenario: Theme preference persists
- **WHEN** the user selects light mode and reloads the page
- **THEN** the application loads in light mode
