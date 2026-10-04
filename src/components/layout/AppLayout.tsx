"use client";

import React from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { useTasks } from "@/context/TaskContext";

export function AppLayout({ children }: { children: React.ReactNode }) {
  const { isMobileSidebarOpen, closeMobileSidebar } = useTasks();

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#10141d] text-[#f1f5f9]">
      {/* Desktop Persistent Sidebar */}
      <div className="hidden md:flex h-full">
        <Sidebar />
      </div>

      {/* Mobile Drawer Overlay */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
            onClick={closeMobileSidebar}
          />
          <div className="relative z-10 w-64 h-full animate-in slide-in-from-left duration-200">
            <Sidebar isMobile />
          </div>
        </div>
      )}

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
