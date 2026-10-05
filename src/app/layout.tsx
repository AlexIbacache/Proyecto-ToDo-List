import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { ThemeProvider } from "@/context/ThemeContext";
import { ToastProvider } from "@/context/ToastContext";
import { ToastContainer } from "@/components/ui/Toast";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "TaskFlow - Gestión Moderna de Tareas",
  description: "Aplicación de gestión de tareas minimalista, moderna y responsiva",
};

const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem('taskflow_theme');if(t!=='dark'&&t!=='light'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased min-h-screen`}>
        <ToastProvider>
          <ThemeProvider>{children}</ThemeProvider>
          <ToastContainer />
        </ToastProvider>
      </body>
    </html>
  );
}
