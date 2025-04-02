'use client';

import { saveSleepEntry } from './localStorage';

export const addTestData = () => {
  // Get current date
  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay()); // Start from Sunday
  startOfWeek.setHours(23, 0, 0, 0);

  // Create entries for each day of the week
  for (let i = 0; i < 7; i++) {
    const bedtime = new Date(startOfWeek);
    bedtime.setDate(startOfWeek.getDate() + i);
    
    const wakeTime = new Date(bedtime);
    wakeTime.setHours(bedtime.getHours() + 7 + Math.floor(Math.random() * 3)); // 7-9 hours of sleep
    wakeTime.setMinutes(Math.floor(Math.random() * 60));

    saveSleepEntry({
      bedtime: bedtime.toISOString(),
      wakeTime: wakeTime.toISOString(),
      notes: `Test entry for ${bedtime.toLocaleDateString()}`,
      duration: (wakeTime.getTime() - bedtime.getTime()) / (1000 * 60), // duration in minutes
    });
  }
};
