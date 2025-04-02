'use client';

import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Stack,
} from '@mui/material';
import { calculateDuration, formatDuration, saveSleepEntry } from '../utils/localStorage';

const SleepEntryForm = () => {
  const [entry, setEntry] = useState({
    bedtime: new Date().toISOString().slice(0, 16),
    wakeTime: new Date().toISOString().slice(0, 16),
    notes: '',
  });
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const bedtimeDate = new Date(entry.bedtime);
    const wakeTimeDate = new Date(entry.wakeTime);

    if (wakeTimeDate <= bedtimeDate) {
      setError('Wake time must be after bedtime');
      return;
    }

    const duration = calculateDuration(bedtimeDate, wakeTimeDate);
    
    saveSleepEntry({
      bedtime: bedtimeDate.toISOString(),
      wakeTime: wakeTimeDate.toISOString(),
      notes: entry.notes,
      duration,
    });

    // Reset form and show success message
    setError('Entry saved successfully!');
    setTimeout(() => setError(null), 3000);
    
    setEntry({
      bedtime: new Date().toISOString().slice(0, 16),
      wakeTime: new Date().toISOString().slice(0, 16),
      notes: '',
    });
  };

  const getDuration = () => {
    const bedtimeDate = new Date(entry.bedtime);
    const wakeTimeDate = new Date(entry.wakeTime);

    if (wakeTimeDate <= bedtimeDate) {
      return '0h 0m';
    }
    const duration = calculateDuration(bedtimeDate, wakeTimeDate);
    return formatDuration(duration);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Log Sleep Entry
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              label="Bedtime"
              type="datetime-local"
              value={entry.bedtime}
              onChange={(e) => setEntry(prev => ({ ...prev, bedtime: e.target.value }))}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
            <TextField
              label="Wake Time"
              type="datetime-local"
              value={entry.wakeTime}
              onChange={(e) => setEntry(prev => ({ ...prev, wakeTime: e.target.value }))}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
            <TextField
              label="Notes"
              multiline
              rows={3}
              value={entry.notes}
              onChange={(e) =>
                setEntry((prev) => ({ ...prev, notes: e.target.value }))
              }
            />
            {error && (
              <Typography 
                color={error.includes('successfully') ? 'success.main' : 'error'} 
                variant="body2"
              >
                {error}
              </Typography>
            )}
            <Typography variant="body1">
              Duration: {getDuration()}
            </Typography>
            <Button type="submit" variant="contained" color="primary">
              Save Entry
            </Button>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
};

export default SleepEntryForm;
