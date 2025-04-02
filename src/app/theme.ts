'use client';

import { createTheme } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useMemo } from 'react';

export function useAppTheme() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = useMemo(
    () =>
      createTheme({
        typography: {
          fontFamily: 'Geist, Arial, sans-serif',
        },
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
          primary: {
            main: '#1976d2',
          },
          background: {
            default: prefersDarkMode ? '#121212' : '#f5f5f5',
            paper: prefersDarkMode ? '#1e1e1e' : '#ffffff',
          },
        },
        components: {
          MuiCard: {
            styleOverrides: {
              root: {
                boxShadow: prefersDarkMode ? '0 4px 6px rgba(0, 0, 0, 0.4)' : '0 4px 6px rgba(0, 0, 0, 0.1)',
              },
            },
          },
        },
      }),
    [prefersDarkMode]
  );

  return theme;
}
