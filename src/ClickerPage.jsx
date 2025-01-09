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
      <button onClick={handleClick} style={{ padding: '10px', fontSize: '20px' }}>
        Click Here
      </button>
      <br />
      <button
        onClick={handleClearClicks}
        style={{ padding: '10px', fontSize: '20px', marginTop: '20px', backgroundColor: 'red' }}
      >
        Clear Clicks
      </button>
    </div>
  );
};

export default ClickerPage;
