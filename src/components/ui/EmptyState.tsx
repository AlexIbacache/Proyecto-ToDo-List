import React from "react";
import { CheckCircle2, SearchX, Plus } from "lucide-react";
import { Button } from "./Button";

export interface EmptyStateProps {
  type?: "empty" | "search" | "completed";
  searchQuery?: string;
  onAction?: () => void;
}

export function EmptyState({
  type = "empty",
  searchQuery,
  onAction,
}: EmptyStateProps) {
  if (type === "search") {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center rounded-2xl border border-dashed border-[var(--color-border)] bg-[var(--color-surface)]/50">
        <div className="w-12 h-12 rounded-xl bg-[var(--color-surface-hover)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-secondary)] mb-3">
          <SearchX className="w-6 h-6 stroke-[1.75]" />
        </div>
        <h4 className="text-sm font-semibold text-[var(--color-text-primary)] mb-1">
          No se encontraron tareas coincidentes
        </h4>
        <p className="text-xs text-[var(--color-text-secondary)] max-w-sm mb-4">
          {searchQuery
            ? `No hay tareas que coincidan con la búsqueda "${searchQuery}". Intenta con otros términos.`
            : "No se encontraron tareas con los filtros actuales."}
        </p>
        {onAction && (
          <Button variant="secondary" size="sm" onClick={onAction}>
            Restablecer filtros
          </Button>
        )}
      </div>
    );
  }

  if (type === "completed") {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center rounded-2xl border border-dashed border-[var(--color-border)] bg-[var(--color-surface)]/50">
        <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-3">
          <CheckCircle2 className="w-6 h-6 stroke-[1.75]" />
        </div>
        <h4 className="text-sm font-semibold text-[var(--color-text-primary)] mb-1">
          No hay tareas completadas todavía
        </h4>
        <p className="text-xs text-[var(--color-text-secondary)] max-w-sm">
          Sigue avanzando con tus tareas activas. Cuando completes una, aparecerá aquí.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center rounded-2xl border border-dashed border-[var(--color-border)] bg-[var(--color-surface)]/50">
      <div className="w-12 h-12 rounded-xl bg-[var(--color-surface-hover)] border border-[var(--color-border)] flex items-center justify-center text-blue-400 mb-3">
        <Plus className="w-6 h-6 stroke-[2]" />
      </div>
      <h4 className="text-sm font-semibold text-[var(--color-text-primary)] mb-1">
        No hay tareas en esta lista
      </h4>
      <p className="text-xs text-[var(--color-text-secondary)] max-w-sm mb-4">
        Mantén tu día organizado y productivo añadiendo tu primera tarea.
      </p>
      {onAction && (
        <Button variant="primary" size="sm" icon={<Plus className="w-4 h-4" />} onClick={onAction}>
          Crear Nueva Tarea
        </Button>
      )}
    </div>
  );
}
