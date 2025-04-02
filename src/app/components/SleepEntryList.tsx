'use client';

import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Paper,
  Typography,
  Box,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { format } from 'date-fns';
import { SleepEntry, deleteSleepEntry, formatDuration } from '../utils/localStorage';

interface Props {
  entries: SleepEntry[];
  onDelete: (id: string) => void;
}

const SleepEntryList = ({ entries, onDelete }: Props) => {
  const handleDelete = (id: string) => {
    deleteSleepEntry(id);
    onDelete(id);
  };

  if (entries.length === 0) {
    return (
      <Box sx={{ mt: 2 }}>
        <Typography variant="body1" color="text.secondary" align="center">
          No sleep entries yet
        </Typography>
      </Box>
    );
  }

  return (
    <Paper sx={{ mt: 2 }}>
      <List>
        {entries.map((entry) => (
          <ListItem
            key={entry.id}
            secondaryAction={
              <IconButton edge="end" onClick={() => handleDelete(entry.id)}>
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemText
              primary={`${format(new Date(entry.bedtime), 'PPp')} - ${format(
                new Date(entry.wakeTime),
                'PPp'
              )}`}
              secondary={
                <>
                  <Typography component="span" variant="body2" color="text.primary">
                    Duration: {formatDuration(entry.duration)}
                  </Typography>
                  {entry.notes && (
                    <Typography component="p" variant="body2">
                      Notes: {entry.notes}
                    </Typography>
                  )}
                </>
              }
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default SleepEntryList;
