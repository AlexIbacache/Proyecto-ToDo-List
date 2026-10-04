# Propuesta: Localización y Traducción de la Interfaz de Usuario al Español

## Why

La aplicación actualmente cuenta con textos y etiquetas en inglés en su interfaz de usuario. Para brindar una experiencia nativa, clara y accesible a los usuarios hispanohablantes, es necesario traducir y adaptar integralmente todos los textos visibles, modales, formularios, mensajes de confirmación y estados vacíos al español.

## What Changes

- Actualización del idioma principal del documento HTML (`lang="es"`) y metadatos SEO en Next.js.
- Traducción completa de los textos de la interfaz en los componentes de navegación y cabecera:
  - Barra superior (`Header`): buscador, selector de vista en grilla/lista y botón de creación de tarea.
  - Barra lateral (`Sidebar`): navegación por filtros ("Todas las tareas", "Activas", "Completadas"), títulos de categorías ("Trabajo", "Personal", "Urgente", "General") y estado del sistema.
- Traducción de las vistas de trabajo y tarjetas (`TaskList`, `TaskCard`):
  - Encabezados de vista ("Área de trabajo", "Tareas Activas", "Tareas Completadas").
  - Formato de fechas relativas localizadas ("Hace un momento", "Hace Xm", "Hace Xh", "Hace Xd").
  - Etiquetas de prioridad ("Baja", "Media", "Alta") y categorías.
- Traducción de diálogos interactivos y formularios (`TaskFormModal`, `DeleteConfirmDialog`):
  - Títulos, descripciones, campos obligatorios, opciones de selección y mensajes de validación ("El título de la tarea es obligatorio").
  - Diálogo de seguridad para confirmar eliminación permanente de tareas.
- Traducción de los componentes de estado vacío (`EmptyState`):
  - Mensajes de búsqueda sin coincidencias, lista vacía y tareas completadas.
- Actualización de las tareas semilla iniciales de demostración al español.

## Capabilities

### New Capabilities
- `ui-localization`: Adaptación idiomática y traducción integral al español de todos los textos, controles, validaciones y componentes visuales de la aplicación.

### Modified Capabilities
<!-- Ninguna -->

## Impact

- **Componentes Afectados**: `Sidebar.tsx`, `Header.tsx`, `TaskList.tsx`, `TaskCard.tsx`, `TaskFormModal.tsx`, `DeleteConfirmDialog.tsx`, `EmptyState.tsx`, `Badge.tsx`, `layout.tsx`.
- **Servicios y Utilidades**: `taskStorage.ts` (tareas semilla en español), `date.ts` (fechas relativas en español).
- **Dependencias**: Sin nuevas dependencias de paquetes.
