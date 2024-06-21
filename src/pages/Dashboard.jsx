import React, { useState } from 'react';
import { Typography, useTheme, Grid, Box, TextField, Button } from '@mui/material';
import './Dashboard.css';

function BarChart() {
    const theme = useTheme();
    const [dataAmbientes, setDataAmbientes] = useState([]);
    const [dataUsuario, setDataUsuario] = useState([]);
    const [fechaInicio, setFechaInicio] = useState("2024-07-01");
    const [fechaFin, setFechaFin] = useState("2024-07-15");

    const [verAmbientes, setVerAmbientes] = useState(false);
    const [verUsuario, setVerUsuario] = useState(false);

    const generarAmbiteMasSolicitado = async () => {
        setVerUsuario(false);
        try {
            const response = await fetch('http://127.0.0.1:5000/dashboard/reporte_ambientes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    fecha_inicio: fechaInicio,
                    fecha_fin: fechaFin
                })
            });

            if (response.ok) {
                const responseData = await response.json();
                setDataAmbientes(responseData);
                setVerAmbientes(true);
            } else {
                console.error('Error al obtener los datos');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const generarUsuarioMasReservas = async () => {
        setVerAmbientes(false);
        try {
            const response = await fetch('http://127.0.0.1:5000/dashboard/reporte_docentes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    fecha_inicio: fechaInicio,
                    fecha_fin: fechaFin
                })
            });

            if (response.ok) {
                const responseData = await response.json();
                setDataUsuario(responseData);
                setVerUsuario(true);
            } else {
                console.error('Error al obtener los datos');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <Box
            sx={{
                p: 4,
                bgcolor: "background.paper",
                boxShadow: 8,
                textAlign: 'center',
                // width: '50%',
                width: '800px',
                height: '700px',
                margin: '0 auto',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Typography variant="h5" component="h2" sx={{ color: theme.palette.text.primary }}>DASHBOARD</Typography>
            <div>

                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            label="Desde"
                            type="date"
                            value={fechaInicio}
                            onChange={(e) => setFechaInicio(e.target.value)}
                            InputLabelProps={{ shrink: true }}
                            sx={{ marginTop: '22px', width: '50%' }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Hasta"
                            type="date"
                            value={fechaFin}
                            onChange={(e) => setFechaFin(e.target.value)}
                            InputLabelProps={{ shrink: true }}
                            sx={{ width: '50%' }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <p>Generar:</p>
                        <Button onClick={generarAmbiteMasSolicitado} color="primary" variant="contained" sx={{ mb: 3, marginRight: "20px" }}>Ambiente más solicitado</Button>
                        <Button onClick={generarUsuarioMasReservas} color="primary" variant="contained" sx={{ mb: 3 }}>Docente con mas reservas</Button>

                    </Grid>
                </Grid>

                {verAmbientes && (
                    <div className="chart">
                        {dataAmbientes.map((item, index) => (
                            <div className="bar" key={index} style={{ height: `${item.cantidad * 10}px` }}>
                                <p style={{ margin: '-25px' }} >{item.cantidad}</p>
                                <p className="label">{item.nombre_amb.trim()}</p>
                            </div>
                        ))}
                    </div>
                )}

                {verUsuario && (
                    <div className="chart">
                        {dataUsuario.map((item, index) => (
                            <div className="barUsuario" key={index} style={{ height: `${item.cantidad * 10}px` }}>
                                <p style={{ margin: '-25px' }} >{item.cantidad}</p>
                                <p className="label">{item.nombre_usu.trim()}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </Box>

    );
}

export default BarChart;
