import React, { useState, useEffect } from 'react';

const ArrayComponent = ({ idTipo, idEstado, idEdificacion, idFacultad, idPiso }) => {

  const [tiposAmbiente, setTiposAmbiente] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/tipo_ambiente/all')
      .then(response => response.json())
      .then(data => {
        const idTipoInt = parseInt(idTipo, 10);
        const tipoEncontrado = data.find(tipo => tipo.cod_tipo_ambiente === idTipoInt);
        if (tipoEncontrado) {
          setTiposAmbiente([tipoEncontrado.nombre_ta]);
        } else {
          console.error("No se encontró ningún tipo de ambiente con el idTipo proporcionado.");
        }
      })
      .catch(error => console.error("Error al cargar los tipos de ambiente:", error));
  }, []);

  const [tiposEstadoAmbiente, setTiposEstadoAmbiente] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/estado_ambiente/all')
      .then(response => response.json())
      .then(data => {
        const idEstadoInt = parseInt(idEstado, 10);
        const tipoEncontrado = data.find(tipo => tipo.cod_estado_ambiente === idEstadoInt);
        if (tipoEncontrado) {
          setTiposEstadoAmbiente([tipoEncontrado.nombre_ea]);
        } else {
          console.error("No se encontró ningún tipo de ambiente con el idTipo proporcionado.");
        }
      })
      .catch(error => console.error("Error al cargar los tipos de ambiente:", error));
  }, []);

  const [tiposEdificacion, setTiposEdificacion] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/edificacion/all')
      .then(response => response.json())
      .then(data => {
        const idEdificacionInt = parseInt(idEdificacion, 10);
        const tipoEncontrado = data.find(tipo => tipo.cod_edificacion === idEdificacionInt);
        if (tipoEncontrado) {
          setTiposEdificacion([tipoEncontrado.nombre_edi]);
        } else {
          console.error("No se encontró ningún tipo de ambiente con el idTipo proporcionado.");
        }
      })
      .catch(error => console.error("Error al cargar los tipos de ambiente:", error));
  }, []);

  const [tiposFacultad, setTiposFacultad] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/facultad/all')
      .then(response => response.json())
      .then(data => {
        const idFacultadInt = parseInt(idFacultad, 10);
        const tipoEncontrado = data.find(tipo => tipo.cod_facultad === idFacultadInt);
        if (tipoEncontrado) {
          setTiposFacultad([tipoEncontrado.nombre_fac]);
        } else {
          console.error("No se encontró ningún tipo de ambiente con el idTipo proporcionado.");
        }
      })
      .catch(error => console.error("Error al cargar los tipos de ambiente:", error));
  }, []);

  const [tiposNumeroPiso, setTiposNumeroPiso] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/piso/all')
      .then(response => response.json())
      .then(data => {
        const idPisoInt = parseInt(idPiso, 10);
        const tipoEncontrado = data.find(tipo => tipo.cod_piso === idPisoInt);
        if (tipoEncontrado) {
          setTiposNumeroPiso([tipoEncontrado.nombre_piso]);
        } else {
          console.error("No se encontró ningún tipo de ambiente con el idTipo proporcionado.");
        }
      })
      .catch(error => console.error("Error al cargar los tipos de ambiente:", error));
  }, []);

  return (
    <div>
      <p><strong>Tipo de ambiente:</strong> {tiposAmbiente}</p>
      <p><strong>Estado de ambiente:</strong> {tiposEstadoAmbiente}</p>
      <p><strong>Tipo de edificación:</strong> {tiposEdificacion}</p>
      <p><strong>Facultad:</strong> {tiposFacultad}</p>
      <p><strong>Piso:</strong> {tiposNumeroPiso}</p>
    </div>
  );
};

export default ArrayComponent;