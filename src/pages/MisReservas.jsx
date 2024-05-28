import React, { useState } from 'react';
import { Box, Typography, useTheme, Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom'; 

const MisReservas = () => {
  const theme = useTheme();
  const [reservas, setReservas] = useState([

  ]);
  const [reservaSeleccionada, setReservaSeleccionada] = useState(null);
  const [nuevaReservaNombre, setNuevaReservaNombre] = useState('');

  const handleCrearReserva = () => {
    
  };

  const handleEliminarReserva = (id) => {
    const nuevasReservas = reservas.filter(reserva => reserva.id !== id);
    setReservas(nuevasReservas);
  };

  const handleVerReserva = (reserva) => {
    setReservaSeleccionada(reserva);
  };

  const handleCloseModal = () => {
    setReservaSeleccionada(null);
  };

  return (
    <Box
    //estilo
    sx={{
      p: 4, // padding
      bgcolor: "background.paper",
      boxShadow: 8,
      textAlign: 'center',
      width: '80%',
      margin: '0 auto', // centrado horizontal
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Mis Reservas</h2>
        {}
        <Link to="/calendario" className="bg-primary text-white px-4 py-2 rounded-md">Reservar Ambiente</Link>
      </div>
      <div className="bg-gray-100 p-4 shadow-md rounded-md">
        {}
        <ul className="mt-4 space-y-4">
           {reservas.map(reserva => (
               <li key={reserva.id} className="p-4 bg-gray rounded-lg shadow flex justify-between items-center">
                 <div className="flex-1 pr-4">
                     <div className="font-bold text-lg">{reserva.nombre}</div>
                        <div className="text-gray-500">{reserva.hora}</div>
                          </div>
                             <div className="bg-gray-500 p-2 rounded flex flex-col space-y-2">
        <button 
          onClick={() => handleVerReserva(reserva)} 
          className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
        >
          Ver Reserva
        </button>
         <button 
          onClick={() => handleEliminarReserva(reserva.id)} 
          className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
        >
          Eliminar
        </button>
      </div>
    </li>
  ))}
</ul>

      </div>

      {}
      {reservaSeleccionada && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-md">
            <h3 className="text-lg font-semibold mb-4">Detalles de la reserva</h3>
            <p><strong>Nombre:</strong> {reservaSeleccionada.nombre}</p>
            <p><strong>Aula:</strong> {reservaSeleccionada.aula}</p>
            <p><strong>Grupo:</strong> {reservaSeleccionada.grupo}</p>
            <p><strong>Fecha:</strong> {reservaSeleccionada.fecha}</p>
            <p><strong>Hora:</strong> {reservaSeleccionada.hora}</p>
            <button onClick={handleCloseModal} className="bg-primary text-white px-4 py-2 rounded-md mt-4">Cerrar</button>
          </div>
        </div>
      )}
    </div>
    </Box>
  );
}

export default MisReservas;
