import React, { forwardRef, useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

function Autocompletado({ id, idOptionSelec, values, options, etiqueta }) {

  //#region - LLAMADAS API Y CREACIÓN DE VARIABLES - CUADRO CON AUTOCOMPLETADO

  // Creando variable para campos de entrada con autocompletado a través de llamadas API
  const [tiposEdificacion, setTiposEdificacion] = useState([]);
  useEffect(() => {
    fetch('http://127.0.0.1:5000/edificacion/all')
      .then(response => response.json())
      .then(data => setTiposEdificacion(data))
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
  const opcionesTipoEdificacion = tiposEdificacion.map(tipo => ({
    id: tipo.cod_edificacion,
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
  //#endregion



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
  //#endregion

  // Evaluar la opción y obtener el conjunto de opciones correspondiente
  const opcionesElegida = eval(options); // Utilizar eval() puede ser riesgoso, ver explicación más abajo

  const [value, setValue] = useState(null);

  const onChange = (event, newValue) => {
    if (newValue != null) {
      setValue(newValue);
      idOptionSelec(obtenerIdCampoAutocompletado(newValue.label));
    }
  };
  const getOptionLabel = (option) => option.label;

  const isOptionEqualToValue = (option, value) => option.label === value.label;

  return (
    <Autocomplete
      disablePortal
      id={id}
      options={opcionesElegida}
      value={values}
      onChange={onChange}
      getOptionLabel={getOptionLabel}
      isOptionEqualToValue={isOptionEqualToValue}
      className='form-inputs'
      renderInput={(params) => (
        <TextField {...params} label={etiqueta} />
      )}
    />
  );
}

export default Autocompletado;
