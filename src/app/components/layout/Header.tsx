"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Función para cerrar el menú al hacer clic en un enlace
  const closeMenu = () => setIsMenuOpen(false);

  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  const toggleSubmenu = (name: string) => {
  setActiveSubmenu(activeSubmenu === name ? null : name);
};

  return (
    <>
      {/* Barra superior delgada */}
      <div className="bg-primary text-white py-2 px-4 text-center text-xs font-medium uppercase tracking-wider">
        <br />
      </div>
      
      {/* Navegación principal */}
      <header className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* LOGO E INICIO */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="shrink-0">
                <img 
                  src="/images/secciones/mision-y-simbolo/escudo2023.png" 
                  alt="Escudo I.E. Antonio García Paredes" 
                  className="w-12 h-12 md:w-14 md:h-14 object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div className="flex flex-col">
                <h1 className="text-lg font-extrabold leading-none tracking-tight text-slate-900 dark:text-white uppercase">
                  I.E. Antonio García Paredes
                </h1>
                <span className="text-[10px] text-slate-500 font-semibold tracking-widest uppercase">
                  Popayán, Cauca - Colombia
                </span>
              </div>
            </Link>

            {/* NAVEGACIÓN DESKTOP */}
            <nav className="hidden lg:flex items-center gap-8">
              <Link href="/" className="text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-primary transition-colors">
                Inicio
              </Link>
              
              {/* Dropdown Institucional */}
              <div className="relative dropdown group">
                <button className="flex items-center gap-1 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-primary transition-colors">
                  Institucional <span className="material-symbols-outlined text-sm">expand_more</span>
                </button>
                <div className="dropdown-menu hidden absolute left-0 mt-0 w-56 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-xl rounded-lg py-2">
                  <Link href="/institucional/mision-y-vision" className="block px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700">Misión y visión</Link>
                  <Link href="/institucional/simbolos" className="block px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700">Símbolos institucionales</Link>
                  <Link href="/institucional/himno" className="block px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700">Himno de la institución</Link>
                  <Link href="/institucional/resena" className="block px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700">Reseña histórica</Link>
                  <Link href="/institucional/uniforme" className="block px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700">Uniforme institucional</Link>
                  <Link href="/institucional/sedes" className="block px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700">Sedes</Link>
                </div>
              </div>

              {/* Dropdown Proyectos */}
              <div className="relative dropdown group">
                <button className="flex items-center gap-1 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-primary transition-colors">
                  Proyectos <span className="material-symbols-outlined text-sm">expand_more</span>
                </button>
                <div className="dropdown-menu hidden absolute left-0 mt-0 w-64 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-xl rounded-lg py-2">
                  <Link href="#" className="block px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700">Proyecto de Vida</Link>
                  <Link href="#" className="block px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700">Canción Colombiana</Link>
                  <Link href="#" className="block px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700">Educación Ambiental</Link>
                  <Link href="#" className="block px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700">Escuela de Padres</Link>
                  <Link href="#" className="block px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700">Construyendo Identidad Cultural</Link>
                </div>
              </div>

              {/* Dropdown Trámites */}
              <div className="relative dropdown group">
                <button className="flex items-center gap-1 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-primary transition-colors">
                  Trámites <span className="material-symbols-outlined text-sm">expand_more</span>
                </button>
                <div className="dropdown-menu hidden absolute left-0 mt-0 w-56 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-xl rounded-lg py-2">
                  <Link href="#" className="block px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700">Inscripciones y Matricula</Link>
                  <Link href="#" className="block px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700">Calendario Académico</Link>
                  <Link href="#" className="block px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700">Documentos</Link>
                  <Link href="#" className="block px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700">Horarios de Clase</Link>
                </div>
              </div>

              <Link href="#" className="text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-primary transition-colors">
                Directorio
              </Link>
            </nav>

            {/* BOTONES DERECHA */}
            <div className="flex items-center gap-4">
              <button className="hidden sm:block bg-primary text-white text-sm font-bold py-2.5 px-6 rounded-lg hover:bg-red-800 transition-colors shadow-lg shadow-primary/20">
                Inscripciones
              </button>
              
              {/* Botón Hamburguesa móvil */}
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden text-slate-900 dark:text-white p-2"
              >
                <span className="material-symbols-outlined text-3xl">
                  {isMenuOpen ? 'close' : 'menu'}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* --- MENÚ DESPLEGABLE MÓVIL (ACORDEÓN) --- */}
