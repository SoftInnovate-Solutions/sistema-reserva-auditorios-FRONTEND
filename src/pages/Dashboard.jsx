import React, { useState } from 'react';
import { Typography, useTheme, Grid, Box } from '@mui/material';
import './Dashboard.css'; // Importa el archivo CSS para aplicar los estilos

function BarChart() {
    const theme = useTheme();
    // Estado para almacenar los valores de las barras
    const [barsData, setBarsData] = useState([]);
    console.log(barsData);
    // Estado para almacenar las fechas de inicio y fin
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');

    // Función para generar el gráfico de barras
    const generateBarChart = async () => {
        try {
            // Realiza la solicitud POST con las fechas
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

            // Verifica si la respuesta es exitosa
            if (response.ok) {
                const responseData = await response.json();
                // Actualiza los datos de las barras con los datos obtenidos
                setBarsData(responseData.map(item => item.cantidad));
            } else {
                // Si la respuesta no es exitosa, muestra un mensaje de error
                console.error('Error al obtener los datos');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // Renderizar el componente
    return (
        <Box
            //estilo
            sx={{
                p: 4, // padding
                bgcolor: "background.paper",
                boxShadow: 8,
                textAlign: 'center',
                // width: '50%',
                width: '800px',
                margin: '0 auto', // centrado horizontal
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Typography variant="h5" component="h2" sx={{ color: theme.palette.text.primary }}>DASHBOARD</Typography>
            <div>
                <div>
                    {/* Campos de entrada para las fechas */}
                    <input type="date" value={fechaInicio} onChange={e => setFechaInicio(e.target.value)} />
                    <input type="date" value={fechaFin} onChange={e => setFechaFin(e.target.value)} />
                    {/* Botón para generar el gráfico */}
                    <button onClick={generateBarChart}>Generar</button>
                </div>
                {/* Mostrar el gráfico de barras */}
                <div className="chart">
                    {/* Mapear los valores para crear las barras */}
                    {barsData.map((value, index) => (
                        <div className="bar" key={index} style={{ height: `${value * 15}px` }}>
                            <p className="label">{value}</p>
                            {/* <div className="font-bold text-lg,">{reserva.ambiente}</div> */}
                        </div>
                    ))}
                </div>
            </div>
        </Box>

    );
}

export default BarChart;
