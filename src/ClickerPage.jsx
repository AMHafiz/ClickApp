import React, { useState, useEffect } from 'react';

const ClickerPage = ({ onClick }) => {
  const [clickCount, setClickCount] = useState(0);
  
  useEffect(() => {
    const storedClickCount = localStorage.getItem('clickCount');
    if (storedClickCount) {
      setClickCount(parseInt(storedClickCount, 10));
    }
  }, []);
  
  const handleClick = () => {
    const newClickCount = clickCount + 1;
    setClickCount(newClickCount);
    localStorage.setItem('clickCount', newClickCount.toString());
    onClick();
  };
  
  const handleClearClicks = () => {
    setClickCount(0);
    localStorage.setItem('clickCount', '0');
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Click Count: {clickCount}</h1>
      
      <button
        onClick={handleClick}
        style={{
          padding: '20px',
          fontSize: '30px',
          width: '90vw', // Button takes 90% of the viewport width
          maxWidth: '500px', // Max width to ensure it's not too wide on large screens
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '10px',
          cursor: 'pointer',
        }}
      >
        Click Here
      </button>
      
      <br />
      
      <button
        onClick={handleClearClicks}
        style={{
          padding: '10px',
          fontSize: '18px',
          marginTop: '20px',
          backgroundColor: 'red',
          color: 'white',
          border: 'none',
          borderRadius: '10px',
          cursor: 'pointer',
        }}
      >
        Clear Clicks
      </button>
    </div>
  );
};

export default ClickerPage;
