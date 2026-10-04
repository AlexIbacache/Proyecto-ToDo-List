# Diseño Técnico: Legibilidad de Tareas en Vista Lista sobre Móvil

## Context

La fila del modo lista vive en la rama `viewMode === "list"` de `src/components/tasks/TaskCard.tsx` (líneas 51-121). Su estructura actual es un contenedor `flex` con dos clústeres:

- **Clúster izquierdo** (línea 60): `flex items-center gap-3.5 min-w-0 flex-1 mr-4`. Contiene el checkbox, el ícono de categoría y la columna de texto, que a su vez declara `min-w-0 flex-1` y aplica `truncate` al título y a la descripción.
- **Clúster derecho** (línea 87): `flex items-center gap-3 shrink-0`. Contiene el badge de categoría, el badge de prioridad, la marca de tiempo y los dos botones de acción.

El `shrink-0` del clúster derecho es la causa raíz del defecto. Al negarse a encogerse, ese clúster reclama su ancho intrínseco completo y el clúster izquierdo, que sí es flexible, absorbe la totalidad de la compresión disponible. La columna de texto queda reducida a su mínimo y el `truncate` recorta lo que queda. Como los badges ocupan la mayor parte del ancho del clúster derecho, y las etiquetas en español son más anchas que sus equivalentes en inglés, la traducción al español aumentó el ancho rígido y agravó el síntoma.

Ver [proposal.md](proposal.md) para la motivación y [specs/mobile-list-view/spec.md](specs/mobile-list-view/spec.md) para los requisitos.

Restricciones relevantes del proyecto:

- El proyecto usa Tailwind CSS 4 y ya emplea el breakpoint `sm` de forma consistente en `Header.tsx` (`sm:inline-flex`), `Sidebar.tsx` y `TaskList.tsx` (`sm:flex-row`, `sm:grid-cols-2`, `sm:hidden`).
- `Modal.tsx` ya es un primitive reutilizable que resuelve el cierre con Escape, el bloqueo del scroll del `body`, el clic sobre el fondo, `aria-modal` y el botón de cierre etiquetado.
- `TaskContext.tsx` ya establece un patrón consistente para el estado de los diálogos: una variable `Task | null` más un par de acciones `open*Modal` / `close*Modal` por cada diálogo (`editingTask`, `deletingTask`).
- El proyecto no tiene suite de pruebas. La verificación disponible es `pnpm build` más inspección visual en el navegador.

## Goals / Non-Goals

**Objetivos:**

- Eliminar la causa raíz: el texto de la tarea debe recibir el ancho disponible en lugar de cederlo a los metadatos.
- Preservar toda la información de la fila en móvil. Ningún metadato existente se descarta; se reubica.
- Ofrecer acceso al texto íntegro de la tarea cuando el título o la description excedan el espacio disponible.
- Reutilizar los primitives y patrones de estado ya existentes en lugar de introducir abstracciones nuevas.
- No alterar el comportamiento existente en viewports de escritorio.

**No Objetivos:**

- Modificar la rama del modo grilla, que ya es legible: usa `line-clamp-2` en el título y la descripción (líneas 168 y 178) y dispone de ancho suficiente.
- Rediseñar el modelo de datos, la persistencia en `localStorage` ni las claves internas de categoría y prioridad.
- Incorporar un mecanismo de breakpoints más fino que `sm`, ni adoptar una estrategia de diseño responsive distinta al del resto de la aplicación.
- Introducir una suite de pruebas o una librería de pruebas como parte de este cambio.

## Decisions

### 1. Reubicación vertical de los metadatos en lugar de ocultamiento o scroll horizontal

- **Decisión**: Por debajo de `sm`, la fila pasa de una disposición horizontal de dos clústeres a una disposición vertical: una primera línea con el checkbox, el ícono y el texto, y una segunda línea con los metadatos reubicados.
- **Justificación**: Es la única estrategia que devuelve al texto el ancho completo del contenedor sin descartar información. El clúster derecho deja de ser un competidor por el ancho horizontal y deja de necesitar `shrink-0` para proteger su contenido.
- **Alternativas consideradas**:
  - *Ocultar los badges en móvil*: simple, pero el usuario pierde la categoría y la prioridad, que es información que el modo lista existe para comunicar. Contradice el requisito de reflujo de metadatos.
  -*Scroll horizontal en la fila*: conserva todo, pero introduce un gesto adicional dentro de una lista que ya es un contenedor de scroll vertical, y deja metadatos fuera de la vista por defecto.
  -*Reducir el tamaño de fuente y de los badges*: alivia la compresión sin resolverla. El texto seguiría compitiendo por el ancho con los metadatos, y afecta la legibilidad de los propios metadatos.

### 2. `line-clamp-2` en lugar de `truncate` para el texto de la fila

- **Decisión**: El título y la descripción dejan de aplicar `truncate` y pasan a aplicar `line-clamp-2`.
- **Justificación**: `truncate` recorta por ancho y produce una sola línea con ellipsis; con el espacio comprimido que sufría la columna, esa línea quedaba en uno o dos caracteres. `line-clamp-2` recorta por número de líneas, de modo que el usuario alcanza a leer el comienzo del título en dos líneas. Además alinea la fila con la tarjeta del modo grilla, que ya usa `line-clamp-2` (líneas 168 y 178), de modo que ambos modos comparten el mismo criterio de recorte.
- **Alternativas consideradas**:
  - *Sin recorte en móvil*: el título largo desplazaría la fila a una altura variable que depende de la longitud de cada título, produciendo un ritmo visual irregular. `line-clamp-2` acota ese crecimiento a un máximo razonable.
  -*`truncate` con más espacio disponible*: reintroduce el problema original en cuanto una etiqueta o un título largo vuelven a comprimir la columna.

