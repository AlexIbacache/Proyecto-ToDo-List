"use client";

import React from "react";
import {
  Pencil,
  Trash2,
  Briefcase,
  User,
  AlertCircle,
  Tag,
  Clock,
} from "lucide-react";
import {
  Task,
  TaskViewMode,
  CATEGORY_LABELS,
  PRIORITY_LABELS,
} from "@/types/task";
import { Checkbox } from "@/components/ui/Checkbox";
import { Badge } from "@/components/ui/Badge";
import { formatRelativeTime } from "@/utils/date";

export interface TaskCardProps {
  task: Task;
  viewMode?: TaskViewMode;
  onToggle: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
  onView: (task: Task) => void;
  dragHandle?: React.ReactNode;
}

export function TaskCard({
  task,
  viewMode = "grid",
  onToggle,
  onEdit,
  onDelete,
  onView,
  dragHandle,
}: TaskCardProps) {
  const getCategoryIcon = () => {
    switch (task.category) {
      case "work":
        return <Briefcase className="w-4 h-4 text-blue-400" />;
      case "personal":
        return <User className="w-4 h-4 text-emerald-400" />;
      case "urgent":
        return <AlertCircle className="w-4 h-4 text-rose-400" />;
      default:
        return <Tag className="w-4 h-4 text-slate-400" />;
    }
  };

  // The whole card opens the detail modal, so the interactive controls inside it
  // have to stop the click from bubbling up.
  const stopCardClick = (e: React.MouseEvent) => e.stopPropagation();

  if (viewMode === "list") {
    return (
      <div
        role="button"
        tabIndex={0}
        onClick={() => onView(task)}
        onKeyDown={(e) => {
          // Keys that bubble up from inner controls (drag handle, checkbox, action
          // buttons) must not open the detail view; only the focused card does.
          if (e.target !== e.currentTarget) return;
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onView(task);
          }
        }}
        aria-label={`Ver detalle de la tarea "${task.title}"`}
        className={`group flex flex-col sm:flex-row sm:items-center sm:justify-between p-3.5 rounded-xl border transition-all duration-150 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]/40 ${
          task.completed
            ? "bg-[var(--color-surface-completed)] border-[var(--color-border-completed)] opacity-70"
            : "bg-[var(--color-surface)] border-[var(--color-border)] hover:border-[var(--color-border)] hover:bg-[var(--color-surface-hover)]"
        }`}
      >
        <div className="flex items-start sm:items-center gap-3.5 min-w-0 sm:flex-1 sm:mr-4">
          {dragHandle ? (
            <span onClick={stopCardClick} className="shrink-0">
              {dragHandle}
            </span>
          ) : null}
          <span onClick={stopCardClick}>
            <Checkbox
              checked={task.completed}
              onChange={() => onToggle(task.id)}
              aria-label={`Marcar "${task.title}" como ${task.completed ? "pendiente" : "completada"}`}
            />
          </span>
          <div className="p-2 rounded-lg bg-[var(--color-bg-secondary)] border border-[var(--color-border)] shrink-0">
            {getCategoryIcon()}
          </div>
          <div className="min-w-0 flex-1">
            <h4
              className={`text-sm font-medium line-clamp-2 ${
                task.completed
                  ? "line-through text-[var(--color-text-muted)]"
                  : "text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)]"
              }`}
            >
              {task.title}
            </h4>
            {task.summary ? (
              <p className="text-xs italic text-[var(--color-text-secondary)] line-clamp-2 mt-0.5">
                &ldquo;{task.summary}&rdquo;
              </p>
            ) : task.description ? (
              <p className="text-xs text-[var(--color-text-secondary)] line-clamp-2 mt-0.5">
                {task.description}
              </p>
            ) : null}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 mt-2.5 sm:mt-0 sm:mr-4 sm:shrink-0 sm:flex-nowrap">
          <Badge category={task.category} size="sm">
            {CATEGORY_LABELS[task.category]}
          </Badge>
          <Badge priority={task.priority} size="sm">
            {PRIORITY_LABELS[task.priority]}
          </Badge>

          <span className="text-[11px] text-[var(--color-text-muted)] flex items-center gap-1 ml-auto sm:ml-0">
            <Clock className="w-3 h-3" />
            {formatRelativeTime(task.createdAt)}
          </span>

          <div className="flex items-center gap-1 opacity-80 sm:opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(task);
              }}
              className="p-1.5 rounded-lg text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)] transition-colors"
              title="Editar Tarea"
              aria-label={`Editar ${task.title}`}
            >
              <Pencil className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(task);
              }}
              className="p-1.5 rounded-lg text-[var(--color-text-secondary)] hover:text-[var(--color-danger)] hover:bg-red-500/10 transition-colors"
              title="Eliminar Tarea"
              aria-label={`Eliminar ${task.title}`}
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Grid layout matching card style in assets/maqueta.png
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onView(task)}
      onKeyDown={(e) => {
        // Keys that bubble up from inner controls (drag handle, checkbox, action
        // buttons) must not open the detail view; only the focused card does.
        if (e.target !== e.currentTarget) return;
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onView(task);
        }
      }}
      aria-label={`Ver detalle de la tarea "${task.title}"`}
      className={`group relative flex flex-col justify-between h-full p-4 rounded-2xl border transition-all duration-200 select-none cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]/40 ${
        task.completed
          ? "bg-[var(--color-surface-completed)] border-[var(--color-border-completed)] opacity-70"
          : "bg-[var(--color-surface)] border-[var(--color-border)] hover:border-[var(--color-border)] hover:bg-[var(--color-surface-hover)]"
      }`}
    >
      <div>
        {/* Top Header Row: Checkbox, Icon, Actions */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2.5">
            {dragHandle ? (
              <span onClick={stopCardClick} className="shrink-0">
                {dragHandle}
              </span>
            ) : null}
            <span onClick={stopCardClick}>
              <Checkbox
                checked={task.completed}
                onChange={() => onToggle(task.id)}
                aria-label={`Marcar "${task.title}" como ${task.completed ? "pendiente" : "completada"}`}
              />
            </span>
            <div className="p-2 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] group-hover:border-[var(--color-border)] transition-colors">
              {getCategoryIcon()}
            </div>
          </div>

          <div className="flex items-center gap-1 opacity-80 sm:opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(task);
              }}
              className="p-1.5 rounded-lg text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)] transition-colors"
              title="Editar Tarea"
              aria-label={`Editar ${task.title}`}
            >
              <Pencil className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(task);
              }}
              className="p-1.5 rounded-lg text-[var(--color-text-secondary)] hover:text-[var(--color-danger)] hover:bg-red-500/10 transition-colors"
              title="Eliminar Tarea"
              aria-label={`Eliminar ${task.title}`}
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Task Title & Details */}
        <h4
          className={`text-sm font-semibold leading-snug line-clamp-2 transition-colors ${
            task.completed
              ? "line-through text-[var(--color-text-muted)]"
              : "text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)]"
          }`}
        >
          {task.title}
        </h4>

        {task.summary ? (
          <p className="text-xs italic text-[var(--color-text-secondary)] line-clamp-2 mt-1.5 leading-relaxed">
            &ldquo;{task.summary}&rdquo;
          </p>
        ) : task.description ? (
          <p className="text-xs text-[var(--color-text-secondary)] line-clamp-2 mt-1.5 leading-relaxed">
            {task.description}
          </p>
        ) : null}
      </div>

      {/* Bottom Metadata: Badges & Timestamp */}
      <div className="flex items-center justify-between pt-3 mt-4 border-t border-[var(--color-border)]/60">
        <div className="flex items-center gap-1.5 flex-wrap">
          <Badge category={task.category} size="sm">
            {CATEGORY_LABELS[task.category]}
          </Badge>
          <Badge priority={task.priority} size="sm">
            {PRIORITY_LABELS[task.priority]}
          </Badge>
        </div>

        <span className="text-[11px] text-[var(--color-text-muted)] flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {formatRelativeTime(task.createdAt)}
        </span>
      </div>
    </div>
  );
}
