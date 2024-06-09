import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import DateRangeIcon from '@mui/icons-material/DateRange';
import Popover from '@mui/material/Popover';
import Box from '@mui/material/Box';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

function DateRangePicker() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'date-range-popover' : undefined;

  return (
    <div>
      <TextField
        onClick={handleClick}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <DateRangeIcon />
            </InputAdornment>
          ),
        }}
        placeholder="Seleccione el rango de fechas"
        variant="outlined"
        fullWidth
      />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Box p={2}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <CalendarTodayIcon sx={{ marginRight: '8px' }} />
            <TextField
              type="date"
              variant="standard"
              InputLabelProps={{
                shrink: true,
              }}
              label="Desde"
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '16px' }}>
            <CalendarTodayIcon sx={{ marginRight: '8px' }} />
            <TextField
              type="date"
              variant="standard"
              InputLabelProps={{
                shrink: true,
              }}
              label="Hasta"
            />
          </div>
        </Box>
      </Popover>
    </div>
  );
}

export default DateRangePicker;
