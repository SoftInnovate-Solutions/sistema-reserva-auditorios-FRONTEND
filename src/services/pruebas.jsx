import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const myEvents = [
  {
    title: 'Meeting',
    start: new Date(2024, 6, 20, 10, 0),
    end: new Date(2024, 6, 20, 12, 0),
    backgroundColor: 'lightblue',
    resource: 'Room 1'
  },
  {
    title: 'Lunch',
    start: new Date(2024, 6, 20, 13, 0),
    end: new Date(2024, 6, 20, 14, 0),
    backgroundColor: 'lightgreen',
    resource: 'Room 2'
  }
];

const handleReservar = (resource, start, end) => {
  console.log(`Reserved: ${resource} from ${start} to ${end}`);
};

const eventPropGetter = (event, start, end, isSelected) => {
  return {
    style: {
      backgroundColor: event.backgroundColor,
      border: 'none',
      padding: 0,
    }
  };
};

const MyCalendar = () => {
  const [policy, setPolicy] = useState(null);

  const handleButtonClick = (policyName) => {
    setPolicy(policyName);
    // Aquí puedes agregar lógica adicional para manejar la política seleccionada
  };

  return (
    <div>
      <div>
        <button onClick={() => handleButtonClick('buscarAmbienteVerDisponibilidad')}>
          Buscar Ambiente por Disponibilidad
        </button>
        <button onClick={() => handleButtonClick('buscarFechaVerAmbientesDisponibles')}>
          Buscar Fecha y Ver Ambientes Disponibles
        </button>
      </div>
      
      <div style={{ height: '500px', marginTop: '20px' }}>
        {policy === 'buscarAmbienteVerDisponibilidad' && (
          <div>
            {/* Implementar lógica para buscar ambiente y ver disponibilidad */}
            <p>Seleccionaste: Buscar Ambiente por Disponibilidad</p>
            {/* Aquí puedes mostrar la UI específica para esta política */}
          </div>
        )}
        
        {policy === 'buscarFechaVerAmbientesDisponibles' && (
          <div>
            {/* Implementar lógica para buscar fecha y ver ambientes disponibles */}
            <p>Seleccionaste: Buscar Fecha y Ver Ambientes Disponibles</p>
            {/* Aquí puedes mostrar la UI específica para esta política */}
          </div>
        )}

        <Calendar
          localizer={localizer}
          events={myEvents}
          startAccessor="start"
          endAccessor="end"
          eventPropGetter={eventPropGetter}
          components={{
            event: ({ event }) => (
              <button
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  backgroundColor: event.backgroundColor,
                  border: 'none',
                  padding: 0,
                  textAlign: 'left',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
                onClick={() => handleReservar(event.resource, event.start, event.end)}
              >
                {event.title}
              </button>
            ),
          }}
        />
      </div>
    </div>
  );
};

export default MyCalendar;
