"use client";

import React from "react";
import { useTasks } from "@/context/TaskContext";
import { AppLayout } from "@/components/layout/AppLayout";
import { TaskList } from "@/components/tasks/TaskList";
import { TaskFormModal } from "@/components/tasks/TaskFormModal";
import { TaskDetailModal } from "@/components/tasks/TaskDetailModal";
import { DeleteConfirmDialog } from "@/components/ui/DeleteConfirmDialog";

export function TaskWorkspace() {
  const {
    isCreateModalOpen,
    closeCreateModal,
    createTask,
    editingTask,
    closeEditModal,
    updateTask,
    deletingTask,
    closeDeleteModal,
    deleteTask,
    viewingTask,
    closeViewModal,
  } = useTasks();

  return (
    <AppLayout>
      <TaskList />

      {/* Create Task Modal */}
      <TaskFormModal
        key={isCreateModalOpen ? "create-open" : "create-closed"}
        isOpen={isCreateModalOpen}
        onClose={closeCreateModal}
        onSubmit={(data) => createTask(data)}
      />

      {/* Edit Task Modal */}
      <TaskFormModal
        key={`edit-${editingTask?.id ?? "none"}-${editingTask ? "open" : "closed"}`}
        isOpen={Boolean(editingTask)}
        onClose={closeEditModal}
        initialTask={editingTask}
        onSubmit={(data) => {
          if (editingTask) {
            updateTask(editingTask.id, data);
          }
        }}
      />

      {/* Task Detail Modal */}
      <TaskDetailModal
        isOpen={Boolean(viewingTask)}
        onClose={closeViewModal}
        task={viewingTask}
      />

      {/* Delete Confirmation Safeguard */}
      <DeleteConfirmDialog
        isOpen={Boolean(deletingTask)}
        onClose={closeDeleteModal}
        itemTitle={deletingTask?.title}
        onConfirm={() => {
          if (deletingTask) {
            deleteTask(deletingTask.id);
          }
        }}
      />
    </AppLayout>
  );
}
