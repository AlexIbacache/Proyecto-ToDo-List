"use client";

import React from "react";
import { Plus } from "lucide-react";
import { useTasks } from "@/context/TaskContext";
import { TaskCard } from "./TaskCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { CATEGORY_LABELS, TaskCategory } from "@/types/task";

export function TaskList() {
  const {
    filteredTasks,
    isLoading,
    viewMode,
    filter,
    categoryFilter,
    searchQuery,
    setSearchQuery,
    setCategoryFilter,
    toggleTask,
    openEditModal,
    openDeleteModal,
    openCreateModal,
    openViewModal,
  } = useTasks();

  const getHeadingTitle = () => {
    if (categoryFilter && categoryFilter in CATEGORY_LABELS) {
      return `Tareas de ${CATEGORY_LABELS[categoryFilter as TaskCategory]}`;
    }
    switch (filter) {
      case "active":
        return "Tareas Activas";
      case "completed":
        return "Tareas Completadas";
      default:
        return "Todas las tareas";
    }
  };

  const getBreadcrumbLabel = () => {
    if (categoryFilter && categoryFilter in CATEGORY_LABELS) {
      return CATEGORY_LABELS[categoryFilter as TaskCategory];
    }
    switch (filter) {
      case "active":
        return "Activas";
      case "completed":
        return "Completadas";
      default:
        return "Todas";
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Workspace Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#232d3f]">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#8b9bb4] mb-1">
            <span>Área de trabajo</span>
            <span>/</span>
            <span className="text-[#cbd5e1] font-medium">
              {getBreadcrumbLabel()}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-[#f1f5f9] tracking-tight">
              {getHeadingTitle()}
            </h2>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#18202e] border border-[#232d3f] text-[#8b9bb4]">
              {filteredTasks.length} {filteredTasks.length === 1 ? "tarea" : "tareas"}
            </span>
          </div>
        </div>

        {/* Quick Mobile Action */}
        <div className="sm:hidden flex items-center gap-2">
          <Button
            variant="primary"
            size="sm"
            className="w-full justify-center"
            icon={<Plus className="w-4 h-4" />}
            onClick={openCreateModal}
          >
            Crear Tarea
          </Button>
        </div>
      </div>

      {/* Main Task Collection */}
      {isLoading ? (
        <div
          className="flex flex-col items-center justify-center gap-2 py-16 text-center"
          role="status"
          aria-live="polite"
          aria-busy="true"
        >
          <span className="text-sm text-[#8b9bb4]">Cargando tareas...</span>
        </div>
      ) : filteredTasks.length === 0 ? (
        <EmptyState
          type={
            searchQuery
              ? "search"
              : filter === "completed"
              ? "completed"
              : "empty"
          }
          searchQuery={searchQuery}
          onAction={
            searchQuery || categoryFilter
              ? () => {
                  setSearchQuery("");
                  setCategoryFilter(null);
                }
              : openCreateModal
          }
        />
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              viewMode="grid"
              onToggle={toggleTask}
              onEdit={openEditModal}
              onDelete={openDeleteModal}
              onView={openViewModal}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col space-y-2.5">
          {filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              viewMode="list"
              onToggle={toggleTask}
              onEdit={openEditModal}
              onDelete={openDeleteModal}
              onView={openViewModal}
            />
          ))}
        </div>
      )}
    </div>
  );
}
