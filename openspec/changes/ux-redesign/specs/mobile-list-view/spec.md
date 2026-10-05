# Spec Delta

## MODIFIED Requirements

### Requirement: The system SHALL maintain accessible the edit and delete actions of each task in list mode on mobile viewports.
The system SHALL maintain accessible the edit, delete, and drag-and-drop reorder actions of each task in list mode on mobile viewports. Pagination controls and the theme toggle SHALL remain usable on mobile without horizontal scrolling.

#### Scenario: Drag-and-drop on mobile list view
- **WHEN** the user views tasks in list mode on a mobile viewport
- **THEN** a touch-friendly drag handle is visible and allows reordering via touch gestures

#### Scenario: Pagination controls on mobile
- **WHEN** the user views a paginated task list on a mobile viewport
- **THEN** the pagination controls fit within the viewport width and remain tappable

#### Scenario: Theme toggle on mobile
- **WHEN** the user wants to switch themes on a mobile viewport
- **THEN** the theme toggle is accessible from the header or sidebar without requiring navigation
