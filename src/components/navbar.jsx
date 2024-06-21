import { NavLink } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import './navbar-footer.css';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


export const NavBar = () => {
  const btnLink = 'block inline-block py-1 text-black hover:text-yellow-500 cursor-pointer mr-4';
  const activeLink = 'block inline-block py-1 text-yellow-500 mr-4 border border-yellow-500 rounded';

  const [showInfo, setShowInfo] = useState(false);
  const usuario = sessionStorage.getItem('nombre_usuario');
  // const sis = sessionStorage.getItem('cod_SIS');
  const rolUsuario = sessionStorage.getItem('rol_usuario');
  const handleIconClick = () => {
    setShowInfo(!showInfo);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('saveRol'); // Borra el dato del sessionStorage
    sessionStorage.removeItem('nombre_usuario');
    sessionStorage.removeItem('cod_usuario');
    sessionStorage.removeItem('nombre_usuario');
    sessionStorage.removeItem('rol_usuario');
    window.location.reload(); // Recarga la página
  };

  const [rol, setRol] = useState(null);

  const obtenerRol = () => {
    const datoGuardado = sessionStorage.getItem('saveRol');
    setRol(datoGuardado);
  };

  useEffect(() => {
    handleIconClick();
    obtenerRol();
  }, []);
  return (
    <>
      {rol === 'administrador' ? (
        <header className="header-container text-gray-600 body-font">
          <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
            <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
              <img src="src/imagenes/logo.jpg" alt="Imagen de ejemplo" className="w-12 h-12 rounded-full" />
              <span className="ml-3 text-xl font-semibold text-dark" >
                SISTEMA DE RESERVACIÓN DE AMBIENTES
              </span>
            </a>
            <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">

              <NavLink to="/administrar-ambiente" className={({ isActive }) => isActive ? activeLink : btnLink}>Administrar ambiente</NavLink>
              <NavLink to="/administrar-periodo" className={({ isActive }) => isActive ? activeLink : btnLink}>Administrar periodo de reserva</NavLink>
              <NavLink to="/dashboard" className={({ isActive }) => isActive ? activeLink : btnLink}>Dashboard</NavLink>
              <NavLink to="/notificaciones" className={({ isActive }) => isActive ? activeLink : btnLink}>Historial</NavLink>
            </nav>
            <NavLink to="/inicio" className={({ isActive }) => isActive ? activeLink : btnLink}>Inicio</NavLink>
            <NavLink to="/salir" className={`btn-logout`} onClick={handleLogout}>Salir</NavLink>
            {/* <button className ="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">Button
          <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" className ="w-4 h-4 ml-1" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </button>*/}
          </div>
        </header>
      ) : (
        <>
          <header className="header-container text-gray-600 body-font">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
              <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                <img src="src/imagenes/logo.jpg" alt="Imagen de ejemplo" className="w-12 h-12 rounded-full" />
                <span className="ml-3 text-xl font-semibold text-white" style={{ textShadow: '0 1px 5px #000' }}>
                  SISTEMA DE RESERVACIÓN DE AMBIENTES
                </span>
              </a>
              <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">

                <NavLink to="/mis-reservas" className={({ isActive }) => isActive ? activeLink : btnLink}>Mis reservas</NavLink>
                <NavLink to="/historial" className={({ isActive }) => isActive ? activeLink : btnLink}>Historial</NavLink>
                <NavLink to="/notificaciones" className={({ isActive }) => isActive ? activeLink : btnLink}>Notificaciones</NavLink>
              </nav>
              <NavLink to="/inicio" className={({ isActive }) => isActive ? activeLink : btnLink}>Inicio</NavLink>
              <NavLink to="/salir" className={`btn-logout`} onClick={handleLogout}>Salir</NavLink>

              <IconButton aria-label="back" onClick={handleIconClick}>
                <AccountCircleIcon fontSize='large' />
              </IconButton>
              {/* <button className ="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">Button
          <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" className ="w-4 h-4 ml-1" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </button>*/}
            </div>
          </header>
          {showInfo && (
            <Box
              className="parent-container"
              sx={{
                display: 'flex',
                justifyContent: 'flex-end', // Alinea el Box a la derecha dentro del contenedor padre
                marginRight: '50px'
              }}
            >
              <Box
                className="header-container"
                sx={{
                  mt: 2,
                  p: 2,
                  border: '1px solid gray',
                  borderRadius: '8px',
                  maxWidth: '300px'
                }}
              >
                <Typography variant="h6"> {usuario}</Typography>
                <Typography variant="body1">Tipo usuario: {rolUsuario} </Typography>
              </Box>
            </Box>
          )}
        </>
      )}
    </>
  )
}
export default NavBar;
