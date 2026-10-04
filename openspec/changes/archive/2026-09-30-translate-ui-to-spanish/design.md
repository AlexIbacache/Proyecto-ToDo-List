# Diseño Técnico: Localización y Traducción al Español

## Context

La aplicación cuenta con su arquitectura e interfaz completamente implementadas en Next.js, pero todos los textos visibles y etiquetas están redactados en inglés. Esta propuesta aborda la traducción completa de la interfaz de usuario al español, manteniendo intacta la integridad de los datos persistidos en `localStorage`.

Ver [proposal.md](file:///c:/Users/Test/Desktop/Practica%20profesional/ProyectoOpenspec/openspec/changes/translate-ui-to-spanish/proposal.md) para el alcance y justificación, y [specs/ui-localization/spec.md](file:///c:/Users/Test/Desktop/Practica%20profesional/ProyectoOpenspec/openspec/changes/translate-ui-to-spanish/specs/ui-localization/spec.md) para los requerimientos.

## Goals / Non-Goals

**Objetivos:**
- Traducir al 100% todos los textos visibles, etiquetas, botones, modales, formularios, validaciones y estados vacíos al español.
- Mantener compatibilidad hacia atrás con las tareas ya guardadas en `localStorage` (conservando las claves internas de modelo `'work' | 'personal' | 'urgent' | 'general'` y `'low' | 'medium' | 'high'`).
- Localizar las fechas relativas en `src/utils/date.ts`.
- Actualizar el atributo de idioma HTML a `lang="es"` en `layout.tsx`.

**No Objetivos:**
- Sistema complejo de internacionalización (i18n con múltiples idiomas simultáneos dinámicos); la aplicación adopta el español como su idioma principal nativo.

## Decisions

### 1. Mapeo de Etiquetas Presentacionales vs Claves de Modelo
- **Decisión**: Mantener los valores internos tipados en `src/types/task.ts` (`TaskPriority = 'low' | 'medium' | 'high'`, `TaskCategory = 'work' | 'personal' | 'urgent' | 'general'`) y crear funciones/mapeos de visualización en español:
  ```typescript
  export const CATEGORY_LABELS: Record<TaskCategory, string> = {
    work: "Trabajo",
    personal: "Personal",
    urgent: "Urgente",
    general: "General",
  };

  export const PRIORITY_LABELS: Record<TaskPriority, string> = {
    low: "Baja",
    medium: "Media",
    high: "Alta",
  };
  ```
- **Justificación**: Evita que las tareas previamente guardadas en el navegador de los usuarios queden inválidas o desfasadas.

### 2. Formato de Fechas Relativas en Español
- **Decisión**: Modificar `src/utils/date.ts` para retornar cadenas en español:
  - < 60s: "Hace un momento"
  - < 1h: `Hace ${minutes}m`
  - < 24h: `Hace ${hours}h`
  - < 30d: `Hace ${days}d`
  - > 30d: Fecha formateada en `es-ES` / formato corto.

### 3. Actualización de Semilla de Tareas Iniciales
- **Decisión**: Actualizar los objetos de ejemplo en `TaskStorageRepository` para que los nuevos usuarios o quienes limpien almacenamiento vean ejemplos en español relacionados con la gestión de tareas.

## Risks / Trade-offs

- **[Riesgo] Claves de categoría en filtros no coincidan**  
  → *Mitigación*: La lógica de filtrado continúa utilizando las claves técnicas (`'work'`, `'urgent'`, etc.), modificando únicamente las etiquetas visuales de los botones.