### 3. Fila activable con `role="button"` en lugar de un elemento `<button>`

- **Decisión**: La fila se expone como activable mediante `role="button"` y `tabIndex={0}`, con un manejador de teclado que responde a Enter y Espacio, en lugar de envolverla en un `<button>`.
- **Justificación**: La fila ya contiene elementos interactivos anidados: el checkbox y los dos botones de edición y eliminación. El contenido de un `<button>` no puede contener otro elemento interactivo; envolver la fila en un `<button>` produce HTML inválido y complicate la navegación por teclado dentro de la fila. Un `div` con `role="button"` y `tabIndex` es el patrón correcto para un contenedor activable con controles internos.
- **Consecuencia obligatoria**: Al activar un control interno, el evento debe detenerse antes de alcanzar la fila, de modo que editar o eliminar una tarea no abra el diálogo de detalle. Esto se resuelve deteniendo la propagación en los manejadores de los controles anidados, no en la fila, para que el comportamiento de los controles existentes no se altere.

### 4. Estado `viewingTask` en `TaskContext`

- **Decisión**: El contexto expone `viewingTask: Task | null`, `openViewModal(task)` y `closeViewModal()`, replicando el patrón de `editingTask` y `deletingTask`.
- **Justificación**: `TaskWorkspace` ya consume el estado de los tres diálogos existentes desde el contexto y los monta en un mismo lugar. Replicar el patrón mantiene una única fuente de verdad para el estado de los diálogos y evita que el estado del nuevo diálogo viva en un nivel distinto al del resto.
- **Alternativas consideradas**:
  - *Estado local en `TaskList`*: evitaría tocar el contexto, pero obligaría a montar el diálogo dentro de `TaskList` o a propagar el estado hacia arriba, desacoplándolo del lugar donde ya se montan los demás diálogos.

### 5. Reutilización del primitive `Modal`

- **Decisión**: El diálogo de detalle se construye sobre el componente `Modal` existente. No se define un contenedor de diálogo nuevo.
- **Justificación**: `Modal` ya resuelve el cierre con Escape, el bloqueo del scroll del `body` mientras está abierto, el clic sobre el fondo, `aria-modal="true"` y el botón de cierre etiquetado. Reutilizarlo evita duplicar ese comportamiento y mantiene el esquema visual del resto de los diálogos de la aplicación.
- **Consecuencia**: El diálogo hereda las limitaciones del primitive actual. En particular, `Modal` no implementa una trampa de foco, por lo que el foco puede salir del diálogo con la tecla Tab. Esta limitación ya existe en los diálogos de creación, edición y eliminación, y este cambio no la introduce ni empeora; corregirla es un cambio independiente.

### 6. Reutilización del breakpoint `sm`

- **Decisión**: El corte entre la disposición de escritorio y la de móvil se hace en `sm`, el mismo breakpoint que la aplicación ya emplea para el resto de sus cambios de disposición.
- **Justificación**: Introduce un segundo punto de corte para el mismo comportamiento — el header pasa a `sm:inline-flex`, el encabezado del área de trabajo a `sm:flex-row`, la grilla a `sm:grid-cols-2`— generaría una ventana de anchos en la que el header ya está en su forma de escritorio y la fila de la lista todavía en su forma móvil. Reutilizar `sm` mantiene una única noción de "escritorio" en toda la interfaz.

## Risks / Trade-offs

- **[Riesgo] La fila activable puede abrir el diálogo al interactuar con sus controles internos** → *Mitigación*: La propagación del evento se detiene en los manejadores de los controles anidados, no en la fila. La verificación debe cubrir explícitamente que editar y eliminar no abren el diálogo de detalle.

- **[Riesgo] El `role="button"` sobre un contenedor con hijos interactivos puede confundir a las tecnologías de asistencia si el nombre accesible no es preciso** → *Mitigación*: El nombre accesible incluye el título de la tarea e indica que la activación abre el detalle, de modo que el propósito de la fila no resulta ambiguo frente a los controles que contiene.

- **[Riesgo] Al devolver al texto el ancho completo, las filas en móvil crecen en alto y se muestran menos tareas por pantalla** → *Mitigación*: Es el comportamiento correcto para un modo lista: la altura de la fila pasa a depender del contenido y no de la compresión. `line-clamp-2` acota el crecimiento a un máximo acotado. Se acepta el costo en densidad a cambio de legibilidad.

- **[Riesgo] El diálogo de detalle hereda la ausencia de trampa de foco de `Modal`** → *Mitigación*: Se documenta como limitación preexistente y fuera de alcance. Si la revisión de accesibilidad lo señala, corresponde un cambio independiente sobre el primitive, que beneficia por igual a los tres diálogos existentes.

- **[Trade-off] El reflujo agrega condicionales de responsive a la fila y aumenta la superficie de regresión respecto de una corrección de una sola línea** → *Mitigación*: El comportamiento de escritorio se preserva intacto, de modo que la verificación se concentra en los viewports por debajo de `sm`. La rama del modo grilla no se toca.

## Migration Plan

No hay migración de datos. El cambio no altera el modelo `Task`, las claves de categoría y prioridad, ni el esquema de `localStorage`. El estado `viewingTask` es efímero y existe solo en memoria durante la sesión.

Despliegue: el cambio entra como un commit único. Reversión: revertir el commit restaura el comportamiento anterior sin dejar estado residual, dado que ningún dato persistido depende de él.

## Open Questions

Ninguna. Las decisiones tomadas no dejan Questions pendientes que puedan resolverse más adelante sin modificar las specs, el enfoque o la descomposición de tareas.
