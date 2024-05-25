import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
const MisReservas = () => {
  const [reservas, setReservas] = useState([
    { id: 1, nombre: 'Reserva 1', aula: 'Aula 624', grupo: 'Grupo 1', fecha: '2024-05-12', hora: '06:45 - 08:15' },
    { id: 2, nombre: 'Reserva 2', aula: 'Aula 652', grupo: 'Grupo 2', fecha: '2024-05-13', hora: '08:15 - 09:45' },
    { id: 3, nombre: 'Reserva 3', aula: 'Aula 693A', grupo: 'Grupo 3', fecha: '2024-05-14', hora: '11:15 - 12:45' },
    { id: 4, nombre: 'Reserva 4', aula: 'Aula 691B', grupo: 'Grupo 1', fecha: '2024-05-12', hora: '12:45 - 12:15' },
    { id: 5, nombre: 'Reserva 5', aula: 'Aula 622', grupo: 'Grupo 2', fecha: '2024-05-13', hora: '13:45 - 15:15' },
    { id: 6, nombre: 'Reserva 6', aula: 'Aula 612', grupo: 'Grupo 3', fecha: '2024-05-14', hora: '15:45 - 17:15' },
    { id: 7, nombre: 'Reserva 7', aula: 'Aula 132', grupo: 'Grupo 1', fecha: '2024-05-12', hora: '17:15 - 18:45' },
    { id: 8, nombre: 'Reserva 8', aula: 'Aula 102', grupo: 'Grupo 2', fecha: '2024-05-13', hora: '18:45 - 20:15' },
    { id: 9, nombre: 'Reserva 9', aula: 'Aula 693A', grupo: 'Grupo 3', fecha: '2024-05-14', hora: '09:45 - 11:15' },
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
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Mis Reservas</h2>
        {}
        <Link to="/calendario" className="bg-primary text-white px-4 py-2 rounded-md">Crear Reserva</Link>
      </div>
      <div className="bg-white p-4 shadow-md rounded-md">
        {}
        <ul className="mt-4">
          {reservas.map(reserva => (
            <li key={reserva.id} className="flex justify-between items-center border-b border-gray-300 py-2">
              <span>{reserva.nombre}</span>
              <span>{reserva.hora}</span>
              <div>
                <button onClick={() => handleVerReserva(reserva)} className="text-blue-500 mr-2">Ver Reserva</button>
                <button onClick={() => handleEliminarReserva(reserva.id)} className="text-red-500">Eliminar</button>
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
  );
}

export default MisReservas;
