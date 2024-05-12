import { NavLink } from "react-router-dom";
import React, { useEffect, useState } from 'react';

export const NavBar = () => {
  const btnLink = 'block inline-block py-1 text-white hover:text-secondary cursor-pointer mr-4'
  const activeLink = 'block inline-block py-1 text-secondary mr-4'

  const handleLogout = () => {
    localStorage.removeItem('saveRol'); // Borra el dato del localStorage
    window.location.reload(); // Recarga la página
  };

  const [rol, setRol] = useState(null);

  const obtenerRol = () => {
    const datoGuardado = localStorage.getItem('saveRol');
    setRol(datoGuardado);
  };

  useEffect(() => {
    obtenerRol();
  }, []); 
  return (
    <>
      {rol === 'admi' ? (
        <header className="text-gray-600 body-font">
          <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
            <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
              </svg>
              <span className="ml-3 text-xl font-semiblod text-white">SOFTINNOVATE SOLUTIONS</span>
            </a>
            <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">

              <NavLink to="/gestionar-ambiente" className={({ isActive }) => isActive ? activeLink : btnLink}>Gestionar ambiente</NavLink>
              <NavLink to="/ajustar-reserva" className={({ isActive }) => isActive ? activeLink : btnLink}>Ajustar reserva</NavLink>
              <NavLink to="/dashboard" className={({ isActive }) => isActive ? activeLink : btnLink}>Dashboard</NavLink>
              <NavLink to="/notificaciones" className={({ isActive }) => isActive ? activeLink : btnLink}>Notificaciones</NavLink>
            </nav>
            <NavLink to="/inicio" className={({ isActive }) => isActive ? activeLink : btnLink}>Inicio</NavLink>
            <NavLink to="/salir" className={activeLink} onClick={handleLogout}>Salir</NavLink>

           
          </div>
        </header>
      ) : (
        <header className="text-gray-600 body-font">
          <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
            <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
              </svg>
              <span className="ml-3 text-xl font-semiblod text-white">SOFTINNOVATE SOLUTIONS</span>
            </a>
            <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">

              <NavLink to="/mis-reservas" className={({ isActive }) => isActive ? activeLink : btnLink}>Mis reservas</NavLink>
              <NavLink to="/historial" className={({ isActive }) => isActive ? activeLink : btnLink}>Historial</NavLink>
              <NavLink to="/notificaciones" className={({ isActive }) => isActive ? activeLink : btnLink}>Notificaciones</NavLink>
            </nav>
            <NavLink to="/inicio" className={({ isActive }) => isActive ? activeLink : btnLink}>Inicio</NavLink>
            <NavLink to="/salir" className={activeLink} onClick={handleLogout}>Salir</NavLink>

            
          </div>
        </header>
    )}
    </>
  )
}
export default NavBar;
