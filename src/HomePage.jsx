import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div style={homePageStyle}>
      <h1>Welcome to the Clicker App</h1>
      <div style={buttonContainerStyle}>
        <Link to="/clicker">
          <button style={buttonStyle}>Clicker</button>
        </Link>
        <Link to="/schedule">
          <button style={buttonStyle}>Schedule</button>
        </Link>
      </div>
    </div>
  );
};

const buttonStyle = {
  fontSize: '20px',
  padding: '20px',
  margin: '10px',
  backgroundColor: '#4CAF50',
  color: 'white',
  border: 'none',
  cursor: 'pointer',
  borderRadius: '5px',
  width: '200px',
};

const buttonContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};

const homePageStyle = {
  textAlign: 'center',
  paddingTop: '50px',
};

export default HomePage;
