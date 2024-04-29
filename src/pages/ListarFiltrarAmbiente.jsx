import React, { useState, useEffect } from "react";
import { DataGrid, esES } from '@mui/x-data-grid';
import ToolBarPersonalizado from '../components/ToolBarPersonalizado';
import './ListarFiltrarAmbiente.css';
import { Box, Typography, useTheme } from '@mui/material';
import columns from '../components/columnas';


export default function DataTable() {
  const theme = useTheme();
  const [tablaDatos, setTablaDatos] = useState([]);
  const [idsTabla, setIdsTabla] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/ambiente/all')
      .then(response => response.json())
      .then(data => {
        const rowData = data.map((item, index) => ({
          id: index + 1,  // Esto establece el ID empezando desde 1
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
  }, []);

  const handleRowClick = (params) => {
    let idActual = idsTabla[params.row.id-1]
    console.log('ID de la fila clickeada:', params.row.id, idActual.idTabla);
    // Aquí puedes hacer más cosas con el ID de la fila si es necesario
  };

  return (
    <Box
      //estilo
      sx={{
        p: 4, // padding
        bgcolor: "background.paper",
        boxShadow: 8,
      }}
    >
      <Typography variant="h5" component="h2" sx={{ mb: 5, color: theme.palette.text.primary }}>LISTA DE AMBIENTES</Typography>

      <DataGrid
        rows={tablaDatos}
        columns={columns}
        components={{
          Toolbar: ToolBarPersonalizado,
        }}
        localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        onRowClick={handleRowClick}
      />
    </Box>
  );
}
