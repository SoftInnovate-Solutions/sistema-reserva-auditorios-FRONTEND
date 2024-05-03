// ModalComponent.jsx
import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

const ModalComponent = () => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button variant="contained" onClick={handleOpen}>
                Abrir Modal
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '500px',
                    height: '500px',
                    backgroundColor: 'rgba(255, 255, 255, 1)' // Fondo blanco con opacidad
                }}
            >
                <div>
                    <h2 id="modal-title">Título del Modal</h2>
                    <p id="modal-description">Contenido del Modal</p>
                    <Button onClick={handleClose}>Cerrar</Button>
                </div>
            </Modal>
        </div>
    );
};

export default ModalComponent;
