"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, db, storage } from '../../../../lib/firebase';

export default function NoticiasAdminPage() {
  const router = useRouter();
  const [loadingAuth, setLoadingAuth] = useState(true);
  
  // Estados para el formulario
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);
  
  // Estados de la subida
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Protección de ruta (Igual que en el dashboard)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/admin/login');
      } else {
        setLoadingAuth(false);
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !summary || !content || !image) {
      setMessage({ type: 'error', text: 'Por favor, completa todos los campos y selecciona una imagen.' });
      return;
    }

    setIsSubmitting(true);
    setMessage({ type: 'info', text: 'Subiendo imagen y guardando noticia...' });

    try {
      // 1. Crear una referencia en Storage (Carpeta news/ + nombre del archivo)
      // Agregamos la fecha actual al nombre para evitar que se sobreescriban imágenes con el mismo nombre
      const imageRef = ref(storage, `news/${Date.now()}_${image.name}`);
      
      // 2. Subir la imagen a Firebase Storage
      const snapshot = await uploadBytes(imageRef, image);
      
      // 3. Obtener la URL pública de la imagen que acabamos de subir
      const imageUrl = await getDownloadURL(snapshot.ref);

      // 4. Guardar los datos de la noticia en la colección 'news' de Firestore
      await addDoc(collection(db, 'news'), {
        title,
        summary,
        content,
        imageUrl, // La URL que nos dio Storage
        createdAt: serverTimestamp(), // Fecha exacta del servidor de Firebase
        isActive: true // Por si luego quieres ocultar noticias sin borrarlas
      });

      // Éxito: Limpiamos el formulario
      setMessage({ type: 'success', text: '¡Noticia publicada correctamente!' });
      setTitle('');
      setSummary('');
      setContent('');
      setImage(null);
      
      // Limpiamos el mensaje de éxito después de 3 segundos
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);

    } catch (error) {
      console.error("Error al guardar la noticia: ", error);
      setMessage({ type: 'error', text: 'Hubo un error al publicar la noticia. Intenta de nuevo.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loadingAuth) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div></div>;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado con botón de volver */}
        <div className="flex items-center gap-4 mb-8">
          <button 
            onClick={() => router.push('/admin/dashboard')}
            className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors flex items-center justify-center text-slate-600 dark:text-slate-300"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Publicar Nueva Noticia</h1>
        </div>

        {/* Formulario */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 md:p-8">
          
          {message.text && (
            <div className={`mb-6 px-4 py-3 rounded-lg text-sm font-medium text-center ${message.type === 'error' ? 'bg-red-50 text-red-600 border border-red-200' : message.type === 'success' ? 'bg-green-50 text-green-600 border border-green-200' : 'bg-blue-50 text-blue-600 border border-blue-200'}`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Título */}
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Título de la noticia</label>
              <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-primary focus:border-primary dark:bg-slate-700 dark:text-white"
                placeholder="Ej: Festival de la Canción Colombiana 2024"
              />
            </div>

            {/* Resumen */}
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Resumen (Para la página principal)</label>
              <textarea 
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                rows={2}
                maxLength={150}
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-primary focus:border-primary dark:bg-slate-700 dark:text-white resize-none"
                placeholder="Un texto corto que invite a leer más (Máx 150 caracteres)..."
              />
            </div>

            {/* Contenido Completo */}
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Contenido completo</label>
              <textarea 
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={8}
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-primary focus:border-primary dark:bg-slate-700 dark:text-white"
                placeholder="Escribe aquí todo el detalle de la noticia..."
              />
            </div>

            {/* Imagen */}
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Imagen de Portada</label>
              <input 
                type="file" 
                accept="image/*"
                onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
                className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer dark:text-slate-400"
              />
            </div>

            {/* Botón Guardar */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full md:w-auto px-8 py-3 bg-primary hover:bg-red-800 text-white font-bold rounded-lg shadow-sm transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin material-symbols-outlined text-sm">refresh</span>
                    Procesando...
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-sm">publish</span>
                    Publicar Noticia
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