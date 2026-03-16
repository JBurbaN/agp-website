import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Next.js optimiza la fuente automáticamente
const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter", 
});

// Esto es vital para el SEO y cómo se ve tu enlace al compartirlo
export const metadata: Metadata = {
  title: "I.E. Antonio García Paredes",
  description: "Institución Educativa Antonio García Paredes - Formación integral en Popayán, Cauca.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght@100..700,0..1&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      {/* Agregamos suppressHydrationWarning aquí: */}
      <body 
        suppressHydrationWarning
        className={`${inter.variable} font-display bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}