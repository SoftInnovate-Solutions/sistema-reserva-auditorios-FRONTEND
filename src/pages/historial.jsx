// import { Box, Typography, useTheme, Button, Grid } from '@mui/material';

// const Historial = () => {
//   const theme = useTheme();

//   return (
//     <Box
//       //estilo
//       sx={{
//         p: 4, // padding
//         bgcolor: "background.paper",
//         boxShadow: 8,
//         textAlign: 'center',
//         width: '80%',
//         margin: '0 auto', // centrado horizontal
//         justifyContent: 'center',
//         alignItems: 'center',
//       }}
//     >
//       <div>Historial  2ss</div>
//     </Box>
//   )
// }

// export default Historial


import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { Link } from 'react-router-dom'; 
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calendario.css';  

const generarPeriodosAleatorios = (inicio, fin, intervalo, cantidad, fechaInicio, fechaFin) => {
  const periodos = [];
  let startTime = moment(inicio, 'HH:mm');
  const endTime = moment(fin, 'HH:mm');

  while (startTime < endTime && periodos.length < cantidad) {
    const start = startTime.clone();
    startTime.add(intervalo, 'minutes');
    const end = startTime.clone();

    if (Math.random() > 0.5) { 
      const isOverlapping = periodos.some(periodo =>
        (start.isBetween(moment(periodo.start, 'HH:mm'), moment(periodo.end, 'HH:mm'), null, '[)') ||
        end.isBetween(moment(periodo.start, 'HH:mm'), moment(periodo.end, 'HH:mm'), null, '(]'))
      );
      if (!isOverlapping) {
        const randomDate = moment(fechaInicio).add(Math.random() * (moment(fechaFin).diff(fechaInicio, 'days')), 'days');
        periodos.push({ 
          start: randomDate.clone().set({ hour: start.hours(), minute: start.minutes() }).toISOString(), 
          end: randomDate.clone().set({ hour: end.hours(), minute: end.minutes() }).toISOString() 
        });
      }
    }
  }

  return periodos;
};

const ambientesDisponibles = [
  { id: 1, nombre: 'Aula 624', ubicacion: 'Edificio nuevo', descripcion: 'Aula para clases teóricas', capacidadMinima: 44, capacidadMaxima: 126 },
  { id: 2, nombre: 'Aula 691A', ubicacion: 'bloque principal', descripcion: 'aula comun', capacidadMinima: 20, capacidadMaxima: 40 },
  { id: 3, nombre: 'Aula 632', ubicacion: 'zona laboratorio', descripcion: 'Aula comun', capacidadMinima: 10, capacidadMaxima: 30 },
  { id: 4, nombre: 'Aula 654', ubicacion: 'Biblioteca', descripcion: 'Aula para clases teóricas', capacidadMinima: 32, capacidadMaxima: 56 },
  { id: 5, nombre: 'Aula 623', ubicacion: 'Multiacademico', descripcion: 'Aula para clases teóricas', capacidadMinima: 16, capacidadMaxima: 77 },
  { id: 6, nombre: 'Aula 600', ubicacion: 'edificio nuevo', descripcion: 'Aula para clases teóricas', capacidadMinima: 12, capacidadMaxima: 33 },
  { id: 7, nombre: 'Aula 699', ubicacion: 'bloque laboratorio', descripcion: 'Aula para clases teóricas', capacidadMinima: 14, capacidadMaxima: 67 },
  { id: 8, nombre: 'Aula 666', ubicacion: 'multiacademico', descripcion: 'Aula para clases teóricas', capacidadMinima: 44, capacidadMaxima: 99 },
  { id: 9, nombre: 'Aula 622', ubicacion: 'edificio nuevo', descripcion: 'Aula para clases teóricas', capacidadMinima: 55, capacidadMaxima: 88 },
  { id: 10, nombre: 'Aula 688', ubicacion: 'laboratorio', descripcion: 'Aula para clases teóricas', capacidadMinima: 15, capacidadMaxima: 60 },
  { id: 11, nombre: 'Aula 672', ubicacion: 'multiacademico', descripcion: 'Aula para clases teóricas', capacidadMinima: 85, capacidadMaxima: 123 },
  { id: 12, nombre: 'Aula 612', ubicacion: 'zona comun', descripcion: 'Aula para clases teóricas', capacidadMinima: 123, capacidadMaxima: 155 },
];

const localizer = momentLocalizer(moment);

