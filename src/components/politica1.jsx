import React, { useState, useEffect } from 'react';
import { Box, TextField, useTheme, Typography, Button, Grid } from '@mui/material';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../pages/Usuarios/Reservas/Calendario.css';

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
    const navigate = useNavigate();
    const location = useLocation();
    const reservasActuales = location.state?.reservas || [];

    const theme = useTheme();
    const [idUsuario] = useState(sessionStorage.getItem('cod_usuario'));
    const [nombreUsuario] = useState(sessionStorage.getItem('nombre_usuario'));
    const [albergacionMinMax, setAlbergacionMinMax] = useState([]);

    const [DataImparticiones, setDataImparticiones] = useState([]);
    const [DataAmbientesDisp, setDataAmbientesDisp] = useState([]);
    const [DataFechaAmbientes, setDataFechaAmbientes] = useState([]);
    const [DataFechaBloques, setDataFechaBloques] = useState([]); //fecha y sus 10 bloques libres o no libres


    const [selectedOptionAmb, setSelectedOptionAmb] = useState(""); //contiene id ambiente
    const [selectedOptionImparticion, setSelectedOptionImparticion] = useState(""); //contiene id impartición
    const [cantEstudiantes, setCantEstudiantes] = useState(0);
    const [cantActEst, setCantActualEst] = useState(0);

    const [eventos, setEventos] = useState([]);
    const [cantidadEstudiantes] = useState(81);
    const [reserva, setReserva] = useState(null);

    let porcentajeMin = 0.01;
    let porcentajeMax = 10;

    useEffect(() => {
        fetch(`http://127.0.0.1:5000/reserva/imparticiones/${idUsuario}`)
            .then(response => response.json())
            .then(data => {
                // Función para obtener la parte de "materia - grupo" de la impartición
                const obtenerMateriaGrupoImparticion = (imparticion) => {
                    const partes = imparticion.split(' - ');
                    return { materia: partes[0], grupo: partes[1] };
                };

                // Filtrar imparticiones que no están en reservas
                const imparticionesFiltradas = data.filter(imparticion => {
                    const { materia, grupo } = obtenerMateriaGrupoImparticion(imparticion.imparticion);
                    return !reservasActuales.some(reserva => reserva.materia === materia && reserva.grupo === grupo);
                });

                setDataImparticiones(data);
            })
            .catch(error => console.error("Error al carga imparticiones:", error));

        fetch(`http://127.0.0.1:5000/ambiente/all`)
            .then(response => response.json())
            .then(data => {
                setDataAmbientesDisp(data);
            })
            .catch(error => console.error("Error al carga imparticiones:", error));
    }, [idUsuario]);

    useEffect(() => {
        if (selectedOptionAmb != "") {
            fetch(`http://127.0.0.1:5000/ambiente/one_setting/${selectedOptionAmb}`)
                .then(response => response.json())
                .then(data => setAlbergacionMinMax(data))
                .catch(error => console.error("Error al cargar los tipos de ambiente:", error));
        }
    }, [selectedOptionAmb]);


    // --------------- LOGICA PARA HACER CADA LLAMADA PARA CADA FECHA Y UN COD DE AMBIENTE
    useEffect(() => {
        const fetchData = async () => {
            const dataTotal = []; // Array para almacenar la data de todas las llamadas
            const ambienteActual = DataAmbientesDisp.find(item => item.cod_ambiente == selectedOptionAmb);

            // Array para almacenar las promesas fetch
            const fetchPromises = [];

            for (const item of DataFechaAmbientes) {
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        "cod_ambiente": ambienteActual.cod_ambiente,
                        "fecha_aa": item.fecha
                    }),
                };

                // Almacenar la promesa fetch en el array
                const fetchPromise = fetch('http://127.0.0.1:5000/reserva/get_bloque', requestOptions)
                    .then(response => response.json())
                    .then(data => {
                        // Agregar la fecha a la data recibida
                        const dataConFecha = { fecha: item.fecha, ...data };

                        // Almacenar la data en el array dataTotal
                        dataTotal.push(dataConFecha);
                    })
                    .catch(error => console.error('Error al hacer la solicitud POST:', error));

                fetchPromises.push(fetchPromise);
            }

            // Esperar a que todas las promesas fetch se completen antes de actualizar el estado
            await Promise.all(fetchPromises);

            // Actualizar el estado con los datos de todas las llamadas
            setDataFechaBloques(dataTotal);
        };

        fetchData();
    }, [selectedOptionAmb, DataFechaAmbientes, setDataFechaBloques]);

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

    const handleReservar = (ambiente, start, end) => {
        // console.log("-----------", ambiente, "-----------", start, "-----------", end);
        setReserva({ ambiente, start, end });
    };


    const confirmarReserva = () => {
        const imparticionActual = DataImparticiones.find(item => item.cod_imparticion == selectedOptionImparticion);
        // console.log(imparticionActual);
        const { ambiente, start, end } = reserva;   
        const formReserva = {
            cod_usuario: parseInt(ambiente.cod_usuario),
            cod_grupo: imparticionActual.cod_grupo,
            cod_materia: imparticionActual.cod_materia,
            cod_ambiente: ambiente.cod_ambiente,
            cod_dia: ambiente.cod_dia,
            cod_bloque: ambiente.cod_bloque,
            fecha_res: moment(reserva.start).format('YYYY-MM-DD'),
            cantidad_estudiantes_res: cantActEst,
            cantidad_estudiantes_res_total: cantEstudiantes
        }

        // Objeto con los datos de la reserva a enviar
        const reservaData = {
            cod_ambiente: ambiente.cod_ambiente,
            start: start.toISOString(), // Convertir a formato ISO para enviar la fecha y hora
            end: end.toISOString(), // Convertir a formato ISO para enviar la fecha y hora
        };

        // console.log(formReserva);
        // console.log(JSON.stringify(formReserva));
        fetch('http://127.0.0.1:5000/reserva/add_reserva', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formReserva),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al enviar la reserva');
                }
                return response.json();
            })
            .then(data => {
                // console.log('Reserva enviada:', data);
                navigate('/mis-reservas');
                setReserva(null); // Reiniciar la reserva después de enviarla
            })
            .catch(error => {
                console.error('Error al enviar la reserva:', error);
            });
    };


    const cancelarReserva = () => {
        setReserva(null);
    };

    const handleChangeImparticion = (event) => {
        const selectedValue = event.target.value;

        // tengo el id de la impartición con eso obtenemos los datos
        setSelectedOptionImparticion(selectedValue);
        const imparticionActual = DataImparticiones.find(item => item.cod_imparticion == selectedValue);
        setCantEstudiantes(imparticionActual.cantidad_estudiantes_imp);
        // console.log(DataImparticiones);
        // setCantActualEst(imparticionActual.cantidad_estudiantes_imp)
        // fetch(`http://127.0.0.1:5000/reserva/ambientes_disponibles/${imparticionActual.cantidad_estudiantes_imp}`)
        //     .then(response => response.json())
        //     .then(data => setDataAmbientesDisp(data))
        //     .catch(error => console.error("Error al cargar los tipos de ambiente:", error));
        // setSelectedOptionAmb('')
        // setDataFechaAmbientes([])
        // setEventos([]);
    };

    const handleChangeCantEst = (event) => {
        const inputValue = event.target.value;
        if (inputValue === '' || (parseInt(inputValue) >= 0 && parseInt(inputValue) <= cantActEst * porcentajeMax)) {
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

        mostrarHorarioAmbiente();
        // console.log(`Fue presionada por esta opción:  ${selectedValue}`);
    };

    const mostrarHorarioAmbiente = () => {
        // console.log(Object.keys(DataFechaBloques).length);
        // console.log(DataFechaBloques);

        if (DataAmbientesDisp.length > 0) {
            const getNombreAmbiente = (id_codAmbiente) => {
                const ambiente = DataAmbientesDisp.find(amb => amb.cod_ambiente === id_codAmbiente);
                return ambiente ? ambiente.nombre_amb : 'No encontrado';
            };

            const eventosPrueba = [];
            if (DataFechaBloques.length > 0) {
                DataFechaBloques.forEach((subArray, index) => {
                    // detallesAmbiente()

                    // console.log(`Elemento de DataFechaBloques ${index}:`);
                    const fecha = subArray.fecha
                    // console.log(fecha);
                    const bloquesUnAmbiente = Object.keys(subArray);

                    // console.log(bloquesUnAmbiente);
                    bloquesUnAmbiente.forEach((key, index) => {

                        // Verificar si no es el último elemento
                        if (index !== bloquesUnAmbiente.length - 1) {
                            const obj = subArray[key];
                            const { cod_bloque } = obj;
                            const { cod_dia } = obj;
                            const { nombre_blo } = obj;
                            const evento = {
                                title: getNombreAmbiente(parseInt(selectedOptionAmb)),
                                start: moment(`${fecha} ${obtenerHoraInicio(nombre_blo)}`).toDate(),
                                end: moment(`${fecha} ${obtenerHoraFin(nombre_blo)}`).toDate(),
                                resource: detallesAmbiente(selectedOptionAmb, cod_bloque, cod_dia),
                                backgroundColor: 'green'
                            };
                            eventosPrueba.push(evento);
                        }

                    });

                });

                // console.log(eventosPrueba);
            }
            setEventos(eventosPrueba);
            // console.log(eventosPrueba);
        }
    }

    // Función para obtener detalles de un ambiente
    const detallesAmbiente = (selectedOptionAmbiente, cod_bloque, cod_dia) => {
        if (selectedOptionAmb.length > 0) {
            // const imparticionActual = DataImparticiones.find(item => item.cod_imparticion == selectedOptionImparticion);
            // const [materia, grupo] = imparticionActual.imparticion.split(" - ");
            const ambienteActual = DataAmbientesDisp.find(item => item.cod_ambiente == selectedOptionAmbiente);

            const reservaData = {
                NombreUsuario: nombreUsuario,
                // Materia: DataImparticiones,
                // Grupo: DataImparticiones,
                NumeroEstudiantes: cantEstudiantes,
                Ambiente: ambienteActual.nombre_amb,

                cod_usuario: idUsuario,
                // cod_grupo: DataImparticiones,
                // cod_materia: DataImparticiones,
                cod_ambiente: ambienteActual.cod_ambiente,
                cod_dia: cod_dia,
                cod_bloque: cod_bloque
            }
            return reservaData;
        }
    };

    useEffect(() => {
        mostrarHorarioAmbiente();
    }, [selectedOptionAmb, DataFechaAmbientes, DataFechaBloques]);

    const eventPropGetter = (event) => {
        const backgroundColor = event.backgroundColor || 'yellow';

        const style = {
            backgroundColor,
        };
        return {
            style: style,
        };
    };


    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>Buscar por ambiente:</h1>
            <div className="flex justify-center items-center mb-4 mt-5">

                <div className="flex space-x-4">
                    {/* <select
                        className="bg-gray-200 p-2 rounded-md"
                        onChange={handleChangeImparticion}
                        value={selectedOptionImparticion}
                    >
                        <option value="" disabled>
                            Selecciona una materia
                        </option>
                        {DataImparticiones.length > 0 && (
                            DataImparticiones.map((data, index) => (
                                <option key={index} value={data.cod_imparticion}>
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
                    /> */}

                    <select
                        className="bg-gray-200 p-2 rounded-md"
                        onChange={handleChangeAmb}
                        value={selectedOptionAmb}
                    >
                        <option value="" disabled>
                            Selecciona un ambiente
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
                    style={{ height: 600 }}
                    // selectable
                    // onSelectSlot={handleReservar}
                    step={90}
                    timeslots={1}
                    min={new Date(2024, 4, 1, 6, 45)}
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
                    <div className="popup-content" style={{ backgroundColor: '#fff', padding: '60px', borderRadius: '8px', maxWidth: '500px' }}>
                        <Typography variant="h5" component="h2" sx={{ mb: 2, color: theme.palette.text.primary, textAlign: 'center' }}>CONFIRMAR RESERVA</Typography>
                        <div >
                            <p><strong>Hora de Inicio:</strong> {moment(reserva.start).format('HH:mm')}</p>
                            <p><strong>Hora de Fin:</strong> {moment(reserva.end).format('HH:mm')}</p>
                            <p><strong>Fecha:</strong> {moment(reserva.start).format('YYYY-MM-DD')}</p>
                            <p><strong>Nombre:</strong> {reserva.ambiente.NombreUsuario}</p>
                            <p><strong>Materia: </strong>
                                <select
                                    className="bg-gray-200 p-2 rounded-md"
                                    onChange={handleChangeImparticion}
                                    value={selectedOptionImparticion}
                                >
                                    <option value="" disabled>
                                        Selecciona una materia
                                    </option>
                                    {DataImparticiones.length > 0 && (
                                        DataImparticiones.map((data, index) => (
                                            <option key={index} value={data.cod_imparticion}>
                                                {data.imparticion}
                                            </option>
                                        ))
                                    )}
                                </select></p>
                            {/* <p><strong>Materia:</strong> {reserva.ambiente.Materia}</p> */}
                            {/* <p><strong>Grupo:</strong> {reserva.ambiente.Grupo}</p> */}

                            <p><strong>Estudiantes inscritos:</strong> {cantEstudiantes}</p>
                            <p><strong>Capacidad de estudiantes:</strong> {albergacionMinMax.albergacion_min_amb} - {albergacionMinMax.albergacion_max_amb}</p>
                            <p><strong>Ambiente:</strong> {reserva.ambiente.Ambiente}</p>
                        </div>
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
