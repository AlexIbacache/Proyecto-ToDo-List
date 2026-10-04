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
}

export function TaskCard({
  task,
  viewMode = "grid",
  onToggle,
  onEdit,
  onDelete,
  onView,
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
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onView(task);
          }
        }}
        aria-label={`Ver detalle de la tarea "${task.title}"`}
        className={`group flex flex-col sm:flex-row sm:items-center sm:justify-between p-3.5 rounded-xl border transition-all duration-150 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6]/40 ${
          task.completed
            ? "bg-[#141a26]/60 border-[#1e2636] opacity-75"
            : "bg-[#18202e] border-[#232d3f] hover:border-[#334155] hover:bg-[#1c2536]"
        }`}
      >
        <div className="flex items-start sm:items-center gap-3.5 min-w-0 sm:flex-1 sm:mr-4">
          <span onClick={stopCardClick}>
            <Checkbox
              checked={task.completed}
              onChange={() => onToggle(task.id)}
              aria-label={`Marcar "${task.title}" como ${task.completed ? "pendiente" : "completada"}`}
            />
          </span>
          <div className="p-2 rounded-lg bg-[#141a26] border border-[#232d3f] shrink-0">
            {getCategoryIcon()}
          </div>
          <div className="min-w-0 flex-1">
            <h4
              className={`text-sm font-medium line-clamp-2 ${
                task.completed
                  ? "line-through text-[#64748b]"
                  : "text-[#f1f5f9] group-hover:text-blue-400"
              }`}
            >
              {task.title}
            </h4>
            {task.description && (
              <p className="text-xs text-[#8b9bb4] line-clamp-2 mt-0.5">
                {task.description}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 mt-2.5 sm:mt-0 sm:mr-4 sm:shrink-0 sm:flex-nowrap">
          <Badge category={task.category} size="sm">
            {CATEGORY_LABELS[task.category]}
          </Badge>
          <Badge priority={task.priority} size="sm">
            {PRIORITY_LABELS[task.priority]}
          </Badge>

          <span className="text-[11px] text-[#64748b] flex items-center gap-1 ml-auto sm:ml-0">
            <Clock className="w-3 h-3" />
            {formatRelativeTime(task.createdAt)}
          </span>

          <div className="flex items-center gap-1 opacity-80 sm:opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(task);
              }}
              className="p-1.5 rounded-lg text-[#8b9bb4] hover:text-[#f1f5f9] hover:bg-[#232d3f] transition-colors"
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
              className="p-1.5 rounded-lg text-[#8b9bb4] hover:text-red-400 hover:bg-red-500/10 transition-colors"
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
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onView(task);
        }
      }}
      aria-label={`Ver detalle de la tarea "${task.title}"`}
      className={`group relative flex flex-col justify-between p-4 rounded-2xl border transition-all duration-200 select-none cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6]/40 ${
        task.completed
          ? "bg-[#141a26]/60 border-[#1c2433] opacity-75"
          : "bg-[#18202e] border-[#232d3f] hover:border-[#334155] hover:bg-[#1c2536] hover:shadow-xl hover:shadow-black/40"
      }`}
    >
      <div>
        {/* Top Header Row: Checkbox, Icon, Actions */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2.5">
            <span onClick={stopCardClick}>
              <Checkbox
                checked={task.completed}
                onChange={() => onToggle(task.id)}
                aria-label={`Marcar "${task.title}" como ${task.completed ? "pendiente" : "completada"}`}
              />
            </span>
            <div className="p-2 rounded-xl bg-[#141a26] border border-[#232d3f] group-hover:border-[#334155] transition-colors">
              {getCategoryIcon()}
            </div>
          </div>

          <div className="flex items-center gap-1 opacity-80 sm:opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(task);
              }}
              className="p-1.5 rounded-lg text-[#8b9bb4] hover:text-[#f1f5f9] hover:bg-[#232d3f] transition-colors"
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
              className="p-1.5 rounded-lg text-[#8b9bb4] hover:text-red-400 hover:bg-red-500/10 transition-colors"
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
              ? "line-through text-[#64748b]"
              : "text-[#f1f5f9] group-hover:text-blue-400"
          }`}
        >
          {task.title}
        </h4>

        {task.description && (
          <p className="text-xs text-[#8b9bb4] line-clamp-2 mt-1.5 leading-relaxed">
            {task.description}
          </p>
        )}
      </div>

      {/* Bottom Metadata: Badges & Timestamp */}
      <div className="flex items-center justify-between pt-3 mt-4 border-t border-[#232d3f]/60">
        <div className="flex items-center gap-1.5 flex-wrap">
          <Badge category={task.category} size="sm">
            {CATEGORY_LABELS[task.category]}
          </Badge>
          <Badge priority={task.priority} size="sm">
            {PRIORITY_LABELS[task.priority]}
          </Badge>
        </div>

        <span className="text-[11px] text-[#64748b] flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {formatRelativeTime(task.createdAt)}
        </span>
      </div>
    </div>
  );
}
