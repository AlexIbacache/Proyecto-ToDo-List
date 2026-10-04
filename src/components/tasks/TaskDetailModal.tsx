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
    <Modal isOpen={isOpen} onClose={onClose} title={task.title}>
      <div className="space-y-4">
        {task.description && (
          <p className="text-sm text-[#cbd5e1] leading-relaxed whitespace-pre-wrap break-words">
            {task.description}
          </p>
        )}

        <div className="flex items-center justify-between gap-3 pt-3 mt-4 border-t border-[#232d3f]/60">
          <div className="flex items-center gap-1.5 flex-wrap">
            <Badge category={task.category} size="sm">
              {CATEGORY_LABELS[task.category]}
            </Badge>
            <Badge priority={task.priority} size="sm">
              {PRIORITY_LABELS[task.priority]}
            </Badge>
          </div>

          <span className="text-[11px] text-[#64748b] flex items-center gap-1 shrink-0">
            <Clock className="w-3 h-3" />
            {formatRelativeTime(task.createdAt)}
          </span>
        </div>
      </div>
    </Modal>
  );
}
