"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { collection, query, orderBy, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../../lib/firebase'; // Ajusta la ruta si es necesario

// Estructura de la Imagen
interface GalleryImage {
  id: string;
  title: string;
  url: string; // URL de Storage
  size: 'normal' | 'large';
  createdAt: any;
}

export default function GalleryManagerPage() {
  const router = useRouter();
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'gallery'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      const fetchedImages: GalleryImage[] = [];
      querySnapshot.forEach((doc) => {
        fetchedImages.push({ id: doc.id, ...doc.data() } as GalleryImage);
      });
      
      setImages(fetchedImages);
    } catch (error) {
      console.error("Error al cargar imágenes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleDelete = async (id: string, title: string) => {
    const confirmDelete = window.confirm(`¿Estás seguro de que deseas eliminar la imagen "${title}"? Esta acción no se puede deshacer.`);
    
    if (confirmDelete) {
      try {
        await deleteDoc(doc(db, 'gallery', id));
        fetchImages();
      } catch (error) {
        console.error("Error al eliminar:", error);
        alert("Hubo un error al intentar eliminar la imagen.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => router.push('/admin/dashboard')}
              className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors flex items-center justify-center text-slate-600 dark:text-slate-300"
            >
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Gestión de Galería</h1>
              <p className="text-sm text-slate-500">Administra las fotos de la institución</p>
            </div>
          </div>
          
          <button 
            onClick={() => router.push('/admin/dashboard/gallery/crear')}
            className="bg-primary hover:bg-red-800 text-white font-bold py-2.5 px-6 rounded-lg transition-colors shadow-sm flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">add</span>
            Nueva Imagen
          </button>
        </div>

        {/* Grid de Imágenes */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : images.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
            <span className="material-symbols-outlined text-4xl mb-2 text-slate-300 dark:text-slate-600">photo_library</span>
            <p className="text-slate-500">No hay imágenes en la galería aún.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {images.map((img) => (
              <div key={img.id} className="bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-lg p-4 flex flex-col gap-3 group shadow-sm">
                <div className="aspect-square w-full overflow-hidden rounded-md bg-slate-100">
                  <img src={img.url} alt={img.title} className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="font-semibold text-slate-800 dark:text-slate-200 truncate">{img.title}</p>
                  <p className="text-xs text-slate-500">
                    Tamaño: {img.size === 'large' ? 'Destacado (Ocupa 2 espacios)' : 'Normal'}
                  </p>
                </div>
                <div className="flex gap-2 mt-auto pt-2 border-t border-slate-100 dark:border-slate-700">
                  <button 
                    onClick={() => router.push(`/admin/dashboard/gallery/editar/${img.id}`)}
                    className="flex-1 text-sm bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 py-1.5 rounded text-slate-700 dark:text-slate-300 transition-colors text-center"
                  >
                    Editar
                  </button>
                  <button 
                    onClick={() => handleDelete(img.id, img.title)}
                    className="flex-1 text-sm bg-red-50 hover:bg-red-100 text-red-600 py-1.5 rounded transition-colors text-center"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}