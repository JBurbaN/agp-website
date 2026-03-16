import React from 'react';
// IMPORTANTE: Ajusta estas rutas según la ubicación exacta de tus componentes
import { Header } from '../../../app/components/layout/Header'; 
import { Footer } from '../../../app/components/layout/Footer'; 

export default function HimnoPage() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-slate-900 flex flex-col">
      
      <Header />

      <main className="grow py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Encabezado de la página */}
          <div className="text-center mb-16 md:mb-20">
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-6 uppercase">
              Himno Institucional
            </h1>
            <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center text-primary mx-auto mb-6 shadow-inner">
              <span className="material-symbols-outlined text-5xl">music_note</span>
            </div>

            <div className="w-24 h-1.5 bg-primary mx-auto rounded-full mb-8"></div>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Entonamos nuestro himno con orgullo, recordando siempre los valores y la historia que nos unen como familia educativa en Popayán.
            </p>

            {/* Reproductor de Video de YouTube Embebido */}
            <div className="mt-12 max-w-3xl mx-auto bg-white dark:bg-slate-800 p-3 rounded-3xl shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-shadow duration-300">
              <div className="aspect-video w-full rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-900 relative">
                <iframe 
                  className="absolute top-0 left-0 w-full h-full border-0"
                  src="https://www.youtube.com/embed/ATkba3ZZB0M?si=saOnJc_qxZwT38w_" 
                  title="Himno de la Institución Educativa Antonio García Paredes" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  referrerPolicy="strict-origin-when-cross-origin" 
                  allowFullScreen
                ></iframe>
              </div>
              <div className="flex items-center justify-center gap-2 mt-4 mb-2">
                <span className="material-symbols-outlined text-red-600 text-xl">play_circle</span>
                <p className="text-sm text-slate-600 dark:text-slate-300 font-medium">
                  Escucha y canta nuestro himno oficial
                </p>
              </div>
            </div>

            {/* CRÉDITOS - Letra y Música */}
            <div className="mt-8 flex flex-wrap justify-center gap-4 md:gap-8">
              <div className="bg-white dark:bg-slate-800 px-6 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <p className="text-[10px] uppercase tracking-[0.2em] text-primary font-bold mb-1">Letra</p>
                <p className="text-slate-800 dark:text-white font-semibold text-sm">Esp. María del Socorro Solano Fernández</p>
              </div>
              <div className="bg-white dark:bg-slate-800 px-6 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <p className="text-[10px] uppercase tracking-[0.2em] text-primary font-bold mb-1">Música</p>
                <p className="text-slate-800 dark:text-white font-semibold text-sm">Esp. Oscar E. Muñoz Muñoz</p>
              </div>
            </div>
          </div>

          {/* Letra del Himno */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200 dark:border-slate-700 relative overflow-hidden mb-12">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-bl-full -z-10"></div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 text-center md:text-left">
              
              <div className="md:col-span-5 md:sticky md:top-24 h-fit bg-slate-50 dark:bg-slate-900/50 p-8 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-inner">
                <h3 className="font-bold text-2xl text-primary mb-6 uppercase tracking-widest text-center flex flex-col items-center gap-2">
                  <span className="material-symbols-outlined text-3xl">star</span>
                  Coro
                </h3>
                <p className="text-slate-800 dark:text-slate-200 whitespace-pre-line italic leading-loose text-xl font-medium text-center">
                  Cantemos cantemos con emoción
                  a Antonio García Paredes nuestra institución
                  semilla fecunda de ciencia, cultura y virtud
                  que hoy Popayán nos exalta con gratitud.
                </p>
              </div>

              <div className="md:col-span-7 space-y-12">
                <div>
                  <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-4 uppercase tracking-wider flex items-center justify-center md:justify-start gap-3">
                    <span className="w-8 h-0.5 bg-primary/50"></span>
                    Estrofa I
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 whitespace-pre-line leading-relaxed text-lg">
                    ¡Oh adorada acogedora institución!
                    gestada por lucha bravía
                    de una comunidad que ya se extinguía
                    anhelando tener ¡Educación!, ¡Educación!
                  </p>
                </div>
                
                <div>
                  <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-4 uppercase tracking-wider flex items-center justify-center md:justify-start gap-3">
                    <span className="w-8 h-0.5 bg-primary/50"></span>
                    Estrofa II
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 whitespace-pre-line leading-relaxed text-lg">
                    Eres fuente de identidad cultural,
                    responsabilidad, respeto y equidad
                    tu nombre nos da fecundidad
                    honor y ríqueza ambiental.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-4 uppercase tracking-wider flex items-center justify-center md:justify-start gap-3">
                    <span className="w-8 h-0.5 bg-primary/50"></span>
                    Estrofa III
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 whitespace-pre-line leading-relaxed text-lg">
                    La juventud te proclama en la historia
                    evocándote con júbilo y amor
                    tu saber nos llena de gloria
                    ¡oh excelso e insigne educador!
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-4 uppercase tracking-wider flex items-center justify-center md:justify-start gap-3">
                    <span className="w-8 h-0.5 bg-primary/50"></span>
                    Estrofa IV
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 whitespace-pre-line leading-relaxed text-lg">
                    Querida estancia Dios te bendice
                    y tu regada semilla florece
                    porque guardas la sabiduría
                    que a la mente del hombre guía.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* SECCIÓN: INTERPRETACIÓN */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3 mb-10 border-b border-slate-100 dark:border-slate-700 pb-6">
              <span className="material-symbols-outlined text-primary text-3xl">menu_book</span>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white uppercase tracking-tight">Interpretación del Himno</h2>
            </div>

            <div className="space-y-8">
              <div className="flex gap-4">
                <span className="text-primary font-bold text-lg min-w-20">Coro:</span>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed italic">El preescolar es el germen, la semilla que se va preparando en todo el sentido del saber (ciencia, cultura, vírtud) y el reconocimiento en la ciudad de Popayán.</p>
              </div>
              <div className="flex gap-4">
                <span className="text-primary font-bold text-lg min-w-20">I:</span>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed italic">La institución nace como fruto del esfuerzo y lucha de una comunidad que se extinguía al privatizar la primaría del Real Colegio San Francisco de Asís en el año de 1980.</p>
              </div>
              <div className="flex gap-4">
                <span className="text-primary font-bold text-lg min-w-20">II:</span>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed italic">En 1990 se organiza el primer encuentro de la canción Colombiana evento con el cuál se pretende fomentar el amor por la música y danza folclórica Colombiana.</p>
              </div>
              <div className="flex gap-4">
                <span className="text-primary font-bold text-lg min-w-20">III:</span>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed italic">Se resalta reconocimiento, a la memoría del insigne educador caucano don Antonio García Paredes quien estudió la flora y la fauna del Cauca con gran entusiasmo.</p>
              </div>
              <div className="flex gap-4">
                <span className="text-primary font-bold text-lg min-w-20">IV:</span>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed italic">Dios centro de nuestras vidas entrega sabiduría, para guiar la mente de los educandos.</p>
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
      
    </div>
  );
}