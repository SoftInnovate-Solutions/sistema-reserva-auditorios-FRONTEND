import Layaut from "./components/layaut";
import Button from "./components/button";
import NavBar from "./components/navbar";
import Bloques from "./components/bloques";
import {Navigate, Routes,Route  } from "react-router-dom";
import Inicio from './pages/inicio';
import Registro from './pages/registro';
import Reserva from './pages/reserva';
import Historial from './pages/historial';
import Contacto from './pages/contacto';
import Footer from "./components/footer";

function App() {
  

  return (
    <>
      <div className="bg-casas min-h-screen">
        <NavBar></NavBar>
        <Layaut>
       
            <Routes>  
              <Route path = '/' element ={<Inicio></Inicio>}></Route>
              <Route path = '/registro' element={<Registro></Registro>}></Route>
              <Route path = '/Reserva' element={<Reserva></Reserva>}></Route>
              <Route path = '/Historial' element={<Historial></Historial>}></Route>
              <Route path = '/Contacto' element={<Contacto></Contacto>}></Route>
              <Route path = '*' element={<Navigate to= "/"></Navigate>}></Route>


              
            </Routes>
          
        </Layaut>
        <Footer/>
      </div>
    </>
  )
}

export default App
