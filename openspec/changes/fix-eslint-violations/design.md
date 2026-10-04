# Design

## Context

Estado actual relevante para la decisión. La motivación está en `proposal.md`; los requisitos, en `specs/todo-management/spec.md`.

El proyecto usa Next.js 16.3.6 con React 19.2.8, Tailwind 4, `eslint-config-next` y `babel-plugin-react-compiler`. La presencia del compilador de React es la causa directa de la regla `react-hooks/set-state-in-effect`: no es una preferencia de estilo heredada, es una restricción que el compilador aplica en la cadena de herramientas del proyecto.

`pnpm lint` falla con dos errores y un aviso:

| Ubicación | Regla | Origen |
| --- | --- | --- |
| `src/context/TaskContext.tsx:73` | `react-hooks/set-state-in-effect` | Hidratación de montaje desde `localStorage` |
| `src/components/tasks/TaskFormModal.tsx:36-39` | `react-hooks/set-state-in-effect` | Reinicio de campos al cambiar `initialTask` o `isOpen` |
| `src/components/ui/Badge.tsx:15` | `@typescript-eslint/no-unused-vars` | Prop `variant` declarada, con valor por defecto y nunca leída |

Dos restricciones condicionan toda la solución. La primera es que `localStorage` no existe en el servidor pero los componentes cliente de App Router se prerenderizan en él, de modo que leerlo durante el render inicial produce discrepancia de hidratación. La segunda es que `TaskStorageRepository.getAll()` devuelve un array nuevo en cada invocación, y tanto `getSnapshot` como `getServerSnapshot` de una suscripción a estado externo exigen una referencia estable.

No hay suite de pruebas. La verificación disponible es `pnpm lint`, `pnpm build` y recorrido manual en navegador.

## Goals / Non-Goals

**Goals**

- Que `pnpm lint` termine sin errores ni avisos por código propio, sin deshabilitar reglas ni agregar excepciones de supresión.
- Eliminar la divergencia posible entre el estado en memoria y el almacenamiento local, haciendo del almacenamiento la única fuente de verdad.
- Eliminar el parpadeo del estado vacío en la carga inicial.
- Preservar íntegra la API de mutación existente de `TaskStorageRepository` para no obligar a modificar los llamadores.

**Non-Goals**

- Sincronización entre pestañas del navegador. El evento `storage` haría esto casi gratuito al suscribirse, pero es una funcionalidad nueva y ajena al objetivo de este change. Queda planteada como extensión posterior.
- Incorporar una suite de pruebas automatizadas. Sería el cambio correcto en términos de proceso, pero excede el alcance de corregir las infracciones actuales.
- Añadir un focus trap a `Modal` ni resolver otras indebtedades de componentes ajenas a este change.
- Corregir el hecho de que `TaskList` no distinga visualmente el estado de carga con un esqueleto de carga. Se eliminará el uso incorrecto de `isLoading`; el esqueleto es una mejora visual posterior.

## Decisions

### D1. El repositorio pasa a ser una fuente de estado externo observable

**Elegido:** añadir a `TaskStorageRepository` un caché de instantánea, un conjunto de suscriptores y un método `subscribe`; `saveAll` notifica a los suscriptores tras persistir.

**Alternativa considerada:** una excepción de ESLint acotada al efecto de hidratación, con un comentario justificativo. Se descartó porque deja la infracción en el código, conserva el parpadeo del estado vacío y conserva la duplicación de estado que originó el problema. La persona usuaria pidió explícitamente corregir y no silenciar.

**Por qué no basta con leer en un inicializador de `useState`:** el inicializador se ejecuta también en el servidor, donde `localStorage` no existe, y además en el cliente durante la primera renderización. Devolver datos distintos en servidor y cliente rompe la hidratación. `TaskStorageRepository.isBrowser()` ya mitiga el acceso, pero la diferencia entre ambos entornos persiste y React la reporta como discrepancia.

**Por qué el caché no es opcional:** `useSyncExternalStore` compara el resultado de `getSnapshot` con el previo para decidir si hay que volver a renderizar. Si `getSnapshot` devuelve un array nuevo en cada llamada, la comparación nunca resulta igual y React entra en un ciclo de renderizado infinito. El caché se invalida explícitamente en `saveAll`, no por tiempo, para que una relectura fuera de un ciclo de mutación sea imposible.

**Invariante de la instantánea de servidor:** `getServerSnapshot` debe devolver una referencia estable a nivel de módulo, no un array literal. `[]` creado en cada llamada reproduce el ciclo, esta vez en el servidor.

### D2. `TaskProvider` consume la suscripción y elimina su estado derivado

**Elegido:** `tasks` pasa a obtenerse de `useSyncExternalStore` con `getSnapshot` y `getServerSnapshot` diferenciados. `isLoading` deja de ser un estado mutable y se deriva: mientras el render use la instantánea de servidor, la carga no ha terminado. Las acciones `createTask`, `updateTask`, `deleteTask` y `toggleTask` conservan su firma pero dejan de llamar a `setTasks`; la notificación llega por suscripción.

**Alternativa considerada:** mantener `setTasks` y agregar la suscripción solo para la hidratación inicial. Se descartó porque conserva las dos fuentes de verdad, que es precisamente la causa del defecto.

**Consecuencia aceptada:** `createTask` ya no necesita `setTasks((prev) => [newTask, ...prev])` porque el orden de la lista lo decide el repositorio al persistir. Hay que verificar que el orden de inserción se preserve, porque el listado depende de él.

