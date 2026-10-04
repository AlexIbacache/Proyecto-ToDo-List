# Propuesta: Aplicación CRUD de Lista de Tareas (Todo List)

## Why

Los usuarios requieren una aplicación de gestión de tareas intuitiva, ágil y visualmente atractiva para organizar y hacer seguimiento de sus actividades cotidianas. Implementar esta solución con Next.js y una arquitectura de componentes modulares inspirada en la interfaz oscura de `assets/maqueta.png` garantiza una experiencia de usuario moderna, mantenible y con prioridad mobile-first.

## What Changes

- Inicialización de una aplicación moderna con Next.js utilizando TypeScript, `pnpm` y diseño responsivo.
- Implementación del ciclo completo de gestión de tareas:
  - Crear nuevas tareas con título obligatorio y descripción, categoría y prioridad opcionales.
  - Listar tareas en formatos de grilla o lista responsiva según la jerarquía visual de `assets/maqueta.png`.
  - Editar tareas existentes mediante diálogo modal interactivo.
  - Eliminar tareas con diálogo de confirmación de seguridad.
  - Alternar el estado de completado con respuesta visual inmediata.
- Construcción de una biblioteca de componentes UI reutilizables:
  - Estructura de layout con barra lateral colapsable y barra superior de búsqueda.
  - Tarjetas de tareas con iconos de estado, títulos y etiquetas de metadatos.
  - Diálogos modulares y formularios con validación.
  - Primitivas reutilizables: Button, Input, Textarea, Checkbox, Badge y EmptyState.
- Persistencia de datos en el cliente (`localStorage`) mediante una capa de repositorio desacoplada.

## Capabilities

### New Capabilities
- `todo-management`: Gestión integral del ciclo de vida de tareas (creación, lectura, búsqueda, filtrado, edición, eliminación y cambio de estado) acompañada de una interfaz responsiva dark theme basada en `assets/maqueta.png`.

### Modified Capabilities
<!-- Ninguna: Proyecto nuevo -->

## Impact

- **Nueva base de código**: Configuración de Next.js App Router, TypeScript y sistema de estilos.
- **Gestor de paquetes**: Estandarizado en `pnpm`.
- **Diseño visual**: Paleta oscura, tipografía y tarjetas alineadas con `assets/maqueta.png`.
- **Persistencia**: Capa de almacenamiento local en el navegador con modelos tipados.
