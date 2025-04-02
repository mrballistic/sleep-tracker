'use client';

import React from 'react';
import { Box, Button, Container } from '@mui/material';
import WeeklyChart from '../components/WeeklyChart';
import { addTestData } from '../utils/testData';

const WeeklyView = () => {
  const handleAddTestData = () => {
    addTestData();
    // Force a reload to show the new data
    window.location.reload();
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button 
          variant="outlined" 
          onClick={handleAddTestData}
          sx={{ mt: 2 }}
        >
          Add Test Data
        </Button>
      </Box>
      <WeeklyChart />
    </Container>
  );
};

export default WeeklyView;
