import React, { forwardRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, useTheme, Button, Box, Modal, Alert, TextField, Grid, IconButton } from '@mui/material';
import Autocompletado from '../components/autocompletado';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import './Registrar ambiente.css'

// Estilo para el modal
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 24,
  pt: 2, px: 4, pb: 3,
  textAlign: 'center',
};

let porcentajeMin = 0.5;
let porcentajeMax = 1.10;

function RegistrarAmbiente() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const navigate = useNavigate();
  const handleClose = () => { setOpen(false); navigate('/administrar-ambiente'); }
  const navegarAdministrarAmb = () => { navigate('/administrar-ambiente'); }
  const theme = useTheme();

  //#region ----------------- PARA CAPTURAR --> EL DATO <-- DE CAMPOS QUE EXISTE EN EL REGISTRO: ---------------------------------------------------

  // Declarar variables para el cuadro de entrada con autocompletado
  const [contenidoTipoEdificacion, setContenidoTipoEdificacion] = useState(null);
  const [contenidoFacultad, setContenidoFacultad] = useState(null);
  const [contenidoNumeroPiso, setContenidoNumeroPiso] = useState(1);
  const [contenidoTipoAmbiente, setContenidoTipoAmbiente] = useState(null);
  const [contenidoEstadoAmbiente, setContenidoEstadoAmbiente] = useState(null);

  // Declararar variables para los inputs
  const [nombreAmbiente, setNombreAmbiente] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [capacidad, setCapacidad] = useState('');

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
          if (!open) {
            handleOpen();
          }
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
      const response = await fetch('http://127.0.0.1:5000/ambiente/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        console.log('Ambiente creado exitosamente');
      } else {
        const errorMessage = await response.text();
        console.error('Error al crear el ambiente:', errorMessage);
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };

  // Declaración, añadir varibales necesarias y uso de funcionalidad 
  const [formData, setFormData] = useState("");

  const rellenarDatos = () => {
    const datosAutocompletados = {
      nombre_amb: nombreAmbiente,
      capacidad_amb: capacidad,
      ubicacion_amb: ubicacion,
      descripcion_amb: descripcion,
      albergacion_max_amb: capacidad*porcentajeMax,
      albergacion_min_amb: capacidad*porcentajeMin,
      cod_estado_ambiente: contenidoEstadoAmbiente,
      // cod_piso: contenidoNumeroPiso,
      cod_piso: contenidoNumeroPiso,
      cod_edificacion: contenidoTipoEdificacion,
      cod_facultad: contenidoFacultad,
      cod_tipo_ambiente: contenidoTipoAmbiente
    };
    setFormData(datosAutocompletados);
  };

  useEffect(() => {
    rellenarDatos();
  }, [nombreAmbiente, capacidad, ubicacion, descripcion, contenidoEstadoAmbiente,
    contenidoNumeroPiso, contenidoTipoEdificacion, contenidoFacultad, contenidoTipoAmbiente, setFormData]);
  //#endregion

  //#region ----------------- IMPLEMENTACIÓN DEL ALERT Y MODAL ------------------------------------------------------------------------------------------------------ 
  const [mostrarAlerta, setMostrarAlerta] = useState(false);

  const ChildModal = forwardRef(({ handleClose }, ref) => {
    return (
      <Box ref={ref} sx={style} tabIndex={0}>
        <span style={{ fontSize: '48px', color: '#4caf50', display: 'block', marginBottom: '16px' }}>&#10003;</span>
        <h2 id="child-modal-title">Guardado correctamente</h2>
        <Button onClick={handleClose}>OK</Button>
      </Box>
    );
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      setMostrarAlerta(false);
    }, 5000);

    return () => clearTimeout(timeout);
  }, [mostrarAlerta]);
  //#endregion

  //#region ----------------- TRAER IDS PARA CADA OPCION DEL CUADRO CON ATOCOMPLETAOD -------------------------------------------------------------------------------------
  const obtenerIdTipoAmbiente = (dato) => {
    setContenidoTipoAmbiente(dato);
  };

  const obtenerIdEstadoAmbiente = (dato) => {
    setContenidoEstadoAmbiente(dato);
  };

  const obtenerIdPerteneceA = (dato) => {
    setContenidoTipoEdificacion(dato);
  };

  const obtenerIdFacultad = (dato) => {
    setContenidoFacultad(dato);
  };

  const obtenerIdPiso = (dato) => {
    setContenidoNumeroPiso(dato);
  };

  //#endregion

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
          width: '80%',
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
            <Typography variant="h5" component="h2" sx={{ mt: 1, color: theme.palette.text.primary }}>REGISTRO DE AMBIENTE</Typography>
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
            className='form-inputs'
            type='number'
            value={capacidad}
            onChange={manejadorCambiosCapacidad}
            onBlur={validarCapacidad}
            error={errorCapacidad}
            helperText={errorCapacidad ? mensajeErrorCapacidad : ''}
            label="Capacidad: "
            variant="standard"
          />

          <Autocompletado
            disablePortal
            idOptionSelec={obtenerIdTipoAmbiente}
            id="combo-box-demo"
            options={'opcionesTipoAmbiente'}
            value={contenidoTipoAmbiente}
            onChange={(event, newValue) => setContenidoTipoAmbiente(newValue)} // Cambio aquí
            getOptionLabel={(option) => option.label}
            isOptionEqualToValue={(option, contenidoTipoAmbiente) => option.label === contenidoTipoAmbiente.label}
            className='form-inputs'
            etiqueta="Tipo de ambiente:"
          />

          <Autocompletado
            disablePortal
            idOptionSelec={obtenerIdEstadoAmbiente}
            id="combo-box-demo"
            options={'opcionesEstadoAmbiente'}
            value={contenidoEstadoAmbiente}
            onChange={(event, newValue) => setContenidoEstadoAmbiente(newValue)}
            getOptionLabel={(option) => option.label}
            isOptionEqualToValue={(option, contenidoEstadoAmbiente) => option.label === contenidoEstadoAmbiente.label}
            className='form-inputs'
            etiqueta="Estado de ambiente:"
          />

          <Autocompletado
            disablePortal
            idOptionSelec={obtenerIdPerteneceA}
            id="combo-box-demo"
            options={'opcionesTipoEdificacion'}
            value={contenidoTipoEdificacion}
            onChange={(event, newValue) => setContenidoTipoEdificacion(newValue)}
            getOptionLabel={(option) => option.label}
            isOptionEqualToValue={(option, contenidoTipoEdificacion) => option.label === contenidoTipoEdificacion.label}
            className='form-inputs'
            etiqueta="Tipo de edificación:"
          />
          <Autocompletado
            disablePortal
            idOptionSelec={obtenerIdFacultad}
            id="combo-box-demo"
            options={'opcionesFacultad'}
            value={contenidoFacultad}
            onChange={(event, newValue) => setContenidoFacultad(newValue)}
            getOptionLabel={(option) => option.label}
            isOptionEqualToValue={(option, contenidoFacultad) => option.label === contenidoFacultad.label}
            className='form-inputs'
            etiqueta="Facultad:"
          />
          {/* <Autocompletado
            disablePortal
            idOptionSelec={obtenerIdPiso}
            id="combo-box-demo"
            options={'opcionesNumeroPiso'}
            value={contenidoNumeroPiso}
            onChange={(event, newValue) => setContenidoNumeroPiso(newValue)}
            getOptionLabel={(option) => option.label}
            isOptionEqualToValue={(option, contenidoNumeroPiso) => option.label === contenidoNumeroPiso.label}
            className='form-inputs'
            etiqueta="Piso:" /> */}

          <Button type="submit" variant="contained" onClick={manejarEnvio} sx={{ marginTop: '18px' }} className='formboton'>
            REGISTRAR
          </Button>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <ChildModal handleClose={handleClose} />
          </Modal>

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

export default RegistrarAmbiente;
