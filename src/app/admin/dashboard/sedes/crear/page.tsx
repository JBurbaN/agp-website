"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, db, storage } from '../../../../lib/firebase';

export default function CrearSedePage() {
  const router = useRouter();
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // 1. Estados de información básica
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');
  const [barrio, setBarrio] = useState('');
  
  // 2. Estados de selectores
  const [calendario, setCalendario] = useState('A');
  const [zona, setZona] = useState('Urbana');
  const [jornada, setJornada] = useState('Mañana');
  const [genero, setGenero] = useState('Mixto');
  
  // 3. Estado de Niveles (Checkboxes)
  const [niveles, setNiveles] = useState({
    preescolar: false,
    primaria: false,
    secundaria: false,
    media: false
  });

  // 4. Ubicación y Galería
  const [ubicacion, setUbicacion] = useState(''); // URL o Iframe de Google Maps
  const [imagenes, setImagenes] = useState<FileList | null>(null);

  // 5. Estado de Campos Dinámicos
  const [camposAdicionales, setCamposAdicionales] = useState([{ titulo: '', contenido: '' }]);

  // Protección de ruta
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) router.push('/admin/login');
      else setLoadingAuth(false);
    });
    return () => unsubscribe();
  }, [router]);

  // Manejador de Niveles
  const handleNivelChange = (nivel: keyof typeof niveles) => {
    setNiveles(prev => ({ ...prev, [nivel]: !prev[nivel] }));
  };

  // Manejadores de Campos Dinámicos
  const agregarCampo = () => {
    setCamposAdicionales([...camposAdicionales, { titulo: '', contenido: '' }]);
  };

  const actualizarCampo = (index: number, campo: 'titulo' | 'contenido', valor: string) => {
    const nuevosCampos = [...camposAdicionales];
    nuevosCampos[index][campo] = valor;
    setCamposAdicionales(nuevosCampos);
  };

  const eliminarCampo = (index: number) => {
    const nuevosCampos = camposAdicionales.filter((_, i) => i !== index);
    setCamposAdicionales(nuevosCampos);
  };

  // Envío a Firebase
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre || !direccion) {
      setMessage({ type: 'error', text: 'El nombre y la dirección son obligatorios.' });
      return;
    }

    setIsSubmitting(true);
    setMessage({ type: 'info', text: 'Subiendo galería y guardando sede...' });

    try {
      const imageUrls: string[] = [];

      // Subir múltiples imágenes a Storage
      if (imagenes && imagenes.length > 0) {
        for (let i = 0; i < imagenes.length; i++) {
          const file = imagenes[i];
          const imageRef = ref(storage, `sedes/${Date.now()}_${file.name}`);
          const snapshot = await uploadBytes(imageRef, file);
          const url = await getDownloadURL(snapshot.ref);
          imageUrls.push(url);
        }
      }

      // Filtrar campos dinámicos vacíos para no guardar basura en la BD
      const camposValidos = camposAdicionales.filter(c => c.titulo.trim() !== '' && c.contenido.trim() !== '');

      // Guardar en Firestore
      await addDoc(collection(db, 'sedes'), {
        nombre, telefono, direccion, barrio,
        calendario, zona, jornada, genero,
        niveles, ubicacion,
        galeria: imageUrls,
        camposAdicionales: camposValidos,
        createdAt: serverTimestamp()
      });

      setMessage({ type: 'success', text: '¡Sede creada correctamente!' });
      setTimeout(() => router.push('/admin/dashboard/sedes'), 2000);

    } catch (error) {
      console.error("Error al guardar:", error);
      setMessage({ type: 'error', text: 'Hubo un error al guardar la sede.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loadingAuth) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-primary border-t-2"></div></div>;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => router.push('/admin/dashboard/sedes')} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-600 dark:text-slate-300">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Registrar Nueva Sede</h1>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 md:p-8">
          {message.text && (
            <div className={`mb-6 px-4 py-3 rounded-lg text-sm font-medium text-center ${message.type === 'error' ? 'bg-red-50 text-red-600 border-red-200' : message.type === 'success' ? 'bg-green-50 text-green-600 border-green-200' : 'bg-blue-50 text-blue-600 border-blue-200'} border`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* 1. Información Principal */}
            <div>
              <h2 className="text-lg font-bold text-primary border-b border-slate-200 dark:border-slate-700 pb-2 mb-4">Información Principal</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Nombre de la Sede *</label>
                  <input type="text" required value={nombre} onChange={e => setNombre(e.target.value)} className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-primary dark:bg-slate-700 dark:text-white" placeholder="Ej: Sede Principal" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Teléfono</label>
                  <input type="text" value={telefono} onChange={e => setTelefono(e.target.value)} className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-primary dark:bg-slate-700 dark:text-white" placeholder="Ej: (602) 823 0000" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Dirección *</label>
                  <input type="text" required value={direccion} onChange={e => setDireccion(e.target.value)} className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-primary dark:bg-slate-700 dark:text-white" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Barrio</label>
                  <input type="text" value={barrio} onChange={e => setBarrio(e.target.value)} className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-primary dark:bg-slate-700 dark:text-white" />
                </div>
              </div>
            </div>

            {/* 2. Características */}
            <div>
              <h2 className="text-lg font-bold text-primary border-b border-slate-200 dark:border-slate-700 pb-2 mb-4">Características Educativas</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Calendario</label>
                  <select value={calendario} onChange={e => setCalendario(e.target.value)} className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 dark:text-white">
                    <option value="A">Calendario A</option>
                    <option value="B">Calendario B</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Zona</label>
                  <select value={zona} onChange={e => setZona(e.target.value)} className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 dark:text-white">
                    <option value="Urbana">Urbana</option>
                    <option value="Rural">Rural</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Jornada</label>
                  <select value={jornada} onChange={e => setJornada(e.target.value)} className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 dark:text-white">
                    <option value="Mañana">Mañana</option>
                    <option value="Tarde">Tarde</option>
                    <option value="Mañana y Tarde">Mañana y Tarde</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Género</label>
                  <select value={genero} onChange={e => setGenero(e.target.value)} className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 dark:text-white">
                    <option value="Mixto">Mixto</option>
                    <option value="Femenino">Femenino</option>
                    <option value="Masculino">Masculino</option>
                  </select>
                </div>
              </div>

              {/* Niveles */}
              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Niveles y Grados Ofrecidos</label>
                <div className="flex flex-wrap gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={niveles.preescolar} onChange={() => handleNivelChange('preescolar')} className="w-4 h-4 text-primary rounded focus:ring-primary" />
                    <span className="text-sm dark:text-slate-300">Preescolar (Transición)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={niveles.primaria} onChange={() => handleNivelChange('primaria')} className="w-4 h-4 text-primary rounded focus:ring-primary" />
                    <span className="text-sm dark:text-slate-300">Básica Primaria (1º a 5º)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={niveles.secundaria} onChange={() => handleNivelChange('secundaria')} className="w-4 h-4 text-primary rounded focus:ring-primary" />
                    <span className="text-sm dark:text-slate-300">Básica Secundaria (6º a 9º)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={niveles.media} onChange={() => handleNivelChange('media')} className="w-4 h-4 text-primary rounded focus:ring-primary" />
                    <span className="text-sm dark:text-slate-300">Educación Media (10º y 11º)</span>
                  </label>
                </div>
              </div>
            </div>

            {/* 3. Multimedia y Mapa */}
            <div>
              <h2 className="text-lg font-bold text-primary border-b border-slate-200 dark:border-slate-700 pb-2 mb-4">Multimedia y Ubicación</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Galería de Imágenes de la Sede</label>
                  <p className="text-xs text-slate-500 mb-2">Puedes seleccionar múltiples fotos al mismo tiempo.</p>
                  <input 
                    type="file" multiple accept="image/*"
                    onChange={e => setImagenes(e.target.files)}
                    className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer dark:text-slate-400"
                  />
                  {imagenes && <p className="text-xs text-green-600 mt-2 font-medium">{imagenes.length} imagen(es) seleccionada(s).</p>}
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Enlace de Google Maps (Opcional)</label>
                  <input type="text" value={ubicacion} onChange={e => setUbicacion(e.target.value)} className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-primary dark:bg-slate-700 dark:text-white" placeholder="Pega aquí la URL de Google Maps..." />
                </div>
              </div>
            </div>

            {/* 4. Campos Dinámicos */}
            <div>
              <div className="flex justify-between items-end border-b border-slate-200 dark:border-slate-700 pb-2 mb-4">
                <h2 className="text-lg font-bold text-primary">Información Adicional (Opcional)</h2>
                <button type="button" onClick={agregarCampo} className="text-sm text-primary font-bold hover:bg-primary/10 px-3 py-1 rounded transition-colors flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">add_circle</span> Agregar Campo
                </button>
              </div>
              
              <div className="space-y-4">
                {camposAdicionales.map((campo, index) => (
                  <div key={index} className="flex gap-4 items-start bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700 relative group">
                    <div className="flex-1 space-y-3">
                      <input 
                        type="text" value={campo.titulo} onChange={e => actualizarCampo(index, 'titulo', e.target.value)}
                        className="w-full px-3 py-1.5 text-sm border border-slate-300 dark:border-slate-600 rounded focus:ring-primary dark:bg-slate-700 dark:text-white" placeholder="Ej: Estado, Director, Observaciones..." 
                      />
                      <textarea 
                        value={campo.contenido} onChange={e => actualizarCampo(index, 'contenido', e.target.value)} rows={2}
                        className="w-full px-3 py-1.5 text-sm border border-slate-300 dark:border-slate-600 rounded focus:ring-primary dark:bg-slate-700 dark:text-white resize-none" placeholder="Contenido..." 
                      />
                    </div>
                    {camposAdicionales.length > 1 && (
                      <button type="button" onClick={() => eliminarCampo(index)} className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 p-2 rounded transition-colors tooltip mt-1">
                        <span className="material-symbols-outlined">delete</span>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-slate-200 dark:border-slate-700">
              <button type="submit" disabled={isSubmitting} className="w-full md:w-auto px-8 py-3 bg-primary hover:bg-red-800 text-white font-bold rounded-lg shadow-sm transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                {isSubmitting ? (
                  <><span className="animate-spin material-symbols-outlined text-sm">refresh</span> Guardando Sede...</>
                ) : (
                  <><span className="material-symbols-outlined text-sm">domain_add</span> Guardar Sede Institucional</>
                )}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}