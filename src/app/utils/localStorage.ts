'use client';

export interface SleepEntry {
  id: string;
  bedtime: string;
  wakeTime: string;
  notes: string;
  duration: number; // in minutes
}

const STORAGE_KEY = 'sleep-entries';

export const saveSleepEntry = (entry: Omit<SleepEntry, 'id'>) => {
  const entries = getSleepEntries();
  const newEntry = {
    ...entry,
    id: Date.now().toString(),
  };
  
  entries.push(newEntry);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  return newEntry;
};

export const getSleepEntries = (): SleepEntry[] => {
  const entriesJson = localStorage.getItem(STORAGE_KEY);
  return entriesJson ? JSON.parse(entriesJson) : [];
};

export const deleteSleepEntry = (id: string) => {
  const entries = getSleepEntries();
  const filteredEntries = entries.filter(entry => entry.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredEntries));
};

export const updateSleepEntry = (id: string, updatedEntry: Omit<SleepEntry, 'id'>) => {
  const entries = getSleepEntries();
  const updatedEntries = entries.map(entry => 
    entry.id === id ? { ...updatedEntry, id } : entry
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedEntries));
};

export const calculateDuration = (bedtime: Date, wakeTime: Date): number => {
  const diff = wakeTime.getTime() - bedtime.getTime();
  return Math.floor(diff / (1000 * 60)); // Convert to minutes
};

export const formatDuration = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}h ${remainingMinutes}m`;
};
