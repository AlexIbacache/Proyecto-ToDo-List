"use client";

import React from "react";
import {
  Search,
  LayoutGrid,
  List,
  Menu,
  Plus,
  X,
} from "lucide-react";
import { useTasks } from "@/context/TaskContext";
import { Button } from "@/components/ui/Button";

export function Header() {
  const {
    searchQuery,
    setSearchQuery,
    viewMode,
    setViewMode,
    toggleMobileSidebar,
    openCreateModal,
  } = useTasks();

  return (
    <header className="h-16 px-4 md:px-6 bg-[#141a26] border-b border-[#232d3f] flex items-center justify-between gap-4 shrink-0 select-none">
      {/* Left: Mobile hamburger & search */}
      <div className="flex items-center gap-3 flex-1 max-w-xl">
        <button
          onClick={toggleMobileSidebar}
          className="md:hidden p-2 rounded-lg text-[#8b9bb4] hover:text-[#f1f5f9] hover:bg-[#1e2636] transition-colors focus:outline-none"
          aria-label="Abrir menú de navegación móvil"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Global Search Bar */}
        <div className="relative w-full">
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748b] pointer-events-none flex items-center">
            <Search className="w-4 h-4 stroke-[2]" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar tareas por título, descripción o categoría..."
            className="w-full bg-[#18202e] border border-[#232d3f] hover:border-[#2d3a52] text-[#f1f5f9] placeholder-[#64748b] rounded-full pl-10 pr-9 py-2 text-sm transition-all focus:outline-none focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/20"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748b] hover:text-[#f1f5f9] p-0.5 rounded-full"
              aria-label="Limpiar búsqueda"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Right Toolbar Controls */}
      <div className="flex items-center gap-2">
        {/* Layout Grid / List View Toggle */}
        <div className="flex items-center bg-[#18202e] border border-[#232d3f] p-1 rounded-xl">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              viewMode === "grid"
                ? "bg-[#2563eb] text-white shadow-sm"
                : "text-[#8b9bb4] hover:text-[#f1f5f9] hover:bg-[#1e2636]"
            }`}
            title="Vista en cuadrícula"
            aria-label="Vista en cuadrícula"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              viewMode === "list"
                ? "bg-[#2563eb] text-white shadow-sm"
                : "text-[#8b9bb4] hover:text-[#f1f5f9] hover:bg-[#1e2636]"
            }`}
            title="Vista en lista"
            aria-label="Vista en lista"
          >
            <List className="w-4 h-4" />
          </button>
        </div>

        {/* Header Action Button */}
        <Button
          variant="primary"
          size="sm"
          icon={<Plus className="w-4 h-4 stroke-[2.5]" />}
          onClick={openCreateModal}
          className="hidden sm:inline-flex shadow-sm shadow-[#2563eb]/20"
        >
          Agregar Tarea
        </Button>
      </div>
    </header>
  );
}
