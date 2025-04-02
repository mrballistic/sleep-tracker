'use client';

import React, { useState, useEffect } from 'react';
import { Container } from '@mui/material';
import SleepEntryForm from './components/SleepEntryForm';
import SleepEntryList from './components/SleepEntryList';
import { getSleepEntries, SleepEntry } from './utils/localStorage';

const EntryPage = () => {
  const [entries, setEntries] = useState<SleepEntry[]>([]);

  useEffect(() => {
    setEntries(getSleepEntries());
  }, []);

  const handleDelete = () => {
    setEntries(getSleepEntries());
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <SleepEntryForm />
      <SleepEntryList entries={entries} onDelete={handleDelete} />
    </Container>
  );
};

export default EntryPage;
