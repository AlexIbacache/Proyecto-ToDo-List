# Tareas: Localización y Traducción de la Interfaz al Español

## 1. Navegación, Cabecera y Metadatos HTML

- [x] 1.1 Actualizar `src/app/layout.tsx` configurando `lang="es"` y metadatos de la aplicación en español.
- [x] 1.2 Traducir los textos y filtros de `Sidebar.tsx` ("Todas las tareas", "Activas", "Completadas", categorías y botón de nueva tarea).
- [x] 1.3 Traducir `Header.tsx` (texto de ayuda del buscador, tooltips de vista y botón "+ Agregar Tarea").

## 2. Modelos, Fechas y Semilla de Datos

- [x] 2.1 Definir mapeos de etiquetas visuales en español para categorías y prioridades en `src/types/task.ts`.
- [x] 2.2 Localizar el formato de fechas relativas a español en `src/utils/date.ts` ("Hace un momento", "Hace Xm", "Hace Xh", etc.).
- [x] 2.3 Traducir los datos semilla de tareas de ejemplo en `src/services/taskStorage.ts`.

## 3. Vistas de Tareas, Modales y Componentes Reutilizables

- [x] 3.1 Traducir `Badge.tsx` y `TaskCard.tsx` para mostrar categorías, prioridades ("Baja", "Media", "Alta") y fechas en español.
- [x] 3.2 Traducir encabezados de área de trabajo y contadores en `TaskList.tsx`.
- [x] 3.3 Traducir `TaskFormModal.tsx` (títulos, campos, botones y mensaje de validación "El título de la tarea es obligatorio").
- [x] 3.4 Traducir `DeleteConfirmDialog.tsx` y `EmptyState.tsx` (diálogo de seguridad y estados vacíos de búsqueda y lista).

## 4. Verificación y Validación Técnica

- [x] 4.1 Ejecutar `pnpm build` y verificar que el proyecto compile sin advertencias ni errores de tipos.
- [x] 4.2 Validar la navegación y todos los flujos de usuario visualmente en el navegador comprobando la traducción al 100%. Verificación observada por la persona usuaria en navegador: la interfaz y todos los flujos se encuentran traducidos al español en su totalidad.
