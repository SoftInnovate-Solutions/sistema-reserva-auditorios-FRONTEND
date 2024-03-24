import React, { useState, useEffect } from 'react';

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Typography, useTheme } from '@mui/material';
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function RegistrarAmbiente() {

  const theme = useTheme();
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

  const [contenidoTipoEdificio, setContenidoTipoEdificio] = useState(null);
  const [contenidoFacultad, setContenidoFacultad] = useState(null);
  const [contenidoNumeroPiso, setContenidoNumeroPiso] = useState(null);
  const [contenidoTipoAmbiente, setContenidoTipoAmbiente] = useState(null);
  const [contenidoEstadoAmbiente, setContenidoEstadoAmbiente] = useState(null);

  const [nombreAmbiente, setNombreAmbiente] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [capacidad, setCapacidad] = useState('');

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
    setCapacidad(event.target.value);
  };



  const obtenerIdCampoAutocompletado = (label) => {
    let codigoTipoAmbiente = null;
  
    tiposEdificios.forEach(opcion => {
      if (opcion.nombre_edi === label) {
        codigoTipoAmbiente = opcion.cod_edificio;
        return; // Sale del bucle forEach cuando se encuentra el valor
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

  const manejarEnvio = async (e) => {
    e.preventDefault();

    try {
      rellenarDatos();
      const response = await fetch('http://127.0.0.1:5000/ambiente/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        console.log('Ambiente creado exitosamente');
        // Puedes redirigir a otra página o realizar otras acciones después de crear el ambiente
      } else {
        console.error('Error al crear el ambiente');
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };

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

        <form onSubmit={manejarEnvio}>
          <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 8, md: 3 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                sx={{ mb: 2, width: 300 }}
                // id="nombreAmbiente"
                value={nombreAmbiente}
                onChange={manejadorCambiosNombreAmbiente}
                label="Nombre de ambiente: "
                variant="standard"
              />
              <TextField
                sx={{ mb: 2, width: 300 }}
                value={descripcion}
                onChange={manejadorCambiosDescripcion}
                label="Descripción"
                variant="standard"
              />
              <TextField
                sx={{ mb: 2, width: 300 }}
                value={ubicacion}
                onChange={manejadorCambiosUbicacion}
                label="Ubicación: "
                variant="standard"
              />
              <TextField
                sx={{ mb: 2, width: 300 }}
                value={capacidad}
                onChange={manejadorCambiosCapacidad}
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
          <Button type="submit" variant="contained" sx={{ width: "30%" }}>
            REGISTRAR
          </Button>
        </form>
      </Box>
    </div>
  );
}

export default RegistrarAmbiente;
