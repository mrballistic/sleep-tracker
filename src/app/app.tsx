'use client';

import React from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { useAppTheme } from './theme';

const App = () => {
  const theme = useAppTheme();
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>
        <h1>Sleep Pattern Tracking Application</h1>
        {/* Components will be added here */}
      </div>
    </ThemeProvider>
  );
};

export default App;
