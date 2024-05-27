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
import AdminstrarAmbiente from './pages/AdministrarAmbiente.jsx';
import RegistrarAmbiente from './pages/Registrar ambiente';
import EditarAmbiente from './pages/EditarAmbiente.jsx'
import AdministrarPeriodo from './pages/AdministrarPeriodo.jsx';
import Dashboard from './pages/Dashboard';
import Notificaciones from './pages/Notificaciones';
import DisponibilidadAmbiente from './pages/DisponibilidadAmbiente.jsx';


//RUTAS USUARIO
import MisReservas from './pages/MisReservas';
import Historial from './pages/historial';
import NotificacionesUsuario from './pages/NotificacionesUsuario';

// import Pruebas from './services/pruebas.jsx'

function App() {
  const [rol, setRol] = useState(localStorage.getItem('saveRol'));

  const handleLogin = (userData) => {
    // console.log(userData.rol);
    // console.log(localStorage.getItem('nombre_usuario'));
    // console.log(localStorage.getItem('cod_usuario'));
    // console.log(userData);
    setRol(userData.rol);
    if (localStorage.getItem('saveRol') == null) {
      localStorage.setItem('saveRol', userData.rol)
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
