import React, { useState, useEffect } from 'react';
import { Box, Typography, useTheme, Button, Grid } from '@mui/material';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { Link } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calendario.css';
import Autocomplete from '@mui/material/Autocomplete';

moment.updateLocale('es', {
  months: [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ],
  monthsShort: [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ],
  weekdays: [
    'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'
  ],
  weekdaysShort: [
    'Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'
  ],
  weekdaysMin: [
    'Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'
  ]
});
moment.locale('es');
const localizer = momentLocalizer(moment);

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
  { id: 1, nombre: 'Aula 624', capacidadMinima: 44, capacidadMaxima: 126 },
  { id: 2, nombre: 'Aula 691A', capacidadMinima: 20, capacidadMaxima: 40 },

];



const Calendario = () => {
  ///////////////
  const theme = useTheme();
  const [idUsuario, setIdUsuario] = useState(localStorage.getItem('cod_usuario'));
  const [selectedImparticion, setSelectedImparticion] = useState(null);
  const handleImparticion = (event, newValue) => {
    setSelectedImparticion(newValue);
  };

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

  const [DataImparticiones, setDataImparticiones] = useState([]);
  const [DataAmbientesDisp, setDataAmbientesDisp] = useState([]);



  // console.log(DataImparticiones);
  useEffect(() => {
    fetch(`http://127.0.0.1:5000/reserva/imparticiones/${idUsuario}`)
      .then(response => response.json())
      .then(data => setDataImparticiones(data))
      .catch(error => console.error("Error al cargar los tipos de ambiente:", error));
  }, [idUsuario]);

  useEffect(() => {
    const eventosGenerados = generarEventosAmbientes(cantidadEstudiantes, '2024-05-01', '2024-05-12');
    setEventos(eventosGenerados);
  }, [cantidadEstudiantes]);

  // console.log(DataImparticiones[0]);
  // const opcionesImparticion = [
  //   { title: "DataImparticiones[0].imparticion" },
  //   { title: "DataImparticiones[1].imparticion "},
  // ];

  const handleSeleccionFechaHora = ({ start, end }) => {
    const ambienteId = 1;
    const cantidadEstudiantes = 30;

    if (capacidadAmbienteValida(ambienteId, cantidadEstudiantes)) {
      setEventos([...eventos, { start, end, title: 'Nueva Reserva', backgroundColor: 'blue' }]);
    } else {
      alert('La capacidad del ambiente no es válida para la cantidad de estudiantes.');
    }
  };

  const ambientesDiponibles = async () => {
    fetch(`http://127.0.0.1:5000/reserva/ambientes_disponibles/${DataImparticiones[0].cantidad_estudiantes_imp}`)
      .then(response => response.json())
      .then(data => setDataAmbientesDisp(data))
      .catch(error => console.error("Error al cargar los tipos de ambiente:", error));

  }

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

  const [selectedOption, setSelectedOption] = useState("");
  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    fetch(`http://127.0.0.1:5000/reserva/ambientes_disponibles/${selectedValue}`)
      .then(response => response.json())
      .then(data => setDataAmbientesDisp(data))
      .catch(error => console.error("Error al cargar los tipos de ambiente:", error));

    console.log(`Fue presionada por esta opción:  ${selectedValue}`);

  };

  console.log(DataAmbientesDisp);

  const [selectedOptionAmb, setSelectedOptionAmb] = useState("");
  const handleChangeAmb = (event) => {
    const selectedValue = event.target.value;
    setSelectedOptionAmb(selectedValue);
    console.log(selectedValue);
    fetch(`http://127.0.0.1:5000/reserva/get_calendario/${selectedValue}`)
      .then(response => response.json())
      .then(data => setDataAmbientesDisp(data))
      .catch(error => console.error("Error al cargar los tipos de ambiente:", error));

    console.log(`Fue presionada por esta opción:  ${selectedValue}`);

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

        <h2>Calendario</h2>
        <div className="flex justify-between items-center mb-4">
          <Link to="/mis-reservas" className="bg-primary text-white px-4 py-2 rounded-md">Mis Reservas</Link>
          <div className="flex space-x-4">
            <select
              className="bg-gray-200 p-2 rounded-md"
              onChange={handleChange}
              value={selectedOption}
            >
              {DataImparticiones.length > 0 && (
                DataImparticiones.map((data, index) => (
                  <option key={index} value={`${data.cantidad_estudiantes_imp}`}>
                    {data.imparticion}
                  </option>
                ))
              )}
            </select>

            <select
              className="bg-gray-200 p-2 rounded-md"
              onChange={handleChangeAmb}
              value={selectedOptionAmb}
            >
              {DataAmbientesDisp.length > 0 && (
                DataAmbientesDisp.map((data, index) => (
                  <option key={index} value={`${data.cod_ambiente}`}>
                    {data.nombre_amb}
                  </option>
                ))
              )}
            </select>

            {/* <select className="bg-gray-200 p-2 rounded-md">

            {DataImparticiones[0]!=undefined && (
              <>
                <option value="opcion1">{DataImparticiones[0].imparticion}</option>
                <option value="opcion2">{DataImparticiones[1].imparticion}</option>
              </>
            )}
          </select> */}

            {/* <Autocomplete
              value={selectedImparticion}
              onChange={handleImparticion}
              options={opcionesImparticion}
              getOptionLabel={(option) => option.title}
              isOptionEqualToValue={(option, value) => option.title === value.title}
              renderInput={(params) => <TextField {...params} label="Selecciona un rol" variant="outlined" />}
              sx={{ marginTop: '22px', mb: 3 }}
            /> */}
            {/* <select className="bg-gray-200 p-2 rounded-md">
            <option value="">Seleccionar Opción 2</option>
            <option value="opcion1">Opción 1</option>
            <option value="opcion2">Opción 2</option>
          </select> */}
          </div>
        </div>

        <div className="bg-gray-100 p-4 shadow-md rounded-md">
          <Calendar
            localizer={localizer}
            events={eventos}
            startAccessor="start"
            endAccessor="end"
            messages={{
              next: 'Siguiente',
              previous: 'Anterior',
              today: 'Hoy',
              month: 'Mes',
              week: 'Semana',
              day: 'Día',
              agenda: 'Agenda',
              date: 'Fecha',
              time: 'Hora',
              event: 'Evento',
              noEventsInRange: 'No hay eventos en este rango.',
              showMore: total => `+ Ver más (${total})`,
            }}
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
                  onClick={() => handleReservar(event.resource, event.start, event.end)} n
                >
                  {event.title}
                </button>
              ),
            }}

          />

        </div>
        {reserva && (
          <div className="popup-overlay">
            <div className="popup-content">
              <h3 className="text-lg font-semibold mb-4">Confirmar Reserva</h3>
              <p><strong>Nombre:</strong> {reserva.ambiente.nombre}</p>
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
    </Box>
  );
};

export default Calendario;
