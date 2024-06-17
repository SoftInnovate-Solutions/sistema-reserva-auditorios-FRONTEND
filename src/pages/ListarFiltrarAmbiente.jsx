import React, { useState, useEffect } from "react";
import { DataGrid, esES, GridToolbarContainer } from '@mui/x-data-grid';
import ToolBarPersonalizado from '../components/ToolBarPersonalizado';
import './ListarFiltrarAmbiente.css';
import { Box, Typography, useTheme, Button, Grid, Tooltip } from '@mui/material';
import Autocompletado from '../components/autocompletadoLista';
import { NavLink, useNavigate } from 'react-router-dom';
import Accion from '../components/acciones';
import FilterIcon from '@mui/icons-material/FilterAlt';

export default function DataTable() {

  const navigate = useNavigate();
  const theme = useTheme();
  const [tablaDatos, setTablaDatos] = useState([]);
  const [columnasTabla, setColumnasTabla] = useState([]);
  const [idsTabla, setIdsTabla] = useState([]);

  useEffect(() => {
    llamarApiYProcesarDatos();
  }, []);

  const llamarApiYProcesarDatos = () => {
    fetch('http://127.0.0.1:5000/ambiente/all')
      .then(response => response.json())
      .then(data => {
        const rowData = data.map((item, index) => ({
          id: index + 1,
          nombreAmbiente: item.nombre_amb,
          capacidad_min: item.capacidad_min_amb,
          capacidad: item.capacidad_amb,
          capacidad_max: item.capacidad_max_amb,
          estado: item.estado_ambiente,
          idBD: item.cod_ambiente
        }));

        setTablaDatos(rowData);

        const addIds = data.map((item) => ({
          idTabla: item.cod_ambiente,
        }));
        setIdsTabla(addIds)

        const columns = [
          { field: 'nombreAmbiente', headerName: 'Nombre del Ambiente', width: 250 },
          { field: 'capacidad_min', headerName: 'Capacida min', width: 120 },
          { field: 'capacidad', headerName: 'Capacidad', width: 80 },
          { field: 'capacidad_max', headerName: 'Capacidad max', width: 120 },
          { field: 'estado', headerName: 'Estado', width: 120 },
          // { field: 'idBD', headerName: 'ID-BD', width: 80 },
          {
            field: 'acciones',
            headerName: 'Acciones',
            width: 180,
            renderCell: (params) => <Accion id={addIds[params.row.id - 1]} />
          }
        ];

        setColumnasTabla(columns);
      })
      .catch(error => console.error("Error al cargar los tipos de ambiente:", error));
  }

  // console.log(columns)
  const [idActual, setIdActual] = useState([]);

  const handleRowClick = (params) => {
    console.log(params.row.id - 1);
    let idActual = idsTabla[params.row.id - 1]
    setIdActual(idsTabla[params.row.id - 1]);
  };


  // RECICLADO DE AUTOCOMPLETADO
  //#region ----------------- PARA CAPTURAR --> EL DATO <-- DE CAMPOS QUE EXISTE EN EL REGISTRO: ---------------------------------------------------

  // Declarar variables para las IDS del cuadro de entrada con autocompletado
  const [identificacionTipoEdificacion, setIdentificacionTipoEdificacion] = useState(-1);
  const [identificacionFacultad, setIdentificacionFacultad] = useState(-1);
  const [identificacionTipoAmbiente, setIdentificacionTipoAmbiente] = useState(-1);
  const [identificacionEstadoAmbiente, setIdentificacionEstadoAmbiente] = useState(-1);



  //#endregion
  //#region ----------------- TRAER IDS PARA CADA OPCION DEL CUADRO CON ATOCOMPLETAOD -------------------------------------------------------------------------------------
  const obtenerIdTipoAmbiente = (dato) => {
    setIdentificacionTipoAmbiente(dato);
  };

  const obtenerIdEstadoAmbiente = (dato) => {
    setIdentificacionEstadoAmbiente(dato);
  };

  const obtenerIdPerteneceA = (dato) => {
    setIdentificacionTipoEdificacion(dato);
  };

  const obtenerIdFacultad = (dato) => {
    setIdentificacionFacultad(dato);
  };

  const filtrarPorTipoAmbiente = () => {
    console.log(identificacionTipoAmbiente);
    if (identificacionTipoAmbiente != null) {
      fetch(`http://127.0.0.1:5000/ambiente/filter/"${identificacionTipoAmbiente},${identificacionFacultad},${identificacionTipoEdificacion},${identificacionEstadoAmbiente}"`)
        .then(response => response.json())
        .then(data => {
          const rowData = data.map((item, index) => ({
            id: index + 1,
            nombreAmbiente: item.nombre_amb,
            capacidad: item.capacidad_amb,
            estado: item.estado_ambiente,
            idBD: item.cod_ambiente
          }));

          setTablaDatos(rowData);

          const addIds = data.map((item) => ({
            idTabla: item.cod_ambiente,
          }));

          setIdsTabla(addIds)

          const columns2 = [
            { field: 'nombreAmbiente', headerName: 'Nombre del Ambiente', width: 250 },
            { field: 'capacidad', headerName: 'Capacidad', width: 110 },
            { field: 'estado', headerName: 'Estado', width: 150 },
            // { field: 'idBD', headerName: 'ID-BD', width: 80 },
            {
              field: 'acciones',
              headerName: 'Acciones',
              width: 250,
              renderCell: (params) => <Accion id={addIds[params.row.id - 1]} />
            }
          ];

          setColumnasTabla(columns2);
        })
        .catch(error => console.error("Error al cargar los tipos de ambiente:", error));

    }
  };

  const filtrarPorFacultad = () => {
    if (identificacionFacultad != null) {
      fetch(`http://127.0.0.1:5000/ambiente/filter/"${identificacionTipoAmbiente},${identificacionFacultad},${identificacionTipoEdificacion},${identificacionEstadoAmbiente}"`)
        .then(response => response.json())
        .then(data => {
          const rowData = data.map((item, index) => ({
            id: index + 1,
            nombreAmbiente: item.nombre_amb,
            capacidad: item.capacidad_amb,
            estado: item.estado_ambiente,
            idBD: item.cod_ambiente
          }));

          setTablaDatos(rowData);

          const addIds = data.map((item) => ({
            idTabla: item.cod_ambiente,
          }));

          setIdsTabla(addIds)

          const columns2 = [
            { field: 'nombreAmbiente', headerName: 'Nombre del Ambiente', width: 250 },
            { field: 'capacidad', headerName: 'Capacidad', width: 110 },
            { field: 'estado', headerName: 'Estado', width: 150 },
            // { field: 'idBD', headerName: 'ID-BD', width: 80 },
            {
              field: 'acciones',
              headerName: 'Acciones',
              width: 250,
              renderCell: (params) => <Accion id={addIds[params.row.id - 1]} />
            }
          ];

          setColumnasTabla(columns2);
        })
        .catch(error => console.error("Error al cargar los tipos de ambiente:", error));

    }
  };

  const filtrarPorTipoEdificacion = () => {
    if (identificacionTipoEdificacion != null) {
      fetch(`http://127.0.0.1:5000/ambiente/filter/"${identificacionTipoAmbiente},${identificacionFacultad},${identificacionTipoEdificacion},${identificacionEstadoAmbiente}"`)
        .then(response => response.json())
        .then(data => {
          const rowData = data.map((item, index) => ({
            id: index + 1,
            nombreAmbiente: item.nombre_amb,
            capacidad: item.capacidad_amb,
            estado: item.estado_ambiente,
            idBD: item.cod_ambiente
          }));

          setTablaDatos(rowData);

          const addIds = data.map((item) => ({
            idTabla: item.cod_ambiente,
          }));

          setIdsTabla(addIds)

          const columns2 = [
            { field: 'nombreAmbiente', headerName: 'Nombre del Ambiente', width: 250 },
            { field: 'capacidad', headerName: 'Capacidad', width: 110 },
            { field: 'estado', headerName: 'Estado', width: 150 },
            // { field: 'idBD', headerName: 'ID-BD', width: 80 },
            {
              field: 'acciones',
              headerName: 'Acciones',
              width: 250,
              renderCell: (params) => <Accion id={addIds[params.row.id - 1]} />
            }
          ];

          setColumnasTabla(columns2);
        })
        .catch(error => console.error("Error al cargar los tipos de ambiente:", error));

    }
  };

  const filtrarPorEstadoAmbiente = () => {
    if (identificacionEstadoAmbiente != null) {
      fetch(`http://127.0.0.1:5000/ambiente/filter/"${identificacionTipoAmbiente},${identificacionFacultad},${identificacionTipoEdificacion},${identificacionEstadoAmbiente}"`)
        .then(response => response.json())
        .then(data => {
          const rowData = data.map((item, index) => ({
            id: index + 1,
            nombreAmbiente: item.nombre_amb,
            capacidad: item.capacidad_amb,
            estado: item.estado_ambiente,
            idBD: item.cod_ambiente
          }));

          setTablaDatos(rowData);

          const addIds = data.map((item) => ({
            idTabla: item.cod_ambiente,
          }));

          setIdsTabla(addIds)

          const columns2 = [
            { field: 'nombreAmbiente', headerName: 'Nombre del Ambiente', width: 250 },
            { field: 'capacidad', headerName: 'Capacidad', width: 110 },
            { field: 'estado', headerName: 'Estado', width: 150 },
            // { field: 'idBD', headerName: 'ID-BD', width: 80 },
            {
              field: 'acciones',
              headerName: 'Acciones',
              width: 250,
              renderCell: (params) => <Accion id={addIds[params.row.id - 1]} />
            }
          ];

          setColumnasTabla(columns2);
        })
        .catch(error => console.error("Error al cargar los tipos de ambiente:", error));

    }
  };
  //#endregion

  const reloadCurrentRoute = () => {
    navigate('/');
    setTimeout(() => {
      navigate('/administrar-ambiente');
    }, 1);
  };

  return (
    <Box
      //estilo
      sx={{
        p: 4, // padding
        bgcolor: "background.paper",
        boxShadow: 8,
        textAlign: 'center',
        // width: '75%',
        width: '980px',
        margin: '0 auto', // centrado horizontal
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography variant="h5" component="h2" sx={{ mb: 5, color: theme.palette.text.primary, textAlign: 'center' }}>LISTA DE AMBIENTES</Typography>

      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

        <Grid item xs={12} sm={12} md={12} lg={6} xl={6} sx={{ display: 'flex' }}>
          <Autocompletado
            idOptionSelec={obtenerIdTipoAmbiente}
            options={'opcionesTipoAmbiente'}
            value={identificacionTipoAmbiente}
            onChange={(event, newValue) => setIdentificacionTipoAmbiente(newValue)}
            getOptionLabel={(option) => option.label}
            isOptionEqualToValue={(option, identificacionTipoAmbiente) => option.label === identificacionTipoAmbiente.label}
            etiqueta="Tipo de ambiente:"
          />
          <Tooltip title="Filtrar" placement="top">
            <Button
              variant="contained"
              startIcon={<FilterIcon style={{ fontSize: 24, marginLeft: 10 }} />} // Ajusta el tamaño del icono
              onClick={filtrarPorTipoAmbiente}
            />
          </Tooltip>
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={6} xl={6} sx={{ display: 'flex' }}>
          <Autocompletado
            idOptionSelec={obtenerIdFacultad}
            options={'opcionesFacultad'}
            value={identificacionFacultad}
            onChange={(event, newValue) => setIdentificacionFacultad(newValue)}
            getOptionLabel={(option) => option.label}
            isOptionEqualToValue={(option, identificacionFacultad) => option.label === identificacionFacultad.label}
            etiqueta="Facultad:"
          />
          <Tooltip title="Filtrar" placement="top">
            <Button
              variant="contained"
              startIcon={<FilterIcon style={{ fontSize: 24, marginLeft: 10 }} />} // Ajusta el tamaño del icono
              onClick={filtrarPorFacultad}
            />
          </Tooltip>
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={6} xl={6} sx={{ display: 'flex', marginBottom: '40px' }}>
          <Autocompletado
            idOptionSelec={obtenerIdPerteneceA}
            options={'opcionesTipoEdificacion'}
            value={identificacionTipoEdificacion}
            onChange={(event, newValue) => setIdentificacionTipoEdificacion(newValue)}
            getOptionLabel={(option) => option.label}
            isOptionEqualToValue={(option, identificacionTipoEdificacion) => option.label === identificacionTipoEdificacion.label}
            etiqueta="Tipo de edificación:"
          />
          <Tooltip title="Filtrar" placement="top">
            <Button
              variant="contained"
              startIcon={<FilterIcon style={{ fontSize: 24, marginLeft: 10 }} />} // Ajusta el tamaño del icono
              onClick={filtrarPorTipoEdificacion}
            />
          </Tooltip>
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={6} xl={6} sx={{ display: 'flex', marginBottom: '40px' }}>
          <Autocompletado
            idOptionSelec={obtenerIdEstadoAmbiente}
            options={'opcionesEstadoAmbiente'}
            value={identificacionEstadoAmbiente}
            onChange={(event, newValue) => setIdentificacionEstadoAmbiente(newValue)}
            getOptionLabel={(option) => option.label}
            isOptionEqualToValue={(option, identificacionEstadoAmbiente) => option.label === identificacionEstadoAmbiente.label}
            etiqueta="Estado de ambiente:"
          />
          <Tooltip title="Filtrar" placement="top">
            <Button
              variant="contained"
              startIcon={<FilterIcon style={{ fontSize: 24, marginLeft: 10 }} />} // Ajusta el tamaño del icono
              onClick={filtrarPorEstadoAmbiente}
            />
          </Tooltip>
        </Grid>
      </Grid>

      <Button type="submit" onClick={reloadCurrentRoute} variant="contained" sx={{ marginTop: '-28px', textAlign: 'right', marginRight: '50px' }} className='form-boton'>
        RESTABLECER
      </Button>

      <NavLink to="/registrar-ambiente">
        <Button type="submit" variant="contained" sx={{ marginTop: '-28px', textAlign: 'right' }} className='form-boton'>
          AGREGAR
        </Button>
      </NavLink>

      <DataGrid
        rows={tablaDatos}
        columns={columnasTabla}
        components={{
          Toolbar: GridToolbarContainer,
        }}
        localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        pageSize={tablaDatos.length} // Tamaño de página para mostrar toda la lista
        disablePagination={true} // Desactiva la paginación

        // Forma para ver paginas de listas
        //  initialState={{
        //   pagination: {
        //     paginationModel: { page: 0, pageSize: 10 },
        //   },
        // }}
        // pageSizeOptions={[5, 10]}
        onRowClick={handleRowClick}
      />
    </Box>
  );
}