const Calendario = () => {
  const [eventos, setEventos] = useState([]);
  const [cantidadEstudiantes] = useState(81);
  const [reserva, setReserva] = useState(null);

  const obtenerAmbientesDisponibles = (cantidadEstudiantes) => {
    return ambientesDisponibles.filter(ambiente =>
      cantidadEstudiantes >= ambiente.capacidadMinima && cantidadEstudiantes <= ambiente.capacidadMaxima
    );
  };

  const generarEventosAmbientes = (cantidadEstudiantes, fechaInicio, fechaFin) => {
    const ambientesFiltrados = obtenerAmbientesDisponibles(cantidadEstudiantes);
    const eventosAmbientes = [];

    ambientesFiltrados.forEach(ambiente => {
      const periodosAleatorios = generarPeriodosAleatorios('08:15', '20:15', 90, 7, fechaInicio, fechaFin); 
      periodosAleatorios.forEach(periodo => {
        eventosAmbientes.push({
          title: `${ambiente.nombre} (${ambiente.ubicacion})`,
          start: new Date(periodo.start),
          end: new Date(periodo.end),
          resource: ambiente,
          backgroundColor: 'green'
        });
      });
    });

    return eventosAmbientes;
  };

  useEffect(() => {
    const eventosGenerados = generarEventosAmbientes(cantidadEstudiantes, '2024-05-01', '2024-05-12');
    setEventos(eventosGenerados);
  }, [cantidadEstudiantes]);

  const handleSeleccionFechaHora = ({ start, end }) => {
    const ambienteId = 1;
    const cantidadEstudiantes = 30;

    if (capacidadAmbienteValida(ambienteId, cantidadEstudiantes)) {
      setEventos([...eventos, { start, end, title: 'Nueva Reserva', backgroundColor: 'blue' }]);
    } else {
      alert('La capacidad del ambiente no es válida para la cantidad de estudiantes.');
    }
  };

  const capacidadAmbienteValida = (ambienteId, cantidadEstudiantes) => {
    const ambiente = ambientesDisponibles.find(ambiente => ambiente.id === ambienteId);
    return cantidadEstudiantes >= ambiente.capacidadMinima && cantidadEstudiantes <= ambiente.capacidadMaxima;
  };

  const eventPropGetter = (event) => {
    const backgroundColor = event.backgroundColor || 'yellow';
    const style = {
      backgroundColor,
    };
    return {
      style: style,
    };
  };

  const handleReservar = (ambiente, start, end) => {
    setReserva({ ambiente, start, end });
  };

  const confirmarReserva = () => {
    const { ambiente, start, end } = reserva;
    const nuevosEventos = eventos.filter(evento => !(evento.start.getTime() === start.getTime() && evento.end.getTime() === end.getTime() && evento.resource.id === ambiente.id));
    setEventos([...nuevosEventos, { start, end, title: `Reservado: ${ambiente.nombre}`, backgroundColor: 'green' }]);
    setReserva(null);
  };

  const cancelarReserva = () => {
    setReserva(null);
  };

  return (
    <div>

      <h2>Calendario</h2>
      <div className="flex justify-between items-center mb-4">
        <Link to="/mis-reservas" className="bg-primary text-white px-4 py-2 rounded-md">Mis Reservas</Link>
        <div className="flex space-x-4">
          <select className="bg-gray-200 p-2 rounded-md">
            <option value="">Seleccionar Opción 1</option>
            <option value="opcion1">Opción 1</option>
            <option value="opcion2">Opción 2</option>
          </select>
          <select className="bg-gray-200 p-2 rounded-md">
            <option value="">Seleccionar Opción 2</option>
            <option value="opcion1">Opción 1</option>
            <option value="opcion2">Opción 2</option>
          </select>
        </div>
      </div>
      
      <div className="bg-gray-100 p-4 shadow-md rounded-md">
      <Calendar
        localizer={localizer}
        events={eventos}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        selectable
        onSelectSlot={handleSeleccionFechaHora}
        step={90}
        timeslots={1}
        min={new Date(2024, 4, 1, 8, 15)}
        max={new Date(2024, 4, 12, 21, 45)}
        eventPropGetter={eventPropGetter}
        components={{
          event: ({ event }) => (
            <button
              style={{ width: '100%', height: '100%', backgroundColor: event.backgroundColor }}
              onClick={() => handleReservar(event.resource, event.start, event.end)}
            >
              {event.title}
            </button>
          ),
        }}
       
      /></div>
      {reserva && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3 className="text-lg font-semibold mb-4">Confirmar Reserva</h3>
            <p><strong>Nombre:</strong> {reserva.ambiente.nombre}</p>
            <p><strong>Ubicación:</strong> {reserva.ambiente.ubicacion}</p>
            <p><strong>Descripción:</strong> {reserva.ambiente.descripcion}</p>
            <p><strong>Capacidad:</strong> {reserva.ambiente.capacidadMinima} - {reserva.ambiente.capacidadMaxima}</p>
            <p><strong>Inicio:</strong> {moment(reserva.start).format('HH:mm')}</p>
            <p><strong>Fin:</strong> {moment(reserva.end).format('HH:mm')}</p>
            <div className="mt-4 flex justify-between">
              <button onClick={confirmarReserva} className="bg-green-500 text-white px-4 py-2 rounded-md">Confirmar</button>
              <button onClick={cancelarReserva} className="bg-red-500 text-white px-4 py-2 rounded-md">Cancelar</button>
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
};

export default Calendario;