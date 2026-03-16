"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../lib/firebase';

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    // Escuchamos el estado de la autenticación
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Si el usuario ya está autenticado, lo mandamos al Dashboard
        router.push('/admin/dashboard');
      } else {
        // Si no, lo mandamos a que inicie sesión
        router.push('/admin/login');
      }
    });

    return () => unsubscribe();
  }, [router]);

  // Mientras decide a dónde enviarlo, mostramos una pantalla de carga simple
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-primary border-t-2"></div>
        <p className="text-slate-500 dark:text-slate-400 font-medium animate-pulse">
          Verificando sesión...
        </p>
      </div>
    </div>
  );
}