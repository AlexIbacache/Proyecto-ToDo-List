"use client";

import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useSyncExternalStore,
} from "react";
import {
  Task,
  TaskCreateInput,
  TaskFilter,
  TaskUpdateInput,
  TaskViewMode,
} from "@/types/task";
import { TaskStorageRepository } from "@/services/taskStorage";

interface TaskContextType {
  tasks: Task[];
  filteredTasks: Task[];
  isLoading: boolean;
  filter: TaskFilter;
  categoryFilter: string | null;
  searchQuery: string;
  viewMode: TaskViewMode;
  isCreateModalOpen: boolean;
  editingTask: Task | null;
  deletingTask: Task | null;
  viewingTask: Task | null;
  isMobileSidebarOpen: boolean;
  stats: {
    total: number;
    active: number;
    completed: number;
    categories: Record<string, number>;
  };
  // Actions
  createTask: (input: TaskCreateInput) => void;
  updateTask: (id: string, input: TaskUpdateInput) => void;
  deleteTask: (id: string) => void;
  toggleTask: (id: string) => void;
  setFilter: (filter: TaskFilter) => void;
  setCategoryFilter: (category: string | null) => void;
  setSearchQuery: (query: string) => void;
  setViewMode: (mode: TaskViewMode) => void;
  openCreateModal: () => void;
  closeCreateModal: () => void;
  openEditModal: (task: Task) => void;
  closeEditModal: () => void;
  openDeleteModal: (task: Task) => void;
  closeDeleteModal: () => void;
  openViewModal: (task: Task) => void;
  closeViewModal: () => void;
  toggleMobileSidebar: () => void;
  closeMobileSidebar: () => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: React.ReactNode }) {
  // The snapshot getters are wrapped because `useSyncExternalStore` invokes
  // them as bare functions: passing the method references directly would leave
  // `this` undefined inside `getSnapshot`. `subscribe` is passed by reference
  // because it does not use `this`, and its identity must stay stable or React
  // would tear down and rebuild the subscription on every render.
  const tasks = useSyncExternalStore(
    TaskStorageRepository.subscribe,
    () => TaskStorageRepository.getSnapshot(),
    () => TaskStorageRepository.getServerSnapshot()
  );

  const [filter, setFilter] = useState<TaskFilter>("all");
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<TaskViewMode>("grid");

  // Dialog and UI state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [deletingTask, setDeletingTask] = useState<Task | null>(null);
  const [viewingTask, setViewingTask] = useState<Task | null>(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Hydration has not finished while the render is still reading the server
  // snapshot. Once the client snapshot is available the tasks are already on
  // screen, so there is no intermediate empty state to represent.
  const isLoading = tasks === TaskStorageRepository.getServerSnapshot();

  const createTask = (input: TaskCreateInput) => {
    TaskStorageRepository.create(input);
    setIsCreateModalOpen(false);
  };

  const updateTask = (id: string, input: TaskUpdateInput) => {
    TaskStorageRepository.update(id, input);
    setEditingTask(null);
  };

  const deleteTask = (id: string) => {
    TaskStorageRepository.delete(id);
    setDeletingTask(null);
  };

  const toggleTask = (id: string) => {
    TaskStorageRepository.toggle(id);
  };

  // Stats calculation
  const stats = useMemo(() => {
    const total = tasks.length;
    let active = 0;
    let completed = 0;
    const categories: Record<string, number> = {
      work: 0,
      personal: 0,
      urgent: 0,
      general: 0,
    };

    tasks.forEach((t) => {
      if (t.completed) completed++;
      else active++;

      if (t.category) {
        categories[t.category] = (categories[t.category] || 0) + 1;
      }
    });

    return { total, active, completed, categories };
  }, [tasks]);

  // Filtered tasks computation
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      // Status filter
      if (filter === "active" && task.completed) return false;
      if (filter === "completed" && !task.completed) return false;

      // Category filter
      if (categoryFilter && task.category !== categoryFilter) return false;

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = task.title.toLowerCase().includes(query);
        const matchesDesc = task.description?.toLowerCase().includes(query) ?? false;
        const matchesCategory = task.category.toLowerCase().includes(query);
        if (!matchesTitle && !matchesDesc && !matchesCategory) {
          return false;
        }
      }

      return true;
    });
  }, [tasks, filter, categoryFilter, searchQuery]);

  const value: TaskContextType = {
    tasks,
    filteredTasks,
    isLoading,
    filter,
    categoryFilter,
    searchQuery,
    viewMode,
    isCreateModalOpen,
    editingTask,
    deletingTask,
    viewingTask,
    isMobileSidebarOpen,
    stats,
    createTask,
    updateTask,
    deleteTask,
    toggleTask,
    setFilter,
    setCategoryFilter,
    setSearchQuery,
    setViewMode,
    openCreateModal: () => setIsCreateModalOpen(true),
    closeCreateModal: () => setIsCreateModalOpen(false),
    openEditModal: (task: Task) => setEditingTask(task),
    closeEditModal: () => setEditingTask(null),
    openDeleteModal: (task: Task) => setDeletingTask(task),
    closeDeleteModal: () => setDeletingTask(null),
    openViewModal: (task: Task) => setViewingTask(task),
    closeViewModal: () => setViewingTask(null),
    toggleMobileSidebar: () => setIsMobileSidebarOpen((prev) => !prev),
    closeMobileSidebar: () => setIsMobileSidebarOpen(false),
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
}
