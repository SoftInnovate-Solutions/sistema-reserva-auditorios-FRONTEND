import React, { useState, useEffect } from 'react';
import { Modal, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Link, IconButton } from '@mui/material';
import './acction.css'
import { useNavigate } from 'react-router-dom';
import ApiMostraRestante from '../components/apiMostrarRestante';
import ModalEliminacion from '../components/modalEliminacion';
import ModalPeriodo from '../components/modalAvisoPeriodo'
import Tooltip from '@mui/material/Tooltip';

//iconos
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';
import SettingsIcon from '@mui/icons-material/Settings';
import CloseIcon from '@mui/icons-material/Close';

const Acciones = (id) => {

    const navigate = useNavigate();
    const [hayPeriodoReservas, setHayPeriodoReservas] = useState(false);

    //variables mostrar
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    //variables modal eliminar
    const [openModal, setOpenModal] = useState(false);
    const [datos, setDatos] = useState([]);

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    //variables para el modal de aviso del periodo
    const [openModalPeriodo, setOpenModalPeriodo] = useState(false);

    const handleOpenModalPeriodo = () => {
        setOpenModalPeriodo(true);
    };

    const handleCloseModalPeriodo = () => {
        setOpenModalPeriodo(false);
    };

    useEffect(() => {
        // console.log("lo que llega primero:",id);
        if (id != null || id != undefined) {
            // console.log("segundo",id.id);
            if (id.id != undefined) {
                fetch(`http://127.0.0.1:5000/ambiente/one/${id.id.idTabla}`)
                    .then(response => response.json())
                    .then(data => {
                        setDatos(data);
                    })
                    .catch(error => console.error("Error al obtener los datos:", error));
            }
        }
    }, [id]);

    //-------------------------  M  O  S  T  R  A  R  ------------------------------
    const handleMostrar = () => {
        if (id != null || id != undefined) {
            // console.log("segundo",id.id);
            if (id.id != undefined) {
                fetch(`http://127.0.0.1:5000/ambiente/one/${id.id.idTabla}`)
                    .then(response => response.json())
                    .then(data => {
                        setDatos(data);
                    })
                    .catch(error => console.error("Error al obtener los datos:", error));
            }
        }
        handleOpen();
    };

    //-------------------------  E  D  I  T  A  R  ------------------------------
    const handleEditar = () => {
        if (id.id != undefined) {
            // console.log('Editar', id.id.idTabla);
            navigate(`/editar-ambiente/${id.id.idTabla}`);
        }
    };

    //-------------------------  E  L  I  M  I  N  A  R  ------------------------------
    const handleConfirmDelete = () => {
        // console.log('Eliminar', id.id.idTabla);
        handleEliminar();
    };

    const handleEliminar = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/ambiente/delete/${id.id.idTabla}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                // console.log('Ambiente eliminado exitosamente');
                reloadCurrentRoute();
                handleCloseModal();
            } else {
                const errorMessage = await response.text();
                console.error('Error al eliminar el ambiente:', errorMessage);
            }
        } catch (error) {
            console.error('Error de red:', error);
        }
    };

    const reloadCurrentRoute = () => {
        navigate('/');
        setTimeout(() => {
            navigate('/administrar-ambiente');
        }, 1);
    };

    //-------------------------  C  O  N  F  I  G  U  R  A  C  I  O  N  E  S  ------------------------------

    const handleConfiguraciones = () => {
        // console.log('Setings', id.id.idTabla);
        fetch(`http://127.0.0.1:5000/periodo_reserva/periodo_general`)
            .then(response => response.json())
            .then(data => {
                // if (data != undefined) {
                    if (Object.keys(data).length > 0) {
                        if(data.fecha_inicio_general_per === "2000-01-01" && data.fecha_fin_general_per === "2000-01-01"){
                           handleOpenModalPeriodo();
                        }else{
                            navigate(`/disponibilidad-ambiente/${id.id.idTabla}`);
                        }
                    }else{
                        handleOpenModalPeriodo();
                    }
                // } else {
                //     handleOpenModalPeriodo();
                // }
            })
            .catch(error => console.error("Error al cargar periodo de reservas:", error));
    };

    const abrirEnNuevaVentana = (e) => {
        e.preventDefault(); // Prevenir la navegación por defecto
        window.open(datos.ubicacion_amb, '_blank', 'noopener,noreferrer');
    };

    return (
        <>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                <Tooltip title="Mostrar" placement="top">
                    <RemoveRedEyeIcon color="primary" onClick={handleMostrar} />
                </Tooltip>
                <Tooltip title="Editar" placement="top">
                    <EditNoteIcon color="secondary" onClick={handleEditar} />
                </Tooltip>
                <Tooltip title="Eliminar" placement="top">
                    <DeleteIcon color="info" onClick={handleOpenModal} />
                </Tooltip>
                <Tooltip title="Configuraciones" placement="top">
                    <SettingsIcon color="warning" onClick={handleConfiguraciones} />
                </Tooltip>
                <ModalEliminacion
                    open={openModal}
                    handleClose={handleCloseModal}
                    handleDelete={handleConfirmDelete}
                />
                <ModalPeriodo
                    open={openModalPeriodo}
                    handleClose={handleCloseModalPeriodo}
                />

            </div>
            <div>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    fullWidth
                    maxWidth="sm"
                >
                    <DialogTitle>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span>Detalles de ambiente</span>
                            <IconButton onClick={handleClose} aria-label="back">
                                <CloseIcon fontSize='large' />
                            </IconButton>
                            {/* <Button onClick={handleClose} style={{ minWidth: 'auto', padding: '0' }}>x</Button> */}
                        </div>
                    </DialogTitle>
                    <DialogContent dividers>
                        {datos !== undefined ? (
                            <div >
                                <p><strong>Nombre del Ambiente:</strong> {datos.nombre_amb}</p>
                                <p><strong>Descripción:</strong> {datos.descripcion_amb}</p>
                                <p>
                                    <strong>
                                        Ubicación:{' '}
                                        <Link href={datos.ubicacion_amb} passHref>
                                            <a onClick={abrirEnNuevaVentana} style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}>
                                                {datos.ubicacion_amb}
                                            </a>
                                        </Link>
                                    </strong>
                                </p>
                                <p><strong>Capacidad:</strong> {datos.capacidad_amb}</p>
                                {datos.cod_tipo_ambiente !== undefined && datos.cod_estado_ambiente !== undefined &&
                                    datos.cod_edificacion !== undefined && datos.cod_facultad !== undefined && datos.cod_piso !== undefined ? (
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
                            </div>
                        ) : (
                            <p>Cargando datos...</p>
                        )}
                    </DialogContent>
                    {/* <DialogActions>
                        <Button onClick={handleClose} color="primary">Cerrar</Button>
                    </DialogActions> */}
                </Dialog>
                {/* <Modal
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
                        {datos != undefined ? (
                            <div className='estilo-cuadroText'>
                                <div className='estilo-boton'>
                                    <Button onClick={handleClose}>x</Button>
                                </div>
                                <h1 className='title'>Detalles de ambiente</h1>
                                <p>Nombre del Ambiente: {datos.nombre_amb}</p>
                                <p>Descripción: {datos.descripcion_amb}</p>
                                <p>Ubicación: {datos.ubicacion_amb}</p>
                                <p>Capacidad: {datos.capacidad_amb}</p>
                                {datos.cod_tipo_ambiente != undefined && datos.cod_estado_ambiente != undefined &&
                                    datos.cod_edificacion != undefined && datos.cod_facultad != undefined && datos.cod_piso != undefined ? (
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
                            </div>
                        ) : (
                            <p>Cargando datos...</p>
                        )}
                    </div>
                </Modal> */}
            </div >
        </>
    );
};

export default Acciones;
