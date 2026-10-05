import { Task, TaskCreateInput, TaskUpdateInput } from "@/types/task";

const STORAGE_KEY = "taskflow_tasks_v1";

// The external-store contract requires a stable snapshot reference. `getAll()`
// parses fresh data on every call, so the snapshot is cached at module scope and
// invalidated only when `saveAll` persists.
const EMPTY_SNAPSHOT: Task[] = [];
// Distinct from EMPTY_SNAPSHOT on purpose. EMPTY_SNAPSHOT means "the client
// has not read storage yet" and drives the loading state; this one means "the
// read finished and yielded nothing readable", which must resolve to the empty
// state rather than keep the interface loading forever.
const UNREADABLE_SNAPSHOT: Task[] = [];
let snapshot: Task[] = EMPTY_SNAPSHOT;
let snapshotValid = false;
const subscribers = new Set<() => void>();

function publish(tasks: Task[]): void {
  snapshot = tasks;
  snapshotValid = true;
  subscribers.forEach((notify) => notify());
}

const INITIAL_SEED_TASKS: Task[] = [
  {
    id: "task-1",
    title: "Inspeccionar maqueta visual en assets/maqueta.png",
    summary: "Revisar paleta oscura, navegación lateral, barra de búsqueda y grilla de tarjetas.",
    description: "Analizar la paleta oscura, navegación lateral, barra superior de búsqueda y grilla de tarjetas.",
    completed: true,
    category: "work",
    priority: "high",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(),
    order: 0,
  },
  {
    id: "task-2",
    title: "Configurar proyecto Next.js con Tailwind CSS",
    description: "Estructurar el proyecto con TypeScript, tokens de tema oscuro y gestor de paquetes pnpm.",
    completed: true,
    category: "work",
    priority: "high",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
    order: 1,
  },
  {
    id: "task-3",
    title: "Construir biblioteca de componentes UI reutilizables",
    summary: "Button, Input, Modal, Checkbox y Badge con diseño atómico.",
    description: "Implementar componentes Button, Input, Modal, Checkbox y Badge siguiendo diseño atómico.",
    completed: false,
    category: "work",
    priority: "medium",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 10).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 10).toISOString(),
    order: 2,
  },
  {
    id: "task-4",
    title: "Implementar menú lateral responsivo mobile-first",
    description: "Asegurar que la navegación se repliegue en pantallas móviles (<768px) y sea fija en escritorio.",
    completed: false,
    category: "urgent",
    priority: "high",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
    order: 3,
  },
  {
    id: "task-5",
    title: "Planificar sincronización semanal del equipo",
    description: "Organizar revisión de arquitectura y demostración de la integración con OpenSpec.",
    completed: false,
    category: "personal",
    priority: "low",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    order: 4,
  },
];

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

// Deliberately a module function rather than a method: `useSyncExternalStore`
// invokes the snapshot getter as a bare function, so anything reached through
// `this` would be undefined at that point.
function readAll(): Task[] {
  if (snapshotValid) {
    return snapshot;
  }

  if (!isBrowser()) {
    return EMPTY_SNAPSHOT;
  }

  let result: Task[];
  let needsSeed = false;

  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      // Seed default tasks on first launch
      result = INITIAL_SEED_TASKS;
      needsSeed = true;
    } else {
      result = JSON.parse(data) as Task[];
    }
  } catch (err) {
    console.error("Failed to load tasks from localStorage:", err);
    return UNREADABLE_SNAPSHOT;
  }

  snapshot = result;
  snapshotValid = true;

  // Seed directly instead of through saveAll: this runs while the store is
  // being read during render, and notifying subscribers here would force a
  // state update in the middle of it.
  if (needsSeed) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(result));
    } catch (err) {
      console.error("Failed to seed tasks to localStorage:", err);
    }
  }

  return result;
}

function writeAll(tasks: Task[]): void {
  if (isBrowser()) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (err) {
      console.error("Failed to save tasks to localStorage:", err);
    }
  }
  publish(tasks);
}

export const TaskStorageRepository = {
  isBrowser,

  getAll: readAll,

  saveAll: writeAll,

  getSnapshot(): Task[] {
    return readAll();
  },

  getServerSnapshot(): Task[] {
    return EMPTY_SNAPSHOT;
  },

  subscribe(notify: () => void): () => void {
    subscribers.add(notify);
    return () => {
      subscribers.delete(notify);
    };
  },

  create(input: TaskCreateInput): Task {
    const tasks = this.getAll();
    const now = new Date().toISOString();
    const orders = tasks.map((t) => t.order ?? 0);
    const nextOrder = orders.length > 0 ? Math.max(...orders) + 1 : 0;
    const newTask: Task = {
      id: `task-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      title: input.title.trim(),
      summary: input.summary?.trim() || undefined,
      description: input.description?.trim() || undefined,
      category: input.category || "general",
      priority: input.priority || "medium",
      completed: false,
      createdAt: now,
      updatedAt: now,
      order: nextOrder,
    };

    const updated = [...tasks, newTask];
    this.saveAll(updated);
    return newTask;
  },

  update(id: string, input: TaskUpdateInput): Task | null {
    const tasks = this.getAll();
    const index = tasks.findIndex((t) => t.id === id);
    if (index === -1) return null;

    const existing = tasks[index];
    const updatedTask: Task = {
      ...existing,
      ...(input.title !== undefined && { title: input.title.trim() }),
      ...(input.summary !== undefined && { summary: input.summary.trim() || undefined }),
      ...(input.description !== undefined && { description: input.description.trim() || undefined }),
      ...(input.category !== undefined && { category: input.category }),
      ...(input.priority !== undefined && { priority: input.priority }),
      ...(input.completed !== undefined && { completed: input.completed }),
      updatedAt: new Date().toISOString(),
    };

    // A new array, never an in-place write. The snapshot is cached and is what
    // React compares by reference, so mutating it would publish the same
    // reference it already has and no re-render would happen.
    const updated = tasks.map((t, i) => (i === index ? updatedTask : t));
    this.saveAll(updated);
    return updatedTask;
  },

  delete(id: string): boolean {
    const tasks = this.getAll();
    const filtered = tasks.filter((t) => t.id !== id);
    if (filtered.length === tasks.length) return false;
    this.saveAll(filtered);
    return true;
  },

  toggle(id: string): Task | null {
    const tasks = this.getAll();
    const task = tasks.find((t) => t.id === id);
    if (!task) return null;
    return this.update(id, { completed: !task.completed });
  },
};
