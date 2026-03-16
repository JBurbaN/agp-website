"use client";

import React, { useEffect, useState, useCallback } from 'react';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../../lib/firebase';

interface GalleryImage {
  id: string;
  title: string;
  url: string;
  // Ya no dependemos de 'size' para el renderizado, lo hará automáticamente
  size?: 'normal' | 'large'; 
}

export const GallerySection = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Estados para el visor de imágenes (Lightbox)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const q = query(collection(db, 'gallery'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        
        const fetchedImages: GalleryImage[] = [];
        querySnapshot.forEach((doc) => {
          fetchedImages.push({ id: doc.id, ...doc.data() } as GalleryImage);
        });
        
        setImages(fetchedImages);
      } catch (error) {
        console.error("Error al cargar la galería:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  // --- LÓGICA DEL VISOR (LIGHTBOX) ---
  const openLightbox = (index: number) => {
    setSelectedIndex(index);
    // Evitar que el fondo haga scroll cuando el visor está abierto
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = useCallback(() => {
    setSelectedIndex(null);
    document.body.style.overflow = 'auto';
  }, []);

  const showNext = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSelectedIndex((prev) => (prev === null ? null : prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  const showPrev = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSelectedIndex((prev) => (prev === null ? null : prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  // Soporte para teclado (Esc para cerrar, Flechas para navegar)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, closeLightbox, showNext, showPrev]);


  return (
    <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <span className="text-primary font-bold tracking-widest uppercase text-sm mb-2 block">
          Nuestra Experiencia
        </span>
        <h2 className="text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
          Galería Institucional
        </h2>
      </div>
      
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-pulse">
          {[1, 2, 3, 4, 5].map((item, index) => (
            <div 
              key={item} 
              className={`bg-slate-200 dark:bg-slate-700 rounded-xl aspect-square ${
                index === 0 ? 'md:col-span-2 md:row-span-2' : ''
              }`}
            ></div>
          ))}
        </div>
      ) : images.length === 0 ? (
        <div className="text-center text-slate-500 py-10">
          <p>Próximamente nuevas imágenes de nuestra institución.</p>
        </div>
      ) : (
        <>
          {/* CUADRÍCULA DE IMÁGENES */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {images.map((img, index) => {
              // La primera imagen (index === 0) será la destacada automáticamente
              const isFeatured = index === 0;
              
              return (
                <div 
                  key={img.id} 
                  onClick={() => openLightbox(index)}
                  className={`aspect-square rounded-xl overflow-hidden group relative cursor-pointer ${
                    isFeatured ? 'md:col-span-2 md:row-span-2' : ''
                  }`}
                >
                  <img 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                    alt={img.title} 
                    src={img.url} 
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className={`text-white font-bold text-center px-2 ${isFeatured ? 'text-xl md:text-2xl' : 'text-base'}`}>
                      {img.title}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* VISOR DE IMÁGENES (LIGHTBOX) */}
          {selectedIndex !== null && (
            <div 
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 md:p-8"
              onClick={closeLightbox} // Cerrar al hacer clic fuera de la imagen
            >
              {/* Botón Cerrar */}
              <button 
                onClick={closeLightbox}
                className="absolute top-4 right-4 md:top-6 md:right-6 text-white/70 hover:text-white bg-black/50 hover:bg-black p-2 rounded-full transition-all z-50"
              >
                <span className="material-symbols-outlined text-3xl">close</span>
              </button>

              {/* Botón Anterior */}
              <button 
                onClick={showPrev}
                className="absolute left-2 md:left-6 text-white/70 hover:text-white bg-black/50 hover:bg-black p-2 md:p-3 rounded-full transition-all z-50"
              >
                <span className="material-symbols-outlined text-3xl md:text-4xl">chevron_left</span>
              </button>

              {/* Contenedor de la Imagen */}
              <div 
                className="relative max-w-5xl max-h-full w-full h-full flex flex-col items-center justify-center"
                onClick={(e) => e.stopPropagation()} // Evitar que se cierre al hacer clic en la imagen
              >
                <img 
                  src={images[selectedIndex].url} 
                  alt={images[selectedIndex].title} 
                  className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
                />
                <p className="text-white text-lg md:text-xl font-medium mt-4 text-center">
                  {images[selectedIndex].title}
                </p>
                <p className="text-white/50 text-sm mt-1">
                  {selectedIndex + 1} de {images.length}
                </p>
              </div>

              {/* Botón Siguiente */}
              <button 
                onClick={showNext}
                className="absolute right-2 md:right-6 text-white/70 hover:text-white bg-black/50 hover:bg-black p-2 md:p-3 rounded-full transition-all z-50"
              >
                <span className="material-symbols-outlined text-3xl md:text-4xl">chevron_right</span>
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
};