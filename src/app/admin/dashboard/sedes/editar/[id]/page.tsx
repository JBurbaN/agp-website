"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, db, storage } from '../../../../../lib/firebase';

export default function EditarSedePage() {
  const router = useRouter();
  const params = useParams();
  const sedeId = params.id as string;

  const [loadingAuth, setLoadingAuth] = useState(true);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Estados del formulario
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');
  const [barrio, setBarrio] = useState('');
  const [calendario, setCalendario] = useState('A');
  const [zona, setZona] = useState('Urbana');
  const [jornada, setJornada] = useState('Mañana');
  const [genero, setGenero] = useState('Mixto');
  
  const [niveles, setNiveles] = useState({
    preescolar: false, primaria: false, secundaria: false, media: false
  });

  const [ubicacion, setUbicacion] = useState('');
  const [galeriaActual, setGaleriaActual] = useState<string[]>([]);
  const [nuevasImagenes, setNuevasImagenes] = useState<FileList | null>(null);

  const [camposAdicionales, setCamposAdicionales] = useState([{ titulo: '', contenido: '' }]);

  // 1. Cargar datos de la sede
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push('/admin/login');
      } else {
        setLoadingAuth(false);
        try {
          const docRef = doc(db, 'sedes', sedeId);
          const docSnap = await getDoc(docRef);
          
          if (docSnap.exists()) {
            const data = docSnap.data();
            setNombre(data.nombre || '');
            setTelefono(data.telefono || '');
            setDireccion(data.direccion || '');
            setBarrio(data.barrio || '');
            setCalendario(data.calendario || 'A');
            setZona(data.zona || 'Urbana');
            setJornada(data.jornada || 'Mañana');
            setGenero(data.genero || 'Mixto');
            setNiveles(data.niveles || { preescolar: false, primaria: false, secundaria: false, media: false });
            setUbicacion(data.ubicacion || '');
            setGaleriaActual(data.galeria || []);
            
            if (data.camposAdicionales && data.camposAdicionales.length > 0) {
              setCamposAdicionales(data.camposAdicionales);
            }
          } else {
            setMessage({ type: 'error', text: 'Sede no encontrada.' });
          }
        } catch (error) {
          console.error("Error al cargar sede:", error);
          setMessage({ type: 'error', text: 'Error al cargar los datos.' });
        } finally {
          setIsLoadingData(false);
        }
      }
    });
    return () => unsubscribe();
  }, [sedeId, router]);

  // Manejadores
  const handleNivelChange = (nivel: keyof typeof niveles) => {
    setNiveles(prev => ({ ...prev, [nivel]: !prev[nivel] }));
  };

  const agregarCampo = () => setCamposAdicionales([...camposAdicionales, { titulo: '', contenido: '' }]);
  
  const actualizarCampo = (index: number, campo: 'titulo' | 'contenido', valor: string) => {
    const nuevos = [...camposAdicionales];
    nuevos[index][campo] = valor;
    setCamposAdicionales(nuevos);
  };
  
  const eliminarCampo = (index: number) => {
    setCamposAdicionales(camposAdicionales.filter((_, i) => i !== index));
  };

  // Enviar actualización
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre || !direccion) {
      setMessage({ type: 'error', text: 'Nombre y dirección son obligatorios.' });
      return;
    }

    setIsSubmitting(true);
    setMessage({ type: 'info', text: 'Actualizando información de la sede...' });

    try {
      let urlsFinales = [...galeriaActual];

      // Si subieron nuevas fotos, las añadimos a la galería existente
      if (nuevasImagenes && nuevasImagenes.length > 0) {
        setMessage({ type: 'info', text: 'Subiendo nuevas imágenes...' });
        for (let i = 0; i < nuevasImagenes.length; i++) {
          const file = nuevasImagenes[i];
          const imageRef = ref(storage, `sedes/${Date.now()}_${file.name}`);
          const snapshot = await uploadBytes(imageRef, file);
          const url = await getDownloadURL(snapshot.ref);
          urlsFinales.push(url);
        }
      }

      const camposValidos = camposAdicionales.filter(c => c.titulo.trim() !== '' && c.contenido.trim() !== '');

      const docRef = doc(db, 'sedes', sedeId);
      await updateDoc(docRef, {
        nombre, telefono, direccion, barrio,
        calendario, zona, jornada, genero,
        niveles, ubicacion,
        galeria: urlsFinales,
        camposAdicionales: camposValidos
      });

      setMessage({ type: 'success', text: '¡Sede actualizada correctamente!' });
      setTimeout(() => router.push('/admin/dashboard/sedes'), 2000);

    } catch (error) {
      console.error("Error al actualizar:", error);
      setMessage({ type: 'error', text: 'Hubo un error al actualizar la sede.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loadingAuth || isLoadingData) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-primary border-t-2"></div></div>;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => router.push('/admin/dashboard/sedes')} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-600 dark:text-slate-300">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Editar Sede: {nombre}</h1>
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
                  <input type="text" required value={nombre} onChange={e => setNombre(e.target.value)} className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-primary dark:bg-slate-700 dark:text-white" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Teléfono</label>
                  <input type="text" value={telefono} onChange={e => setTelefono(e.target.value)} className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-primary dark:bg-slate-700 dark:text-white" />
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

              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Niveles y Grados Ofrecidos</label>
                <div className="flex flex-wrap gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={niveles.preescolar} onChange={() => handleNivelChange('preescolar')} className="w-4 h-4 text-primary rounded" />
                    <span className="text-sm dark:text-slate-300">Preescolar</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={niveles.primaria} onChange={() => handleNivelChange('primaria')} className="w-4 h-4 text-primary rounded" />
                    <span className="text-sm dark:text-slate-300">Básica Primaria</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={niveles.secundaria} onChange={() => handleNivelChange('secundaria')} className="w-4 h-4 text-primary rounded" />
                    <span className="text-sm dark:text-slate-300">Básica Secundaria</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={niveles.media} onChange={() => handleNivelChange('media')} className="w-4 h-4 text-primary rounded" />
                    <span className="text-sm dark:text-slate-300">Educación Media</span>
                  </label>
                </div>
              </div>
            </div>

            {/* 3. Multimedia y Mapa */}
            <div>
              <h2 className="text-lg font-bold text-primary border-b border-slate-200 dark:border-slate-700 pb-2 mb-4">Multimedia y Ubicación</h2>
              
              {/* Mostrar Galería Actual */}
              {galeriaActual.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Imágenes actuales ({galeriaActual.length})</p>
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {galeriaActual.map((img, i) => (
                      <img key={i} src={img} alt={`Foto ${i}`} className="h-16 w-16 object-cover rounded border border-slate-200" />
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Agregar nuevas imágenes a la galería</label>
                  <input 
                    type="file" multiple accept="image/*"
                    onChange={e => setNuevasImagenes(e.target.files)}
                    className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer dark:text-slate-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Enlace de Google Maps (Opcional)</label>
                  <input type="text" value={ubicacion} onChange={e => setUbicacion(e.target.value)} className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-primary dark:bg-slate-700 dark:text-white" />
                </div>
              </div>
            </div>

            {/* 4. Campos Dinámicos */}
            <div>
              <div className="flex justify-between items-end border-b border-slate-200 dark:border-slate-700 pb-2 mb-4">
                <h2 className="text-lg font-bold text-primary">Información Adicional</h2>
                <button type="button" onClick={agregarCampo} className="text-sm text-primary font-bold hover:bg-primary/10 px-3 py-1 rounded transition-colors flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">add_circle</span> Agregar Campo
                </button>
              </div>
              
              <div className="space-y-4">
                {camposAdicionales.map((campo, index) => (
                  <div key={index} className="flex gap-4 items-start bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                    <div className="flex-1 space-y-3">
                      <input 
                        type="text" value={campo.titulo} onChange={e => actualizarCampo(index, 'titulo', e.target.value)}
                        className="w-full px-3 py-1.5 text-sm border border-slate-300 dark:border-slate-600 rounded focus:ring-primary dark:bg-slate-700 dark:text-white" placeholder="Título" 
                      />
                      <textarea 
                        value={campo.contenido} onChange={e => actualizarCampo(index, 'contenido', e.target.value)} rows={2}
                        className="w-full px-3 py-1.5 text-sm border border-slate-300 dark:border-slate-600 rounded focus:ring-primary dark:bg-slate-700 dark:text-white resize-none" placeholder="Contenido..." 
                      />
                    </div>
                    <button type="button" onClick={() => eliminarCampo(index)} className="text-red-500 hover:bg-red-50 p-2 rounded transition-colors mt-1">
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-slate-200 dark:border-slate-700">
              <button type="submit" disabled={isSubmitting} className="w-full md:w-auto px-8 py-3 bg-primary hover:bg-red-800 text-white font-bold rounded-lg shadow-sm transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                {isSubmitting ? (
                  <><span className="animate-spin material-symbols-outlined text-sm">refresh</span> Guardando...</>
                ) : (
                  <><span className="material-symbols-outlined text-sm">save</span> Actualizar Sede</>
                )}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}