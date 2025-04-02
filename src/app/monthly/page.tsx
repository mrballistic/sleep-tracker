'use client';

import React from 'react';
import { Container, Typography } from '@mui/material';

const MonthlyPage = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Monthly Sleep Patterns
      </Typography>
      {/* Monthly visualization will be added here */}
    </Container>
  );
};

export default MonthlyPage;
