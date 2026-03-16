import React from 'react';
// Importamos los iconos específicos de las librerías 'fa' (FontAwesome) y 'io5' (Ionicons)
import { FaFacebook } from 'react-icons/fa';
import { IoLogoInstagram, IoLogoYoutube } from 'react-icons/io5';

export const Footer = () => {
  return (
    <footer className="bg-primary text-white pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="shrink-0">
                <img 
                  src="/images/secciones/mision-y-simbolo/escudo2023.png" 
                  alt="Escudo I.E. Antonio García Paredes" 
                  className="w-12 h-12 md:w-14 md:h-14 object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <h2 className="text-2xl font-black uppercase leading-tight">I.E. Antonio García Paredes</h2>
            </div>
            <p className="text-red-100 leading-relaxed mb-6 font-medium">
              Comprometidos con la formación de ciudadanos íntegros, creativos y respetuosos de su patrimonio cultural y natural en la ciudad de Popayán.
            </p>
            <div className="flex gap-4">
              {/* Facebook */}
              <a 
                href="https://www.facebook.com/profile.php?id=61580842899426" // <-- Pon tu enlace real aquí
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/10 p-2.5 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center text-white hover:text-white group"
                title="Síguenos en Facebook"
              >
                <FaFacebook className="text-xl group-hover:scale-110 transition-transform" />
              </a>

              {/* Instagram */}
              <a 
                href="https://www.instagram.com/ieagp_popayan/" // <-- Pon tu enlace real aquí
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/10 p-2.5 rounded-lg hover:bg-pink-600 transition-colors flex items-center justify-center text-white hover:text-white group"
                title="Síguenos en Instagram"
              >
                <IoLogoInstagram className="text-xl group-hover:scale-110 transition-transform" />
              </a>

              {/* YouTube */}
              <a 
                href="https://www.youtube.com/@i.e.antoniogarciaparedes700" // <-- Pon tu enlace real aquí
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/10 p-2.5 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center text-white hover:text-white group"
                title="Suscríbete en YouTube"
              >
                <IoLogoYoutube className="text-xl group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-6 border-b border-white/20 pb-4">Enlaces Rápidos</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-red-100 hover:text-white flex items-center gap-2 transition-colors"><span className="material-symbols-outlined text-sm">chevron_right</span> Calendario Académico</a></li>
              <li><a href="#" className="text-red-100 hover:text-white flex items-center gap-2 transition-colors"><span className="material-symbols-outlined text-sm">chevron_right</span> Lista de Útiles</a></li>
              <li><a href="#" className="text-red-100 hover:text-white flex items-center gap-2 transition-colors"><span className="material-symbols-outlined text-sm">chevron_right</span> Manual de Convivencia</a></li>
              <li><a href="#" className="text-red-100 hover:text-white flex items-center gap-2 transition-colors"><span className="material-symbols-outlined text-sm">chevron_right</span> PEI Institucional</a></li>
              <li><a href="#" className="text-red-100 hover:text-white flex items-center gap-2 transition-colors"><span className="material-symbols-outlined text-sm">chevron_right</span> Horarios de Atención</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-6 border-b border-white/20 pb-4">Contacto</h3>
            <ul className="space-y-4">
              <li className="flex gap-4 items-start">
                <span className="material-symbols-outlined mt-1">location_on</span>
                <span className="text-red-100 font-medium">CL 17 #12-40, Barrio La Ladera - 'La Casona'<br/>Popayán, Cauca - Colombia</span>
              </li>
              <li className="flex gap-4 items-start">
                <span className="material-symbols-outlined">call</span>
                <span className="text-red-100 font-medium">+57 (314) 619 8573</span>
              </li>
              <li className="flex gap-4 items-start">
                <span className="material-symbols-outlined">mail</span>
                <span className="text-red-100 font-medium">ieantoniogarciaparedes@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-red-200 font-medium">
          <p>© 2024 Institución Educativa Antonio García Paredes. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Protección de Datos</a>
            <a href="#" className="hover:text-white transition-colors">Términos y Condiciones</a>
          </div>
        </div>
      </div>
    </footer>
  );
};