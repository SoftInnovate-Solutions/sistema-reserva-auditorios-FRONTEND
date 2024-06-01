import React from 'react';

function App() {
    // Función para abrir la nueva ventana
    const abrirNuevaVentana = () => {
        // URL de la página a la que se abrirá la nueva ventana
        const url = 'https://www.google.com/maps/@-17.3936905,-66.1448234,16z?entry=ttu';

        // Abre una nueva ventana con la URL especificada
        window.open(url, '_blank');
    };

    return (
        <div className="App">
            <header className="App-header">
                {/* Botón para abrir la nueva ventana */}
                <button onClick={abrirNuevaVentana}>Abrir Nueva Ventana</button>
            </header>
        </div>
    );
}

export default App;
