# Propuesta: Legibilidad de Tareas en Vista Lista sobre Móvil

## Why

En el modo vista lista sobre pantallas móviles el usuario no puede leer el contenido de sus tareas. La causa raíz está en `TaskCard.tsx`: el clúster derecho de la fila declara `shrink-0`, por lo que los badges de categoría y prioridad más los dos botones de acción se niegan a ceder espacio. Toda la compresión horizontal la absorbe la columna de texto, que además aplica `truncate`, dejando el título reducido a uno o dos caracteres.

La traducción al español agravó el defecto sin introducirlo: las etiquetas en español (`Trabajo`, `Urgente`, `Completadas`, `Alta`) son más anchas que sus equivalentes en inglés, de modo que el clúster que no cede espacio ocupa todavía más horizontal y la columna de texto recibe aún menos. Hoy el modo lista es ilegible en móvil, y un modo lista ilegible es funcionalmente un modo lista inexistente.

## What Changes

- **Reflujo responsive de la fila en modo lista**: por debajo del breakpoint `sm`, los metadatos de la tarea (badges de categoría y prioridad, y marca de tiempo relativa) se reubican en una segunda línea y el título y la descripción recuperan el ancho completo del contenedor. El título y la descripción dejan de usar `truncate` y pasan a `line-clamp-2`, de modo que el texto se recorta por número de líneas y no por ancho.
- **Modal de detalle de tarea**: al tocar la fila en modo lista se abre un diálogo que presenta el título y la descripción completos de la tarea, sin truncado, junto con sus metadatos. Proporciona acceso al contenido íntegro cuando el texto excede el espacio disponible.
- **Estado de contexto para la tarea en visualización**: se agrega `viewingTask` con sus acciones `openViewModal` y `closeViewModal`, siguiendo el patrón ya establecido por `editingTask` y `deletingTask`.
- **Corrección del reflujo en la marca de tiempo**: la fecha relativa, hoy oculta por debajo de `sm` (`hidden sm:flex`), vuelve a ser visible en móvil dentro de la nueva línea de metadatos.
- **Se preserva el diseño actual en escritorio**: el reflujo solo se aplica por debajo del breakpoint `sm`. El comportamiento en viewports de escritorio no cambia.

## Capabilities

### New Capabilities

- `mobile-list-view`: Capacidad de presentar y leer el contenido íntegro de las tareas en el modo vista lista sobre dispositivos móviles, mediante un reflujo responsive de la fila y un modal de detalle de tarea.

### Modified Capabilities

<!-- Ninguna -->

## Impact

- **`src/components/tasks/TaskCard.tsx`**: rama de renderizado del modo lista. Se elimina el `shrink-0` que provoca la compresión, se reestructura el clúster de metadatos para el reflujo responsive y se cambia `truncate` por `line-clamp-2`. La rama del modo grilla no se modifica. Se agrega el manejador de apertura del modal de detalle y su affordance accesible.
- **`src/context/TaskContext.tsx`**: nuevo estado `viewingTask: Task | null` y las acciones `openViewModal` y `closeViewModal`, junto con su extensión en `TaskContextType` y en el objeto `value` del provider.
- **`src/components/tasks/TaskDetailModal.tsx`**: componente nuevo. Reutiliza el primitive `Modal` existente en lugar de definir un contenedor de diálogo propio.
- **`src/components/tasks/TaskWorkspace.tsx`**: montaje del nuevo `TaskDetailModal`, siguiendo el mismo patrón que los modales de creación, edición y eliminación ya presentes.
- **Sin dependencias nuevas**: el proyecto no suma ningún paquete. El modal se construye sobre `Modal.tsx`, que ya está disponible y no se modifica.
- **Sin cambios en persistencia**: la capacidad de datos en `localStorage`, el modelo `Task` y las claves internas de categoría y prioridad quedan intactos.
