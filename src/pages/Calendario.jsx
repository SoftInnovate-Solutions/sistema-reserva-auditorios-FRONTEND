import React, { useState, useEffect } from 'react';
import { Box, TextField, useTheme, Typography, Button, Grid } from '@mui/material';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { Link } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calendario.css';
import MisReservas from './MisReservas';

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

const Calendario = () => {
  ///////////////
  const theme = useTheme();
  const [idUsuario, setIdUsuario] = useState(sessionStorage.getItem('cod_usuario'));


  const [DataImparticiones, setDataImparticiones] = useState([]);
  const [DataAmbientesDisp, setDataAmbientesDisp] = useState([]);
  const [DataFechaAmbientes, setDataFechaAmbientes] = useState([]);
  const [DataFechaBloques, setDataFechaBloques] = useState([]); //fecha y sus 10 bloques libres o no libres


  const [selectedOptionAmb, setSelectedOptionAmb] = useState("");
  const [selectedOptionImparticion, setSelectedOptionImparticion] = useState("");

  const [eventos, setEventos] = useState([]);
  const [cantidadEstudiantes] = useState(81);
  const [reserva, setReserva] = useState(null);

  // console.log(DataImparticiones);
  useEffect(() => {
    fetch(`http://127.0.0.1:5000/reserva/imparticiones/${idUsuario}`)
      .then(response => response.json())
      .then(data => setDataImparticiones(data))
      .catch(error => console.error("Error al cargar los tipos de ambiente:", error));
  }, [idUsuario]);

  useEffect(() => {
    if (DataAmbientesDisp.length > 0) {
      const getNombreAmbiente = (id_codAmbiente) => {
        const ambiente = DataAmbientesDisp.find(amb => amb.cod_ambiente === id_codAmbiente);
        return ambiente ? ambiente.nombre_amb : 'No encontrado';
      };

      realizarLlamadasFetch();
      const eventosPrueba = []; 
      if (DataFechaBloques.length > 0) {
     
        // console.log(DataFechaBloques);
        DataFechaBloques.forEach((subArray, index) => {
          console.log(`Elemento de DataFechaBloques ${index}:`);
          const fecha = subArray.fecha
          console.log(fecha);
          const keys = Object.keys(subArray);
          keys.forEach((key, index) => {
            // Verificar si no es el último elemento
            if (index !== keys.length - 1) {
              const obj = subArray[key];
              const { nombre_blo } = obj;
              const evento = {
                title: getNombreAmbiente(parseInt(selectedOptionAmb)),
                start: moment(`${fecha} ${obtenerHoraInicio(nombre_blo)}`).toDate(),
                end: moment(`${fecha} ${obtenerHoraFin(nombre_blo)}`).toDate(),
              };
              eventosPrueba.push(evento);
            }
          });
          
        });

        console.log(eventosPrueba);
      }

      const MIsEvents = DataFechaAmbientes.map(fechaObj => ({
        title: getNombreAmbiente(parseInt(selectedOptionAmb)),
        start: moment(fechaObj.fecha).toDate(),
        end: moment(fechaObj.fecha).toDate()
      }));


      const events = DataFechaBloques.map(({ fecha, horaInicio, horaFin }) => ({
        title: getNombreAmbiente(parseInt(selectedOptionAmb)),
        start: moment(`${fecha} ${horaInicio}`).toDate(),
        end: moment(`${fecha} ${horaFin}`).toDate()
      }));



   
      setEventos(eventosPrueba);
    }
  }, [selectedOptionAmb, DataFechaAmbientes, DataAmbientesDisp, DataFechaBloques]);

  // --------------- LOGICA PARA HACER CADA LLAMADA PARA CADA FECHA Y UN COD DE AMBIENTE
  const realizarLlamadasFetch = async () => {
    const dataTotal = []; // Array para almacenar la data de todas las llamadas

    for (const item of DataFechaAmbientes) {
      const data = await realizarSolicitud(item.fecha);
      if (data) {
        dataTotal.push(data);
      }
    }
    // console.log('Data total de todas las llamadas:', dataTotal);
    // console.log(dataTotal[0]);
    setDataFechaBloques(dataTotal);
  };

  const realizarSolicitud = async (fecha) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "cod_ambiente": DataAmbientesDisp[0].cod_ambiente,
        "fecha_aa": fecha
      }),
    };

    try {
      const response = await fetch('http://127.0.0.1:5000/reserva/get_bloque', requestOptions);
      const data = await response.json();

      // Agregar la fecha a la data recibida
      const dataConFecha = { fecha: fecha, ...data };

      return dataConFecha; // Devuelve la data de la respuesta con la fecha
    } catch (error) {
      console.error('Error al hacer la solicitud POST:', error);
      return null; // Maneja el error como necesites
    }
  };


  // --------------------
  
  // Función para obtener la hora de inicio
  const obtenerHoraInicio = (texto) => {
    // Obtener la parte de la hora de inicio del texto (ej. '09:45:00')
    const horaInicio = texto.split(' - ')[0].split(': ')[1];
    return horaInicio;
  };

  // Función para obtener la hora de fin
  const obtenerHoraFin = (texto) => {
    // Obtener la parte de la hora de fin del texto (ej. '11:15:00')
    const horaFin = texto.split(' - ')[1];
    return horaFin;
  };

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

  const handleChangeImparticion = (event) => {
    const selectedValue = event.target.value;
    setSelectedOptionImparticion(selectedValue);
    setCantEstudiantes(selectedValue)
    fetch(`http://127.0.0.1:5000/reserva/ambientes_disponibles/${selectedValue}`)
      .then(response => response.json())
      .then(data => setDataAmbientesDisp(data))
      .catch(error => console.error("Error al cargar los tipos de ambiente:", error));
    setSelectedOptionAmb('')
    setDataFechaAmbientes([])
    setEventos([]);
  };

  const [cantEstudiantes, setCantEstudiantes] = useState(0);

  const handleChangeCantEst = (event) => {
    const inputValue = event.target.value;
    if (inputValue === '' || (parseInt(inputValue) >= 1 && parseInt(inputValue) <= selectedOptionImparticion)) {
      setCantEstudiantes(inputValue);
      fetch(`http://127.0.0.1:5000/reserva/ambientes_disponibles/${inputValue}`)
        .then(response => response.json())
        .then(data => setDataAmbientesDisp(data))
        .catch(error => console.error("Error al cargar los tipos de ambiente:", error));
      setSelectedOptionAmb('')
      setDataFechaAmbientes([])
      setEventos([]);
    }
  };

  const handleChangeAmb = (event) => {
    const selectedValue = event.target.value;
    setSelectedOptionAmb(selectedValue);
    // console.log(selectedValue);
    fetch(`http://127.0.0.1:5000/reserva/get_calendario/${selectedValue}`)
      .then(response => response.json())
      .then(data => setDataFechaAmbientes(data))
      .catch(error => console.error("Error al cargar los tipos de ambiente:", error));

    // console.log(`Fue presionada por esta opción:  ${selectedValue}`);

  };

  // console.log(DataFechaAmbientes);

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

        <Typography variant="h5" component="h2" sx={{ mb: 2, color: theme.palette.text.primary, textAlign: 'center' }}>CALENDARIO</Typography>
        <div className="flex justify-start items-start mb-4">
          <Link to="/mis-reservas" className="bg-primary text-white px-10 py-2 rounded-md">
            Mis Reservas
          </Link>
        </div>

        <div className="flex justify-between items-center mb-4 mt-5">

          <div className="flex space-x-4">
            <select
              className="bg-gray-200 p-2 rounded-md"
              onChange={handleChangeImparticion}
              value={selectedOptionImparticion}
            >
              <option value="" disabled>
                Selecciona una opción
              </option>
              {DataImparticiones.length > 0 && (
                DataImparticiones.map((data, index) => (
                  <option key={index} value={data.cantidad_estudiantes_imp}>
                    {data.imparticion}
                  </option>
                ))
              )}
            </select>

            <TextField
              sx={{ width: '160px' }}
              label="Cantidad de estudiantes"
              type="number"
              value={cantEstudiantes}
              onChange={handleChangeCantEst}
              InputLabelProps={{
                shrink: true,
              }}
            />

            <select
              className="bg-gray-200 p-2 rounded-md"
              onChange={handleChangeAmb}
              value={selectedOptionAmb}
            >
              <option value="" disabled>
                Selecciona una opción
              </option>
              {DataAmbientesDisp.length > 0 && (
                DataAmbientesDisp.map((data, index) => (
                  <option key={index} value={`${data.cod_ambiente}`}>
                    {data.nombre_amb}
                  </option>
                ))
              )}
            </select>
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
                  onClick={() => handleReservar(event.resource, event.start, event.end)}
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
