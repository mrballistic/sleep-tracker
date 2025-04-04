'use client';

import React from 'react';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import { useAppTheme } from './theme';
import Navbar from './components/Navbar';

const App = () => {
  const theme = useAppTheme();
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          {/* Components will be added here */}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;
