# Spec Delta

## Purpose

Provides dual-theme (dark and light) support with system-preference detection, manual toggle, and persistent preference across sessions.

## ADDED Requirements

### Requirement: Theme toggle control
The system SHALL provide a visible toggle control that switches between dark and light themes.

#### Scenario: User toggles from dark to light
- **WHEN** the user activates the theme toggle while in dark mode
- **THEN** the interface transitions to light mode with all surfaces, text, borders, and interactive elements displaying their light-theme tokens

#### Scenario: User toggles from light to dark
- **WHEN** the user activates the theme toggle while in light mode
- **THEN** the interface transitions to dark mode with all surfaces, text, borders, and interactive elements displaying their dark-theme tokens

### Requirement: Theme persistence
The system SHALL persist the user's theme preference in localStorage and restore it on subsequent visits.

#### Scenario: Theme restored on reload
- **WHEN** the user reloads the page after selecting light mode
- **THEN** the interface loads in light mode without flickering through dark mode first

### Requirement: System preference detection
The system SHALL default to the user's OS-level color-scheme preference when no explicit theme has been saved.

#### Scenario: First visit with OS dark preference
- **WHEN** a new user visits the application with their OS set to dark mode and no saved preference exists
- **THEN** the interface renders in dark mode

#### Scenario: First visit with OS light preference
- **WHEN** a new user visits the application with their OS set to light mode and no saved preference exists
- **THEN** the interface renders in light mode

### Requirement: Consistent theming across all components
The system SHALL apply theme-appropriate colors to every visible element including sidebar, header, task cards, modals, empty states, pagination, badges, buttons, inputs, and scrollbars.

#### Scenario: Modal in light mode
- **WHEN** a modal opens while the interface is in light mode
- **THEN** the modal background, text, borders, and overlay use light-theme tokens with adequate contrast ratios

### Requirement: Smooth theme transition
The system SHALL apply a brief visual transition when switching themes so the change feels natural rather than abrupt.

#### Scenario: Visual transition on toggle
- **WHEN** the user toggles the theme
- **THEN** background and surface colors transition smoothly over a short duration rather than instantly swapping
