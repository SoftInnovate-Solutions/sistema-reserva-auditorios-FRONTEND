import React, { useState } from 'react';

const MisReservas = () => {
  const [reservas, setReservas] = useState([
    { id: 1, nombre: 'Reserva 1' },
    { id: 2, nombre: 'Reserva 2' },
    { id: 3, nombre: 'Reserva 3' },
  ]);
  const [nuevaReserva, setNuevaReserva] = useState('');

  const handleCrearReserva = () => {
    // Lógica para crear una nueva reserva
    const nuevaReserva = {
      id: reservas.length + 1,
      nombre: nuevaReserva,
    };
    setReservas([...reservas, nuevaReserva]);
    setNuevaReserva('');
  };

  const handleEliminarReserva = (id) => {
    // Lógica para eliminar una reserva
    const nuevasReservas = reservas.filter(reserva => reserva.id !== id);
    setReservas(nuevasReservas);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Mis Reservas</h2>
        <button className="bg-primary text-white px-4 py-2 rounded-md">Crear Reserva</button>
      </div>
      <div className="bg-white p-4 shadow-md rounded-md">
        {/* Formulario para crear una nueva reserva */}
        <form onSubmit={handleCrearReserva}>
          <input
            type="text"
            value={nuevaReserva}
            onChange={(e) => setNuevaReserva(e.target.value)}
            placeholder="Nombre de la reserva"
            className="border border-gray-300 px-3 py-2 rounded-md mr-2"
          />
          <button type="submit" className="bg-primary text-white px-4 py-2 rounded-md">Guardar</button>
        </form>

        {/* Lista de reservas existentes */}
        <ul className="mt-4">
          {reservas.map(reserva => (
            <li key={reserva.id} className="flex justify-between items-center border-b border-gray-300 py-2">
              <span>{reserva.nombre}</span>
              <div>
                <button className="text-blue-500 mr-2">Editar</button>
                <button onClick={() => handleEliminarReserva(reserva.id)} className="text-red-500">Eliminar</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MisReservas;