### D3. El reinicio del formulario se resuelve con remount, no con ajuste durante el render

**Elegido:** eliminar el `useEffect` de reinicio, inicializar cada hook desde las props, y hacer que `TaskWorkspace` suministre una `key` derivada de la tarea en edición y de la visibilidad del diálogo. Cuando esa `key` cambia, React desmonta el formulario y monta uno nuevo con el estado inicial correcto, incluido el mensaje de validación.

**Alternativas consideradas:**

- *Ajuste de estado durante el render* (patrón de "ajustar estado cuando cambia una prop", comparando contra el valor previo almacenado en un `useState`). Es idiomático y está contemplado por la propia regla, pero tiene coste de mantenimiento: obliga a conservar una segunda Piece of state dedicada a rastrear el valor anterior, y es fácil que se desincronice al añadir una cuarta dependencia al efecto.
- *Extraer un componente interno de formulario* y.remount a ese. Más indirección de la necesaria; el `key` en el llamador produce el mismo resultado con menos superficie.

**Por qué el `key` y no solo inicializar:** inicializar los hooks desde las props solo resuelve el primer montaje. Al cambiar `initialTask` sin desmontar, los hooks conservarían el valor anterior, que es exactamente el defecto que el efecto actual corrige a su manera. El `key` es lo que garantiza el reinicio completo.

**Detalle a cuidar:** `TaskFormModal` está montado de forma permanente y su contenido depende de `Modal`, que devuelve `null` cuando está cerrado. La `key` debe incluir el estado de visibilidad para que reabrir el formulario con la misma tarea igualmente parta de valores iniciales limpios y sin mensaje de validación residual.

### D4. `Badge.variant` se elimina en lugar de implementarse

**Elegido:** eliminar la prop de la interfaz y de la desestructuración.

**Fundamento:** la inspección de los quince usos de `variant=` en el repositorio muestra que todos pertenecen a `Button`, ninguno a `Badge`. La prop no tiene consumidor, no se lee en el cuerpo del componente y no altera el resultado visual en ningún caso. Implementarla agregaría una segunda vía de estilo sobre un componente que ya resuelve su color a partir de `category` y `priority` en exclusiva, creando dos fuentes de verdad para la misma propiedad visual.

## Risks / Trade-offs

- **Ciclo de renderizado infinito por instantánea inestable** → Es el riesgo dominante. Mitigación: que la caché viva en el módulo, se invalide solo en `saveAll`, y que `getServerSnapshot` devuelva una constante de módulo. Verificar de forma explícita durante la implementación que la consola del navegador no reporta el aviso de que el resultado de `getSnapshot` debería estar cacheado, ni de actualización excesiva.

- **Regresión en el orden del listado** → Al eliminar `setTasks((prev) => [newTask, ...prev])`, el orden pasa a depender de cómo el repositorio persiste. Mitigación: comprobar que `create` sigue anteponiendo la tarea nueva y verificar visualmente que las nuevas tareas aparecen arriba.

- **Pérdida de la semilla inicial de tareas de muestra** → `getAll` siembra las tareas de muestra cuando no encuentra la clave. Si la caché se puega antes de tiempo o se siembra en el instante equivocado, la primera ejecución podría mostrar una lista vacía de forma permanente. Mitigación: verificar la primera carga con almacenamiento vacío y confirmar que aparecen las cinco tareas de muestra.

- **Discrepancia de hidratación mal resuelta** → Una `key` incorrecta o un `getServerSnapshot` que devuelva datos reales en servidor romperían la hidratación con un error visible. Mitigación: ejecutar `pnpm build` y comprobar que el HTML prerenderizado se genera sin advertencias, y revisar la consola del navegador en la primera carga.

- **El `key` genera remontajes que pierden el foco o el texto escrito** → Es el comportamiento deseado al cambiar de tarea, pero podría costar la escritura en curso si se monta con una `key` demasiado inestable. Mitigación: construir la `key` únicamente a partir de la identidad de la tarea en edición y de la visibilidad, nunca a partir de los valores de los campos.

- **No hay cobertura automatizada para la regresión de persistencia** → Aceptado conscientemente. Mitigación: el recorrido manual en navegador es obligatorio en las tareas y debe cubrir creación, edición, marcado, eliminación, recarga y primera carga con almacenamiento vacío.

- **Eliminación irreversible de `BadgeProps.variant`** → Se elimina un contrato público del componente. Mitigación: ningún consumidor existe en el repositorio, y el cambio queda registrado en la proposal.

## Migration Plan

No hay migración de datos. El formato almacenado en `localStorage` bajo la clave `taskflow_tasks_v1` no se modifica, de modo que las tareas ya guardadas por el usuario siguen siendo legibles sin intervención. Las tareas de muestra sembradas en la primera ejecución tampoco cambian.

El despliegue es el habitual del proyecto. El rollback consiste en revertir el commit: como el formato de almacenamiento no cambia, la versión anterior sigue leyendo los mismos datos.

Orden de implementación recomendado, para que cada paso sea verificable de forma aislada: primero la prop muerta de `Badge`, luego el remount del formulario, y por último la conversión del repositorio, que es el único paso con riesgo de alterar comportamiento observable.

## Open Questions

Ninguna. Las decisiones que podrían haber alterado los requisitos, el enfoque o el desglose de tareas se resolvieron antes de redactar este documento: la elección entre `useSyncExternalStore` y una excepción de ESLint se confirmó con la persona usuaria, y la natureza de `Badge.variant` como código muerto se determinó por inspección de todos sus consumidores.
