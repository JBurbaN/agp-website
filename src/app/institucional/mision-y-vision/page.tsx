import React from 'react';
// IMPORTANTE: Ajusta estas rutas según dónde tengas guardados tus componentes
import { Header } from '../../../app/components/layout/Header'; 
import { Footer } from '../../../app/components/layout/Footer'; 

export default function MisionVisionPage() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-slate-900 flex flex-col">
      
      {/* Cabecera de navegación */}
      <Header />

      {/* Contenido principal (el "grow" hace que ocupe todo el espacio sobrante) */}
      <main className="grow py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Encabezado de la página */}
          <div className="text-center mb-16 md:mb-20">
            <span className="text-primary font-bold tracking-widest uppercase text-sm mb-3 block">
              Horizonte Institucional
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-6">
              Misión y Visión
            </h1>
            <div className="w-24 h-1.5 bg-primary mx-auto rounded-full"></div>
          </div>

          {/* Contenedor Grid para las tarjetas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            
            {/* ----- Tarjeta de Misión ----- */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 md:p-10 shadow-sm border border-slate-200 dark:border-slate-700 relative overflow-hidden group hover:shadow-md transition-all duration-300">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 dark:bg-primary/10 rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-500"></div>
              
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-8 shadow-inner">
                <span className="material-symbols-outlined text-3xl">flag</span>
              </div>
              
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
                Nuestra Misión
              </h2>
              
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg text-justify">
                La Institución Educativa Antonio García Paredes de Popayán es una entidad oficial, que forma educandos integrales con un enfoque humanista en los niveles de preescolar, básica y media potenciando talentos con procesos de calidad, que les permita desempeñarse de manera efectiva en el contexto.
              </p>
            </div>

            {/* ----- Tarjeta de Visión ----- */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 md:p-10 shadow-sm border border-slate-200 dark:border-slate-700 relative overflow-hidden group hover:shadow-md transition-all duration-300">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 dark:bg-blue-500/10 rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-500"></div>

              <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-8 shadow-inner">
                <span className="material-symbols-outlined text-3xl">visibility</span>
              </div>
              
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
                Nuestra Visión
              </h2>
              
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg text-justify">
                Al 2026 la Institución Educativa Antonio García Paredes, será reconocida como una de las mejores instituciones educativas de la región que contribuye al fomento de los talentos y la identidad cultural con responsabilidad respeto y honestidad para el desarrollo social económico y político de la región y el país.
              </p>
            </div>

          </div>
        </div>
      </main>

      {/* Pie de página */}
      <Footer />
      
    </div>
  );
}