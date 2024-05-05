import React, { useEffect, useState } from 'react';


import Layaut from "./components/layaut";
import Button from "./components/button";
import NavBar from "./components/navbar";
import Bloques from "./components/bloques";

import { Navigate, Routes, Route } from "react-router-dom";
import Inicio from './pages/inicio';
import Footer from "./components/footer";

import IniciarSesion from './pages/IniciarSesion';

//RUTAS ADMINISTRADOR
import GestionAmbiente from './pages/GestionarAmbiente';
import RegistrarAmbiente from './pages/Registrar ambiente';
import EditarAmbiente from './pages/EditarAmbiente.jsx'
import AjustarReserva from './pages/AjustarReserva';
import Dashboard from './pages/Dashboard';
import Notificaciones from './pages/Notificaciones';



//RUTAS USUARIO
import MisReservas from './pages/MisReservas';
import Historial from './pages/historial';
import NotificacionesUsuario from './pages/NotificacionesUsuario';

import Pruebas from './services/router/pruebas.jsx'

function App() {
  const [rol, setRol] = useState(localStorage.getItem('saveRol'));

  const handleLogin = (userData) => {
    setRol(userData.codigoSis);
    if (localStorage.getItem('saveRol') == null) {
      localStorage.setItem('saveRol', userData.codigoSis)
    } 
  };

  return (
    <>
    <Pruebas /> 
      {rol === null ? (
        <>
          <Routes>
            <Route path="/iniciar-sesion" element={<IniciarSesion login={handleLogin} />} />
            <Route path='*' element={<Navigate to="/iniciar-sesion"></Navigate>}></Route>
          </Routes>
        </>
      ) : (
        <>
          {rol === 'admi' ? (
            <>
              <div className="bg-casas min-h-screen">
                <NavBar></NavBar>
                <Layaut>

                  <Routes>
                    <Route path='/' element={<Inicio />}></Route>
                    <Route path='/gestionar-ambiente' element={<GestionAmbiente />}></Route>
                    <Route path='/registrar-ambiente' element={<RegistrarAmbiente />}></Route>
                    <Route path='/editar-ambiente/:id' element={<EditarAmbiente />}></Route>
                    <Route path='/ajustar-reserva' element={<AjustarReserva />}></Route>
                    <Route path='/dashboard' element={<Dashboard />}></Route>
                    <Route path='/notificaciones' element={<Notificaciones />}></Route>
                    <Route path='*' element={<Navigate to="/"></Navigate>}></Route>
                  </Routes>
                </Layaut>
                <Footer />
              </div>
            </>
          ) : (
            <>
              <div className="bg-casas min-h-screen">
                <NavBar></NavBar>
                <Layaut>

                  <Routes>
                    <Route path='/' element={<Inicio />}></Route>
                    <Route path='/mis-reservas' element={<MisReservas />}></Route>
                    <Route path='/historial' element={<Historial />}></Route>
                    <Route path='/notificaciones' element={<NotificacionesUsuario />}></Route>
                    <Route path='*' element={<Navigate to="/"></Navigate>}></Route>
                  </Routes>
                </Layaut>
                <Footer />
              </div>
            </>
          )}
        </>
      )}

    </>
  )
}

export default App
