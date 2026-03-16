"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, db, storage } from '../../../../../lib/firebase';

export default function EditarNoticiaPage() {
  const router = useRouter();
  const params = useParams();
  const noticiaId = params.id as string; // Obtenemos el ID de la URL

  const [loadingAuth, setLoadingAuth] = useState(true);
  const [isLoadingData, setIsLoadingData] = useState(true);
  
  // Estados para el formulario
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [currentImageUrl, setCurrentImageUrl] = useState('');
  const [newImage, setNewImage] = useState<File | null>(null);
  
  // Estados de la subida
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // 1. Proteger ruta y cargar datos de la noticia
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push('/admin/login');
      } else {
        setLoadingAuth(false);
        // Cargar los datos de la noticia a editar
        try {
          const docRef = doc(db, 'news', noticiaId);
          const docSnap = await getDoc(docRef);
          
          if (docSnap.exists()) {
            const data = docSnap.data();
            setTitle(data.title);
            setSummary(data.summary);
            setContent(data.content);
            setCurrentImageUrl(data.imageUrl);
          } else {
            setMessage({ type: 'error', text: 'No se encontró la noticia solicitada.' });
          }
        } catch (error) {
          console.error("Error al obtener noticia:", error);
          setMessage({ type: 'error', text: 'Error al cargar los datos.' });
        } finally {
          setIsLoadingData(false);
        }
      }
    });
    return () => unsubscribe();
  }, [noticiaId, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !summary || !content) {
      setMessage({ type: 'error', text: 'Por favor, completa todos los campos de texto.' });
      return;
    }

    setIsSubmitting(true);
    setMessage({ type: 'info', text: 'Actualizando noticia...' });

    try {
      let finalImageUrl = currentImageUrl; // Por defecto, mantenemos la imagen actual

      // Si el usuario seleccionó una imagen NUEVA, la subimos a Storage
      if (newImage) {
        const imageRef = ref(storage, `news/${Date.now()}_${newImage.name}`);
        const snapshot = await uploadBytes(imageRef, newImage);
        finalImageUrl = await getDownloadURL(snapshot.ref);
      }

      // Actualizamos el documento en Firestore
      const docRef = doc(db, 'news', noticiaId);
      await updateDoc(docRef, {
        title,
        summary,
        content,
        imageUrl: finalImageUrl,
        // No actualizamos createdAt para mantener la fecha original de publicación
      });

      setMessage({ type: 'success', text: '¡Noticia actualizada correctamente!' });
      
      // Regresamos a la tabla después de 2 segundos
      setTimeout(() => {
        router.push('/admin/dashboard/noticias');
      }, 2000);

    } catch (error) {
      console.error("Error al actualizar: ", error);
      setMessage({ type: 'error', text: 'Hubo un error al actualizar la noticia.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loadingAuth || isLoadingData) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div></div>;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex items-center gap-4 mb-8">
          <button 
            onClick={() => router.push('/admin/dashboard/noticias')}
            className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors flex items-center justify-center text-slate-600 dark:text-slate-300"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Editar Noticia</h1>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 md:p-8">
          
          {message.text && (
            <div className={`mb-6 px-4 py-3 rounded-lg text-sm font-medium text-center ${message.type === 'error' ? 'bg-red-50 text-red-600 border border-red-200' : message.type === 'success' ? 'bg-green-50 text-green-600 border border-green-200' : 'bg-blue-50 text-blue-600 border border-blue-200'}`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Título de la noticia</label>
              <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-primary focus:border-primary dark:bg-slate-700 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Resumen</label>
              <textarea 
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                rows={2}
                maxLength={150}
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-primary focus:border-primary dark:bg-slate-700 dark:text-white resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Contenido completo</label>
              <textarea 
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={8}
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-primary focus:border-primary dark:bg-slate-700 dark:text-white"
              />
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Imagen de Portada</label>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                {currentImageUrl && (
                  <div className="relative w-32 h-32 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 shrink-0">
                    <img src={currentImageUrl} alt="Portada actual" className="w-full h-full object-cover" />
                    <div className="absolute inset-x-0 bottom-0 bg-black/50 text-white text-[10px] text-center py-1">Imagen Actual</div>
                  </div>
                )}
                
                <div className="flex-1 w-full">
                  <p className="text-sm text-slate-500 mb-2">Si deseas cambiar la imagen, selecciona una nueva aquí. Si no seleccionas nada, se mantendrá la actual.</p>
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={(e) => setNewImage(e.target.files ? e.target.files[0] : null)}
                    className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer dark:text-slate-400"
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
                {isSubmitting ? (
                  <>
                    <span className="animate-spin material-symbols-outlined text-sm">refresh</span>
                    Guardando Cambios...
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-sm">save</span>
                    Actualizar Noticia
                  </>
                )}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}