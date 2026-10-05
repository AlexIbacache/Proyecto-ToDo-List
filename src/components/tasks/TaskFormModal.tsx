"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { Task, TaskCategory, TaskPriority } from "@/types/task";

export interface TaskFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    title: string;
    summary?: string;
    description?: string;
    category: TaskCategory;
    priority: TaskPriority;
  }) => void;
  initialTask?: Task | null;
}

export function TaskFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialTask,
}: TaskFormModalProps) {
  const [title, setTitle] = useState(initialTask?.title ?? "");
  const [summary, setSummary] = useState(initialTask?.summary ?? "");
  const [description, setDescription] = useState(initialTask?.description ?? "");
  const [category, setCategory] = useState<TaskCategory>(initialTask?.category ?? "work");
  const [priority, setPriority] = useState<TaskPriority>(initialTask?.priority ?? "medium");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("El título de la tarea es obligatorio");
      return;
    }

    onSubmit({
      title: title.trim(),
      summary: summary.trim() || undefined,
      description: description.trim() || undefined,
      category,
      priority,
    });
    onClose();
  };

  const categories: { key: TaskCategory; label: string }[] = [
    { key: "work", label: "Trabajo" },
    { key: "personal", label: "Personal" },
    { key: "urgent", label: "Urgente" },
    { key: "general", label: "General" },
  ];

  const priorities: { key: TaskPriority; label: string }[] = [
    { key: "low", label: "Baja" },
    { key: "medium", label: "Media" },
    { key: "high", label: "Alta" },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialTask ? "Editar Tarea" : "Crear Nueva Tarea"}
      description={
        initialTask
          ? "Actualiza los detalles y propiedades de esta tarea"
          : "Agrega una nueva tarea a tu área de trabajo"
      }
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title Field */}
        <div>
          <label
            htmlFor="task-title"
            className="block text-xs font-semibold text-[var(--color-text-primary)] mb-1.5"
          >
            Título de la Tarea <span className="text-red-400">*</span>
          </label>
          <Input
            id="task-title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (error) setError(null);
            }}
            placeholder="ej., Preparar documentación de entrega"
            error={error || undefined}
            autoFocus
          />
        </div>

        {/* Summary Field (short, quoted on the card) */}
        <div>
          <label
            htmlFor="task-summary"
            className="block text-xs font-semibold text-[var(--color-text-primary)] mb-1.5"
          >
            Resumen <span className="text-[var(--color-text-muted)] font-normal">(Opcional · se muestra entre comillas)</span>
          </label>
          <Input
            id="task-summary"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="Una línea que resuma la tarea..."
          />
        </div>

        {/* Full body Field (large, Notion-style) */}
        <div>
          <label
            htmlFor="task-description"
            className="block text-xs font-semibold text-[var(--color-text-primary)] mb-1.5"
          >
            Descripción completa <span className="text-[var(--color-text-muted)] font-normal">(Opcional)</span>
          </label>
          <Textarea
            id="task-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Escribe aquí la tarea completa: pasos, contexto, enlaces, criterios de aceptación..."
            rows={10}
            className="min-h-[220px] max-h-[45vh] overflow-y-auto leading-relaxed"
          />
        </div>

        {/* Category Selection. A group of buttons, not a single form field, so
            it is labelled with aria-labelledby instead of a <label htmlFor>. */}
        <div role="group" aria-labelledby="task-category-label">
          <span
            id="task-category-label"
            className="block text-xs font-semibold text-[var(--color-text-primary)] mb-1.5"
          >
            Categoría
          </span>
          <div className="grid grid-cols-4 gap-2">
            {categories.map((c) => (
              <button
                key={c.key}
                type="button"
                aria-pressed={category === c.key}
                onClick={() => setCategory(c.key)}
                className={`py-2 px-2.5 rounded-lg text-xs font-medium border text-center transition-all cursor-pointer ${
                  category === c.key
                    ? "bg-[var(--color-accent)] text-white border-[var(--color-accent)] shadow-sm shadow-[var(--color-accent)]/30"
                    : "bg-[var(--color-surface)] text-[var(--color-text-secondary)] border-[var(--color-border)] hover:border-[var(--color-accent)] hover:text-[var(--color-text-primary)]"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Priority Selection, same group labelling as category. */}
        <div role="group" aria-labelledby="task-priority-label">
          <span
            id="task-priority-label"
            className="block text-xs font-semibold text-[var(--color-text-primary)] mb-1.5"
          >
            Prioridad
          </span>
          <div className="grid grid-cols-3 gap-2">
            {priorities.map((p) => (
              <button
                key={p.key}
                type="button"
                aria-pressed={priority === p.key}
                onClick={() => setPriority(p.key)}
                className={`py-2 px-2.5 rounded-lg text-xs font-medium border text-center transition-all cursor-pointer ${
                  priority === p.key
                    ? "bg-[var(--color-accent)] text-white border-[var(--color-accent)] shadow-sm shadow-[var(--color-accent)]/30"
                    : "bg-[var(--color-surface)] text-[var(--color-text-secondary)] border-[var(--color-border)] hover:border-[var(--color-accent)] hover:text-[var(--color-text-primary)]"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-[var(--color-border)]">
          <Button type="button" variant="ghost" size="sm" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" variant="primary" size="sm">
            {initialTask ? "Guardar Cambios" : "Crear Tarea"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
