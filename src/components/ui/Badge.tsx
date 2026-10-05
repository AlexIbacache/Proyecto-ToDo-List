import React from "react";
import { TaskCategory, TaskPriority } from "@/types/task";

export interface BadgeProps {
  children: React.ReactNode;
  category?: TaskCategory;
  priority?: TaskPriority;
  size?: "sm" | "md";
  className?: string;
}

export function Badge({
  children,
  category,
  priority,
  size = "sm",
  className = "",
}: BadgeProps) {
  const sizeStyles = {
    sm: "text-[11px] px-2 py-0.5",
    md: "text-xs px-2.5 py-1",
  };

  let colorStyles = "bg-[var(--color-surface)] text-[var(--color-text-secondary)] border border-[var(--color-border)]";

  if (category) {
    switch (category) {
      case "work":
        colorStyles = "bg-blue-500/10 text-blue-400 border border-blue-500/20";
        break;
      case "urgent":
        colorStyles = "bg-rose-500/10 text-rose-400 border border-rose-500/20";
        break;
      case "personal":
        colorStyles = "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20";
        break;
      case "general":
      default:
        colorStyles = "bg-slate-500/10 text-slate-400 border border-slate-500/20";
        break;
    }
  } else if (priority) {
    switch (priority) {
      case "high":
        colorStyles = "bg-red-500/10 text-red-400 border border-red-500/20";
        break;
      case "medium":
        colorStyles = "bg-amber-500/10 text-amber-400 border border-amber-500/20";
        break;
      case "low":
        colorStyles = "bg-blue-500/10 text-blue-400 border border-blue-500/20";
        break;
    }
  }

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full tracking-wide select-none ${sizeStyles[size]} ${colorStyles} ${className}`}
    >
      {children}
    </span>
  );
}
