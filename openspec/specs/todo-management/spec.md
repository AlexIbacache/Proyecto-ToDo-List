# todo-management Specification

## Purpose
Proporciona la gestión completa del ciclo de vida de tareas, incluyendo creación, visualización, edición, eliminación, cambio de estado, filtrado, búsqueda y persistencia local dentro de una interfaz moderna y responsiva con tema oscuro.

## Requirements

### Requirement: Creación de Tareas
El sistema SHALL (DEBE) permitir a los usuarios crear nuevas tareas con un título obligatorio y descripción, categoría y prioridad opcionales.

#### Scenario: Creación exitosa de tarea con título válido
- **WHEN** el usuario abre el modal de creación de tareas, ingresa un título como "Preparar entrega técnica" y envía el formulario
- **THEN** el sistema crea la tarea con estado "activo", registra la fecha de creación y la muestra en la lista de tareas

#### Scenario: Validación de título vacío al crear
- **WHEN** el usuario intenta guardar una tarea sin título o únicamente con espacios en blanco
- **THEN** el sistema rechaza el envío, muestra un mensaje de validación de error y no crea la tarea

### Requirement: Listado y Búsqueda de Tareas
El sistema SHALL (DEBE) mostrar las tareas en un diseño responsivo de grilla o lista y permitir el filtrado por estado (Todas, Activas, Completadas) y la búsqueda por texto.

#### Scenario: Filtrado de tareas por estado de completado
- **WHEN** el usuario selecciona el filtro "Completadas" en el menú de navegación
- **THEN** el sistema muestra únicamente las tareas marcadas como completadas y actualiza el contador

#### Scenario: Búsqueda de tareas por título o descripción
- **WHEN** el usuario escribe un término en la barra superior de búsqueda
- **THEN** el sistema filtra dinámicamente las tareas mostradas para exhibir solo aquellas cuyo título, descripción o categoría contengan dicho término

#### Scenario: Visualización de estado vacío
- **WHEN** ninguna tarea coincide con la búsqueda o el filtro activo
- **THEN** el sistema muestra un mensaje informativo de estado vacío con opción para restablecer filtros o crear una nueva tarea

### Requirement: Edición de Tareas
El sistema SHALL (DEBE) permitir a los usuarios modificar el título, descripción, categoría y prioridad de cualquier tarea existente.

#### Scenario: Actualización exitosa de una tarea existente
- **WHEN** el usuario activa la acción de editar en una tarea existente, actualiza los campos deseados y presiona guardar
- **THEN** el sistema actualiza los datos de la tarea, registra la fecha de modificación y refleja los cambios inmediatamente en pantalla

#### Scenario: Cancelación de la edición
- **WHEN** el usuario abre el modal de edición, realiza cambios y presiona "Cancelar" o presiona la tecla Escape
- **THEN** el sistema descarta las modificaciones y mantiene el estado original de la tarea

### Requirement: Alternancia de Estado de Completado
El sistema SHALL (DEBE) proporcionar una acción simple para marcar una tarea activa como completada o devolver una completada al estado activo.

#### Scenario: Marcar una tarea activa como completada
- **WHEN** el usuario hace clic en la casilla de verificación de una tarea activa
- **THEN** el sistema marca la tarea como completada, aplica el estilo visual correspondiente (tachado / opacidad reducida) y actualiza los contadores

#### Scenario: Reactivar una tarea completada
- **WHEN** el usuario hace clic en la casilla de una tarea completada
- **THEN** el sistema devuelve la tarea al estado activo y restablece el estilo visual normal

### Requirement: Eliminación de Tareas
El sistema SHALL (DEBE) permitir la eliminación de tareas mediante un diálogo de confirmación para evitar pérdidas accidentales de información.

#### Scenario: Eliminación de tarea con confirmación
- **WHEN** el usuario selecciona eliminar una tarea y confirma la acción en el diálogo de seguridad
- **THEN** el sistema elimina permanentemente la tarea de la lista y del almacenamiento local

### Requirement: Diseño Responsivo y Mobile-First
El sistema SHALL (DEBE) ofrecer una interfaz minimalista con tema oscuro inspirada en `assets/maqueta.png`, adaptándose con fluidez desde dispositivos móviles hasta pantallas de escritorio.

#### Scenario: Visualización en dispositivos móviles
- **WHEN** la aplicación se visualiza en una pantalla móvil (ancho de pantalla inferior a 768px)
- **THEN** la barra lateral se oculta en un menú desplegable accesible mediante un botón hamburguesa y las tarjetas se apilan en una sola columna

#### Scenario: Visualización en pantallas de escritorio
- **WHEN** la aplicación se visualiza en una pantalla de escritorio (ancho de pantalla igual o superior a 1024px)
- **THEN** la barra lateral permanece visible junto a la barra superior de búsqueda y las tarjetas se distribuyen en una grilla responsiva de múltiples columnas

### Requirement: Persistencia de Datos en el Cliente
El sistema SHALL (DEBE) guardar automáticamente las tareas en el almacenamiento local del navegador (`localStorage`) para conservarlas tras recargar la página.

#### Scenario: Persistencia y restauración de tareas tras recarga
- **WHEN** el usuario crea o modifica tareas y recarga la pestaña del navegador
- **THEN** el sistema recupera las tareas desde `localStorage` sin pérdida de datos
