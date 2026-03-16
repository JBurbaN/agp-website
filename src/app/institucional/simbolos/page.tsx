import React from 'react';
// IMPORTANTE: Ajusta estas rutas según la ubicación de tus componentes
import { Header } from '../../../app/components/layout/Header'; 
import { Footer } from '../../../app/components/layout/Footer'; 

export default function SimbolosPage() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-slate-900 flex flex-col">
      
      <Header />

      <main className="grow py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Encabezado de la página */}
          <div className="text-center mb-16 md:mb-20">
            <span className="text-primary font-bold tracking-widest uppercase text-sm mb-3 block">
              Nuestra Identidad
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-6">
              Símbolos Institucionales
            </h1>
            <div className="w-24 h-1.5 bg-primary mx-auto rounded-full mb-8"></div>
            <p className="max-w-3xl mx-auto text-lg text-slate-600 dark:text-slate-300">
              Nuestros símbolos representan la filosofía, los valores y la rica historia de la Institución Educativa Antonio García Paredes. Son el emblema de nuestro compromiso con la educación y la cultura de Popayán.
            </p>
          </div>

          {/* ----- SECCIÓN: LA BANDERA ----- */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
            {/* Imagen de la Bandera */}
                <div className="order-2 lg:order-1 relative group">
                <div className="absolute -inset-2 bg-linear-to-r from-red-500/20 to-slate-200/20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
                
                {/* Ruta corregida apuntando a la carpeta public */}
                <img 
                    src="../images/secciones/mision-y-simbolo/Bandera.png" 
                    alt="Bandera de la I.E. Antonio García Paredes" 
                    className="relative w-full rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 object-cover aspect-3/2"
                />
            </div>
            
            {/* Texto de la Bandera */}
            <div className="order-1 lg:order-2">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-2xl">tour</span>
                </div>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white uppercase tracking-tight">
                  Nuestra Bandera
                </h2>
              </div>
              
              <p className="text-slate-600 dark:text-slate-300 text-lg mb-6 leading-relaxed">
                Dos franjas conforman nuestra bandera, el blanco y el rojo, que traducen la riqueza del conocimiento y la fe en nuestra ciudad, enmarcando grandes ideales para toda la comunidad educativa.
              </p>

              <div className="space-y-6">
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border-l-4 border-slate-200 shadow-sm">
                  <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2 flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full border-2 border-slate-300 bg-white inline-block"></span>
                    El color blanco
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Símbolo de paz, tranquilidad y calma que impacta en la ternura del ser humano y de su corazón, forjado con los valores que son propios de la Institución Educativa.
                  </p>
                </div>

                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border-l-4 border-red-600 shadow-sm">
                  <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2 flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-red-600 inline-block"></span>
                    El color rojo
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Simboliza el amor, la incansable lucha, el compromiso inquebrantable y el profundo sentido de pertenencia por nuestra Institución.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ----- SECCIÓN: EL ESCUDO ----- */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Texto del Escudo */}
            <div className="order-1 lg:order-1">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <span className="material-symbols-outlined text-2xl">local_police</span>
                </div>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white uppercase tracking-tight">
                  Nuestro Escudo
                </h2>
              </div>
              
              <p className="text-slate-600 dark:text-slate-300 text-lg mb-8 leading-relaxed">
                El escudo es la insignia que portamos con orgullo. Cada elemento que lo compone ha sido diseñado para reflejar nuestra misión formadora y el respeto por nuestras raíces.
              </p>

              <div className="grid gap-4">
                <div className="flex gap-4 items-start bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-shadow">
                  <div className="p-2 bg-slate-100 dark:bg-slate-700 rounded-lg text-slate-700 dark:text-slate-300 mt-1">
                    <span className="material-symbols-outlined">category</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white">El Contorno</h3>
                    <p className="text-slate-600 dark:text-slate-400">Su forma hace gala de las hermosas tradiciones culturales de nuestro folclore regional.</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-shadow">
                  <div className="p-2 bg-slate-100 dark:bg-slate-700 rounded-lg text-slate-700 dark:text-slate-300 mt-1">
                    <span className="material-symbols-outlined">visibility</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white">El Búho</h3>
                    <p className="text-slate-600 dark:text-slate-400">Representa la sabiduría, la observación atenta y la búsqueda constante de la verdad.</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-shadow">
                  <div className="p-2 bg-slate-100 dark:bg-slate-700 rounded-lg text-slate-700 dark:text-slate-300 mt-1">
                    <span className="material-symbols-outlined">menu_book</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white">El Libro</h3>
                    <p className="text-slate-600 dark:text-slate-400">Símbolo universal del conocimiento, la educación integral y la apertura hacia el aprendizaje.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Imagen del Escudo */}
            <div className="order-2 lg:order-2 flex justify-center relative group">
                <div className="absolute inset-4 bg-linear-to-tr from-blue-500/20 to-primary/20 rounded-full blur-2xl group-hover:blur-3xl transition-all duration-500 -z-10"></div>

                <img 
                    src="../images/secciones/mision-y-simbolo/escudo2023.png" 
                    alt="Escudo de la I.E. Antonio García Paredes"
                    className="relative max-w-sm drop-shadow-2xl object-contain hover:scale-105 transition-transform duration-500"
                />
            </div>
          </div>

        </div>
      </main>

      <Footer />
      
    </div>
  );
}