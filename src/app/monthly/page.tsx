'use client';

import React from 'react';
import { Container, Typography } from '@mui/material';
import MonthlyCalendar from '../components/MonthlyCalendar';

const MonthlyView = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Monthly Sleep Patterns
      </Typography>
      <MonthlyCalendar />
    </Container>
  );
};

export default MonthlyView;
