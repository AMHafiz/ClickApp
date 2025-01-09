import React, { useState, useCallback } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SchedulePage from './SchedulePage';
import ClickerPage from './ClickerPage';
import HomePage from './HomePage';
import Nav from './Nav';

const generateSchedule = () => {
  const weeks = [];
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const timeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
    '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM',
  ];

  for (let weekIndex = 0; weekIndex < 16; weekIndex++) {
    const week = {};
    daysOfWeek.forEach(day => {
      week[day] = timeSlots.map(time => ({
        time,
        clicks: 0,
      }));
    });
    weeks.push(week);
  }
  return weeks;
};


const App = () => {
  const [schedule, setSchedule] = useState(() => {
    const savedSchedule = localStorage.getItem('schedule');
    try {
      const parsedSchedule = savedSchedule ? JSON.parse(savedSchedule) : null;

      if (Array.isArray(parsedSchedule) && parsedSchedule.length === 16) {
        return parsedSchedule;
      }
    } catch (error) {
      console.error('Error parsing schedule from localStorage', error);
    }
    return generateSchedule();
  });

  const currentWeekIndex = Math.floor(
    (new Date().getTime() - new Date('2025-01-06').getTime()) / (1000 * 60 * 60 * 24 * 7)
  );

  const updateSchedule = useCallback(() => {
    const currentTime = new Date();
    const currentDay = currentTime.getDay();
    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();

    if (currentHour < 9 || currentHour >= 17) {
      console.log('Outside of schedule range (9:00 AM - 5:00 PM)');
      return;
    }

    const roundedTime = `${currentHour % 12 || 12}:${currentMinute < 30 ? '00' : '30'} ${currentHour < 12 ? 'AM' : 'PM'}`;

    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const currentDayName = daysOfWeek[currentDay - 1];
    if (!currentDayName || currentDayName === 'Saturday' || currentDayName === 'Sunday') {
      return;
    }

    const updatedSchedule = [...schedule];
    const week = updatedSchedule[currentWeekIndex];
    const currentDaySlots = week[currentDayName];

    if (!currentDaySlots) {
      console.error(`Day "${currentDayName}" not found in the schedule for week ${currentWeekIndex}`);
      return;
    }

    const updatedSlots = currentDaySlots.map(slot =>
      slot.time === roundedTime ? { ...slot, clicks: slot.clicks + 1 } : slot
    );

    updatedSchedule[currentWeekIndex] = {
      ...week,
      [currentDayName]: updatedSlots,
    };
    localStorage.setItem('schedule', JSON.stringify(updatedSchedule));
    setSchedule(updatedSchedule);
  }, [schedule, currentWeekIndex]);

  return (
    <BrowserRouter>
      { <Nav /> }
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/clicker" element={<ClickerPage onClick={updateSchedule} />} />
        <Route
          path="/schedule"
          element={<SchedulePage schedule={schedule} currentWeekIndex={currentWeekIndex} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
