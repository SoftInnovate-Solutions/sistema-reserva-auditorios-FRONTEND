import React, { useEffect, useState } from 'react';


import Layaut from "./components/layaut";
import NavBar from "./components/navbar";

import { Navigate, Routes, Route } from "react-router-dom";
import Inicio from './pages/inicio';
import Footer from "./components/footer";
import IniciarSesion from './pages/IniciarSesion';

//RUTAS ADMINISTRADOR
import AdminstrarAmbiente from './pages/Administrador/AdministrarAmbiente/AdministrarAmbiente.jsx';
import RegistrarAmbiente from './pages/Administrador/RegistrarEditarAmbiente/RegistrarAmbiente.jsx';
import EditarAmbiente from './pages/Administrador/RegistrarEditarAmbiente/EditarAmbiente.jsx'
import AdministrarPeriodo from './pages/Administrador/AdministrarPeriodo.jsx';
import Dashboard from './pages/Administrador/Dahsboard/Dashboard.jsx';
import Notificaciones from './pages/Administrador/Notificaciones.jsx';
import DisponibilidadAmbiente from './pages/Administrador/DisponibilidadAmbiente/DisponibilidadAmbiente.jsx';
import DatosUsuarios from './pages/Administrador/DatosUsuarios.jsx'

//RUTAS USUARIO
import MisReservas from './pages/Usuarios/MisReservas.jsx';
import Historial from './pages/Usuarios/historial.jsx';
import NotificacionesUsuario from './pages/Usuarios/Notificaciones.jsx';
import Calendario from './pages/Usuarios/Reservas/Calendario.jsx';

function App() {
  const [rol, setRol] = useState(sessionStorage.getItem('saveRol'));

  const handleLogin = (userData) => { 
    // console.log(userData);
    setRol(userData.rol);
    if (sessionStorage.getItem('saveRol') == null) {
      sessionStorage.setItem('saveRol', userData.rol)
    } 
  };

  return (
    <>
    {/* <Pruebas />  */}
      {rol === null ? (
        <>
          <Routes>
            <Route path="/iniciar-sesion" element={<IniciarSesion login={handleLogin} />} />
            <Route path='*' element={<Navigate to="/iniciar-sesion"></Navigate>}></Route>
          </Routes>
        </>
      ) : (
        <>
          {rol === 'administrador' ? (
            <>
              <div className="bg-casas min-h-screen">
                <NavBar></NavBar>
                <Layaut>

                  <Routes>
                    <Route path='/' element={<Inicio />}></Route>
                    <Route path='/administrar-ambiente' element={<AdminstrarAmbiente />}></Route>
                    <Route path='/registrar-ambiente' element={<RegistrarAmbiente />}></Route>
                    <Route path='/editar-ambiente/:id' element={<EditarAmbiente />}></Route>
                    <Route path='/disponibilidad-ambiente/:id' element={<DisponibilidadAmbiente />}></Route>                    
                    <Route path='/administrar-periodo' element={<AdministrarPeriodo />}></Route>
                    <Route path='/visualizar-usuarios' element={<DatosUsuarios />}></Route>
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
                    <Route path='/Calendario' element={<Calendario />}></Route>
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
