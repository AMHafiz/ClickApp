import React, { useRef, useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const SchedulePage = ({ schedule }) => {
  const [currentWeekIndex, setCurrentWeekIndex] = useState(0);
  const scheduleRef = useRef();

  const currentTime = new Date();
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const currentDay = currentTime.getDay();
  const currentDayName = daysOfWeek[currentDay - 1];
  const currentHour = currentTime.getHours();
  const currentMinute = currentTime.getMinutes();

  const handleWeekChange = (direction) => {
    if (direction === 'next' && currentWeekIndex < 15) {
      setCurrentWeekIndex(currentWeekIndex + 1);
    } else if (direction === 'prev' && currentWeekIndex > 0) {
      setCurrentWeekIndex(currentWeekIndex - 1);
    }
  };

  if (!schedule[currentWeekIndex]) {
    return <h2>No data available for the current week.</h2>;
  }

  const weekSchedule = schedule[currentWeekIndex];

  // Function to handle PDF download
  const handleDownloadPDF = async () => {
    const element = scheduleRef.current;

    try {
      const canvas = await html2canvas(element);
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;

      const ratio = Math.min(pageWidth / imgWidth, pageHeight / imgHeight);

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth * ratio, imgHeight * ratio);
      pdf.save('schedule.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ textAlign: 'center', color: '#4CAF50' }}>Schedule</h1>
      
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <button
          onClick={() => handleWeekChange('prev')}
          style={{
            padding: '10px',
            fontSize: '16px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginBottom: '10px',
          }}
        >
          &lt; Prev
        </button>
        <span style={{ margin: '0 20px', fontSize: '20px' }}>Week {currentWeekIndex + 1}</span>
        <button
          onClick={() => handleWeekChange('next')}
          style={{
            padding: '10px',
            fontSize: '16px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginBottom: '10px',
          }}
        >
          Next &gt;
        </button>
      </div>

      <div ref={scheduleRef}>
        <div style={{ overflowX: 'auto' }}>
          <table
            style={{
              width: '100%',
              textAlign: 'center',
              borderCollapse: 'collapse',
              border: '2px solid #ddd',
              marginTop: '20px',
            }}
          >
            <thead>
              <tr style={{ backgroundColor: '#4CAF50', color: 'white' }}>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Time</th>
                {daysOfWeek.map(day => (
                  <th key={day} style={{ padding: '10px', border: '1px solid #ddd' }}>
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM'].map(time => (
                <tr key={time} style={{ backgroundColor: '#f9f9f9' }}>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>{time}</td>
                  {daysOfWeek.map(day => {
                    const cellData = weekSchedule[day]?.find(slot => slot.time === time);
                    const isCurrentSlot =
                      currentDayName === day &&
                      time === `${currentHour % 12 || 12}:${currentMinute < 30 ? '00' : '30'} ${currentHour < 12 ? 'AM' : 'PM'}`;

                    return (
                      <td
                        key={day}
                        style={{
                          padding: '10px',
                          border: '1px solid #ddd',
                          backgroundColor: isCurrentSlot ? 'lightblue' : 'white',
                          cursor: 'pointer',
                        }}
                      >
                        {cellData ? cellData.clicks : 0}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button
          onClick={handleDownloadPDF}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Download Schedule as PDF
        </button>
      </div>

      {/* Media query for mobile responsiveness */}
      <style jsx>{`
        @media (max-width: 600px) {
          table {
            font-size: 12px;
          }
          th, td {
            padding: 8px;
          }
          button {
            font-size: 14px;
            padding: 8px;
          }
          .week-change-buttons {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 10px;
          }
        }
      `}</style>
    </div>
  );
};

export default SchedulePage;
