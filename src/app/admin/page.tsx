"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
// Como ambos están en carpetas hijas de src/app/, solo subes un nivel
import { auth } from '../lib/firebase'; 

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push('/admin/dashboard');
      } else {
        router.push('/admin/login');
      }
    });

    return () => unsubscribe();
  }, [router]);

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