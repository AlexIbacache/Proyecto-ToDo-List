# Tareas: Aplicación de Lista de Tareas (Todo List)

## 1. Inicialización del Proyecto y Fundamentos

- [x] 1.1 Inicializar el proyecto Next.js con TypeScript y Tailwind CSS usando `pnpm`, verificando la estructura de archivos y el comando `pnpm dev`.
- [x] 1.2 Configurar los tokens de diseño (tema oscuro midnight/slate acorde a `assets/maqueta.png`) e instalar `lucide-react` con `pnpm add lucide-react`.

## 2. Modelo de Dominio y Capa de Almacenamiento

- [x] 2.1 Definir modelos de dominio e interfaces TypeScript (`Task`, `TaskPriority`, `TaskCategory`, `TaskFilter`) en `src/types/task.ts`.
- [x] 2.2 Implementar `TaskStorageRepository` con persistencia en `localStorage` y seguridad de hidratación en `src/services/taskStorage.ts`.
- [x] 2.3 Implementar `TaskContext` y el hook `useTasks` para administrar estado en memoria, filtros, búsqueda y operaciones CRUD.

## 3. Componentes Primitivos Reutilizables de UI

- [x] 3.1 Construir primitivas reutilizables (`Button`, `Input`, `Textarea`, `Checkbox`, `Badge`, `Modal`) en `src/components/ui/` con estilos oscuros y accesibilidad.
- [x] 3.2 Construir componentes `DeleteConfirmDialog` y `EmptyState` en `src/components/ui/` para confirmación de borrado y estados sin resultados.

## 4. Estructura de Navegación y Layout (Inspirada en la Maqueta)

- [x] 4.1 Implementar la barra lateral `Sidebar` y el menú móvil `MobileDrawer` con filtros ("Todas", "Activas", "Completadas") y categorías.
- [x] 4.2 Implementar el encabezado `Header` con campo de búsqueda interactiva (`SearchBar`), alternador de vista (grilla/lista) y botón "+ Nueva Tarea".
- [x] 4.3 Ensamblar la plantilla general `AppLayout`, verificando adaptación responsiva en pantallas móviles (<768px) y de escritorio (>=1024px).

## 5. Vistas e Interacciones CRUD de Tareas

- [x] 5.1 Implementar el componente `TaskCard` con estética de tarjeta redondeada similar a `assets/maqueta.png`, casilla de verificación, etiquetas, fecha y botones de acción.
- [x] 5.2 Implementar `TaskFormModal` para la creación y edición de tareas con validación de título obligatorio y selección de categoría/prioridad.
- [x] 5.3 Implementar el contenedor `TaskList` con soporte de vistas en grilla y lista, vinculado a filtros y búsqueda en vivo.

## 6. Verificación y Validación Integral

- [x] 6.1 Ejecutar compilación de producción (`pnpm build`) y comprobar 0 errores de TypeScript, lint o empaquetado.
- [x] 6.2 Validar el ciclo completo CRUD (crear, listar, buscar, filtrar, editar, eliminar, alternar completado y persistencia tras recargar) y responsividad en navegador.
