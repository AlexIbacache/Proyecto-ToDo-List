# Tareas: Legibilidad de Tareas en Vista Lista sobre Móvil

## 1. Estado de Contexto para el Diálogo de Detalle

- [x] 1.1 Agregar a `src/context/TaskContext.tsx` el estado `viewingTask: Task | null` con sus acciones `openViewModal(task)` y `closeViewModal()`, replicando el patrón de `editingTask` y `deletingTask`, y extender `TaskContextType` y el objeto `value` del provider. Verificar que `pnpm build` compile sin errores de tipos.

## 2. Componente `TaskDetailModal`

- [x] 2.1 Crear `src/components/tasks/TaskDetailModal.tsx` sobre el primitive `Modal` existente, presentando el título completo de la tarea, la descripción completa cuando exista, y sus metadatos de categoría, prioridad y marca de tiempo relativa. Verificar que el título del diálogo y los textos de los metadatos se resuelvan a través de `CATEGORY_LABELS` y `PRIORITY_LABELS` y del formateador de fechas existente, sin cadenas de texto nuevas en inglés.
- [x] 2.2 Omitir la sección de descripción cuando la tarea no la posea, sin dejar un espacio vacío ni un encabezado huérfano. Verificar en el navegador que una tarea sin descripción no muestra la sección.
- [x] 2.3 Confirmar que el diálogo respeta las tres vías de cierre que ya ofrece `Modal`: botón de cierre, tecla Escape y clic sobre el fondo. Verificar que al cerrar, la tarea permanece sin modificaciones y que `openViewModal` vuelve a habilitar la fila.

## 3. Montaje del Diálogo en el Espacio de Trabajo

- [x] 3.1 Montar `TaskDetailModal` en `src/components/tasks/TaskWorkspace.tsx` siguiendo el mismo patrón que los diálogos de creación, edición y eliminación ya presentes, alimentándolo desde `viewingTask` y sus acciones. Verificar que `pnpm build` compile sin errores de tipos.

## 4. Reflujo Responsive de la Fila

- [x] 4.1 Eliminar el `shrink-0` del clúster derecho de la rama de lista en `src/components/tasks/TaskCard.tsx` y reestructurar la fila para que, por debajo de `sm`, los metadatos se reubiquen en una línea secundaria y el título y la descripción ocupen el ancho completo del contenedor. Verificar que a 375 px de ancho el título y la descripción son legibles.
- [x] 4.2 Cambiar `truncate` por `line-clamp-2` en el título y en la descripción de la rama de lista, alineándolos con el criterio de recorte que ya usa la tarjeta del modo grilla. Verificar que un título largo se recorta por número de líneas y sigue siendo identificable.
- [x] 4.3 Reubicar la marca de tiempo relativa dentro de la nueva línea de metadatos y eliminar su ocultamiento por debajo de `sm`, de modo que la fecha de creación sea visible también en móvil. Verificar que la fecha aparece en la fila en un viewport de 375 px.
- [x] 4.4 Confirmar que la disposición en viewports de escritorio no cambia respecto del diseño actual: metadatos en línea, badges a la derecha y fecha junto a ellos. Verificar por comparación visual a 1024 px de ancho que la fila en modo lista es idéntica a la previa al cambio.

## 5. Fila Activable y Accesibilidad

- [x] 5.1 Exponer la fila del modo lista como activable mediante `role="button"` y `tabIndex={0}`, con un manejador de teclado que responda a Enter y Espacio para abrir el diálogo de detalle, y una etiqueta accesible en español que incluya el título de la tarea e indique que su activación abre el detalle. Verificar con navegación por teclado que la fila es enfocable y se abre con Enter y con Espacio.
- [x] 5.2 Detener la propagación del evento en los manejadores del checkbox y de los botones de edición y eliminación, de modo que activar cualquiera de esos controles no abra el diálogo de detalle. Verificar que editar y eliminar desde la fila en móvil abren sus respectivos diálogos y no el de detalle.
- [x] 5.3 Confirmar que en una tarea marcada como completada el título y la descripción permanecen legibles y se distinguen visualmente como completados. Verificar en el navegador con una tarea completada en modo lista y viewport de 375 px.

## 6. Verificación Integral

- [x] 6.1 Ejecutar `pnpm build` y confirmar que el proyecto compila sin errores ni advertencias de tipos. Salida observada: `✓ Compiled successfully in 1630ms`, `Finished TypeScript in 2.5s`, sin errores ni advertencias. Smoke test adicional con `pnpm dev`: `HTTP 200`, 23695 bytes de HTML servido, `lang="es"` y metadatos presentes.
- [x] 6.2 Recorrer en el navegador, con viewport móvil, los flujos de la vista lista: listado, activación del diálogo de detalle, edición, eliminación y marcado como completada. Confirmar que el texto de cada tarea es legible en el listado y que el diálogo muestra el contenido íntegro. Verificación observada por la persona usuaria en navegador: los botones de editar y eliminar funcionan correctamente, el modal de detalle abre y opera bien, y los datos se leen con claridad en modo lista.
- [x] 6.3 Recorrer en el navegador, con viewport de escritorio, la grilla y la vista lista, y confirmar que ninguna de las dos presenta regresiones visuales respecto del diseño actual.

## Registro de Verificación

| Tarea | Verificador | Resultado |
| --- | --- | --- |
| 1.1, 2.1, 3.1, 6.1 | Agente | `pnpm build` limpio + smoke test `pnpm dev` con HTTP 200 |
| 4.1, 4.2, 5.2, 6.2 | Persona usuaria | Botones, modal de detalle y legibilidad en modo lista confirmados en navegador |
| 2.2, 2.3, 4.3, 4.4, 5.1, 5.3, 6.3 | Persona usuaria | Confirmación explícita de los siete puntos, incluidos teclado, tarea sin descripción, tres vías de cierre, fecha en móvil, tarea completada y ausencia de regresiones en escritorio |

Las verificaciones de navegador fueron realizadas por la persona usuaria. Las de compilación y tipos, por el agente.

### Desviaciones respecto de la redacción original de las tareas

- **4.1** se implementó como `sm:shrink-0` en lugar de eliminar `shrink-0`. Eliminarlo por completo comprimía los badges en escritorio y contradecía el requisito de la spec de conservar la disposición actual por encima de `sm`. La forma acotada satisface ambos requisitos: en móvil no hay competencia por el ancho.
- Se agregó `flex-wrap` a la línea de metadatos como red de seguridad para viewports de 280 a 320 px con etiquetas largas. No altera el resultado en escritorio, donde la línea ya cabe.

### Fuera de alcance, observado durante la implementación

- `pnpm lint` ya estaba en rojo antes de este change: dos errores `react-hooks/set-state-in-effect` en `src/context/TaskContext.tsx:73` y `src/components/tasks/TaskFormModal.tsx:36-39`, y un aviso por `variant` sin usar en `src/components/ui/Badge.tsx:15`. Ninguno fue introducido por este change y ninguno fue corregido.
- `src/components/ui/Modal.tsx` no implementa focus trap. Limitación preexistente, conservada por reutilizar el primitive sin modificarlo.
