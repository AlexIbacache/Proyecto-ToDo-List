"use client";

import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useTheme } from "@/context/ThemeContext";

const subscribe = () => () => {};

// Hydration-safe client detection: false during SSR and the first client
// render, true only after hydration. Avoids setState-in-effect.
function useIsClient() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
}

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isClient = useIsClient();
  const shouldReduceMotion = useReducedMotion();

  const nextTheme = theme === "dark" ? "claro" : "oscuro";
  const isDark = isClient && theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg transition-colors duration-200 hover:bg-[var(--color-surface-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-primary)]"
      aria-label="Cambiar tema"
      title={isClient ? `Cambiar a modo ${nextTheme}` : "Cambiar tema"}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? "sun" : "moon"}
          initial={{ opacity: 0, rotate: shouldReduceMotion ? 0 : -90, scale: shouldReduceMotion ? 1 : 0.6 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: shouldReduceMotion ? 0 : 90, scale: shouldReduceMotion ? 1 : 0.6 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.18 }}
          className="flex items-center justify-center"
        >
          {isDark ? (
            <Sun className="h-5 w-5 text-[var(--color-text-primary)]" />
          ) : (
            <Moon className="h-5 w-5 text-[var(--color-text-primary)]" />
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
