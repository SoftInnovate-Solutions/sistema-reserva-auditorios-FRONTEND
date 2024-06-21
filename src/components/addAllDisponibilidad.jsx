import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import ModalHabilitar from '../components/modalAvisoHablitarAmb'

const ArrayComponent = () => {
    const bloqueInicial = Array.from({ length: 10 }, () => Array(7).fill(1));
    const [bloquesAmbientes, setBloquesAmbientes] = useState(bloqueInicial);
    const [verBoton, setVerBoton] = useState(true);

    const [general_inicio, setGeneral_inicio] = useState('');
    const [general_final, setGeneral_final] = useState('');
    const [ambientes, setAmbientes] = useState([]);

    //variables para el modal de aviso del periodo
    const [openModalHabilitado, setOpenModalHabilitado] = useState(false);

    const handleOpenModalHabilitado = () => {
        setOpenModalHabilitado(true);
    };

    const handleCloseModalHabilitado = () => {
        setOpenModalHabilitado(false);
    };

    useEffect(() => {
        fetch('http://127.0.0.1:5000/ambiente/all')
            .then(response => response.json())
            .then(data => {
                setAmbientes(data);
                fetch(`http://127.0.0.1:5000/ajuste_ambiente/get_ajuste_ambiente/${data[0].cod_ambiente}`)
                    .then(response => response.json())
                    .then(data => {
                        if(Object.keys(data.configuracion).length != 0){
                            setVerBoton(false);
                        }
                    })
                    .catch(error => console.error("Error al cargar los tipos de ambiente:", error));
            })
            .catch(error => console.error("Error al cargar los ambiente:", error));

        fetch(`http://127.0.0.1:5000/periodo_reserva/periodo_general`)
            .then(response => response.json())
            .then(data => {
                // setHayPeriodo(true);
                setGeneral_final(data.fecha_fin_general_per);
                setGeneral_inicio(data.fecha_inicio_general_per);
            })
            .catch(error => console.error("Error al cargar los tipos de ambiente:", error));
    }, []);

    const agregarTodos = () => {

        if (general_inicio != undefined && general_inicio != "2000-01-01") {
            ambientes.map(objeto => {
                const idAmbiente = objeto.cod_ambiente;

                const ajustes = {
                    cod_ambiente: idAmbiente,
                    configuracion: bloquesAmbientes,
                    fecha_inicio_general_per: general_inicio,
                    fecha_fin_general_per: general_final
                };

                fetch('http://127.0.0.1:5000/ajuste_ambiente/addUpdate', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(ajustes)
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Error al obtener los ambientes');
                        }
                        return response.json();
                    })
                    .then(data => {
                        console.log("Ya esta no", data);
                        handleOpenModalHabilitado();
                        setVerBoton(false);
                    })
                    .catch(error => {
                        console.error('Error al cargar los ambientes:', error);
                    });

            });
        } else {
            console.log("No existe periodo de examenes para habilitar ambientes");
        }
    }


    return (
        <div>
            {verBoton && (<Button type='submit' onClick={agregarTodos}> Habilitar disponibilidad de ambientes</Button>)}
            <ModalHabilitar
                open={openModalHabilitado}
                handleClose={handleCloseModalHabilitado}
            />
        </div>
    );
};

export default ArrayComponent;