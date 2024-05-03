import React from 'react';
import {GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarExport, GridToolbarDensitySelector,} from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import '../pages/ListarFiltrarAmbiente.css'

const ToolBarPersonalizado = () => (
  <GridToolbarContainer className="toolbarContainer">
    <GridToolbarColumnsButton />
    <GridToolbarFilterButton /> 
    <GridToolbarDensitySelector />
    <Box sx={{ flexGrow: 1}} />
    <GridToolbarExport />
  </GridToolbarContainer>
);

export default ToolBarPersonalizado;
