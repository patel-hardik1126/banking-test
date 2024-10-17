// DateTimeRangeForm.js
import React from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Button, Box } from '@mui/material';
import { useState } from 'react';

const DateTimeRangeForm = ({ onSubmit }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(startDate, endDate); // Pass selected dates to parent
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <form onSubmit={handleSubmit}>
        <Box display="flex" alignItems="center" mb={2}>
          <DateTimePicker
            label="Start Date"
            value={startDate}
            onChange={(newValue) => setStartDate(newValue)}
            renderInput={(params) => <TextField {...params} />}
            style={{ marginRight: '16px' }}
          />
          <DateTimePicker
            label="End Date"
            value={endDate}
            onChange={(newValue) => setEndDate(newValue)}
            renderInput={(params) => <TextField {...params} />}
            style={{ marginRight: '16px' }}
          />
          <Button type="submit" variant="contained" color="primary">
            Search
          </Button>
        </Box>
      </form>
    </LocalizationProvider>
  );
};

export default DateTimeRangeForm;
