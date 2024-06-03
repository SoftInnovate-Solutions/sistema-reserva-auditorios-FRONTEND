import React, { useState, useEffect } from 'react';
import { Box, Typography, useTheme, Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

const MisReservas = () => {
  const theme = useTheme();
  const [idUsuario] = useState(sessionStorage.getItem('cod_usuario'));
  const [reservas, setReservas] = useState([]);
  const [reservaSeleccionada, setReservaSeleccionada] = useState(null); 

  const handleCrearReserva = () => {

  };

  // console.log(reservas);

  const handleEliminarReserva = (id) => {
    fetch(`http://127.0.0.1:5000/reserva/delete/${id}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error en la solicitud');
        }
        return response.json();
      })
      .then(data => {
        // Maneja la respuesta si es necesario
        console.log('Reserva eliminada:', data);
      })
      .catch(error => console.error('Error al eliminar la reserva:', error));
  };

  const handleVerReserva = (id) => {
    fetch(`http://127.0.0.1:5000/reserva/one/${id}`)
      .then(response => response.json())
      .then(data => setReservaSeleccionada(data))
      .catch(error => console.error("Error al carga imparticiones:", error));
  };

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/reserva/all/${idUsuario}`)
      .then(response => response.json())
      .then(data => setReservas(data))
      .catch(error => console.error("Error al carga imparticiones:", error));
  }, [idUsuario, handleEliminarReserva]);

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
          { }
          <Link to="/calendario" className="bg-primary text-white px-4 py-2 rounded-md"   state={{ reservas: reservas }}>Reservar Ambiente</Link>
        </div>
        <div className="bg-gray-100 p-4 shadow-md rounded-md">
          { }
          <ul className="mt-4 space-y-4">
            {reservas.map(reserva => (
              <li key={reserva.id} className="p-4 bg-gray rounded-lg shadow flex justify-between items-center">
                <div className="flex-1 pr-4">
                  <div className="font-bold text-lg">{reserva.ambiente}</div>
                  <div className="text-gray-500">{reserva.materia} - {reserva.grupo}</div>
                  <div className="text-gray-500">{reserva.hora}</div>
                </div>
                <div className="bg-gray-500 p-2 rounded flex flex-col space-y-2">
                  <button
                    onClick={() => handleVerReserva(reserva.cod_reserva)}
                    className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
                  >
                    Ver Reserva
                  </button>
                  <button
                    onClick={() => handleEliminarReserva(reserva.cod_reserva)}
                    className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>

        </div>

        { }
        {reservaSeleccionada && (
          <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-500 bg-opacity-50">
            <div className="bg-white p-6 rounded-md">
              <h3 className="text-lg font-semibold mb-4">DETALLES DE LA RESERVA</h3>
              <strong> {reservaSeleccionada.fecha_res} - {reservaSeleccionada.hora}</strong>
              <p><strong>Ambiente:</strong> {reservaSeleccionada.ambiente}</p>
              <p><strong>Reservado por:</strong> {reservaSeleccionada.instructor}</p>
              <p><strong>Materia:</strong> {reservaSeleccionada.materia}</p>
              <p><strong>Grupo:</strong> {reservaSeleccionada.grupo}</p>
              <p><strong>Cantidad de estudiantes:</strong> {reservaSeleccionada.numero_estudiantes}</p>
              <button onClick={handleCloseModal} className="bg-primary text-white px-4 py-2 rounded-md mt-4">Cerrar</button>
            </div>
          </div>
        )}
      </div>
    </Box>
  );
}

export default MisReservas;
