import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import './acction.css'
import ApiMostraRestante from '../components/apiMostrarRestante';

const Acciones = (id) => {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [datos, setDatos] = useState([]);

    useEffect(() => {
        fetch(`http://127.0.0.1:5000/ambiente/one/${id.id.idTabla}`) // URL de tu API
            .then(response => response.json())
            .then(data => {
                setDatos(data);
            })
            .catch(error => console.error("Error al obtener los datos:", error));
    }, []);

    const handleMostrar = () => {
        console.log('Mostrar', id.id.idTabla);
        console.log(datos);
        handleOpen();
    };

    const handleEditar = () => {
        console.log('Editar', id.id.idTabla);
        // Aquí añades la lógica para eliminar
    };

    const handleEliminar = () => {
        console.log('Eliminar', id.id.idTabla);
        // Aquí añades la lógica para ver detalles
    };

    const handleConfiguraciones = () => {
        console.log('Setings', id.id.idTabla);
        // Aquí añades la lógica para otra acción
    };

    return (
        <>
            <div>
                <Button color="primary" onClick={handleMostrar}>Mostrar</Button>
                <Button color="secondary" onClick={handleEditar}>Editar</Button>
                <Button color="info" onClick={handleEliminar}>Eliminar</Button>
                <Button color="warning" onClick={handleConfiguraciones}>Configuraciones</Button>
            </div>
            <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    sx={{
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '500px',
                        height: '500px',
                        background: '#fffff8',
                        border: '2px solid #000'
                    }}
                >
                    <div>
                        {datos != undefined ? ( // Verificar si datos está definido y no es null
                            <div className='estilo-cuadroText'>
                                <div className='estilo-boton'>
                                    <Button onClick={handleClose}>x</Button>
                                </div>
                                <h1 className='title'>Detalles de ambiente</h1>
                                <p>Nombre del Ambiente: {datos.nombre_amb}</p>
                                <p>Descripción: {datos.descripcion_amb}</p>
                                <p>Ubicación: {datos.ubicacion_amb}</p>
                                <p>Capacidad: {datos.capacidad_amb}</p>
                                {datos.cod_tipo_ambiente != undefined && datos.cod_estado_ambiente != undefined && datos.cod_edificacion != undefined && datos.cod_facultad != undefined && datos.cod_piso != undefined ? (
                                    <ApiMostraRestante
                                        idTipo={datos.cod_tipo_ambiente.toString()}
                                        idEstado={datos.cod_estado_ambiente.toString()}
                                        idEdificacion={datos.cod_edificacion.toString()}
                                        idFacultad={datos.cod_facultad.toString()}
                                        idPiso={datos.cod_piso.toString()}
                                    />
                                ) : (
                                    <p>No se pueden mostrar los datos adicionales</p>
                                )}
                                {/* Otros campos del objeto */}
                            </div>
                        ) : (
                            <p>Cargando datos...</p>
                        )}
                    </div>


                </Modal>
            </div>
        </>
    );
};

export default Acciones;
