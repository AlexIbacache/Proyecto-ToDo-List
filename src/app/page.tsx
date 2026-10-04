"use client";

import { TaskProvider } from "@/context/TaskContext";
import { TaskWorkspace } from "@/components/tasks/TaskWorkspace";

export default function Home() {
  return (
    <TaskProvider>
      <TaskWorkspace />
    </TaskProvider>
  );
}
