'use client';

import React from 'react';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import { useAppTheme } from './theme';
import Navbar from './components/Navbar';

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useAppTheme();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          {children}
        </Box>
      </Box>
    </ThemeProvider>
  );
}
