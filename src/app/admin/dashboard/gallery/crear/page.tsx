"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, db, storage } from '../../../../lib/firebase'; // Ajusta la ruta

export default function CrearImagenGaleriaPage() {
  const router = useRouter();
  const [loadingAuth, setLoadingAuth] = useState(true);
  
  const [title, setTitle] = useState('');
  const [size, setSize] = useState<'normal' | 'large'>('normal');
  const [image, setImage] = useState<File | null>(null);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) router.push('/admin/login');
      else setLoadingAuth(false);
    });
    return () => unsubscribe();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !image) {
      setMessage({ type: 'error', text: 'Por favor, añade un título y selecciona una imagen.' });
      return;
    }

    setIsSubmitting(true);
    setMessage({ type: 'info', text: 'Subiendo imagen...' });

    try {
      // Carpeta 'gallery' en Storage
      const imageRef = ref(storage, `gallery/${Date.now()}_${image.name}`);
      const snapshot = await uploadBytes(imageRef, image);
      const url = await getDownloadURL(snapshot.ref);

      // Guardar en colección 'gallery'
      await addDoc(collection(db, 'gallery'), {
        title,
        url,
        size,
        createdAt: serverTimestamp(),
      });

      setMessage({ type: 'success', text: '¡Imagen añadida a la galería!' });
      setTitle('');
      setSize('normal');
      setImage(null);
      
      setTimeout(() => router.push('/admin/dashboard/gallery'), 2000);

    } catch (error) {
      console.error("Error:", error);
      setMessage({ type: 'error', text: 'Hubo un error al guardar.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loadingAuth) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div></div>;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => router.push('/admin/dashboard/gallery')} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Añadir Imagen a Galería</h1>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 md:p-8">
          
          {message.text && (
            <div className={`mb-6 px-4 py-3 rounded-lg text-sm font-medium text-center ${message.type === 'error' ? 'bg-red-50 text-red-600' : message.type === 'success' ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'}`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Título de la imagen</label>
              <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-primary focus:border-primary dark:bg-slate-700 dark:text-white"
                placeholder="Ej: Feria de Ciencias 2024"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Tamaño en la Galería</label>
              <select 
                value={size}
                onChange={(e) => setSize(e.target.value as 'normal' | 'large')}
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-primary focus:border-primary dark:bg-slate-700 dark:text-white"
              >
                <option value="normal">Normal (Ocupa 1 espacio)</option>
                <option value="large">Destacado (Ocupa 4 espacios - 2x2)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Subir Foto</label>
              <input 
                type="file" 
                accept="image/*"
                onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
                className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer"
              />
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full md:w-auto px-8 py-3 bg-primary hover:bg-red-800 text-white font-bold rounded-lg shadow-sm transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSubmitting ? 'Guardando...' : 'Añadir Imagen'}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}