import * as React from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/es'; // Importa la localización en español
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// Configura dayjs para usar español
dayjs.locale('es');

export default function ResponsiveDatePickers() {
  const [selectedDate, setSelectedDate] = React.useState(dayjs());

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
    console.log(newDate.format('YYYY-MM-DD'));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
      <DemoContainer components={['DatePicker']}>
        <DemoItem label="Variante adaptable">
          <DatePicker
            value={selectedDate}
            onChange={handleDateChange}
            openTo="month"
            views={['year', 'month', 'day']}
          />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
}
