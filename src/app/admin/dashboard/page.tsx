"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { auth } from '../../lib/firebase';

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // 1. Escuchamos el estado de autenticación en Firebase
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // Si hay un usuario logueado, lo guardamos en el estado y quitamos la carga
        setUser(currentUser);
        setLoading(false);
      } else {
        // Si no hay nadie logueado (o cerraron sesión), los expulsamos al login
        router.push('/admin/login');
      }
    });

    // Limpiamos el escuchador cuando el componente se desmonta
    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // El onAuthStateChanged de arriba detectará esto y redirigirá automáticamente
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  // Mientras Firebase verifica quién es el usuario, mostramos un spinner de carga
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Interfaz del Panel Administrativo
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      
      {/* Barra de navegación superior del administrador */}
      <nav className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 shadow-sm px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2 text-primary font-bold">
          <span className="material-symbols-outlined">school</span>
          <span className="hidden sm:block">Panel Admin - I.E. Antonio García Paredes</span>
          <span className="sm:hidden">Admin</span>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-600 dark:text-slate-300 hidden md:block">
            {user?.email}
          </span>
          <button 
            onClick={handleLogout}
            className="text-sm bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50 px-3 py-1.5 rounded-md font-medium transition-colors flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-sm">logout</span>
            Salir
          </button>
        </div>
      </nav>

      {/* Área de trabajo principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
          Bienvenido al Panel de Control
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Tarjeta de Gestión de Noticias */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
              <span className="material-symbols-outlined">article</span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Noticias Recientes</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">
              Publica, edita o elimina las noticias que aparecen en la página principal.
            </p>
            <button 
                onClick={() => router.push('/admin/dashboard/noticias')}
                className="w-full bg-primary hover:bg-red-800 text-white font-medium py-2.5 rounded-lg transition-colors text-sm"
                >
                Gestionar Noticias
            </button>
          </div>

            {/* Tarjeta de Gestión de Sedes */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
                <span className="material-symbols-outlined">domain</span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Sedes Educativas</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">
                Administra la información, galería y datos de contacto de las sedes.
            </p>
            <button 
                onClick={() => router.push('/admin/dashboard/sedes')}
                className="w-full bg-primary hover:bg-red-800 text-white font-medium py-2.5 rounded-lg transition-colors text-sm"
            >
                Gestionar Sedes
            </button>
            </div>

          {/* Tarjeta de Galería (¡Ahora funcional!) */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
              <span className="material-symbols-outlined">collections</span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Galería Institucional</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">
              Sube, edita o elimina las imágenes que se muestran en la galería de la página principal.
            </p>
            <button 
                // Añadimos la redirección a la ruta que creamos
                onClick={() => router.push('/admin/dashboard/gallery')}
                className="w-full bg-primary hover:bg-red-800 text-white font-medium py-2.5 rounded-lg transition-colors text-sm"
            >
              Gestionar Galería
            </button>
          </div>

        </div>
      </main>
    </div>
  );
}