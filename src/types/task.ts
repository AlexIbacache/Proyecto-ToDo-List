export type TaskPriority = 'low' | 'medium' | 'high';

export type TaskCategory = 'general' | 'work' | 'personal' | 'urgent';

export interface Task {
  id: string;
  title: string;
  summary?: string; // short quoted summary shown on the card
  description?: string; // full task body (Notion-style notes)
  completed: boolean;
  category: TaskCategory;
  priority: TaskPriority;
  createdAt: string; // ISO 8601 string
  updatedAt: string; // ISO 8601 string
  order: number;
}

export type TaskFilter = 'all' | 'active' | 'completed';

export type TaskViewMode = 'grid' | 'list';

export interface TaskCreateInput {
  title: string;
  summary?: string;
  description?: string;
  category?: TaskCategory;
  priority?: TaskPriority;
}

export interface TaskUpdateInput {
  title?: string;
  summary?: string;
  description?: string;
  category?: TaskCategory;
  priority?: TaskPriority;
  completed?: boolean;
}

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

export const FILTER_LABELS: Record<TaskFilter, string> = {
  all: "Todas las tareas",
  active: "Activas",
  completed: "Completadas",
};
