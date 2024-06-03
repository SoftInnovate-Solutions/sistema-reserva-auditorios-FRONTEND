import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const eventos = [
  {
    title: 'Reunión',
    start: new Date(2024, 4, 1, 10, 0),
    end: new Date(2024, 4, 1, 11, 30),
    backgroundColor: 'red',
    resource: 'Sala 1'
  },
  // más eventos...
];

const handleReservar = (resource, start, end) => {
  console.log("Reserva:", { resource, start, end });
  // manejar reserva
};

const MyCalendar = () => (
  <Calendar
    localizer={localizer}
    events={eventos}
    startAccessor="start"
    endAccessor="end"
    style={{ height: 500 }}
    selectable
    onSelectSlot={(slotInfo) => console.log(slotInfo)}
    step={90}
    timeslots={1}
    min={new Date(2024, 4, 1, 8, 15)}
    max={new Date(2024, 4, 12, 21, 45)}
    eventPropGetter={(event) => ({ style: { backgroundColor: event.backgroundColor } })}
    components={{
      event: ({ event }) => (
        <button
          style={{ width: '100%', height: '100%', backgroundColor: event.backgroundColor }}
          onClick={() => handleReservar(event.resource, event.start, event.end)}
        >
          {event.title}
        </button>
      ),
    }}
  />
);

export default MyCalendar;
