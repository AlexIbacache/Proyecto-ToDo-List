# Spec Delta: mobile-list-view

## Purpose

Permite que el usuario lea el contenido de sus tareas en el modo vista lista sobre dispositivos móviles, a pesar de que los metadatos compriman el texto hasta volverlo ilegible. Cubre tanto la legibilidad directa en la lista como el acceso al texto íntegro de una tarea mediante un diálogo de detalle.

## ADDED Requirements

### Requirement: Legibilidad del contenido de la tarea en vista lista sobre móvil
El sistema SHALL (DEBE) presentar el título de cada tarea de forma legible en el modo vista lista cuando el viewport sea móvil, sin reducirlo a un número de caracteres insuficiente para identificar la tarea.

#### Scenario: Título de tarea legible en viewport móvil
- **WHEN** el usuario visualiza la lista de tareas en modo lista sobre un viewport móvil
- **THEN** el título de cada tarea es visible y legible en su totalidad o, cuando exceda el espacio disponible, se presenta recortado por número de líneas y no por ancho, de modo que el usuario pueda identificar la tarea

#### Scenario: Descripción visible junto al título
- **WHEN** una tarea posee descripción y el usuario la visualiza en modo lista sobre un viewport móvil
- **THEN** el sistema muestra la descripción de la tarea junto al título, sin ocultar ninguno de los dos por completo

### Requirement: Reflujo de metadatos en viewports pequeños
El sistema SHALL (DEBE) reubicar los metadatos de la tarea a una línea secundaria cuando el viewport sea menor que el breakpoint de escritorio, de modo que el título y la descripción dispongan del ancho completo del contenedor.

#### Scenario: Metadatos reubicados en viewport móvil
- **WHEN** el usuario visualiza una tarea en modo lista sobre un viewport móvil
- **THEN** el badge de categoría, el badge de prioridad y la marca de tiempo relativa se presentan en una línea propia debajo del título y la descripción, en lugar de competir por el ancho horizontal

#### Scenario: Marca de tiempo visible en móvil
- **WHEN** el usuario visualiza una tarea en modo lista sobre un viewport móvil
- **THEN** el sistema muestra la marca de tiempo relativa de creación de la tarea, que no queda oculta en viewports pequeños

#### Scenario: Metadatos en línea en escritorio
- **WHEN** el usuario visualiza una tarea en modo lista sobre un viewport de escritorio
- **THEN** el badge de categoría, el badge de prioridad y la marca de tiempo relativa se presentan en línea sobre la misma fila, conservando el diseño actual

### Requirement: Accesibilidad al contenido íntegro de la tarea
El sistema SHALL (DEBE) proporcionar un diálogo de detalle que presente el título y la descripción completos de una tarea, sin truncado, cuando el contenido no pueda mostrarse íntegro en la fila.

#### Scenario: Apertura del diálogo de detalle
- **WHEN** el usuario activa la fila de una tarea en modo lista
- **THEN** el sistema abre un diálogo que presenta el título y la descripción completos de la tarea, junto con su categoría, prioridad y marca de tiempo relativa

#### Scenario: Cierre del diálogo de detalle
- **WHEN** el sistema muestra el diálogo de detalle de una tarea
- **THEN** el usuario puede cerrarlo mediante el botón de cierre, la tecla Escape o la activación del fondo oscurecido, y al cerrarlo la tarea permanece sin modificaciones

#### Scenario: Diálogo de detalle sin descripción
- **WHEN** el usuario activa la fila de una tarea que no posee descripción
- **THEN** el diálogo de detalle presenta el título y los metadatos de la tarea, y omite la sección de descripción sin mostrar un espacio vacío

#### Scenario: El diálogo de detalle no altera la tarea
- **WHEN** el usuario visualiza el diálogo de detalle de una tarea
- **THEN** el sistema no modifica ningún campo de la tarea ni persiste cambios como resultado de la apertura o el cierre del diálogo

### Requirement: Accesibilidad de la fila en vista lista
El sistema SHALL (DEBE) exponer la fila de la tarea en modo lista como un elemento activable por teclado y por tecnologías de asistencia, con una etiqueta que describa la acción.

#### Scenario: Activación por teclado
- **WHEN** el usuario navega hasta la fila de una tarea en modo lista utilizando el teclado
- **THEN** la fila es enfocable y puede activarse con las teclas Enter o Espacio para abrir el diálogo de detalle

#### Scenario: Etiqueta de la fila
- **WHEN** una tecnología de asistencia inspecciona la fila de una tarea en modo lista
- **THEN** la fila expone una etiqueta accesible que incluye el título de la tarea e indica que su activación abre el detalle de la tarea

#### Scenario: Filas de tarea completada
- **WHEN** el usuario visualiza una tarea marcada como completada en modo lista sobre un viewport móvil
- **THEN** el título y la descripción permanecen legibles y se distinguen visualmente como completados

### Requirement: Acciones de la tarea en vista lista móvil
El sistema SHALL (DEBE) mantener accesibles las acciones de editar y eliminar de cada tarea en el modo lista sobre viewports móviles.

#### Scenario: Edición y eliminación accesibles en móvil
- **WHEN** el usuario visualiza una tarea en modo lista sobre un viewport móvil
- **THEN** los controles de edición y eliminación de esa tarea son alcanzables y utilizables sin que el texto de la tarea quede oculto por completo