<div className={`lg:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 transition-all duration-300 ease-in-out overflow-y-auto ${isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
  <div className="px-4 py-6 space-y-2">
    <Link href="/" onClick={closeMenu} className="block text-base font-bold text-slate-900 dark:text-white py-3 border-b border-slate-100 dark:border-slate-800">
      Inicio
    </Link>

    {/* Submenú Institucional */}
    <div className="border-b border-slate-50 dark:border-slate-800/50">
      <button 
        onClick={() => toggleSubmenu('institucional')}
        className="flex items-center justify-between w-full py-4 text-xs font-bold text-primary uppercase tracking-widest"
      >
        Institucional
        <span className={`material-symbols-outlined transition-transform duration-300 ${activeSubmenu === 'institucional' ? 'rotate-180' : ''}`}>
          expand_more
        </span>
      </button>
      <div className={`grid transition-all duration-300 ease-in-out overflow-hidden ${activeSubmenu === 'institucional' ? 'max-h-80 opacity-100 mb-4' : 'max-h-0 opacity-0'}`}>
        <div className="flex flex-col gap-3 pl-4 border-l-2 border-primary/20 ml-1">
          <Link href="/institucional/mision-y-vision" onClick={closeMenu} className="text-sm text-slate-600 dark:text-slate-400">Misión y Visión</Link>
          <Link href="/institucional/simbolos" onClick={closeMenu} className="text-sm text-slate-600 dark:text-slate-400">Símbolos Institucionales</Link>
          <Link href="/institucional/himno" onClick={closeMenu} className="text-sm text-slate-600 dark:text-slate-400">Himno</Link>
          <Link href="/institucional/resena" onClick={closeMenu} className="text-sm text-slate-600 dark:text-slate-400">Reseña Histórica</Link>
          <Link href="/institucional/uniforme" onClick={closeMenu} className="text-sm text-slate-600 dark:text-slate-400">Uniforme</Link>
          <Link href="/institucional/sedes" onClick={closeMenu} className="text-sm text-slate-600 dark:text-slate-400">Sedes</Link>
        </div>
      </div>
    </div>

    {/* Submenú Proyectos */}
    <div className="border-b border-slate-50 dark:border-slate-800/50">
      <button 
        onClick={() => toggleSubmenu('proyectos')}
        className="flex items-center justify-between w-full py-4 text-xs font-bold text-primary uppercase tracking-widest"
      >
        Proyectos
        <span className={`material-symbols-outlined transition-transform duration-300 ${activeSubmenu === 'proyectos' ? 'rotate-180' : ''}`}>
          expand_more
        </span>
      </button>
      <div className={`grid transition-all duration-300 ease-in-out overflow-hidden ${activeSubmenu === 'proyectos' ? 'max-h-64 opacity-100 mb-4' : 'max-h-0 opacity-0'}`}>
        <div className="flex flex-col gap-3 pl-4 border-l-2 border-primary/20 ml-1">
          <Link href="#" onClick={closeMenu} className="text-sm text-slate-600 dark:text-slate-400">Proyecto de Vida</Link>
          <Link href="#" onClick={closeMenu} className="text-sm text-slate-600 dark:text-slate-400">Canción Colombiana</Link>
          <Link href="#" onClick={closeMenu} className="text-sm text-slate-600 dark:text-slate-400">Educación Ambiental</Link>
          <Link href="#" onClick={closeMenu} className="text-sm text-slate-600 dark:text-slate-400">Escuela de Padres</Link>
          <Link href="#" onClick={closeMenu} className="text-sm text-slate-600 dark:text-slate-400">Construyendo Identidad Cultural</Link>
        </div>
      </div>
    </div>

    {/* Submenú Trámites */}
    <div className="border-b border-slate-50 dark:border-slate-800/50">
      <button 
        onClick={() => toggleSubmenu('tramites')}
        className="flex items-center justify-between w-full py-4 text-xs font-bold text-primary uppercase tracking-widest"
      >
        Trámites
        <span className={`material-symbols-outlined transition-transform duration-300 ${activeSubmenu === 'tramites' ? 'rotate-180' : ''}`}>
          expand_more
        </span>
      </button>
      <div className={`grid transition-all duration-300 ease-in-out overflow-hidden ${activeSubmenu === 'tramites' ? 'max-h-40 opacity-100 mb-4' : 'max-h-0 opacity-0'}`}>
        <div className="flex flex-col gap-3 pl-4 border-l-2 border-primary/20 ml-1">
          <Link href="#" onClick={closeMenu} className="text-sm text-slate-600 dark:text-slate-400">Inscripciones y Matricula</Link>
          <Link href="#" onClick={closeMenu} className="text-sm text-slate-600 dark:text-slate-400">Calendario Académico</Link>
          <Link href="#" onClick={closeMenu} className="text-sm text-slate-600 dark:text-slate-400">Documentos</Link>
          <Link href="#" onClick={closeMenu} className="text-sm text-slate-600 dark:text-slate-400">Horarios de Clase</Link>
        </div>
      </div>
    </div>

    <Link href="#" onClick={closeMenu} className="block text-sm font-bold text-slate-900 dark:text-white py-4 border-b border-slate-50 dark:border-slate-800">
      Directorio
    </Link>

    <div className="pt-6">
      <button className="w-full bg-primary text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20">
        Inscripciones
      </button>
    </div>
  </div>
</div>
      </header>
    </>
  );
};