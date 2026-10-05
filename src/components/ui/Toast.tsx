"use client";

import { useEffect, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { X, CheckCircle, AlertCircle } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useToast, type Toast as ToastType } from "@/context/ToastContext";

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

export function ToastContainer() {
  const { toasts, dismiss } = useToast();
  const isClient = useIsClient();

  // The portal and AnimatePresence stay mounted so toasts can animate out.
  if (!isClient) return null;

  return createPortal(
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2">
      <AnimatePresence initial={false}>
        {toasts.map((toast) => (
          <Toast key={toast.id} toast={toast} onDismiss={dismiss} />
        ))}
      </AnimatePresence>
    </div>,
    document.body
  );
}

interface ToastProps {
  toast: ToastType;
  onDismiss: (id: string) => void;
}

function Toast({ toast, onDismiss }: ToastProps) {
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(toast.id);
    }, 4000);

    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  const isSuccess = toast.type === "success";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: shouldReduceMotion ? 0 : 60 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.2, ease: "easeOut" }}
      className="flex items-start gap-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-lg shadow-black/20 min-w-[280px] max-w-[400px]"
      role="alert"
    >
      <div className="mt-0.5">
        {isSuccess ? (
          <CheckCircle className="h-5 w-5 text-[var(--color-success)]" />
        ) : (
          <AlertCircle className="h-5 w-5 text-[var(--color-danger)]" />
        )}
      </div>
      <p className="flex-1 text-sm text-[var(--color-text-primary)]">
        {toast.message}
      </p>
      <button
        onClick={() => onDismiss(toast.id)}
        className="mt-0.5 rounded-md p-1 text-[var(--color-text-muted)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text-primary)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-primary)]"
        aria-label="Cerrar notificación"
      >
        <X className="h-4 w-4" />
      </button>
    </motion.div>
  );
}
