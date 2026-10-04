# Diseño Técnico: Aplicación de Lista de Tareas (Todo List)

## Context

El proyecto consiste en una aplicación desarrollada desde cero con Next.js orientada a la gestión de tareas mediante operaciones CRUD. La referencia arquitectónica y estética proviene de `assets/maqueta.png`, que define una interfaz oscura en tonalidades slate/navy, navegación lateral, barra superior de búsqueda y tarjetas dispuestas en grilla.

El gestor de paquetes del proyecto es `pnpm` (versión 12+).

Consultar [proposal.md](file:///c:/Users/Test/Desktop/Practica%20profesional/ProyectoOpenspec/openspec/changes/todo-app/proposal.md) para el contexto y justificación, y [specs/todo-management/spec.md](file:///c:/Users/Test/Desktop/Practica%20profesional/ProyectoOpenspec/openspec/changes/todo-app/specs/todo-management/spec.md) para los requerimientos funcionales.

## Goals / Non-Goals

**Objetivos:**
- Suministrar una aplicación CRUD responsiva con prioridad mobile-first para crear, listar, editar, eliminar y completar tareas.
- Replicar fielmente el lenguaje visual de `assets/maqueta.png` (paleta oscura, tarjetas redondeadas, navegación lateral y buscador superior).
- Implementar una jerarquía de componentes reutilizables bajo el patrón presentacional y de contenedores.
- Garantizar persistencia local confiable con sincronización e hidratación segura en Next.js.
- Brindar microinteracciones y accesibilidad por teclado y lectores de pantalla.

**No Objetivos:**
- Autenticación remota de usuarios o base de datos en la nube en esta etapa (la persistencia se aísla mediante una interfaz de repositorio para permitir futuras integraciones backend).
- Notificaciones push o recordatorios programados en servidor.

## Decisions

### 1. Framework y Base: Next.js (App Router) + TypeScript
- **Justificación**: El App Router de Next.js ofrece soporte moderno de React, tipado estricto con TypeScript y separación clara entre componentes de cliente y servidor.
- **Alternativas consideradas**: SPA clásica con Vite (se descartó ante el requisito explícito de Next.js).

### 2. Sistema de Diseño y Estilos: Tailwind CSS con Tokens de la Maqueta
- **Paleta de Colores** (extraída de `assets/maqueta.png`):
  - Fondo Principal: `#10141d` (azul noche oscuro)
  - Superficie / Tarjetas: `#18202e`
  - Estado Hover en Tarjetas: `#222c3f`
  - Acento Activo: `#2563eb` / `#3b82f6` (azul distintivo presente en el icono de la maqueta y pestañas activas)
  - Texto Principal: `#f1f5f9` (blanco slate de alto contraste)
  - Texto Secundario: `#8b9bb4` (gris slate para fechas y metadatos)
  - Bordes: `#232d3f`
- **Puntos de quiebre responsivos**: Mobile-first (`sm: 640px`, `md: 768px`, `lg: 1024px`, `xl: 1280px`).
- **Iconografía**: `lucide-react` para iconos vectoriales consistentes y livianos.

### 3. Gestión de Estado y Persistencia
- **Estado**: Contexto de React + hook personalizado (`TaskContext` / `useTasks`) junto al patrón repositorio (`TaskStorageRepository`).
- **Persistencia**: `localStorage` en el navegador con serialización JSON.
- **Seguridad en Hidratación**: Carga diferida en cliente (`useEffect`) para evitar discordancias entre el renderizado de servidor y cliente.
- **Modelo de Datos**:
  ```typescript
  export type TaskPriority = 'low' | 'medium' | 'high';
  export type TaskCategory = 'general' | 'work' | 'personal' | 'urgent';

  export interface Task {
    id: string;
    title: string;
    description?: string;
    completed: boolean;
    category: TaskCategory;
    priority: TaskPriority;
    createdAt: string; // ISO 8601
    updatedAt: string; // ISO 8601
  }

  export type TaskFilter = 'all' | 'active' | 'completed';
  ```

### 4. Arquitectura de Componentes
- **Estructura de Layout (`AppLayout`)**:
  - `Sidebar`: Barra lateral de navegación con filtros (Todas, Activas, Completadas), categorías y botón "+ Nueva Tarea". En móviles (<768px) opera como menú deslizante.
  - `Header`: Barra superior con campo de búsqueda en tiempo real, alternador de vista (grilla / lista) y acciones rápidas.
  - `TaskWorkspace`: Área principal de contenido donde se renderiza la lista y los diálogos modales.
- **Componentes Presentacionales**:
  - `TaskCard`: Tarjeta que reproduce el estilo visual de la maqueta, con casilla de verificación, título, etiquetas, fecha y acciones (editar/eliminar).
  - `TaskFormModal`: Diálogo modal para la creación y edición de tareas con validación.
  - `DeleteConfirmDialog`: Diálogo de resguardo previo a eliminar.
  - `EmptyState`: Mensaje visual cuando no hay tareas o no hay coincidencias de búsqueda.
  - Primitivas: `Button`, `Input`, `Textarea`, `Checkbox`, `Badge`, `Modal`.

## Risks / Trade-offs

- **[Riesgo] Discrepancia de hidratación SSR con `localStorage`**  
  → *Mitigación*: Se inicializa con estado controlado y la carga desde `localStorage` se efectúa tras montar el componente en cliente.
- **[Riesgo] Usabilidad en pantallas táctiles móviles**  
  → *Mitigación*: Barra lateral móvil con superposición de fondo, foco accesible y cierre mediante tecla Escape.
- **[Riesgo] Eliminación accidental de tareas**  
  → *Mitigación*: Inclusión de diálogo de confirmación previo al borrado permanente.
