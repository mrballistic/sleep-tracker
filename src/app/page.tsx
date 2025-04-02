'use client';

import React from 'react';
import { Container } from '@mui/material';
import SleepEntryForm from './components/SleepEntryForm';
import SleepEntryList from './components/SleepEntryList';
import { getSleepEntries, SleepEntry } from './utils/localStorage';
import { useState, useEffect } from 'react';

export default function Home() {
  const [entries, setEntries] = useState<SleepEntry[]>([]);

  useEffect(() => {
    setEntries(getSleepEntries());
  }, []);

  const handleDelete = () => {
    setEntries(getSleepEntries());
  };

  return (
    <Container maxWidth="sm">
      <SleepEntryForm />
      <SleepEntryList entries={entries} onDelete={handleDelete} />
    </Container>
  );
}
