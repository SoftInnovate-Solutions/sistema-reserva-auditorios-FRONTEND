import React, { useEffect, useState } from 'react';
import { Typography, useTheme, Grid, Box } from '@mui/material';

function DatosUsuarios() {
    const theme = useTheme();
    const [datos, setDatos] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:5000/ambiente/imparticion/all')
            .then(response => response.json())
            .then(data => setDatos(data))
            .catch(error => console.error('Error al obtener los datos:', error));
    }, []);

    return (
        <Box
            sx={{
                p: 4,
                bgcolor: "background.paper",
                boxShadow: 8,
                textAlign: 'center',
                // width: '50%',
                width: '800px',
                // height: '700px',
                margin: '0 auto',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Typography variant="h5" component="h2" sx={{ color: theme.palette.text.primary }}>INFORMACIÓN DE USUARIOS</Typography>

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <div className="container mx-auto p-5 text-center">
                        {datos.map((item, index) => (
                            <div key={index} className="mb-3 inline-block text-left">
                                {index === 0 || datos[index - 1].nombreUsuario !== item.nombreUsuario ? (
                                    <h2 className="text-xl font-semibold">{item.nombreUsuario}</h2>
                                ) : null}
                                <div className="ml-14">
                                    <p><strong>Materia:</strong> {item.materia} - {item.grupo}</p>
                                    <p><strong>Cantidad de Estudiantes:</strong> {item.cantidad_estudiantes}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                </Grid>
            </Grid>
        </Box>

    );
}

export default DatosUsuarios;
