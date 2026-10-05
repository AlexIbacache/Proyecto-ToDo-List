# TaskFlow

Aplicación de gestión de tareas (*to-do*) con interfaz mobile-first, temas claro/oscuro, paginación y persistencia local. Construida con **Next.js 16**, **React 19** y **Tailwind CSS 4**.

Nace como práctica profesional y evoluciona bajo un flujo **spec-driven** (OpenSpec): cada funcionalidad se especifica antes de implementarse.

## Stack

| Área | Tecnología |
| --- | --- |
| Framework | Next.js 16.3 (App Router) |
| UI | React 19 (React Compiler habilitado) |
| Lenguaje | TypeScript 5 |
| Estilos | Tailwind CSS 4 + CSS custom properties |
| Animaciones | Motion (Framer Motion) |
| Iconos | lucide-react |
| Estado | React Context + `useSyncExternalStore` |
| Persistencia | `localStorage` |
| Gestor de paquetes | pnpm 12.6 |

## Inicio rápido

Requisitos: Node.js 20+ y pnpm.

1. Instalar dependencias:

   ```bash
   pnpm install
   ```

2. Levantar el servidor de desarrollo:

   ```bash
   pnpm dev
   ```

3. Abrir [http://localhost:3000](http://localhost:3000).

En el primer arranque se siembran 5 tareas de ejemplo en `localStorage`.

## Funcionalidades

| Funcionalidad | Estado |
| --- | --- |
| CRUD de tareas (título, resumen, descripción, categoría, prioridad) | Implementado |
| Filtros por estado (Todas / Activas / Completadas) y por categoría | Implementado |
| Búsqueda por título, resumen, descripción y categoría | Implementado |
| Vista en grilla y en lista | Implementado |
| Paginación de 10 tareas por página | Implementado |
| Tema claro/oscuro con detección del sistema y persistencia | Implementado |
| Animaciones de entrada, modales y notificaciones | Implementado |
| Toasts en crear, editar, eliminar y completar | Implementado |
| Confirmación antes de eliminar | Implementado |
| Diseño responsive (sidebar colapsable en móvil) | Implementado |
| Reordenamiento por arrastrar y soltar | Pendiente (dependencias y campo `order` listos) |

## Estructura del proyecto

```
src/
├─ app/           # Layout raíz, providers y estilos globales
├─ components/
│  ├─ layout/     # AppLayout, Header, Sidebar
│  ├─ tasks/      # TaskWorkspace, TaskList, TaskCard, modales
│  └─ ui/         # Átomos: Button, Input, Modal, Toast, Pagination…
├─ context/       # TaskContext, ThemeContext, ToastContext
├─ services/      # taskStorage: persistencia y store externo
├─ types/         # Modelo Task y etiquetas
└─ utils/         # Formato de fechas relativas
openspec/         # Especificaciones y cambios (spec-driven)
assets/           # Maqueta de referencia (maqueta.png)
```

## Persistencia y modelo de datos

Claves usadas en `localStorage`:

| Clave | Contenido |
| --- | --- |
| `taskflow_tasks_v1` | Lista de tareas (`Task[]`) |
| `taskflow_theme` | Preferencia de tema (`dark` o `light`) |

Campos de una tarea:

| Campo | Tipo | Descripción |
| --- | --- | --- |
| `id` | `string` | Identificador único |
| `title` | `string` | Título (obligatorio) |
| `summary` | `string?` | Resumen corto para la tarjeta |
| `description` | `string?` | Cuerpo completo de la tarea |
| `completed` | `boolean` | Estado de completado |
| `category` | `'general' \| 'work' \| 'personal' \| 'urgent'` | Categoría |
| `priority` | `'low' \| 'medium' \| 'high'` | Prioridad |
| `createdAt` / `updatedAt` | `string` | Fechas ISO 8601 |
| `order` | `number` | Posición para el ordenamiento |

El acceso a datos pasa por `src/services/taskStorage.ts`, que expone un store externo compatible con `useSyncExternalStore` (snapshot cacheado e invalidado al persistir).

## Flujo de trabajo (OpenSpec)

- `openspec/specs/` — especificaciones vigentes del sistema.
- `openspec/changes/` — cambios propuestos; los completados se mueven a `changes/archive/`.
- `.opencode/skills/` y `.agents/` — skills y comandos que asisten el flujo (propose, apply, archive, sync).

## Scripts

| Comando | Acción |
| --- | --- |
| `pnpm dev` | Servidor de desarrollo |
| `pnpm build` | Build de producción |
| `pnpm start` | Servir el build de producción |
| `pnpm lint` | Análisis estático con ESLint |

## Notas para agentes de IA

Este proyecto usa una versión de Next.js cuyas APIs y convenciones pueden diferir de las conocidas. Antes de escribir código, leer la guía correspondiente en `node_modules/next/dist/docs/` (ver `AGENTS.md`).
