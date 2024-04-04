import { useState, useEffect } from 'react';

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Typography, useTheme } from '@mui/material';
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Grid } from "@mui/material";
// import { styled } from "@mui/material/styles";
// import Paper from "@mui/material/Paper";


// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: "center",
//   color: theme.palette.text.secondary,
// }));

function RegistrarAmbiente() {

  const theme = useTheme();

  //#region - LLAMADAS API Y CREACIÓN DE VARIABLES - CUADRO CON AUTOCOMPLETADO

  // Creando variable para campos de entrada con autocompletado a través de llamadas API
  const [tiposEdificios, setTiposEdificios] = useState([]);
  useEffect(() => {
    fetch('http://127.0.0.1:5000/edificio/all')
      .then(response => response.json())
      .then(data => setTiposEdificios(data))
      .catch(error => console.error("Error al cargar los tipos de ambiente:", error));
  }, []);

  const [tiposFacultad, setTiposFacultad] = useState([]);
  useEffect(() => {
    fetch('http://127.0.0.1:5000/facultad/all')
      .then(response => response.json())
      .then(data => setTiposFacultad(data))
      .catch(error => console.error("Error al cargar los tipos de ambiente:", error));
  }, []);

  const [tiposNumeroPiso, setTiposNumeroPiso] = useState([]);
  useEffect(() => {
    fetch('http://127.0.0.1:5000/piso/all')
      .then(response => response.json())
      .then(data => setTiposNumeroPiso(data))
      .catch(error => console.error("Error al cargar los tipos de ambiente:", error));
  }, []);

  const [tiposAmbiente, setTiposAmbiente] = useState([]);
  useEffect(() => {
    fetch('http://127.0.0.1:5000/tipo_ambiente/all')
      .then(response => response.json())
      .then(data => setTiposAmbiente(data))
      .catch(error => console.error("Error al cargar los tipos de ambiente:", error));
  }, []);

  const [tiposEstadoAmbiente, setTiposEstadoAmbiente] = useState([]);
  useEffect(() => {
    fetch('http://127.0.0.1:5000/estado_ambiente/all')
      .then(response => response.json())
      .then(data => setTiposEstadoAmbiente(data))
      .catch(error => console.error("Error al cargar los tipos de ambiente:", error));
  }, []);


  // Crear una variable con una lista de etiquetas para cada campo de entrada con autocompletado.
  const opcionesTipoEdificio = tiposEdificios.map(tipo => ({
    label: tipo.nombre_edi,
  }));

  const opcionesFacultad = tiposFacultad.map(tipo => ({
    label: tipo.nombre_fac,
  }));

  const opcionesNumeroPiso = tiposNumeroPiso.map(tipo => ({
    label: tipo.nombre_piso,
  }));


  const opcionesTipoAmbiente = tiposAmbiente.map(tipo => ({
    label: tipo.nombre_ta,
  }));

  const opcionesEstadoAmbiente = tiposEstadoAmbiente.map(tipo => ({
    label: tipo.nombre_ea,
  }));
  //#endregion

  //#region - PARA CAPTURAR --> EL DATO <-- DE CAMPOS QUE EXISTE EN EL REGISTRO:

  // Declarar variables para el cuadro de entrada con autocompletado
  const [contenidoTipoEdificio, setContenidoTipoEdificio] = useState(null);
  const [contenidoFacultad, setContenidoFacultad] = useState(null);
  const [contenidoNumeroPiso, setContenidoNumeroPiso] = useState(null);
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
    if (/^\d+$/.test(inputNumero)) {
      setCapacidad(inputNumero);
      setErrorCapacidad(false);
      setMensajeErrorCapacidad('');
    }else {
      setErrorCapacidad(true);
      setMensajeErrorCapacidad('Ingrese solo números');
    }
  };
  //#endregion

  //#region - VALIDACIONES DE LOS CUADROS DE ENTRADA DE TEXTO 

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

    if (nombreAmbiente.trim().length > 20) {
      setMensajeErrorAmbiente('El nombre de ambiente no debe exceder los 20 caracteres.');
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
  
  //#endregion

  //#region - IMPLEMENTACIÓN DE SELECCIÓN DE ID CON AUTOCOMPLETADO EN FORMULARIO PARA ENVIÓ A API

  // Funcionalidad de captura de IDs en "campos de entrada con autocompletado" para luego enviar el formulario mediante una API a la base de datos
  // en el formulario, solo se permiten IDs, por ejemplo: 1-> Laboratorio, 2-> Aulas, 3-> Auditorio.
  const obtenerIdCampoAutocompletado = (label) => {
    let codigoTipoAmbiente = null;

    tiposEdificios.forEach(opcion => {
      if (opcion.nombre_edi === label) {
        codigoTipoAmbiente = opcion.cod_edificio;
        return;
      }
    });

    tiposFacultad.forEach(opcion => {
      if (opcion.nombre_fac === label) {
        codigoTipoAmbiente = opcion.cod_facultad;
        return;
      }
    });

    tiposNumeroPiso.forEach(opcion => {
      if (opcion.nombre_piso === label) {
        codigoTipoAmbiente = opcion.cod_piso;
        return;
      }
    });

    tiposAmbiente.forEach(opcion => {
      if (opcion.nombre_ta === label) {
        codigoTipoAmbiente = opcion.cod_tipo_ambiente;
        return;
      }
    });

    tiposEstadoAmbiente.forEach(opcion => {
      if (opcion.nombre_ea === label) {
        codigoTipoAmbiente = opcion.cod_estado_ambiente;
        return;
      }
    });

    return codigoTipoAmbiente;
  };
  //#endregion

  //#region - INICIALIZACIÓN Y ENVIO DEL FORMULARIO

  // Declaración, añadir varibales necesarias y uso de funcionalidad 
  const [formData, setFormData] = useState("");

  const rellenarDatos = () => {
    const datosAutocompletados = {
      nombre_amb: nombreAmbiente,
      capacidad_amb: capacidad,
      ubicacion_amb: ubicacion,
      descripcion_amb: descripcion,
      cod_estado_ambiente: obtenerIdCampoAutocompletado(contenidoEstadoAmbiente.label),
      cod_piso: obtenerIdCampoAutocompletado(contenidoNumeroPiso.label),
      cod_edificio: obtenerIdCampoAutocompletado(contenidoTipoEdificio.label),
      cod_facultad: obtenerIdCampoAutocompletado(contenidoFacultad.label),
      cod_tipo_ambiente: obtenerIdCampoAutocompletado(contenidoTipoAmbiente.label)
    };

    setFormData(datosAutocompletados);
  };

  // ENVIAR EL FORMDATA MEDIANTE UNA LLAMADA POST A LA BASE DE DATOS
  const addEnAppi = async (e) => {

  }
  const manejarEnvioAux = () => {
    //rellenarDatos();
    console.log("validacion en general de todos: ",validarTodosLosInputs())
    if (validarTodosLosInputs()) {
      if(contenidoTipoAmbiente!=null && contenidoEstadoAmbiente!=null && contenidoTipoEdificio!=null &&
         contenidoFacultad!=null && contenidoNumeroPiso){
          console.log("++++++ => Formulario enviado");
          console.log("Ambiente ", errorAmbiente, mensajeErrorAmbiente)
          console.log("DEscripcion ", errorDescripcion, mensajeErrorDescripcion)
          console.log("Ubicaciom", errorUbicacion, mensajeErrorUbicacion)
          console.log("Capacida", errorCapacidad, mensajeErrorCapacidad)
         }else{
          console.log("CUADROS AUTOCOMPLETADOS OBLIGATORIOS")
         }

    } else {
      console.log( "---------- => NAAAAAAAADA QUE ENVIAR")
      console.log("Ambiente ", errorAmbiente, mensajeErrorAmbiente)
      console.log("DEscripcion ", errorDescripcion, mensajeErrorDescripcion)
      console.log("Ubicaciom", errorUbicacion, mensajeErrorUbicacion)
      console.log("Capacida", errorCapacidad, mensajeErrorCapacidad)
    }
  }

  const manejarEnvio = async (e) => {
    e.preventDefault();
    try {
      rellenarDatos();
      //console.log(JSON.stringify(datos),' <----> ', JSON.stringify(formData));
      const response = await fetch('http://127.0.0.1:5000/ambiente/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)

      });
      //Manejo de exito o fracaso
      if (response.ok) {
        console.log('Ambiente creado exitosamente');
      } else {
        console.error('Error al crear el ambiente');
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };
  //#endregion

  return (
    <div>
      <Box
        //estilo
        sx={{
          p: 10, // padding
          bgcolor: "background.paper",
          boxShadow: 8,
          height: "auto",
        }}
      >

        <Typography variant="h5" component="h2" sx={{ mb: 5, color: theme.palette.text.primary }}>REGISTRAR AMBIENTE</Typography>

          <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 8, md: 3 }}>
            <Grid item xs={12} sm={6}>

              <TextField
                sx={{ mb: 2, width: 300 }}
                // id="nombreAmbiente"
                value={nombreAmbiente}
                onChange={manejadorCambiosNombreAmbiente}
                onBlur={validarNombreAmbiente}
                error={errorAmbiente}
                helperText={errorAmbiente ? mensajeErrorAmbiente : ''}
                label="Nombre de ambiente: "
                variant="standard"
              />
              <TextField
                sx={{ mb: 2, width: 300 }}
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
              <TextField
                sx={{ mb: 2, width: 300 }}
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
              <TextField
                sx={{ mb: 2, width: 300 }}
                value={capacidad}
                onChange={manejadorCambiosCapacidad}
                onBlur={validarCapacidad}
                error={errorCapacidad}
                helperText={errorCapacidad ? mensajeErrorCapacidad : ''}
                label="Capacidad: "
                variant="standard"
              />
            </Grid>

            <Grid item xs={12} sm={6} sx={{ display: "flex", flexDirection: "column", alignItems: "center", }}>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={opcionesTipoAmbiente}
                value={contenidoTipoAmbiente}
                onChange={(event, newValue) => setContenidoTipoAmbiente(newValue)}
                getOptionLabel={(option) => option.label}
                isOptionEqualToValue={(option, contenidoTipoAmbiente) => option.label === contenidoTipoAmbiente.label}
                sx={{ mb: 2, width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Tipo de ambiente:" />
                )}
              />
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={opcionesEstadoAmbiente}
                value={contenidoEstadoAmbiente}
                onChange={(event, newValue) => setContenidoEstadoAmbiente(newValue)}
                getOptionLabel={(option) => option.label}
                isOptionEqualToValue={(option, contenidoEstadoAmbiente) => option.label === contenidoEstadoAmbiente.label}
                sx={{ mb: 2, width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Estado de ambiente:" />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={12} sx={{ display: "flex", flexDirection: "column", alignItems: "center", }}>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={opcionesTipoEdificio}
                value={contenidoTipoEdificio}
                onChange={(event, newValue) => setContenidoTipoEdificio(newValue)}
                getOptionLabel={(option) => option.label}
                isOptionEqualToValue={(option, contenidoTipoEdificio) => option.label === contenidoTipoEdificio.label}
                sx={{ mb: 2, width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Pertenece a:" />
                )}
              />
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={opcionesFacultad}
                value={contenidoFacultad}
                onChange={(event, newValue) => setContenidoFacultad(newValue)}
                getOptionLabel={(option) => option.label}
                isOptionEqualToValue={(option, contenidoFacultad) => option.label === contenidoFacultad.label}
                sx={{ mb: 2, width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Facultad:" />
                )}
              />
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={opcionesNumeroPiso}
                value={contenidoNumeroPiso}
                onChange={(event, newValue) => setContenidoNumeroPiso(newValue)}
                getOptionLabel={(option) => option.label}
                isOptionEqualToValue={(option, contenidoNumeroPiso) => option.label === contenidoNumeroPiso.label}
                sx={{ mb: 2, width: 300 }}
                renderInput={(params) => <TextField {...params} label="Piso:" />}
              />
            </Grid>
          </Grid>
          <Button type="submit" variant="contained" onClick={manejarEnvioAux} sx={{ width: "30%" }}>
            REGISTRAR
          </Button>
        
      </Box>
    </div>
  );
}

export default RegistrarAmbiente;
