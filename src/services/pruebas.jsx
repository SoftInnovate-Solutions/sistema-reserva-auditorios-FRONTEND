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
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
      <DemoContainer
        components={[
          'DatePicker',
        ]}
      >
        <DemoItem label="Fecha de inicio">
          <DatePicker openTo="month" views={['year', 'month', 'day']} />
        </DemoItem>
        <DemoItem label="Fecha Fin">
          <DatePicker openTo="month" views={['year', 'month', 'day']} />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
}
