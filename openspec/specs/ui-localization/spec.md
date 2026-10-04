# ui-localization Specification

## Purpose
Define los requisitos de adaptación idiomática y traducción integral al español de todos los componentes visibles, navegación, modales, formularios, validaciones y fechas relativas de la aplicación.

## Requirements

### Requirement: Localización de Navegación y Cabecera
El sistema SHALL (DEBE) presentar todas las opciones de navegación lateral, filtros y herramientas de cabecera en idioma español.

#### Scenario: Visualización de navegación lateral en español
- **WHEN** el usuario observa la barra lateral
- **THEN** el sistema muestra los filtros como "Todas las tareas", "Activas" y "Completadas", las categorías como "Trabajo", "Personal", "Urgente" y "General", y el botón principal como "Nueva Tarea"

#### Scenario: Visualización de barra de búsqueda y controles superiores en español
- **WHEN** el usuario interactúa con la cabecera
- **THEN** el campo de búsqueda exhibe el texto orientativo "Buscar tareas por título, descripción o categoría...", los botones de vista muestran tooltips en español y el botón de acción indica "Agregar Tarea"

### Requirement: Localización de Tarjetas y Vistas de Tareas
El sistema SHALL (DEBE) mostrar los encabezados de listas, etiquetas de prioridad, categorías y formato de fechas relativas en idioma español.

#### Scenario: Visualización de fechas relativas localizadas
- **WHEN** se visualiza una tarea en la grilla o lista
- **THEN** la fecha relativa se formatea en español (por ejemplo: "Hace un momento", "Hace 5m", "Hace 2h", "Hace 1d")

#### Scenario: Visualización de etiquetas de prioridad y categorías
- **WHEN** se renderiza una tarjeta de tarea
- **THEN** las insignias de prioridad muestran "Baja", "Media" o "Alta" según corresponda, y las categorías se presentan en español

### Requirement: Localización de Diálogos Modales y Formularios
El sistema SHALL (DEBE) mostrar los títulos, descripciones, campos, opciones y mensajes de validación de los modales en idioma español.

#### Scenario: Formulario modal de tareas en español
- **WHEN** el usuario abre el modal para crear o editar una tarea
- **THEN** los títulos indican "Crear Nueva Tarea" o "Editar Tarea", los campos indican "Título de la Tarea", "Descripción (Opcional)", "Categoría", "Prioridad", y los botones indican "Cancelar" y "Guardar Cambios" o "Crear Tarea"

#### Scenario: Mensaje de validación de formulario en español
- **WHEN** el usuario intenta guardar una tarea sin título
- **THEN** el sistema muestra el mensaje de error "El título de la tarea es obligatorio"

#### Scenario: Diálogo de confirmación de eliminación en español
- **WHEN** el usuario presiona el botón de eliminar una tarea
- **THEN** el diálogo de seguridad muestra el título "Eliminar Tarea", el mensaje "¿Estás seguro de que deseas eliminar permanentemente esta tarea?" y la advertencia "Esta acción no se puede deshacer"

### Requirement: Localización de Estados Vacíos
El sistema SHALL (DEBE) presentar los mensajes de estado vacío y búsqueda sin coincidencias en idioma español.

#### Scenario: Estado vacío de búsqueda sin resultados
- **WHEN** el usuario busca un término que no arroja resultados
- **THEN** el sistema muestra "No se encontraron tareas coincidentes" y la opción de "Restablecer filtros"

#### Scenario: Estado vacío general de lista
- **WHEN** no hay tareas registradas en la lista seleccionada
- **THEN** el sistema muestra "No hay tareas en esta lista" y el botón "Crear Nueva Tarea"
