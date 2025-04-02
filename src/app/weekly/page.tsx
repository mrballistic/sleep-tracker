'use client';

import React from 'react';
import { Container, Typography } from '@mui/material';

const WeeklyPage = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Weekly Sleep Patterns
      </Typography>
      {/* Weekly visualization will be added here */}
    </Container>
  );
};

export default WeeklyPage;
