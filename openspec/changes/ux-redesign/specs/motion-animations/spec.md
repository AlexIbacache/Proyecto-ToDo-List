# Spec Delta

## Purpose

Provides smooth enter/exit/layout animations throughout the interface using Motion (framer-motion) for task transitions, modals, sidebar, and micro-interactions.

## ADDED Requirements

### Requirement: Task list enter and exit animations
The system SHALL animate tasks entering and leaving the visible list with smooth fade and slide transitions.

#### Scenario: New task appears with animation
- **WHEN** a new task is added to the list
- **THEN** it fades in and slides into position rather than appearing abruptly

#### Scenario: Deleted task exits with animation
- **WHEN** a task is removed from the list
- **THEN** it fades out and collapses smoothly rather than disappearing abruptly

### Requirement: Modal open and close animations
The system SHALL animate modals opening (scale up + fade in) and closing (scale down + fade out) with overlay transitions.

#### Scenario: Modal opens
- **WHEN** a modal is triggered (create, edit, delete confirm, detail)
- **THEN** the overlay fades in and the modal panel scales from slightly smaller to full size

#### Scenario: Modal closes
- **WHEN** a modal is dismissed
- **THEN** the modal panel scales down slightly and fades out before being removed from the DOM

### Requirement: Sidebar transition on mobile
The system SHALL animate the mobile sidebar sliding in from the left and sliding out when closed.

#### Scenario: Mobile sidebar opens
- **WHEN** the user opens the sidebar on a mobile viewport
- **THEN** the sidebar slides in from the left edge with an overlay fade

### Requirement: Layout shift animations
The system SHALL animate layout changes when tasks reorder, filter results change, or view mode switches (grid/list).

#### Scenario: Filter change animates list
- **WHEN** the user switches the active filter
- **THEN** the outgoing tasks exit and incoming tasks enter with staggered animations

### Requirement: Micro-interaction animations
The system SHALL provide subtle scale or color animations on interactive elements such as buttons, checkboxes, and toggles on hover and click.

#### Scenario: Button hover animation
- **WHEN** the user hovers over a primary action button
- **THEN** the button subtly scales or shifts to indicate interactivity

### Requirement: Reduced motion preference
The system SHALL respect the user's `prefers-reduced-motion` OS setting by disabling or minimizing animations.

#### Scenario: Reduced motion enabled
- **WHEN** the user's OS has reduced-motion enabled
- **THEN** animations are replaced with instant transitions or very brief fades
