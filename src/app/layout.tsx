import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TaskFlow - Gestión Moderna de Tareas",
  description: "Aplicación de gestión de tareas minimalista, moderna y responsiva",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="dark">
      <body className="bg-[#10141d] text-[#f1f5f9] antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
