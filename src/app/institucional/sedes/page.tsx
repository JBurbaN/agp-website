"use client";

import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';

// Estructura de la sede (igual a la de la base de datos)
interface Sede {
  id: string;
  nombre: string;
  direccion: string;
  telefono: string;
  barrio: string;
  calendario: string;
  zona: string;
  jornada: string;
  genero: string;
  niveles: { preescolar: boolean; primaria: boolean; secundaria: boolean; media: boolean; };
  galeria: string[];
  ubicacion: string;
  camposAdicionales: { titulo: string; contenido: string }[];
}

export default function SedesPublicPage() {
  const [sedes, setSedes] = useState<Sede[]>([]);
  const [loading, setLoading] = useState(true);
  const [sedeSeleccionada, setSedeSeleccionada] = useState<Sede | null>(null);
  const [imagenActiva, setImagenActiva] = useState<string>('');

  // Descargar sedes desde Firestore
  useEffect(() => {
    const fetchSedes = async () => {
      try {
        const q = query(collection(db, 'sedes'), orderBy('createdAt', 'asc'));
        const querySnapshot = await getDocs(q);
        const fetchedSedes: Sede[] = [];
        querySnapshot.forEach((doc) => {
          fetchedSedes.push({ id: doc.id, ...doc.data() } as Sede);
        });
        setSedes(fetchedSedes);
      } catch (error) {
        console.error("Error al cargar sedes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSedes();
  }, []);

  // Función para abrir los detalles de una sede
  const abrirSede = (sede: Sede) => {
    setSedeSeleccionada(sede);
    if (sede.galeria && sede.galeria.length > 0) {
      setImagenActiva(sede.galeria[0]); // Pone la primera foto como principal
    } else {
      setImagenActiva('');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-slate-900 flex flex-col">
      <Header />

      <main className="grow py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* VISTA 1: CUADRÍCULA DE SEDES */}
          {!sedeSeleccionada ? (
            <>
              <div className="text-center mb-16">
                <span className="text-primary font-bold tracking-widest uppercase text-sm mb-2 block">Conoce nuestra institución</span>
                <h1 className="text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Nuestras Sedes Educativas</h1>
                <p className="mt-4 text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Explora las diferentes instalaciones donde formamos a nuestros estudiantes con calidad, cultura y valores.</p>
              </div>

              {loading ? (
                <div className="flex justify-center py-20">
                  <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
                </div>
              ) : sedes.length === 0 ? (
                <div className="text-center py-20 text-slate-500">Aún no hay sedes registradas.</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {sedes.map((sede) => (
                    <div key={sede.id} className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-100 dark:border-slate-700 flex flex-col cursor-pointer group" onClick={() => abrirSede(sede)}>
                      {/* Portada de la tarjeta */}
                      <div className="h-48 overflow-hidden bg-slate-200 dark:bg-slate-700 relative">
                        {sede.galeria && sede.galeria.length > 0 ? (
                          <img src={sede.galeria[0]} alt={sede.nombre} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-400"><span className="material-symbols-outlined text-4xl">domain</span></div>
                        )}
                        <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary shadow-sm">
                          Zona {sede.zona}
                        </div>
                      </div>
                      
                      {/* Información de la tarjeta */}
                      <div className="p-6 grow flex flex-col">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{sede.nombre}</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 flex items-start gap-2">
                          <span className="material-symbols-outlined text-base mt-0.5">location_on</span>
                          {sede.direccion} {sede.barrio && `- ${sede.barrio}`}
                        </p>
                        
                        <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-700 flex flex-wrap gap-2">
                          <span className="bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs px-2 py-1 rounded-md font-medium">Jornada: {sede.jornada}</span>
                          <span className="bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs px-2 py-1 rounded-md font-medium">{sede.genero}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            
            /* VISTA 2: DETALLE DE LA SEDE SELECCIONADA */
            <div className="animate-in fade-in duration-500">
              <button 
                onClick={() => setSedeSeleccionada(null)}
                className="mb-8 flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all"
              >
                <span className="material-symbols-outlined">arrow_back</span> Volver a todas las sedes
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                
                {/* Columna Izquierda: Galería */}
                <div className="space-y-4">
                  {/* Imagen Principal */}
                  <div className="aspect-video bg-slate-200 dark:bg-slate-800 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm">
                    {imagenActiva ? (
                      <img src={imagenActiva} alt={sedeSeleccionada.nombre} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-slate-400">
                        <span className="material-symbols-outlined text-5xl mb-2">photo_camera</span>
                        <p>Sin imágenes disponibles</p>
                      </div>
                    )}
                  </div>
                  
                  {/* Miniaturas */}
                  {sedeSeleccionada.galeria && sedeSeleccionada.galeria.length > 1 && (
                    <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
                      {sedeSeleccionada.galeria.map((img, index) => (
                        <div 
                          key={index} 
                          onClick={() => setImagenActiva(img)}
                          className={`aspect-square rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${imagenActiva === img ? 'border-primary shadow-md scale-105' : 'border-transparent hover:opacity-80'}`}
                        >
                          <img src={img} alt={`Foto ${index + 1}`} className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Mapa */}
                  {sedeSeleccionada.ubicacion && (
                    <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-700">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">map</span> Ubicación
                      </h3>
                      <div className="aspect-video rounded-xl overflow-hidden bg-slate-100">
                        <iframe 
                          src={sedeSeleccionada.ubicacion} 
                          width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                          title={`Mapa de ${sedeSeleccionada.nombre}`}
                        ></iframe>
                      </div>
                    </div>
                  )}
                </div>

                {/* Columna Derecha: Información */}
                <div>
                  <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white uppercase mb-6">{sedeSeleccionada.nombre}</h1>
                  
                  <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 md:p-8 space-y-8">
                    
                    {/* Contacto */}
                    <div>
                      <h3 className="text-sm font-bold text-primary uppercase tracking-widest mb-4">Información de Contacto</h3>
                      <ul className="space-y-4">
                        <li className="flex items-start gap-3">
                          <span className="material-symbols-outlined text-slate-400">location_on</span>
                          <span className="text-slate-700 dark:text-slate-300 font-medium">
                            {sedeSeleccionada.direccion}
                            {sedeSeleccionada.barrio && <span className="block text-sm text-slate-500 font-normal">Barrio {sedeSeleccionada.barrio}</span>}
                          </span>
                        </li>
                        {sedeSeleccionada.telefono && (
                          <li className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-slate-400">call</span>
                            <span className="text-slate-700 dark:text-slate-300 font-medium">{sedeSeleccionada.telefono}</span>
                          </li>
                        )}
                      </ul>
                    </div>

                    {/* Características */}
                    <div>
                      <h3 className="text-sm font-bold text-primary uppercase tracking-widest mb-4">Características Generales</h3>
                      <div className="grid grid-cols-2 gap-y-4 gap-x-2">
                        <div>
                          <p className="text-xs text-slate-500 uppercase font-bold">Calendario</p>
                          <p className="text-slate-800 dark:text-slate-200 font-medium">{sedeSeleccionada.calendario}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 uppercase font-bold">Zona</p>
                          <p className="text-slate-800 dark:text-slate-200 font-medium">{sedeSeleccionada.zona}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 uppercase font-bold">Jornada</p>
                          <p className="text-slate-800 dark:text-slate-200 font-medium">{sedeSeleccionada.jornada}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 uppercase font-bold">Población</p>
                          <p className="text-slate-800 dark:text-slate-200 font-medium">{sedeSeleccionada.genero}</p>
                        </div>
                      </div>
                    </div>

                    {/* Niveles Educativos */}
                    <div>
                      <h3 className="text-sm font-bold text-primary uppercase tracking-widest mb-4">Niveles Ofertados</h3>
                      <div className="flex flex-wrap gap-2">
                        {sedeSeleccionada.niveles.preescolar && <span className="bg-primary/10 text-primary border border-primary/20 px-3 py-1.5 rounded-lg text-sm font-bold">Preescolar</span>}
                        {sedeSeleccionada.niveles.primaria && <span className="bg-primary/10 text-primary border border-primary/20 px-3 py-1.5 rounded-lg text-sm font-bold">Básica Primaria</span>}
                        {sedeSeleccionada.niveles.secundaria && <span className="bg-primary/10 text-primary border border-primary/20 px-3 py-1.5 rounded-lg text-sm font-bold">Básica Secundaria</span>}
                        {sedeSeleccionada.niveles.media && <span className="bg-primary/10 text-primary border border-primary/20 px-3 py-1.5 rounded-lg text-sm font-bold">Educación Media</span>}
                      </div>
                    </div>

                    {/* Campos Dinámicos Adicionales */}
                    {sedeSeleccionada.camposAdicionales && sedeSeleccionada.camposAdicionales.length > 0 && (
                      <div className="pt-6 border-t border-slate-200 dark:border-slate-700">
                        <div className="space-y-6">
                          {sedeSeleccionada.camposAdicionales.map((campo, idx) => (
                            <div key={idx}>
                              <h3 className="text-sm font-bold text-primary uppercase tracking-widest mb-2">{campo.titulo}</h3>
                              <p className="text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed">{campo.contenido}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}