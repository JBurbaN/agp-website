// Importamos las funciones necesarias del SDK principal
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";

// Importamos los servicios que usarás para tu panel administrativo
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA_MXlZYuC9EdYd0e0S9zJ3yVKcuN4L3kg",
  authDomain: "garcia-paredes-web.firebaseapp.com",
  projectId: "garcia-paredes-web",
  storageBucket: "garcia-paredes-web.firebasestorage.app",
  messagingSenderId: "984576824727",
  appId: "1:984576824727:web:0026afbc5ae7d1027d20d2",
  measurementId: "G-LTK90GTECN"
};

// INICIALIZACIÓN SEGURA PARA NEXT.JS
// Comprobamos si ya hay una app inicializada para evitar errores de duplicidad 
// cuando Next.js recarga la página en modo desarrollo.
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Inicializamos los servicios
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Analytics solo debe ejecutarse en el lado del cliente (navegador)
let analytics;
if (typeof window !== "undefined") {
  isSupported().then((yes) => {
    if (yes) {
      analytics = getAnalytics(app);
    }
  });
}

// Exportamos las herramientas para usarlas en cualquier parte del proyecto
export { app, auth, db, storage, analytics };