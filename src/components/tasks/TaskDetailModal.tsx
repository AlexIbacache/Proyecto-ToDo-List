"use client";

import React from "react";
import { Clock } from "lucide-react";
import { Task, CATEGORY_LABELS, PRIORITY_LABELS } from "@/types/task";
import { Modal } from "@/components/ui/Modal";
import { Badge } from "@/components/ui/Badge";
import { formatRelativeTime } from "@/utils/date";

export interface TaskDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task | null;
}

export function TaskDetailModal({ isOpen, onClose, task }: TaskDetailModalProps) {
  if (!task) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={task.title} maxWidth="lg">
      <div className="space-y-4">
        {task.summary && (
          <p className="text-sm italic text-[var(--color-text-secondary)] border-l-2 border-[var(--color-accent)] pl-3">
            &ldquo;{task.summary}&rdquo;
          </p>
        )}

        {task.description && (
          <p className="text-sm text-[var(--color-text-primary)] leading-relaxed whitespace-pre-wrap break-words">
            {task.description}
          </p>
        )}

        {!task.summary && !task.description && (
          <p className="text-sm text-[var(--color-text-muted)] italic">
            Sin descripción.
          </p>
        )}

        <div className="flex items-center justify-between gap-3 pt-3 mt-4 border-t border-[var(--color-border)]/60">
          <div className="flex items-center gap-1.5 flex-wrap">
            <Badge category={task.category} size="sm">
              {CATEGORY_LABELS[task.category]}
            </Badge>
            <Badge priority={task.priority} size="sm">
              {PRIORITY_LABELS[task.priority]}
            </Badge>
          </div>

          <span className="text-[11px] text-[var(--color-text-muted)] flex items-center gap-1 shrink-0">
            <Clock className="w-3 h-3" />
            {formatRelativeTime(task.createdAt)}
          </span>
        </div>
      </div>
    </Modal>
  );
}
