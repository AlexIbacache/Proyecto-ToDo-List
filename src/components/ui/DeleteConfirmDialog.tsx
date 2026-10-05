"use client";

import React from "react";
import { AlertTriangle } from "lucide-react";
import { Modal } from "./Modal";
import { Button } from "./Button";

export interface DeleteConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemTitle?: string;
}

export function DeleteConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  itemTitle,
}: DeleteConfirmDialogProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Eliminar Tarea"
      maxWidth="sm"
    >
      <div className="flex flex-col items-center text-center">
        <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 mb-3">
          <AlertTriangle className="w-6 h-6 stroke-[2]" />
        </div>
        <p className="text-sm text-[var(--color-text-primary)] mb-1">
          ¿Estás seguro de que deseas eliminar permanentemente esta tarea?
        </p>
        {itemTitle && (
          <p className="text-xs font-semibold text-[var(--color-text-primary)] bg-[var(--color-bg-primary)] px-3 py-1.5 rounded-lg border border-[var(--color-border)] max-w-full truncate mb-4">
            &ldquo;{itemTitle}&rdquo;
          </p>
        )}
        <p className="text-xs text-[var(--color-text-secondary)] mb-5">
          Esta acción no se puede deshacer.
        </p>

        <div className="flex items-center justify-end gap-3 w-full border-t border-[var(--color-border)] pt-4">
          <Button variant="ghost" size="sm" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            Eliminar Tarea
          </Button>
        </div>
      </div>
    </Modal>
  );
}
