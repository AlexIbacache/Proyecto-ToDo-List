"use client";

import React from "react";
import {
  CheckSquare,
  ListTodo,
  Clock,
  CheckCircle2,
  Plus,
  Briefcase,
  User,
  AlertCircle,
  Tag,
  X,
} from "lucide-react";
import { useTasks } from "@/context/TaskContext";
import { TaskFilter, TaskCategory } from "@/types/task";
import { Button } from "@/components/ui/Button";

interface NavItemProps {
  label: string;
  icon: React.ReactNode;
  active: boolean;
  count: number;
  onClick: () => void;
}

function NavItem({ label, icon, active, count, onClick }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 cursor-pointer ${active
          ? "bg-[var(--color-accent)] text-white shadow-md shadow-[var(--color-accent)]/20"
          : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface)]"
        }`}
    >
      <div className="flex items-center gap-3">
        <span className="shrink-0">{icon}</span>
        <span>{label}</span>
      </div>
      <span
        className={`text-xs px-2 py-0.5 rounded-full font-semibold ${active
            ? "bg-white/20 text-white"
            : "bg-[var(--color-surface)] text-[var(--color-text-muted)] group-hover:text-[var(--color-text-secondary)]"
          }`}
      >
        {count}
      </span>
    </button>
  );
}

export function Sidebar({ isMobile = false }: { isMobile?: boolean }) {
  const {
    filter,
    setFilter,
    categoryFilter,
    setCategoryFilter,
    stats,
    openCreateModal,
    closeMobileSidebar,
  } = useTasks();

  const handleFilterSelect = (newFilter: TaskFilter) => {
    setFilter(newFilter);
    setCategoryFilter(null);
    if (isMobile) closeMobileSidebar();
  };

  const handleCategorySelect = (category: TaskCategory) => {
    if (categoryFilter === category) {
      setCategoryFilter(null);
    } else {
      setCategoryFilter(category);
    }
    if (isMobile) closeMobileSidebar();
  };

  const categories: { key: TaskCategory; label: string; icon: React.ReactNode; color: string }[] = [
    { key: "work", label: "Trabajo", icon: <Briefcase className="w-4 h-4" />, color: "bg-blue-400" },
    { key: "personal", label: "Personal", icon: <User className="w-4 h-4" />, color: "bg-emerald-400" },
    { key: "urgent", label: "Urgente", icon: <AlertCircle className="w-4 h-4" />, color: "bg-rose-400" },
    { key: "general", label: "General", icon: <Tag className="w-4 h-4" />, color: "bg-slate-400" },
  ];

  return (
    <aside className={`h-full ${isMobile ? "w-64" : "w-72"} bg-[var(--color-bg-secondary)] border-r border-[var(--color-border)] flex flex-col justify-between shrink-0 select-none transition-colors duration-200`}>
      {/* Top Branding */}
      <div>
        <div className="p-5 flex items-center justify-between border-b border-[var(--color-border)]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[var(--color-accent)] flex items-center justify-center text-white shadow-md shadow-[var(--color-accent)]/30">
              <CheckSquare className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h1 className="text-base font-bold text-[var(--color-text-primary)] tracking-tight leading-none">
                ToDo List
              </h1>
              <span className="text-[11px] text-[var(--color-text-secondary)] font-medium">Área de trabajo</span>
            </div>
          </div>

          {isMobile && (
            <button
              onClick={closeMobileSidebar}
              className="p-1 rounded-lg text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface)] transition-colors"
              aria-label="Cerrar barra lateral"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Primary Action Button */}
        <div className="p-4">
          <Button
            variant="primary"
            className="w-full justify-center shadow-lg shadow-[var(--color-accent)]/25 py-2.5 font-semibold text-sm"
            icon={<Plus className="w-4 h-4 stroke-[2.5]" />}
            onClick={() => {
              openCreateModal();
              if (isMobile) closeMobileSidebar();
            }}
          >
            Nueva Tarea
          </Button>
        </div>

        {/* Navigation List */}
        <nav className="px-3 py-1 space-y-1">
          <NavItem
            label="Todas las tareas"
            icon={<ListTodo className="w-4 h-4" />}
            active={filter === "all" && categoryFilter === null}
            count={stats.total}
            onClick={() => handleFilterSelect("all")}
          />
          <NavItem
            label="Activas"
            icon={<Clock className="w-4 h-4" />}
            active={filter === "active" && categoryFilter === null}
            count={stats.active}
            onClick={() => handleFilterSelect("active")}
          />
          <NavItem
            label="Completadas"
            icon={<CheckCircle2 className="w-4 h-4" />}
            active={filter === "completed" && categoryFilter === null}
            count={stats.completed}
            onClick={() => handleFilterSelect("completed")}
          />
        </nav>

        {/* Categories Section */}
        <div className="px-4 mt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold tracking-wider text-[var(--color-text-muted)] uppercase">
              Categorías
            </span>
            {categoryFilter && (
              <button
                onClick={() => setCategoryFilter(null)}
                className="text-[11px] text-[var(--color-accent)] hover:underline"
              >
                Limpiar
              </button>
            )}
          </div>
          <div className="space-y-1">
            {categories.map((cat) => {
              const isActive = categoryFilter === cat.key;
              const count = stats.categories[cat.key] || 0;
              return (
                <button
                  key={cat.key}
                  onClick={() => handleCategorySelect(cat.key)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${isActive
                      ? "bg-[var(--color-surface-hover)] text-[var(--color-text-primary)] border border-[var(--color-border)]"
                      : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface)]"
                    }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={`w-2 h-2 rounded-full ${cat.color}`} />
                    <span>{cat.label}</span>
                  </div>
                  <span className="text-[11px] text-[var(--color-text-muted)]">{count}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="p-4 border-t border-[var(--color-border)] text-xs text-[var(--color-text-muted)] flex items-center justify-between">
        <span>TaskFlow v1.0.0</span>
        <span className="flex items-center gap-1.5 text-[11px]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Listo
        </span>
      </div>
    </aside>
  );
}
