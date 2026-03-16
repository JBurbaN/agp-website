"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { collection, query, orderBy, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../../lib/firebase';

// Definimos la estructura de la Noticia
interface NewsItem {
  id: string;
  title: string;
  summary: string;
  createdAt: any;
}

export default function NoticiasManagerPage() {
  const router = useRouter();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Función para cargar las noticias desde Firebase
  const fetchNews = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'news'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      const fetchedNews: NewsItem[] = [];
      querySnapshot.forEach((doc) => {
        fetchedNews.push({ id: doc.id, ...doc.data() } as NewsItem);
      });
      
      setNews(fetchedNews);
    } catch (error) {
      console.error("Error al cargar noticias:", error);
    } finally {
      setLoading(false);
    }
  };

  // Cargamos las noticias al abrir la página
  useEffect(() => {
    fetchNews();
  }, []);

  // Función para eliminar una noticia
  const handleDelete = async (id: string, title: string) => {
    const confirmDelete = window.confirm(`¿Estás seguro de que deseas eliminar la noticia "${title}"? Esta acción no se puede deshacer.`);
    
    if (confirmDelete) {
      try {
        await deleteDoc(doc(db, 'news', id));
        // Recargamos la lista para que desaparezca visualmente
        fetchNews();
      } catch (error) {
        console.error("Error al eliminar:", error);
        alert("Hubo un error al intentar eliminar la noticia.");
      }
    }
  };

  // Formatear la fecha
  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'Sin fecha';
    return new Intl.DateTimeFormat('es-CO', { 
      day: '2-digit', month: 'short', year: 'numeric' 
    }).format(timestamp.toDate());
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado y botón de Crear */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => router.push('/admin/dashboard')}
              className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors flex items-center justify-center text-slate-600 dark:text-slate-300"
            >
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Gestión de Noticias</h1>
              <p className="text-sm text-slate-500">Administra las publicaciones de la página principal</p>
            </div>
          </div>
          
          <button 
            onClick={() => router.push('/admin/dashboard/noticias/crear')}
            className="bg-primary hover:bg-red-800 text-white font-bold py-2.5 px-6 rounded-lg transition-colors shadow-sm flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">add</span>
            Nueva Noticia
          </button>
        </div>

        {/* Tabla de Datos */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
                  <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Fecha</th>
                  <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Título</th>
                  <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Resumen</th>
                  <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {loading ? (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-slate-500">
                      <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                      <p className="mt-2 text-sm">Cargando noticias...</p>
                    </td>
                  </tr>
                ) : news.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-12 text-center text-slate-500">
                      <span className="material-symbols-outlined text-4xl mb-2 text-slate-300 dark:text-slate-600">article</span>
                      <p>No hay noticias publicadas aún.</p>
                    </td>
                  </tr>
                ) : (
                  news.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="py-4 px-6 text-sm text-slate-600 dark:text-slate-400 whitespace-nowrap">
                        {formatDate(item.createdAt)}
                      </td>
                      <td className="py-4 px-6 text-sm font-bold text-slate-900 dark:text-white">
                        {item.title}
                      </td>
                      <td className="py-4 px-6 text-sm text-slate-600 dark:text-slate-400 max-w-xs truncate">
                        {item.summary}
                      </td>
                      <td className="py-4 px-6 text-sm text-right whitespace-nowrap">
                        <div className="flex justify-end gap-2">
                            <button 
                                onClick={() => router.push(`/admin/dashboard/noticias/editar/${item.id}`)}
                                className="p-2 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/30 rounded-lg transition-colors tooltip"
                                title="Editar"
                                >
                                <span className="material-symbols-outlined text-sm">edit</span>
                            </button>
                          <button 
                            onClick={() => handleDelete(item.id, item.title)}
                            className="p-2 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/30 rounded-lg transition-colors tooltip"
                            title="Eliminar"
                          >
                            <span className="material-symbols-outlined text-sm">delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}