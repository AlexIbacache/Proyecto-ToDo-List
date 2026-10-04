# Spec Delta

## MODIFIED Requirements

### Requirement: Persistencia de Datos en el Cliente
El sistema SHALL (DEBE) guardar automáticamente las tareas en el almacenamiento local del navegador (`localStorage`) para conservarlas tras recargar la página. El almacenamiento local SHALL (DEBE) constituir la única fuente de verdad de la lista de tareas: cualquier modificación de una tarea, ya sea creada, actualizada, eliminada o marcada como completada, SHALL (DEBE) quedar registrada en el almacenamiento local y SHALL (DEBE) propagarse a la interfaz sin que el usuario necesite recargar la página. La interfaz SHALL (DEBE) reflejar el contenido del almacenamiento local sin mantener una segunda copia del estado de la lista que pueda divergir de lo almacenado.

#### Scenario: Persistencia y restauración de tareas tras recarga
- **WHEN** el usuario crea o modifica tareas y recarga la pestaña del navegador
- **THEN** el sistema recupera las tareas desde `localStorage` sin pérdida de datos

#### Scenario: Propagación de una tarea creada a la interfaz
- **WHEN** el usuario crea una tarea nueva
- **THEN** el sistema la registra en el almacenamiento local y la muestra en el listado sin que el usuario recargue la página

#### Scenario: Propagación de una tarea actualizada o marcada como completada
- **WHEN** el usuario edita una tarea existente o cambia su estado de completado
- **THEN** el sistema registra el cambio en el almacenamiento local y la interfaz muestra la versión almacenada de esa tarea

#### Scenario: Propagación de una tarea eliminada
- **WHEN** el usuario confirma la eliminación de una tarea
- **THEN** el sistema la retira del almacenamiento local y desaparece del listado, y las estadísticas y los contadores se recalculan a partir de lo almacenado

#### Scenario: Coherencia entre el almacenamiento y lo exhibido tras varias operaciones
- **WHEN** el usuario realiza varias operaciones consecutivas de creación, edición, marcado y eliminación
- **THEN** el listado, los contadores y el contenido del almacenamiento local coinciden entre sí, sin elementos mostrados que no existan en el almacenamiento ni tareas almacenadas que no aparezcan en el listado

## ADDED Requirements

### Requirement: Carga Inicial sin Estado Vacío Intermedio
El sistema SHALL (DEBE) exhibir las tareas almacenadas desde el primer renderizado disponible para el usuario, sin presentar el mensaje de estado vacío como estado intermedio mientras se recupera la información del almacenamiento local. Mientras no exista información disponible, el sistema SHALL (DEBE) representar la carga de forma explícita y distinguishable del estado vacío, en lugar de mostrar la lista como si no contuviera tareas.

#### Scenario: Primera carga de la aplicación con tareas almacenadas
- **WHEN** el usuario abre la aplicación y existen tareas en el almacenamiento local
- **THEN** el sistema muestra directamente esas tareas y no muestra en ningún momento el mensaje de estado vacío

#### Scenario: Apertura de la aplicación sin tareas almacenadas
- **WHEN** el usuario abre la aplicación por primera vez y no existen tareas en el almacenamiento local
- **THEN** el sistema muestra el mensaje de estado vacío una vez confirmada la ausencia de tareas, y no antes

#### Scenario: Aparición del estado vacío tras buscar sin coincidencias
- **WHEN** el usuario busca un término que no arroja resultados sobre un conjunto de tareas que sí existe
- **THEN** el sistema muestra el mensaje de estado vacío de búsqueda sin resultados, distinguiéndolo de la ausencia total de tareas

### Requirement: Reinicio del Formulario de Tarea al Cambiar de Contexto
El sistema SHALL (DEBE) presentar el formulario de creación y edición de tareas con los valores que corresponden a la tarea en edición cuando el usuario abre ese formulario, y con valores iniciales por defecto cuando no hay ninguna tarea en edición. El cambio de tarea en edición o la apertura y cierre del formulario SHALL (DEBE) restaurar el estado del formulario de forma completa, incluyendo el mensaje de validación, sin requerir que el usuario recargue la página ni que el valor previo persista en el formulario.

#### Scenario: Apertura del formulario de edición con una tarea existente
- **WHEN** el usuario elige editar una tarea que tiene título, descripción, categoría y prioridad
- **THEN** el formulario aparece con esos cuatro valores cargados

#### Scenario: Apertura del formulario de creación sin tarea en edición
- **WHEN** el usuario abre el formulario de creación sin haber seleccionado una tarea
- **THEN** el formulario aparece con los valores iniciales por defecto y sin contenido residual de una edición anterior

#### Scenario: Cambio de tarea en edición sin cerrar el formulario
- **WHEN** el usuario edita una tarea y luego abre el formulario para una tarea distinta
- **THEN** el formulario muestra los valores de la nueva tarea y no conserva título, descripción, categoría, prioridad ni mensaje de validación de la tarea anterior

#### Scenario: Mensaje de validación que no persiste tras reabrir el formulario
- **WHEN** el usuario intenta guardar una tarea sin título, ve el mensaje de validación y luego cancela y vuelve a abrir el formulario
- **THEN** el formulario se presenta sin el mensaje de validación del intento anterior
