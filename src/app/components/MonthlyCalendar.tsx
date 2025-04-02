'use client';

import React, { useMemo } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { getSleepEntries } from '../utils/localStorage';

interface DayData {
  date: string;
  duration: number; // in minutes
}

const MonthlyCalendar = () => {
  const monthData = useMemo(() => {
    const entries = getSleepEntries();
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    // Initialize data for each day of the month
    const daysInMonth = endOfMonth.getDate();
    const monthData: DayData[] = Array.from({ length: daysInMonth }, (_, i) => {
      const date = new Date(startOfMonth);
      date.setDate(startOfMonth.getDate() + i);
      return {
        date: date.toISOString().split('T')[0],
        duration: 0,
      };
    });

    // Process entries to calculate total sleep duration for each day
    entries.forEach(entry => {
      const entryDate = new Date(entry.bedtime).toISOString().split('T')[0];
      const dayData = monthData.find(d => d.date === entryDate);
      if (dayData) {
        dayData.duration += entry.duration;
      }
    });

    return monthData;
  }, []);

  const getColor = (duration: number) => {
    if (duration === 0) return '#e0e0e0'; // No data
    if (duration < 240) return '#ffcccb'; // Less than 4 hours
    if (duration < 420) return '#ffd700'; // 4-7 hours
    return '#90ee90'; // 7+ hours
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 1 }}>
      {monthData.map((day) => (
        <Paper
          key={day.date}
          sx={{
            backgroundColor: getColor(day.duration),
            height: 50,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="caption">{new Date(day.date).getDate()}</Typography>
        </Paper>
      ))}
    </Box>
  );
};

export default MonthlyCalendar;
