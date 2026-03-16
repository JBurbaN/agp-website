"use client";

import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../../lib/firebase';

// Definimos la estructura de cómo luce una Noticia en TypeScript
interface NewsItem {
  id: string;
  title: string;
  summary: string;
  imageUrl: string;
  createdAt: any; // Timestamp de Firebase
}

export const NewsSection = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        // Creamos la consulta: Traer de la colección 'news', ordenar por fecha (las más nuevas primero) y traer máximo 3.
        const q = query(collection(db, 'news'), orderBy('createdAt', 'desc'), limit(3));
        const querySnapshot = await getDocs(q);
        
        const fetchedNews: NewsItem[] = [];
        querySnapshot.forEach((doc) => {
          fetchedNews.push({ id: doc.id, ...doc.data() } as NewsItem);
        });
        
        setNews(fetchedNews);
      } catch (error) {
        console.error("Error al obtener las noticias:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  // Función auxiliar para formatear la fecha de Firebase a un formato legible
  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'Fecha reciente';
    const date = timestamp.toDate();
    return new Intl.DateTimeFormat('es-CO', { 
      day: '2-digit', 
      month: 'long', 
      year: 'numeric' 
    }).format(date);
  };

  return (
    <section className="py-24 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado de la sección */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="text-primary font-bold tracking-widest uppercase text-sm mb-2 block">
              Actualidad
            </span>
            <h2 className="text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
              Noticias Recientes
            </h2>
          </div>
          <a href="#" className="hidden md:flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all">
            Ver todas las noticias <span className="material-symbols-outlined">arrow_forward</span>
          </a>
        </div>
        
        {/* Contenedor de Noticias */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {loading ? (
            // Esqueletos de carga mientras llegan los datos de Firebase
            [1, 2, 3].map((skeleton) => (
              <div key={skeleton} className="bg-slate-100 dark:bg-slate-800 rounded-xl h-96 animate-pulse"></div>
            ))
          ) : news.length === 0 ? (
            // Mensaje si no hay noticias en la base de datos
            <div className="col-span-3 text-center py-12 text-slate-500">
              No hay noticias publicadas en este momento.
            </div>
          ) : (
            // Renderizado de las noticias reales
            news.map((item) => (
              <article key={item.id} className="bg-background-light dark:bg-slate-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
                <div className="h-56 overflow-hidden">
                  <img 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
                    alt={item.title} 
                    src={item.imageUrl} 
                  />
                </div>
                <div className="p-6 flex flex-col grow">
                  <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase mb-3">
                    <span className="material-symbols-outlined text-sm">calendar_today</span>
                    <span>{formatDate(item.createdAt)}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 line-clamp-2">{item.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 line-clamp-3 grow">
                    {item.summary}
                  </p>
                  <button className="text-primary font-bold text-sm hover:underline flex items-center gap-1 mt-auto">
                    Leer más <span className="material-symbols-outlined text-sm">chevron_right</span>
                  </button>
                </div>
              </article>
            ))
          )}

        </div>
        
        <div className="mt-12 text-center md:hidden">
          <a href="#" className="inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all">
            Ver todas las noticias <span className="material-symbols-outlined">arrow_forward</span>
          </a>
        </div>

      </div>
    </section>
  );
};