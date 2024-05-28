import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Configura moment para que use el idioma español
moment.locale('es');

// Crea el localizador usando moment
const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const events = [
    {
      title: 'Reunión',
      start: new Date(),
      end: new Date(),
    },
  ];

  return (
    <div style={{ height: '500px' }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        messages={{
          date: 'Fecha',
          time: 'Hora',
          event: 'Evento',
          allDay: 'Todo el día',
          week: 'Semana',
          work_week: 'Semana laboral',
          day: 'Día',
          month: 'Mes',
          previous: 'Anterior',
          next: 'Siguiente',
          yesterday: 'Ayer',
          tomorrow: 'Mañana',
          today: 'Hoy',
          agenda: 'Agenda',
          noEventsInRange: 'No hay eventos en este rango.',
          showMore: total => `+ Ver más (${total})`,
        }}
      />
    </div>
  );
};

export default MyCalendar;
