import React, { forwardRef, useState, useEffect } from 'react';
import { Grid, Typography, useTheme, Box, Button, TextField, Alert, Autocomplete, IconButton } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import ConfirmUpdateModal from '../../../components/modalActualizacion';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import './RegistrarAmbiente.css';
// Estilo para el modal
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
    textAlign: 'center',
};

let porcentajeMin = 0.5;
let porcentajeMax = 1.10;

function EditarAmbiente() {

    const { id } = useParams();
    const navigate = useNavigate();
    const navegarAdministrarAmb = () => { navigate('/administrar-ambiente'); }
    const theme = useTheme();

    //#region ----------------- PARA CAPTURAR --> EL DATO <-- DE CAMPOS QUE EXISTE EN EL REGISTRO: ---------------------------------------------------

    // Declararar variables para los inputs
    const [nombreAmbiente, setNombreAmbiente] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [ubicacion, setUbicacion] = useState('');
    const [capacidad, setCapacidad] = useState('');

    // Declarar variables para el cuadro de entrada con autocompletado
    const [contenidoTipoEdificacion, setContenidoTipoEdificacion] = React.useState(null);
    const [contenidoFacultad, setContenidoFacultad] = React.useState(null);
    const [contenidoNumeroPiso, setContenidoNumeroPiso] = React.useState(null);
    const [contenidoTipoAmbiente, setContenidoTipoAmbiente] = React.useState(null);
    const [contenidoEstadoAmbiente, setContenidoEstadoAmbiente] = React.useState(null);

    // Declaración, añadir varibales necesarias y uso de funcionalidad 
    const [formData, setFormData] = useState("");
    const [formDataCapacidad, setFormDataCapacidad] = useState("");

    // Manejo de cambios en tiempo real en campos de entrada de texto.
    const manejadorCambiosNombreAmbiente = (event) => {
        setNombreAmbiente(event.target.value);
    };

    const manejadorCambiosDescripcion = (event) => {
        setDescripcion(event.target.value);
    };

    const manejadorCambiosUbicacion = (event) => {
        setUbicacion(event.target.value);
    };

    const manejadorCambiosCapacidad = (event) => {
        const inputNumero = event.target.value;
        if (/^\d*$/.test(inputNumero)) {
            setCapacidad(inputNumero);
            setErrorCapacidad(false);
            setMensajeErrorCapacidad('');
        } else {
            setErrorCapacidad(true);
            setMensajeErrorCapacidad('Ingrese solo números');
        }
    };

    //#endregion

    //#region ----------------- TRAER DATOS DE APY RECICLADO DE MOSTRAR AMBIENTE -------------------------------------------------------------------------------------
    const [datos, setDatos] = useState([]);

    useEffect(() => {
        fetch(`http://127.0.0.1:5000/ambiente/one/${id}`)
            .then(response => response.json())
            .then(data => {
                setDatos(data);
                setNombreAmbiente(data.nombre_amb);
                setDescripcion(data.descripcion_amb);
                setUbicacion(data.ubicacion_amb);
                setCapacidad(data.capacidad_amb);
            })
            .catch(error => console.error("Error al obtener los datos:", error));

    }, []);

    const [tipoAmbiente, setTipoAmbiente] = useState([]);
    const [tiposAmbiente, setTiposAmbiente] = useState([]);
    const [opcionesTipoAmbiente, setOpcionesTipoAmbiente] = useState([]);

    useEffect(() => {
        if (datos && datos.cod_tipo_ambiente) {
            fetch('http://127.0.0.1:5000/tipo_ambiente/all')
                .then(response => response.json())
                .then(data => {
                    setTiposAmbiente(data);
                    const tipoEncontrado = data.find(tipo => tipo.cod_tipo_ambiente === datos.cod_tipo_ambiente);
                    if (tipoEncontrado) {
                        setTipoAmbiente([tipoEncontrado.nombre_ta]);
                        const opciones = data.map(tipo => ({ label: tipo.nombre_ta }));
                        setOpcionesTipoAmbiente(opciones);
                    } else {
                        console.error("No se encontró ningún tipo de ambiente con el idTipo proporcionado.");
                    }
                })
                .catch(error => console.error("Error al cargar los tipos de ambiente:", error));
        }
    }, [datos]);

    const [tipoEstadoAmbiente, setTipoEstadoAmbiente] = useState([]);
    const [tiposEstadoAmbiente, setTiposEstadoAmbiente] = useState([]);
    const [opcionesEstadoAmbiente, setOpcionesEstadoAmbiente] = useState([]);

    useEffect(() => {
        if (datos && datos.cod_estado_ambiente) {
            fetch('http://127.0.0.1:5000/estado_ambiente/all')
                .then(response => response.json())
                .then(data => {
                    setTiposEstadoAmbiente(data);
                    const tipoEncontrado = data.find(tipo => tipo.cod_estado_ambiente === datos.cod_estado_ambiente);
                    if (tipoEncontrado) {
                        setTipoEstadoAmbiente([tipoEncontrado.nombre_ea]);
                        const opciones = data.map(tipo => ({ label: tipo.nombre_ea }));
                        setOpcionesEstadoAmbiente(opciones);
                    } else {
                        console.error("No se encontró ningún tipo de ambiente con el idTipo proporcionado.");
                    }
                })
                .catch(error => console.error("Error al cargar los tipos de ambiente:", error));
        }
    }, [datos]);

    const [tipoEdificacion, setTipoEdificacion] = useState([]);
    const [tiposEdificacion, setTiposEdificacion] = useState([]);
    const [opcionesTipoEdificacion, setOpcionesTipoEdificacion] = useState([]);
    useEffect(() => {
        if (datos && datos.cod_edificacion) {
            fetch('http://127.0.0.1:5000/edificacion/all')
                .then(response => response.json())
                .then(data => {
                    setTiposEdificacion(data);
                    const tipoEncontrado = data.find(tipo => tipo.cod_edificacion === datos.cod_edificacion);
                    if (tipoEncontrado) {
                        setTipoEdificacion([tipoEncontrado.nombre_edi]);
                        const opciones = data.map(tipo => ({ label: tipo.nombre_edi }));
                        setOpcionesTipoEdificacion(opciones);
                    } else {
                        console.error("No se encontró ningún tipo de ambiente con el idTipo proporcionado.");
                    }
                })
                .catch(error => console.error("Error al cargar los tipos de ambiente:", error));
        }
    }, [datos]);

    const [tipoFacultad, setTipoFacultad] = useState([]);
    const [tiposFacultad, setTiposFacultad] = useState([]);
    const [opcionesFacultad, setOpcionesFacultad] = useState([]);

    useEffect(() => {
        if (datos && datos.cod_facultad) {
            fetch('http://127.0.0.1:5000/facultad/all')
                .then(response => response.json())
                .then(data => {
                    setTiposFacultad(data);
                    const tipoEncontrado = data.find(tipo => tipo.cod_facultad === datos.cod_facultad);
                    if (tipoEncontrado) {
                        setTipoFacultad([tipoEncontrado.nombre_fac]);
                        const opciones = data.map(tipo => ({ label: tipo.nombre_fac }));
                        setOpcionesFacultad(opciones);
                    } else {
                        console.error("No se encontró ningún tipo de ambiente con el idTipo proporcionado.");
                    }
                })
                .catch(error => console.error("Error al cargar los tipos de ambiente:", error));
        }
    }, [datos]);

    const [tipoNumeroPiso, setTipoNumeroPiso] = useState([]);
    const [tiposNumeroPiso, setTiposNumeroPiso] = useState([]);
    const [opcionesNumeroPiso, setOpcionesNumeroPiso] = useState([]);
    useEffect(() => {
        if (datos && datos.cod_piso) {
            fetch('http://127.0.0.1:5000/piso/all')
                .then(response => response.json())
                .then(data => {
                    setTiposNumeroPiso(data);
                    const tipoEncontrado = data.find(tipo => tipo.cod_piso === datos.cod_piso);
                    if (tipoEncontrado) {
                        setTipoNumeroPiso([tipoEncontrado.nombre_piso]);
                        const opciones = data.map(tipo => ({ label: tipo.nombre_piso }));
                        setOpcionesNumeroPiso(opciones);
                    } else {
                        console.error("No se encontró ningún tipo de ambiente con el idTipo proporcionado.");
                    }
                })
                .catch(error => console.error("Error al cargar los tipos de ambiente:", error));
        }
    }, [datos]);
    // console.log(tipoAmbiente,tipoEstadoAmbiente,tipoEdificacion,tipoFacultad,tipoNumeroPiso);

    //#endregion

    //#region ----------------- VALIDACIONES DE LOS CUADROS DE ENTRADA DE TEXTO -------------------------------------------------------------------------------------

    // Declaracion de 4 tipos de errores y 4 tipos de mensaje de errores
    const [errorAmbiente, setErrorAmbiente] = useState(false);
    const [mensajeErrorAmbiente, setMensajeErrorAmbiente] = useState('');
    const [errorDescripcion, setErrorDescripcion] = useState(false);
    const [mensajeErrorDescripcion, setMensajeErrorDescripcion] = useState('');
    const [errorUbicacion, setErrorUbicacion] = useState(false);
    const [mensajeErrorUbicacion, setMensajeErrorUbicacion] = useState('');
    const [errorCapacidad, setErrorCapacidad] = useState(false);
    const [mensajeErrorCapacidad, setMensajeErrorCapacidad] = useState('');

    // Validacion de los 4 inputs: devuelve true si no cumple la validacion
    //                             devuelve false si cumple la validacion
    const validarNombreAmbiente = () => {
        if (!nombreAmbiente.trim()) {
            setMensajeErrorAmbiente('El nombre del ambiente es requerido.');
            setErrorAmbiente(true);
            return true;
        }

        if (nombreAmbiente.trim().length > 60) {
            setMensajeErrorAmbiente('El nombre de ambiente no debe exceder los 60 caracteres.');
            setErrorAmbiente(true);
            return true;
        }
        setMensajeErrorAmbiente('');
        setErrorAmbiente(false);
        return false;
    }

    const validarDescripcion = () => {
        if (!descripcion.trim()) {
            setMensajeErrorDescripcion('La descripción es requerido.');
            setErrorDescripcion(true);
            return true;
        }

        if (descripcion.trim().length > 255) {
            setMensajeErrorDescripcion('La descripción no debe exceder los 255 caracteres');
            setErrorDescripcion(true);
            return true;
        }
        setMensajeErrorDescripcion('');
        setErrorDescripcion(false);
        return false;
    }

    const validarUbicacion = () => {
        if (!ubicacion.trim()) {
            setMensajeErrorUbicacion('La ubicación es requerida.');
            setErrorUbicacion(true);
            return true;
        }

        if (ubicacion.trim().length > 100) {
            setMensajeErrorUbicacion('La ubicación no debe exceder los 100 caracteres');
            setErrorUbicacion(true);
            return true;
        }
        setMensajeErrorUbicacion('');
        setErrorUbicacion(false);
        return false;
    }

    const validarCapacidad = () => {
        if (typeof capacidad !== 'string') {
            return false;
        }
        if (!capacidad.trim()) {
            setMensajeErrorCapacidad('la capacidad es requerido.');
            setErrorCapacidad(true);
            return true;
        }

        if (capacidad.trim().length > 4) {
            setMensajeErrorCapacidad('La capacidad no debe exceder los 4 cifras');
            setErrorCapacidad(true);
            return true;
        }
        setMensajeErrorCapacidad('');
        setErrorCapacidad(false);
        return false;
    }

    // Comprueba si la validacion es exitosa: retorna true si todos los inputs cumplen la restriccion establecida
    // ! la negación: si al validar un campo nos devulve false -> cumple la validacion, !false -> la validacion es exitosa
    const validarTodosLosInputs = () => {
        validarNombreAmbiente(); validarDescripcion(); validarUbicacion(); validarCapacidad();
        return !validarNombreAmbiente() && !validarDescripcion() && !validarUbicacion() && !validarCapacidad();
    }

    // useEffect(() => {
    //   validarTodosLosInputs();
    // }, [nombreAmbiente, capacidad, ubicacion, descripcion]);
    //#endregion

    //#region ----------------- INICIALIZACIÓN Y ENVIO DEL FORMULARIO -------------------------------------------------------------------------------------

    // Guardar el formData mediante una llamada post a la base de datos 
    const manejarEnvio = async () => {

        if (validarTodosLosInputs()) {
            if (contenidoTipoAmbiente != null && contenidoEstadoAmbiente != null && contenidoTipoEdificacion != null &&
                contenidoFacultad != null && contenidoNumeroPiso != null) {
                try {
                    await mandarFormulario();
                    // console.log("++++++ => Formulario enviado");
                } catch (error) {
                    console.error('Error al enviar el formulario:', error);
                }
            } else {
                //console.log("CUADROS AUTOCOMPLETADOS OBLIGATORIOS");
                setMostrarAlerta(true);
            }
        } else {
            setMostrarAlerta(true);
            // console.log("---------- => NAAAAAAAADA QUE ENVIAR");
        }
    };

    const mandarFormulario = async () => {
        try {
            rellenarDatos();
            const response = await fetch(`http://127.0.0.1:5000/ambiente/update/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const response2 = await fetch(`http://127.0.0.1:5000/ambiente/update_setting/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', },
                body: JSON.stringify(formDataCapacidad),
            });

            if (response.ok && response2.ok) {
                // console.log('Ambiente modificado exitosamente');
                navigate('/administrar-ambiente');
            } else {
                const errorMessage = await response.text();
                console.error('Error al crear el ambiente:', errorMessage);
            }
        } catch (error) {
            console.error('Error de red:', error);
        }
    };

    const rellenarDatos = () => {

        const datosAutocompletados = {
            capacidad_amb: capacidad,
            cod_ambiente: datos.cod_ambiente,
            cod_edificacion: obtenerIdCampoAutocompletado(contenidoTipoEdificacion.label),
            cod_estado_ambiente: obtenerIdCampoAutocompletado(contenidoEstadoAmbiente.label),
            cod_facultad: obtenerIdCampoAutocompletado(contenidoFacultad.label),
            cod_piso: obtenerIdCampoAutocompletado(contenidoNumeroPiso.label),
            cod_tipo_ambiente: obtenerIdCampoAutocompletado(contenidoTipoAmbiente.label),
            descripcion_amb: descripcion,
            nombre_amb: nombreAmbiente,
            ubicacion_amb: ubicacion,
        };

        const datosCapacidad = {
            albergacion_max_amb: capacidad * porcentajeMax,
            albergacion_min_amb: capacidad * porcentajeMin
        }

        setFormDataCapacidad(datosCapacidad);
        setFormData(datosAutocompletados);
    };

    useEffect(() => {
        if (contenidoEstadoAmbiente != null && contenidoNumeroPiso != null && contenidoTipoAmbiente != null &&
            contenidoFacultad != null && contenidoTipoEdificacion != null) {
            rellenarDatos();
        }
    }, [nombreAmbiente, capacidad, ubicacion, descripcion, contenidoEstadoAmbiente,
        contenidoNumeroPiso, contenidoTipoEdificacion, contenidoFacultad, contenidoTipoAmbiente, setFormData]);
    //#endregion

    //#region ----------------- IMPLEMENTACIÓN DEL ALERT Y MODAL ------------------------------------------------------------------------------------------------------ 
    const [mostrarAlerta, setMostrarAlerta] = useState(false);

    const [openModal, setOpenModal] = useState(false);

    const handleOpenModal = () => {
        if (validarTodosLosInputs()) {
            if (contenidoTipoAmbiente != null && contenidoEstadoAmbiente != null && contenidoTipoEdificacion != null &&
                contenidoFacultad != null && contenidoNumeroPiso != null) {
                setOpenModal(true);
            } else {
                setMostrarAlerta(true);
            }
        } else {
            setMostrarAlerta(true);
        }
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleConfirmUpdate = () => {
        // console.log('-----',formData);
        // console.log(datos);
        // console.log(id);
        // console.log(capacidad);
        manejarEnvio()
        handleCloseModal()
        // handleClose
    };


    useEffect(() => {
        const timeout = setTimeout(() => {
            setMostrarAlerta(false);
        }, 5000);

        return () => clearTimeout(timeout);
    }, [mostrarAlerta]);
    //#endregion


    //CUADRO CON AUTCOMPLETABLE
    //#region - IMPLEMENTACIÓN DE SELECCIÓN DE ID CON AUTOCOMPLETADO EN FORMULARIO PARA ENVIÓ A API

    // Funcionalidad de captura de IDs en "campos de entrada con autocompletado" para luego enviar el formulario mediante una API a la base de datos
    // en el formulario, solo se permiten IDs, por ejemplo: 1-> Laboratorio, 2-> Aulas, 3-> Auditorio.
    const obtenerIdCampoAutocompletado = (label) => {
        let idCampo = null;

        tiposEdificacion.forEach(opcion => {
            if (opcion.nombre_edi === label) {
                idCampo = opcion.cod_edificacion;
                return;
            }
        });

        tiposFacultad.forEach(opcion => {
            if (opcion.nombre_fac === label) {
                idCampo = opcion.cod_facultad;
                return;
            }
        });

        tiposNumeroPiso.forEach(opcion => {
            if (opcion.nombre_piso === label) {
                idCampo = opcion.cod_piso;
                return;
            }
        });

        tiposAmbiente.forEach(opcion => {
            if (opcion.nombre_ta === label) {
                idCampo = opcion.cod_tipo_ambiente;
                return;
            }
        });

        tiposEstadoAmbiente.forEach(opcion => {
            if (opcion.nombre_ea === label) {
                idCampo = opcion.cod_estado_ambiente;
                return;
            }
        });

        return idCampo;
    };

    //metodo para encontrar dado el nombre del label en el array de label opciones
    const encontrarIndicePorLabel = (opciones, busquedaLabel) => {
        if (busquedaLabel != undefined && opciones != undefined) {
            const indice = opciones.findIndex(opcion =>
                opcion.label.toLowerCase() === busquedaLabel.toLowerCase()
            );
            return indice;
        }
        return -1;
    };

    useEffect(() => {
        // Actualizar el valor cada vez que opcionesTipoAmbiente 
        if (tipoAmbiente != undefined && opcionesTipoAmbiente != undefined) {
            let indice = encontrarIndicePorLabel(opcionesTipoAmbiente, tipoAmbiente[0]);
            setContenidoTipoAmbiente(opcionesTipoAmbiente[indice] || null);
        }

        if (tipoEstadoAmbiente != undefined && opcionesEstadoAmbiente != undefined) {
            let indice = encontrarIndicePorLabel(opcionesEstadoAmbiente, tipoEstadoAmbiente[0]);
            setContenidoEstadoAmbiente(opcionesEstadoAmbiente[indice] || null);
        }

        if (tipoEdificacion != undefined && opcionesTipoEdificacion != undefined) {
            let indice = encontrarIndicePorLabel(opcionesTipoEdificacion, tipoEdificacion[0]);
            setContenidoTipoEdificacion(opcionesTipoEdificacion[indice] || null);
        }

        if (tipoFacultad != undefined && opcionesFacultad != undefined) {
            let indice = encontrarIndicePorLabel(opcionesFacultad, tipoFacultad[0]);
            setContenidoFacultad(opcionesFacultad[indice] || null);
        }

        if (tipoNumeroPiso != undefined && opcionesNumeroPiso != undefined) {
            let indice = encontrarIndicePorLabel(opcionesNumeroPiso, tipoNumeroPiso[0]);
            setContenidoNumeroPiso(opcionesNumeroPiso[indice] || null);
        }
    }, [opcionesTipoAmbiente, tipoAmbiente, opcionesEstadoAmbiente, tipoEstadoAmbiente, opcionesTipoEdificacion, tipoEdificacion, opcionesFacultad, tipoFacultad, opcionesNumeroPiso, tipoNumeroPiso]);

    const abrirGoogleMaps = () => {
        const url = 'https://www.google.com/maps/@-17.3936905,-66.1448234,16z?entry=ttu';
        window.open(url, '_blank');
    };

    return (
        <>
            <Box
                //estilo
                sx={{
                    p: 4, // padding
                    bgcolor: "background.paper",
                    boxShadow: 8,
                    textAlign: 'center',
                    // width: '80%',
                    width: '600px',
                    margin: '0 auto', // centrado horizontal
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >

                <Grid container alignItems="center" sx={{ mb: 3 }}>
                    <Grid item >
                        <IconButton onClick={navegarAdministrarAmb} aria-label="back">
                            <ArrowBackIcon fontSize='large' />
                        </IconButton>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} >
                        <Typography variant="h5" component="h2" sx={{ color: theme.palette.text.primary }}>ACTUALIZACIÓN DE AMBIENTE</Typography>
                    </Grid>
                </Grid>

                <Grid container item xs={12} sm={12} md={12} lg={12} xl={12} direction="column"
                    justifyContent="center"
                    alignItems="center">
                    <TextField
                        className='form-inputs'
                        sx={{ mb: 1.5 }}
                        value={nombreAmbiente}
                        onChange={manejadorCambiosNombreAmbiente}
                        onBlur={validarNombreAmbiente}
                        error={errorAmbiente}
                        helperText={errorAmbiente ? mensajeErrorAmbiente : ''}
                        label="Nombre de ambiente: "
                        variant="standard"
                    />
                    <TextField
                        className='form-inputs'
                        sx={{ mb: 1.5 }}
                        value={descripcion}
                        onChange={manejadorCambiosDescripcion}
                        onBlur={validarDescripcion}
                        error={errorDescripcion}
                        helperText={errorDescripcion ? mensajeErrorDescripcion : ''}
                        label="Descripción"
                        multiline
                        maxRows={3}
                        variant="standard"
                    />

                    <Grid alignItems="center" sx={{ mb: 1.5, marginLeft: '50px' }}>

                        <TextField
                            className='form-inputs'
                            value={ubicacion}
                            onChange={manejadorCambiosUbicacion}
                            onBlur={validarUbicacion}
                            error={errorUbicacion}
                            helperText={errorUbicacion ? mensajeErrorUbicacion : ''}
                            label="Ubicación: "
                            multiline
                            maxRows={2}
                            variant="standard"
                        />
                        <IconButton onClick={abrirGoogleMaps} aria-label="back">
                            <AddLocationAltIcon fontSize='large' />
                        </IconButton>

                    </Grid>

                    <TextField
                        sx={{ mb: 3, width: '15%' }}
                        value={capacidad}
                        onChange={manejadorCambiosCapacidad}
                        onBlur={validarCapacidad}
                        error={errorCapacidad}
                        helperText={errorCapacidad ? mensajeErrorCapacidad : ''}
                        label="Capacidad: "
                        variant="standard"
                    />

                    <Autocomplete
                        disablePortal
                        value={contenidoTipoAmbiente}
                        options={opcionesTipoAmbiente}
                        onChange={(event, newValue) => setContenidoTipoAmbiente(newValue)}
                        getOptionLabel={(option) => option.label}
                        isOptionEqualToValue={(option, value) => option.label === value.label}
                        className='form-inputs'
                        renderInput={(params) => (
                            <TextField {...params} label={"Tipo de ambiente: "} />
                        )}
                    />
                    <Autocomplete
                        disablePortal
                        value={contenidoEstadoAmbiente}
                        options={opcionesEstadoAmbiente}
                        onChange={(event, newValue) => setContenidoEstadoAmbiente(newValue)}
                        getOptionLabel={(option) => option.label}
                        isOptionEqualToValue={(option, value) => option.label === value.label}
                        className='form-inputs'
                        renderInput={(params) => (
                            <TextField {...params} label={"Estado de ambiente: "} />
                        )}
                    />

                    <Autocomplete
                        disablePortal
                        value={contenidoTipoEdificacion}
                        options={opcionesTipoEdificacion}
                        onChange={(event, newValue) => setContenidoTipoEdificacion(newValue)}
                        getOptionLabel={(option) => option.label}
                        isOptionEqualToValue={(option, value) => option.label === value.label}
                        className='form-inputs'
                        renderInput={(params) => (
                            <TextField {...params} label={"Tipo de edificación: "} />
                        )}
                    />
                    <Autocomplete
                        disablePortal
                        value={contenidoFacultad}
                        options={opcionesFacultad}
                        onChange={(event, newValue) => setContenidoFacultad(newValue)}
                        getOptionLabel={(option) => option.label}
                        isOptionEqualToValue={(option, value) => option.label === value.label}
                        className='form-inputs'
                        renderInput={(params) => (
                            <TextField {...params} label={"Facultad: "} />
                        )}
                    />
                    {/* <Autocomplete
                        disablePortal
                        value={contenidoNumeroPiso}
                        options={opcionesNumeroPiso}
                        onChange={(event, newValue) => setContenidoNumeroPiso(newValue)}
                        getOptionLabel={(option) => option.label}
                        isOptionEqualToValue={(option, contenidoNumeroPiso) => option.label === contenidoNumeroPiso.label}
                        className='form-inputs'
                        renderInput={(params) => (
                            <TextField {...params} label={"Piso: "} />
                        )}
                    /> */}

                    <Button type="submit" variant="contained" onClick={handleOpenModal} sx={{ marginTop: '18px' }} className='formboton'>
                        ACTUALIZAR
                    </Button>

                    <ConfirmUpdateModal
                        open={openModal}
                        handleClose={handleCloseModal}
                        handleConfirm={handleConfirmUpdate}
                    />

                    {mostrarAlerta && (
                        <Alert
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: '1rem',

                            }}
                            variant="filled"
                            severity="error"
                        >
                            Verifique los datos.
                        </Alert>

                    )}
                </Grid>
            </Box>
        </>
    );
}

export default EditarAmbiente;
