"use client";

import React from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { useTasks } from "@/context/TaskContext";

export function AppLayout({ children }: { children: React.ReactNode }) {
  const { isMobileSidebarOpen, closeMobileSidebar } = useTasks();
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] transition-colors duration-200">
      {/* Desktop Persistent Sidebar */}
      <div className="hidden md:flex h-full">
        <Sidebar />
      </div>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMobileSidebarOpen && (
          <motion.div
            className="fixed inset-0 z-50 md:hidden flex"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
          >
            <div
              className="fixed inset-0 bg-black/70 backdrop-blur-sm"
              onClick={closeMobileSidebar}
            />
            <motion.div
              className="relative z-10 w-64 h-full"
              initial={{ x: shouldReduceMotion ? 0 : -256 }}
              animate={{ x: 0 }}
              exit={{ x: shouldReduceMotion ? 0 : -256 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.22, ease: "easeOut" }}
            >
              <Sidebar isMobile />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Viewport */}
      <div className="flex flex-col flex-1 min-w-0 h-full overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto h-full">{children}</div>
        </main>
      </div>
    </div>
  );
}
