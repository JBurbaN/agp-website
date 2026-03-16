import React from 'react';

export const StatsSection = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-30">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-xl border-b-4 border-primary flex items-center gap-6">
          <div className="bg-primary/10 p-4 rounded-full">
            <span className="material-symbols-outlined text-primary text-4xl">history_edu</span>
          </div>
          <div>
            <p className="text-3xl font-black text-slate-900 dark:text-white">45+</p>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Años de Trayectoria</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-xl border-b-4 border-primary flex items-center gap-6">
          <div className="bg-primary/10 p-4 rounded-full">
            <span className="material-symbols-outlined text-primary text-4xl">domain</span>
          </div>
          <div>
            <p className="text-3xl font-black text-slate-900 dark:text-white">5</p>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Sedes Educativas</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-xl border-b-4 border-primary flex items-center gap-6">
          <div className="bg-primary/10 p-4 rounded-full">
            <span className="material-symbols-outlined text-primary text-4xl">groups</span>
          </div>
          <div>
            <p className="text-3xl font-black text-slate-900 dark:text-white">
              14<span className="text-3xl">00+</span>
            </p>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Estudiantes</p>
          </div>
        </div>

      </div>
    </div>
  );
};