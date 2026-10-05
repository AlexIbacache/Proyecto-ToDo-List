"use client";

import React, { createContext, useContext, useState } from "react";

export type ToastType = "success" | "error";

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  toasts: Toast[];
  success: (message: string) => void;
  error: (message: string) => void;
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const generateId = () => {
    return `toast-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  };

  const addToast = (message: string, type: ToastType) => {
    const id = generateId();
    const toast: Toast = { id, message, type };
    setToasts((prev) => [...prev, toast]);

    setTimeout(() => {
      dismiss(id);
    }, 4000);
  };

  const success = (message: string) => {
    addToast(message, "success");
  };

  const error = (message: string) => {
    addToast(message, "error");
  };

  const dismiss = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toasts, success, error, dismiss }}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
