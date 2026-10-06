"use client";

import React from "react";
import { GripVertical } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";

// The handle only forwards the props produced by the parent's `useSortable`
// call. Calling `useSortable` here would register a second node for the same
// sortable id and break the drag interaction, so the types are derived from
// the hook instead of re-declaring them.
type SortableHandleProps = Pick<
  ReturnType<typeof useSortable>,
  "attributes" | "listeners" | "setActivatorNodeRef"
>;

export interface DragHandleProps extends SortableHandleProps {
  label?: string;
  className?: string;
}

export function DragHandle({
  attributes,
  listeners,
  setActivatorNodeRef,
  label = "Reordenar tarea",
  className = "",
}: DragHandleProps) {
  return (
    <button
      type="button"
      ref={setActivatorNodeRef}
      {...attributes}
      {...listeners}
      aria-label={label}
      title={label}
      onClick={(e) => e.stopPropagation()}
      className={`inline-flex items-center justify-center p-2 md:p-1.5 min-h-11 min-w-11 md:min-h-0 md:min-w-0 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)] cursor-grab active:cursor-grabbing focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]/40 touch-none ${className}`}
    >
      <GripVertical className="w-4 h-4" />
    </button>
  );
}
