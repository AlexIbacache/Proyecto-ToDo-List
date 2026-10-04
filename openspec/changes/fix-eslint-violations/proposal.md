# Proposal

## Why

`pnpm lint` falla con dos errores de `react-hooks/set-state-in-effect` y un aviso por una variable sin usar, y arrastra el error desde antes de que existiera este proyecto OpenSpec. Más importante que el código rojo: la inspección revela que el aviso de lint está describiendo un defecto real de experiencia de usuario, no solo una infracción de estilo. `TaskContext` hidrata las tareas desde `localStorage` en un efecto de montaje, y `TaskList` nunca consume el indicador `isLoading`; por lo tanto, en cada carga de la aplicación el usuario ve un estado vacío parpadear antes de que aparezcan las tareas. El mismo patrón de estado duplicado obliga a escribir el estado manualmente después de cada mutación, con el riesgo de que el estado en memoria y el almacenamiento se desincronicen.

## What Changes

- Convertir `TaskStorageRepository` de un repositorio de lectura en escritura en una fuente de estado externa observable, con caché de instantánea y un mecanismo de suscripción notificado en cada `saveAll`.
- Sustituir en `TaskProvider` el estado local de la lista de tareas y la hidratación por efecto, por una suscripción a `useSyncExternalStore` que distingue la instantánea de servidor de la de cliente.
- Eliminar las escrituras manuales de estado que acompañan a `createTask`, `updateTask`, `deleteTask` y `toggleTask`, dejando al repositorio como única fuente de verdad.
- Sustituir en `TaskFormModal` el efecto que reinicia los campos del formulario cuando cambia la tarea en edición o la visibilidad del diálogo, por un remount controlado mediante `key` con inicialización en el estado inicial de cada hook.
- Eliminar de `Badge` la prop `variant`, declarada en la interfaz, con valor por defecto y jamás leída por ningún llamador, ni consumida por el propio componente.
- Corregir el consumo de `isLoading` en `TaskList` para que el estado de carga se represente de forma explícita en lugar de renderizar el estado vacío durante la hidratación.
- No se deshabilita ninguna regla de ESLint ni se agrega ninguna excepción de supresión. El objetivo es que `pnpm lint` termine sin problemas porque el código dejó de infringir, no porque el linter dejó de mirar.

## Capabilities

### New Capabilities

Ninguna. Este cambio no introduce comportamiento de usuario nuevo; corrige defectos existentes y elimina código muerto.

### Modified Capabilities

- `todo-management`: Se modifica el requirement *Persistencia de Datos en el Cliente* para establecer que el almacenamiento local es la única fuente de verdad, que los cambios se propagan a la interfaz mediante suscripción y que la aplicación no debe presentar un estado vacío durante la hidratación. Se añade un requirement nuevo sobre la ausencia de parpadeo de estado vacío en la carga inicial.

## Impact

**Código afectado**

- `src/services/taskStorage.ts` — pasa a exponer `subscribe`, caché de instantánea y un snapshot de servidor estable; `saveAll` notifica a los suscriptores. La API de mutación se conserva para no obligar a cambiar los llamadores.
- `src/context/TaskContext.tsx` — el `useState` de la lista de tareas, el `useState` de `isLoading` y el `useEffect` de hidratación se reemplazan por `useSyncExternalStore`. Las acciones de mutación dejan de llamar a `setTasks` y delegan la notificación en el repositorio.
- `src/components/tasks/TaskFormModal.tsx` — se elimina el `useEffect` de reinicio; los hooks de estado se inicializan desde las props.
- `src/components/tasks/TaskWorkspace.tsx` — pasa a suministrar la `key` que gobierna el remount del formulario.
- `src/components/tasks/TaskList.tsx` — pasa a consumir `isLoading`.
- `src/components/ui/Badge.tsx` — se elimina la prop `variant` de la interfaz y de la desestructuración.

**Contratos de consumo**

- `BadgeProps.variant` desaparece. Ningún llamador del repositorio lo utiliza, por lo que no hay ruptura para el código existente, pero el componente deja de exportar ese contrato y la eliminación es irreversible para quien intente consumirlo a futuro.
- `TaskStorageRepository` incorpora métodos nuevos. Los métodos existentes mantienen su firma y su comportamiento observable, incluida la siembra inicial de tareas de muestra en el primer arranque.

**Dependencias y configuración**

- Sin dependencias nuevas. `useSyncExternalStore` es parte de React 19.2.8, ya presente en el proyecto.
- Sin cambios en `eslint.config.mjs`, `tailwindcss`, `next.config.ts` ni en la configuración de OpenSpec.

**Riesgos**

- La caché de instantánea es obligatoria: `getAll()` devuelve un array nuevo en cada llamada, y un `getSnapshot` sin caché provocaría un ciclo de renderizado infinito. Esta es la parte del cambio con mayor riesgo de implementación y la que exige verificación explícita.
- `useSyncExternalStore` participa de la hidratación de React y usa la instantánea de servidor durante el renderizado en servidor; un `getServerSnapshot` que devuelva una referencia nueva en cada llamada produce el mismo problema de ciclo.
- El proyecto no tiene suite de pruebas. La verificación disponible es `pnpm lint`, `pnpm build` y un recorrido manual en navegador. El comportamiento de persistencia debe comprobarse de forma manual y explícita.
