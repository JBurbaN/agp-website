"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, db, storage } from '../../../../../lib/firebase'; // Ajusta la ruta

export default function EditarImagenGaleriaPage() {
  const router = useRouter();
  const params = useParams();
  const imageId = params.id as string;

  const [loadingAuth, setLoadingAuth] = useState(true);
  const [isLoadingData, setIsLoadingData] = useState(true);
  
  const [title, setTitle] = useState('');
  const [size, setSize] = useState<'normal' | 'large'>('normal');
  const [currentUrl, setCurrentUrl] = useState('');
  const [newImage, setNewImage] = useState<File | null>(null);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push('/admin/login');
      } else {
        setLoadingAuth(false);
        try {
          const docRef = doc(db, 'gallery', imageId);
          const docSnap = await getDoc(docRef);
          
          if (docSnap.exists()) {
            const data = docSnap.data();
            setTitle(data.title);
            setSize(data.size || 'normal');
            setCurrentUrl(data.url); // Nota: usando 'url' como en el modelo
          } else {
            setMessage({ type: 'error', text: 'No se encontró la imagen.' });
          }
        } catch (error) {
          console.error("Error:", error);
          setMessage({ type: 'error', text: 'Error al cargar datos.' });
        } finally {
          setIsLoadingData(false);
        }
      }
    });
    return () => unsubscribe();
  }, [imageId, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) {
      setMessage({ type: 'error', text: 'El título es obligatorio.' });
      return;
    }

    setIsSubmitting(true);
    setMessage({ type: 'info', text: 'Actualizando...' });

    try {
      let finalUrl = currentUrl;

      if (newImage) {
        const imageRef = ref(storage, `gallery/${Date.now()}_${newImage.name}`);
        const snapshot = await uploadBytes(imageRef, newImage);
        finalUrl = await getDownloadURL(snapshot.ref);
      }

      const docRef = doc(db, 'gallery', imageId);
      await updateDoc(docRef, {
        title,
        size,
        url: finalUrl,
      });

      setMessage({ type: 'success', text: 'Actualizado correctamente.' });
      setTimeout(() => router.push('/admin/dashboard/gallery'), 2000);

    } catch (error) {
      console.error("Error:", error);
      setMessage({ type: 'error', text: 'Hubo un error al actualizar.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loadingAuth || isLoadingData) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div></div>;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => router.push('/admin/dashboard/gallery')} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Editar Imagen</h1>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 md:p-8">
          
          {message.text && (
            <div className={`mb-6 px-4 py-3 rounded-lg text-sm font-medium text-center ${message.type === 'error' ? 'bg-red-50 text-red-600' : message.type === 'success' ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'}`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Título</label>
              <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-primary focus:border-primary dark:bg-slate-700 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Tamaño en la Galería</label>
              <select 
                value={size}
                onChange={(e) => setSize(e.target.value as 'normal' | 'large')}
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-primary focus:border-primary dark:bg-slate-700 dark:text-white"
              >
                <option value="normal">Normal</option>
                <option value="large">Destacado (2x2)</option>
              </select>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Reemplazar Foto (Opcional)</label>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                {currentUrl && (
                  <div className="relative w-32 h-32 rounded-lg overflow-hidden shrink-0">
                    <img src={currentUrl} alt="Actual" className="w-full h-full object-cover" />
                  </div>
                )}
                
                <div className="flex-1 w-full">
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={(e) => setNewImage(e.target.files ? e.target.files[0] : null)}
                    className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full md:w-auto px-8 py-3 bg-primary hover:bg-red-800 text-white font-bold rounded-lg shadow-sm transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSubmitting ? 'Guardando...' : 'Actualizar'}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}