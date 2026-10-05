# Spec Delta

## Purpose

Paginates the task list at 10 items per page with clear navigation and correct behavior alongside search, filters, and CRUD operations.

## ADDED Requirements

### Requirement: Page size of 10 tasks
The system SHALL display a maximum of 10 tasks per page when the filtered result set exceeds 10.

#### Scenario: More than 10 tasks exist
- **WHEN** the filtered task list contains 15 tasks
- **THEN** the first page shows 10 tasks and page navigation indicates 2 pages

### Requirement: Page navigation controls
The system SHALL display page navigation controls showing the current page, total pages, and allowing movement to previous/next pages.

#### Scenario: Navigate to next page
- **WHEN** the user clicks the next-page control on page 1 of 3
- **THEN** page 2 is displayed with its 10 tasks and the current page indicator updates

#### Scenario: Navigate to previous page
- **WHEN** the user clicks the previous-page control on page 2
- **THEN** page 1 is displayed

### Requirement: Pagination resets on filter or search change
The system SHALL reset to page 1 whenever the active filter, category filter, or search query changes.

#### Scenario: Applying a filter resets page
- **WHEN** the user is on page 3 and changes the filter from "all" to "active"
- **THEN** the view resets to page 1 of the active tasks

### Requirement: Page adjustment after task deletion
The system SHALL adjust the current page if a deletion causes the current page to become empty.

#### Scenario: Last task on last page deleted
- **WHEN** the user deletes the only task on page 3 (previously 21 tasks, now 20)
- **THEN** the view moves to page 2 which now contains the last 10 tasks

### Requirement: New task visibility after creation
The system SHALL navigate to page 1 after a new task is created so the user can immediately see it.

#### Scenario: Task created while on page 2
- **WHEN** the user creates a new task while viewing page 2
- **THEN** the view returns to page 1 where the new task appears at the top

### Requirement: Pagination hidden when unnecessary
The system SHALL hide pagination controls when the total filtered tasks fit within a single page.

#### Scenario: Fewer than 11 tasks
- **WHEN** the filtered task list contains 8 tasks
- **THEN** no pagination controls are displayed
