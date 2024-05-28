import { Box, Typography, useTheme, Button, Grid } from '@mui/material';

const Historial = () => {
  const theme = useTheme();

  return (
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
      <div>Historial  2ss</div>
    </Box>
  )
}

export default Historial