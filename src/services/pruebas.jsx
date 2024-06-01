// App.js
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import DisabledModal from './modal';

const App = () => {
    const [openModal, setOpenModal] = useState(false);

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <Button variant="contained" color="primary" onClick={handleOpenModal}>
                Mostrar Modal
            </Button>
            <DisabledModal
                open={openModal}
                handleClose={handleCloseModal}
            />
        </div>
    );
};

export default App;
