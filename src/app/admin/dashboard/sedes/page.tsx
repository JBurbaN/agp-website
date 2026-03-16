"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { collection, query, orderBy, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../../lib/firebase';

// Definimos la estructura básica que mostraremos en la tabla
interface SedeItem {
  id: string;
  nombre: string;
  direccion: string;
  telefono: string;
  zona: string;
  jornada: string;
  createdAt: any;
}

export default function SedesManagerPage() {
  const router = useRouter();
  const [sedes, setSedes] = useState<SedeItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Obtener las sedes desde Firebase
  const fetchSedes = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'sedes'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      const fetchedSedes: SedeItem[] = [];
      querySnapshot.forEach((doc) => {
        fetchedSedes.push({ id: doc.id, ...doc.data() } as SedeItem);
      });
      
      setSedes(fetchedSedes);
    } catch (error) {
      console.error("Error al cargar sedes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSedes();
  }, []);

  // Eliminar una sede
  const handleDelete = async (id: string, nombre: string) => {
    const confirmDelete = window.confirm(`¿Estás seguro de que deseas eliminar la "${nombre}"? Esta acción no se puede deshacer y perderás la información asociada.`);
    
    if (confirmDelete) {
      try {
        await deleteDoc(doc(db, 'sedes', id));
        fetchSedes(); // Recargar la tabla
      } catch (error) {
        console.error("Error al eliminar:", error);
        alert("Hubo un error al intentar eliminar la sede.");
      }
    }
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
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Gestión de Sedes</h1>
              <p className="text-sm text-slate-500">Administra la información de las sedes de la institución</p>
            </div>
          </div>
          
          <button 
            onClick={() => router.push('/admin/dashboard/sedes/crear')}
            className="bg-primary hover:bg-red-800 text-white font-bold py-2.5 px-6 rounded-lg transition-colors shadow-sm flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">domain_add</span>
            Registrar Sede
          </button>
        </div>

        {/* Tabla de Datos */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
                  <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Nombre</th>
                  <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Ubicación</th>
                  <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Contacto</th>
                  <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Jornada</th>
                  <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-slate-500">
                      <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                      <p className="mt-2 text-sm">Cargando sedes...</p>
                    </td>
                  </tr>
                ) : sedes.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-slate-500">
                      <span className="material-symbols-outlined text-4xl mb-2 text-slate-300 dark:text-slate-600">domain</span>
                      <p>No hay sedes registradas aún.</p>
                    </td>
                  </tr>
                ) : (
                  sedes.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="py-4 px-6 text-sm font-bold text-slate-900 dark:text-white">
                        {item.nombre}
                      </td>
                      <td className="py-4 px-6 text-sm text-slate-600 dark:text-slate-400">
                        {item.direccion}
                        <span className="block text-xs text-slate-400">Zona {item.zona}</span>
                      </td>
                      <td className="py-4 px-6 text-sm text-slate-600 dark:text-slate-400">
                        {item.telefono || 'No registrado'}
                      </td>
                      <td className="py-4 px-6 text-sm text-slate-600 dark:text-slate-400">
                        {item.jornada}
                      </td>
                      <td className="py-4 px-6 text-sm text-right whitespace-nowrap">
                        <div className="flex justify-end gap-2">
                            <button 
                                onClick={() => router.push(`/admin/dashboard/sedes/editar/${item.id}`)}
                                className="p-2 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/30 rounded-lg transition-colors tooltip"
                                title="Editar"
                                >
                                <span className="material-symbols-outlined text-sm">edit</span>
                            </button>
                          <button 
                            onClick={() => handleDelete(item.id, item.nombre)}
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