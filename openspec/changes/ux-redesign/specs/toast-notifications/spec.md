# Spec Delta

## Purpose

Provides ephemeral notification messages that confirm the result of task CRUD operations and state changes, improving user awareness of successful and failed actions.

## ADDED Requirements

### Requirement: Success toast on task creation
The system SHALL display a brief success notification when a task is successfully created.

#### Scenario: Task created notification
- **WHEN** the user creates a new task
- **THEN** a success toast appears confirming the task was created and auto-dismisses after a few seconds

### Requirement: Success toast on task update
The system SHALL display a brief success notification when a task is successfully updated.

#### Scenario: Task updated notification
- **WHEN** the user saves changes to an existing task
- **THEN** a success toast appears confirming the task was updated

### Requirement: Success toast on task deletion
The system SHALL display a brief success notification when a task is deleted.

#### Scenario: Task deleted notification
- **WHEN** the user confirms deletion of a task
- **THEN** a success toast appears confirming the task was deleted

### Requirement: Success toast on task toggle
The system SHALL display a brief notification when a task's completion status changes.

#### Scenario: Task marked complete
- **WHEN** the user marks a task as completed
- **THEN** a notification confirms the task was completed

### Requirement: Toast auto-dismiss and manual dismiss
The system SHALL auto-dismiss toasts after a configurable duration and allow the user to manually dismiss them early.

#### Scenario: Toast auto-dismisses
- **WHEN** a toast appears
- **THEN** it auto-dismisses after approximately 3–5 seconds with a fade-out animation

#### Scenario: User dismisses toast early
- **WHEN** the user clicks the dismiss button on a visible toast
- **THEN** the toast immediately fades out and is removed

### Requirement: Toast stacking
The system SHALL stack multiple simultaneous toasts vertically without overlapping content.

#### Scenario: Multiple toasts at once
- **WHEN** the user rapidly creates two tasks
- **THEN** both toasts are visible simultaneously, stacked vertically
