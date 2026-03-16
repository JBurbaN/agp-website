import React from 'react';

export const ServicesSection = () => {
  return (
    <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-end justify-between mb-12">
        <div>
          <span className="text-primary font-bold tracking-widest uppercase text-sm mb-2 block">
            Servicios al estudiante
          </span>
          <h2 className="text-4xl font-black text-slate-900 dark:text-white">Acceso Rápido</h2>
        </div>
      </div>
      
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        <a href="#" className="group bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all border border-slate-100 dark:border-slate-700 text-center">
          <span className="material-symbols-outlined text-primary text-3xl mb-3 block group-hover:scale-110 transition-transform">calendar_month</span>
          <p className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">Calendario Académico</p>
        </a>
        <a href="#" className="group bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all border border-slate-100 dark:border-slate-700 text-center">
          <span className="material-symbols-outlined text-primary text-3xl mb-3 block group-hover:scale-110 transition-transform">schedule</span>
          <p className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">Horarios de Clase</p>
        </a>
        <a href="#" className="group bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all border border-slate-100 dark:border-slate-700 text-center">
          <span className="material-symbols-outlined text-primary text-3xl mb-3 block group-hover:scale-110 transition-transform">checklist</span>
          <p className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">Lista de Útiles</p>
        </a>
        <a href="#" className="group bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all border border-slate-100 dark:border-slate-700 text-center">
          <span className="material-symbols-outlined text-primary text-3xl mb-3 block group-hover:scale-110 transition-transform">person_add</span>
          <p className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">Inscripciones<br/>y matriculas</p>
        </a>
        <a href="#" className="group bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all border border-slate-100 dark:border-slate-700 text-center">
          <span className="material-symbols-outlined text-primary text-3xl mb-3 block group-hover:scale-110 transition-transform">menu_book</span>
          <p className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">Manual de<br/>Convivencia</p>
        </a>
        <a href="#" className="group bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all border border-slate-100 dark:border-slate-700 text-center">
          <span className="material-symbols-outlined text-primary text-3xl mb-3 block group-hover:scale-110 transition-transform">description</span>
          <p className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">PEI<br/>Institucional</p>
        </a>
      </div>
    </section>
  );
};