import React from 'react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Este layout base simplemente renderiza la página que esté dentro de él (en este caso, el Login)
    // Más adelante, aquí podríamos poner un menú lateral (Sidebar) exclusivo para el administrador.
    <div className="admin-wrapper">
      {children}
    </div>
  );
}