import React, { useState, useEffect } from "react";
import { DataGrid, esES } from '@mui/x-data-grid';
import ToolBarPersonalizado from '../components/ToolBarPersonalizado';
import './ListarFiltrarAmbiente.css';
import { Box, Typography, useTheme } from '@mui/material';
import Button from "@mui/material/Button";
import { NavLink } from 'react-router-dom';
import Accion from '../components/acciones'

export default function DataTable() {
  const theme = useTheme();
  const [tablaDatos, setTablaDatos] = useState([]);
  const [idsTabla, setIdsTabla] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/ambiente/all')
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
      })
      .catch(error => console.error("Error al cargar los tipos de ambiente:", error));
  }, []);

  // console.log(columns)
  const [idActual, setIdActual] = useState([]);

  const handleRowClick = (params) => {
    let idActual = idsTabla[params.row.id - 1]
    setIdActual(idsTabla[params.row.id - 1]);
  };

  const columns = [
    { field: 'nombreAmbiente', headerName: 'Nombre del Ambiente', width: 200 },
    { field: 'capacidad', headerName: 'Capacidad', width: 130 },
    { field: 'estado', headerName: 'Estado', width: 130 },
    { field: 'idBD', headerName: 'ID-BD', width: 50 },
    {
      field: 'acciones',
      headerName: 'Acciones',
      width: 400,
      // renderCell: (params) => (
      //   <div>
      //     <Button color="primary" onClick={() => handleEditar('Editar', idsTabla[params.row.id - 1])}>Editar</Button>
      //     <Button color="secondary" onClick={() => handleEliminar('Eliminar', idsTabla[params.row.id - 1])}>Eliminar</Button>
      //     <Button color="info" onClick={() => handleDetalles('Detalles', idsTabla[params.row.id - 1])}>Detalles</Button>
      //     <Button color="warning" onClick={() => handleOtro('Otro', idsTabla[params.row.id - 1])}>Otro</Button>
      //   </div>
      // ),
      renderCell: (params) => <Accion id={idsTabla[params.row.id - 1]} />
    }
  ];

  return (
    <Box
      //estilo
      sx={{
        p: 4, // padding
        bgcolor: "background.paper",
        boxShadow: 8,
        textAlign: 'center'
      }}
    >
      <Typography variant="h5" component="h2" sx={{ mb: 5, color: theme.palette.text.primary, textAlign: 'center' }}>LISTA DE AMBIENTES</Typography>

      <NavLink to="/registrar-ambiente">
        <Button type="submit" variant="contained" sx={{ marginTop: '-28px', textAlign: 'right' }} className='formboton'>
          AGREGAR
        </Button>
      </NavLink>

      <DataGrid
        rows={tablaDatos}
        columns={columns}
        components={{
          Toolbar: ToolBarPersonalizado,
        }}
        localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10]}
        onRowClick={handleRowClick}
      />
    </Box>
  );
}
