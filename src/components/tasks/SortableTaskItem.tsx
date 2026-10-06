"use client";

import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Task, TaskViewMode } from "@/types/task";
import { TaskCard } from "./TaskCard";
import { DragHandle } from "@/components/ui/DragHandle";

export interface SortableTaskItemProps {
  task: Task;
  viewMode: TaskViewMode;
  onToggle: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
  onView: (task: Task) => void;
}

export function SortableTaskItem({
  task,
  viewMode,
  onToggle,
  onEdit,
  onDelete,
  onView,
}: SortableTaskItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.4 : undefined,
      }}
      className={viewMode === "grid" ? "h-full" : undefined}
    >
      <TaskCard
        task={task}
        viewMode={viewMode}
        onToggle={onToggle}
        onEdit={onEdit}
        onDelete={onDelete}
        onView={onView}
        dragHandle={
          <DragHandle
            attributes={attributes}
            listeners={listeners}
            setActivatorNodeRef={setActivatorNodeRef}
          />
        }
      />
    </div>
  );
}
