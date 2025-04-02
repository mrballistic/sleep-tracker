'use client';

import React from 'react';
import { Container, Typography, Card, CardContent, Switch, FormControlLabel, Stack } from '@mui/material';

const SettingsPage = () => {
  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>
      <Card>
        <CardContent>
          <Stack spacing={3}>
            <FormControlLabel
              control={<Switch />}
              label="Dark Mode (follows system)"
              disabled
            />
            <FormControlLabel
              control={<Switch />}
              label="Apple Health Integration"
              disabled
            />
            <Typography variant="caption" color="text.secondary">
              More settings coming soon...
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
};

export default SettingsPage;
