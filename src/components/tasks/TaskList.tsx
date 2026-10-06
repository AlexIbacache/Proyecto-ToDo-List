"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  TouchSensor,
  KeyboardSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import type { Modifier, DragStartEvent, DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  rectSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { useTasks } from "@/context/TaskContext";
import { TaskCard } from "./TaskCard";
import { SortableTaskItem } from "./SortableTaskItem";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { Pagination } from "@/components/ui/Pagination";
import { CATEGORY_LABELS, TaskCategory } from "@/types/task";

// @dnd-kit/modifiers is not a dependency; limiting the drag to the vertical
// axis is a one-line transform override, so it stays local.
const restrictToVerticalAxis: Modifier = ({ transform }) => ({ ...transform, x: 0 });

const noop = () => undefined;

export function TaskList() {
  const shouldReduceMotion = useReducedMotion();
  const {
    filteredTasks,
    paginatedTasks,
    currentPage,
    totalPages,
    setCurrentPage,
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
    reorderTasks,
  } = useTasks();

  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const taskIds = paginatedTasks.map((t) => t.id);
  const activeTask = activeId ? paginatedTasks.find((t) => t.id === activeId) ?? null : null;

  const handleDragStart = (event: DragStartEvent) => setActiveId(String(event.active.id));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);
    if (over && String(active.id) !== String(over.id)) {
      reorderTasks(String(active.id), String(over.id));
    }
  };

  const handleDragCancel = () => setActiveId(null);

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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[var(--color-border)]">
        <div>
          <div className="flex items-center gap-2 text-xs text-[var(--color-text-secondary)] mb-1">
            <span>Área de trabajo</span>
            <span>/</span>
            <span className="text-[var(--color-text-primary)] font-medium">
              {getBreadcrumbLabel()}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-[var(--color-text-primary)] tracking-tight">
              {getHeadingTitle()}
            </h2>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-secondary)]">
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

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        modifiers={viewMode === "list" ? [restrictToVerticalAxis] : undefined}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        {/* Main Task Collection */}
        {isLoading ? (
          <div
            className="flex flex-col items-center justify-center gap-2 py-16 text-center"
            role="status"
            aria-live="polite"
            aria-busy="true"
          >
            <span className="text-sm text-[var(--color-text-secondary)]">Cargando tareas...</span>
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
          <SortableContext items={taskIds} strategy={rectSortingStrategy}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              <AnimatePresence initial={false}>
                {paginatedTasks.map((task) => (
                  <motion.div
                    key={task.id}
                    className="h-full"
                    initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.95 }}
                    whileHover={shouldReduceMotion ? undefined : { y: -3 }}
                    transition={{ duration: shouldReduceMotion ? 0 : 0.2, ease: "easeOut" }}
                  >
                    <SortableTaskItem
                      task={task}
                      viewMode="grid"
                      onToggle={toggleTask}
                      onEdit={openEditModal}
                      onDelete={openDeleteModal}
                      onView={openViewModal}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </SortableContext>
        ) : (
          <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
            <div className="flex flex-col space-y-2.5">
              <AnimatePresence initial={false}>
                {paginatedTasks.map((task) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    transition={{ duration: shouldReduceMotion ? 0 : 0.2, ease: "easeOut" }}
                  >
                    <SortableTaskItem
                      task={task}
                      viewMode="list"
                      onToggle={toggleTask}
                      onEdit={openEditModal}
                      onDelete={openDeleteModal}
                      onView={openViewModal}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </SortableContext>
        )}

        <DragOverlay dropAnimation={shouldReduceMotion ? null : undefined}>
          {activeTask ? (
            <div className="w-[320px] max-w-[85vw] rotate-1 scale-[1.02] shadow-2xl shadow-black/30 rounded-2xl">
              <TaskCard
                task={activeTask}
                viewMode={viewMode}
                onToggle={noop}
                onEdit={noop}
                onDelete={noop}
                onView={noop}
              />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
