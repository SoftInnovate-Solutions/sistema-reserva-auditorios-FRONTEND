import React, { useState, useEffect } from "react";
import { DataGrid, esES } from '@mui/x-data-grid';
import ToolBarPersonalizado from '../components/ToolBarPersonalizado';
import './ListarFiltrarAmbiente.css';
import { Box, Typography, useTheme } from '@mui/material';
import columns from '../components/columnas';
import Button from "@mui/material/Button";
import { NavLink} from 'react-router-dom';


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
          estado: item.estado_ambiente
        }));
        setTablaDatos(rowData);

        const addIds = data.map((item) => ({
          idTabla: item.cod_ambiente,
        }));
        setIdsTabla(addIds)
      })
      .catch(error => console.error("Error al cargar los tipos de ambiente:", error));
  }, [tablaDatos]);

  const handleRowClick = (params) => {
    let idActual = idsTabla[params.row.id - 1]
    console.log('ID de la fila clickeada:', params.row.id, idActual.idTabla);
  };

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
