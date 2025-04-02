'use client';

import React, { useMemo } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
} from 'recharts';
import { getSleepEntries, formatDuration } from '../utils/localStorage';

interface DayData {
  day: string;
  date: string;
  duration: number;
  count: number;
  averageBedtime: number;
  averageWakeTime: number;
  averageDuration: number;
  formattedBedtime: string;
  formattedWakeTime: string;
}

const formatTime = (hours: number) => {
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
};

const WeeklyChart = () => {
  const weeklyData = useMemo(() => {
    const entries = getSleepEntries();
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay()); // Start from Sunday
    startOfWeek.setHours(0, 0, 0, 0);

    // Initialize data for each day of the week
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const weekData: Array<Omit<DayData, 'formattedBedtime' | 'formattedWakeTime'>> = daysOfWeek.map((day, index) => {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + index);
      return {
        day,
        date: date.toISOString().split('T')[0],
        duration: 0,
        count: 0,
        averageBedtime: 0,
        averageWakeTime: 0,
        averageDuration: 0,
      };
    });

    // Process entries for the current week
    entries.forEach(entry => {
      const entryDate = new Date(entry.bedtime).toISOString().split('T')[0];
      const dayData = weekData.find(d => d.date === entryDate);
      
      if (dayData) {
        dayData.duration += entry.duration;
        dayData.count += 1;
        
        const bedtime = new Date(entry.bedtime);
        const wakeTime = new Date(entry.wakeTime);
        
        // Convert times to hours for averaging
        const bedHours = bedtime.getHours() + bedtime.getMinutes() / 60;
        const wakeHours = wakeTime.getHours() + wakeTime.getMinutes() / 60;
        
        if (dayData.count === 1) {
          dayData.averageBedtime = bedHours;
          dayData.averageWakeTime = wakeHours;
        } else {
          dayData.averageBedtime = ((dayData.averageBedtime * (dayData.count - 1)) + bedHours) / dayData.count;
          dayData.averageWakeTime = ((dayData.averageWakeTime * (dayData.count - 1)) + wakeHours) / dayData.count;
        }
      }
    });

    // Calculate averages and format times
    return weekData.map(day => ({
      ...day,
      averageDuration: day.count > 0 ? Math.round(day.duration / day.count) : 0,
      formattedBedtime: day.count > 0 ? formatTime(day.averageBedtime) : '-',
      formattedWakeTime: day.count > 0 ? formatTime(day.averageWakeTime) : '-',
    }));
  }, []);

  interface CustomTooltipProps extends TooltipProps<number, string> {
    active?: boolean;
    payload?: Array<{
      value: number;
      payload: DayData;
    }>;
    label?: string;
  }

  const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
    if (active && payload && payload.length > 0) {
      const data = payload[0].payload;
      return (
        <Paper sx={{ p: 2 }}>
          <Typography variant="subtitle2">{label}</Typography>
          <Typography variant="body2">
            Average Duration: {formatDuration(data.averageDuration)}
          </Typography>
          <Typography variant="body2">
            Average Bedtime: {data.formattedBedtime}
          </Typography>
          <Typography variant="body2">
            Average Wake Time: {data.formattedWakeTime}
          </Typography>
        </Paper>
      );
    }
    return null;
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Weekly Sleep Pattern
      </Typography>
      <Paper sx={{ p: 2, height: 400, mb: 3 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis
              label={{ 
                value: 'Hours', 
                angle: -90, 
                position: 'insideLeft' 
              }}
              tickFormatter={(value) => (value / 60).toFixed(1)}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="averageDuration"
              fill="#8884d8"
              name="Average Sleep Duration"
            />
          </BarChart>
        </ResponsiveContainer>
      </Paper>
      
      <Typography variant="h6" gutterBottom>
        Weekly Summary
      </Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2 }}>
        {weeklyData.map((day) => (
          <Paper key={day.day} sx={{ p: 2 }}>
            <Typography variant="subtitle1">{day.day}</Typography>
            <Typography variant="body2">
              Duration: {formatDuration(day.averageDuration)}
            </Typography>
            <Typography variant="body2">
              Bedtime: {day.formattedBedtime}
            </Typography>
            <Typography variant="body2">
              Wake Time: {day.formattedWakeTime}
            </Typography>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default WeeklyChart;
