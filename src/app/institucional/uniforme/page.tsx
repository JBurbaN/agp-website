import React from 'react';
import { Header } from '../../../app/components/layout/Header'; 
import { Footer } from '../../../app/components/layout/Footer'; 

export default function UniformePage() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-slate-900 flex flex-col">
      
      <Header />

      <main className="grow py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Encabezado de la página */}
          <div className="text-center mb-16 md:mb-20">
            <span className="text-primary font-bold tracking-widest uppercase text-sm mb-3 block">
              Presentación Personal
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-6">
              Uniformes Institucionales
            </h1>
            <div className="w-24 h-1.5 bg-primary mx-auto rounded-full mb-8"></div>
            <p className="max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-400">
              El uniforme es símbolo de identidad y respeto por nuestra institución. Su porte correcto refleja el compromiso del estudiante con los valores de la I.E. Antonio García Paredes.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            
            {/* ----- UNIFORME DE DIARIO ----- */}
            <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden group hover:shadow-md transition-shadow">
              {/* Contenedor de Imagen de Referencia */}
              <div className="aspect-4/3 w-full bg-slate-100 dark:bg-slate-900 overflow-hidden relative">
                <img 
                    src="/images/secciones/uniforme/uniforme-diario.png" 
                    className="w-full h-full object-contain scale-150" // Prueba con scale-100, 105, 110, 125...
                />
                <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                  OFICIAL
                </div>
              </div>

              <div className="bg-primary p-6 text-white flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold uppercase tracking-tight">Uniforme de Diario</h2>
                  <p className="text-red-100 text-sm italic">Uso en jornadas académicas regulares</p>
                </div>
                <span className="material-symbols-outlined text-4xl opacity-80">checkroom</span>
              </div>
              
              <div className="p-8">
                <ul className="space-y-4">
                  {[
                    { item: "Camibuzo blanco", desc: "Con cuello y franjas rojas" },
                    { item: "Escudo bordado", desc: "Ubicado en el lado izquierdo del pecho" },
                    { item: "Falda o Pantalón Gris", desc: "Corte clásico institucional" },
                    { item: "Saco rojo", desc: "Con escudo bordado institucional" },
                    { item: "Zapatos Escolares", desc: "Formales de color negro" }
                  ].map((uni, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <div className="mt-1 shrink-0 w-5 h-5 rounded-full bg-red-50 dark:bg-red-900/30 flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined text-sm font-bold">check</span>
                      </div>
                      <div>
                        <p className="font-bold text-slate-800 dark:text-slate-200">{uni.item}</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{uni.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-dashed border-slate-300 dark:border-slate-600">
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed text-center">
                    <span className="font-bold text-primary uppercase block mb-1">Porte del Uniforme</span>
                    El camibuzo debe portarse siempre por dentro del pantalón o falda, manteniendo una imagen impecable.
                  </p>
                </div>
              </div>
            </div>

            {/* ----- UNIFORME DE EDUCACIÓN FÍSICA ----- */}
            <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden group hover:shadow-md transition-shadow">
              {/* Contenedor de Imagen de Referencia */}
              <div className="aspect-4/3 w-full bg-slate-100 dark:bg-slate-900 overflow-hidden relative">
                <img 
                    src="/images/secciones/uniforme/uniforme-deportivo.png" 
                    className="w-full h-full object-contain scale-120" // Prueba con scale-100, 105, 110, 125...
                />
                <div className="absolute top-4 left-4 bg-slate-800 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                  DEPORTIVO
                </div>
              </div>

              <div className="bg-slate-800 dark:bg-slate-700 p-6 text-white flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold uppercase tracking-tight">Educación Física</h2>
                  <p className="text-slate-400 text-sm italic">Uso exclusivo para actividades deportivas</p>
                </div>
                <span className="material-symbols-outlined text-4xl opacity-80">fitness_center</span>
              </div>
              
              <div className="p-8">
                <ul className="space-y-4">
                  {[
                    { item: "Camiseta Blanca", desc: "Cuello en V con franjas rojas" },
                    { item: "Pantalón de Sudadera", desc: "Color rojo, tipo institucional" },
                    { item: "Chaqueta Gris", desc: "Con cuello rojo institucional" },
                    { item: "Tenis", desc: "Totalmente blancos de corte deportivo" },
                    { item: "Medias", desc: "Blancas de carácter deportivo" }
                  ].map((uni, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <div className="mt-1 shrink-0 w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-slate-600 dark:text-slate-400">
                        <span className="material-symbols-outlined text-sm font-bold">check</span>
                      </div>
                      <div>
                        <p className="font-bold text-slate-800 dark:text-slate-200">{uni.item}</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{uni.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-dashed border-slate-300 dark:border-slate-600">
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed text-center">
                    <span className="font-bold text-slate-700 dark:text-slate-300 uppercase block mb-1">Porte del Uniforme</span>
                    Los tenis deben mantenerse limpios y ser exclusivamente blancos para preservar la uniformidad del grupo.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Sección Informativa Inferior */}
          <div className="mt-16 bg-red-50 dark:bg-red-900/10 p-8 rounded-3xl border border-red-100 dark:border-red-900/20 text-center">
            <div className="flex justify-center mb-4">
               <span className="material-symbols-outlined text-primary text-4xl">info</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Normas Generales</h3>
            <p className="text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed italic">
              "El uniforme debe ser portado con decoro y pulcritud dentro y fuera de la institución. No está permitido combinar prendas de ambos uniformes ni el uso de accesorios no autorizados que alteren la sobriedad del mismo."
            </p>
          </div>

        </div>
      </main>

      <Footer />
      
    </div>
  );
}