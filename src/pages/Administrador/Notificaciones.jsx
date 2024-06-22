import React, { useState, useEffect, useCallback } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import ModalPeriodo from '../../components/modalAvisoDocAux'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Notificaciones = () => {
  const theme = useTheme();
  const [reservas, setReservas] = useState([]);
  const [reservaSeleccionada, setReservaSeleccionada] = useState(null);

  const handleVerReserva = (id) => {
    fetch(`http://127.0.0.1:5000/reserva/get_history_one/${id}`)
      .then(response => response.json())
      .then(data => setReservaSeleccionada(data))
      .catch(error => console.error("Error al carga imparticiones:", error));

  };

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/reserva/get_history_all`)
      .then(response => response.json())
      .then(data => {
        setReservas(data.sort((a, b) => b.cod_reserva - a.cod_reserva)); 
      })
      .catch(error => console.error("Error al carga imparticiones:", error));
  }, []);

  function obtenerComponentesFecha(fechaString) {
    var fecha = new Date(fechaString);
    var utcFecha = new Date(Date.UTC(fecha.getUTCFullYear(), fecha.getUTCMonth(), fecha.getUTCDate()));

    var dia = utcFecha.getUTCDate().toString().padStart(2, '0');
    var mes = (utcFecha.getUTCMonth() + 1).toString().padStart(2, '0');
    var anio = utcFecha.getUTCFullYear();

    return `${dia}/${mes}/${anio}`;
  }

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
          <Typography variant="h5" component="h2" sx={{ mb: 2, color: theme.palette.text.primary, textAlign: 'center' }}>NOTIFICACIONES </Typography>
          { }
        </div>
        <div className="bg-gray-100 p-4 shadow-md rounded-md">
          { }
          <ul className="mt-4 space-y-4">
            {reservas.map(reserva => (
              <li key={reserva.cod_reserva} className="p-4 bg-gray rounded-lg shadow flex justify-between items-center">
                <div className="flex-1 pr-4">
                  <div className="font-bold text-lg">{reserva.nombre_ambiente}</div>
                  <div className="text-gray-500">{obtenerComponentesFecha(reserva.fecha_res)}</div>
                  <div className="text-gray-500">{reserva.hora_bloque}</div>
                </div>
                <div className="bg-gray-500 p-2 rounded flex flex-col space-y-2">
                  <button
                    onClick={() => handleVerReserva(reserva.cod_reserva)}
                    className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
                  >
                    Ver detalles
                  </button>
                  {/* <button
                    onClick={() => handleEliminarReserva(reserva.cod_reserva)}
                    className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                  >
                    Eliminar
                  </button> */}
                </div>
              </li>
            ))}
          </ul>

        </div>

        { }
        {reservaSeleccionada && (
          <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-500 bg-opacity-50">
            <div className="bg-white p-6 rounded-md">
              <h3 className="text-lg font-semibold mb-4">DETALLES DE LA NOTIFICACIÓN</h3>
              <strong> {reservaSeleccionada.nombre_ambiente}</strong>
              <p><strong>{obtenerComponentesFecha(reservaSeleccionada.fecha_res)}</strong></p>
              <p><strong>Hora:</strong> {reservaSeleccionada.hora_bloque}</p>
              {/* <p><strong>Reservado por:</strong> {NombreUsuario}</p> */}
              <p><strong>Reservado por:</strong> {reservaSeleccionada.nombre_usuario}</p>
              <p><strong>Codigo SIS:</strong> {reservaSeleccionada.codigo_sis}</p>
              <p><strong>Facultad: </strong> {reservaSeleccionada.facultad}</p>
              <p><strong>Lugar: </strong> {reservaSeleccionada.lugar}</p>
              <button onClick={handleCloseModal} className="bg-primary text-white px-4 py-2 rounded-md mt-4">Cerrar</button>
            </div>
          </div>
        )}
      </div>
    </Box>
  );
}

export default Notificaciones;
