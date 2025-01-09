import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Nav = () => {
  const location = useLocation();  

  return (
    <nav style={styles.navBar}>
      <ul style={styles.navList}>
        <li>
          <Link
            to="/"
            style={{
              ...styles.navLink,
              backgroundColor: location.pathname === '/' ? '#004d26' : '#388e3c', // Darker green when clicked
            }}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/schedule"
            style={{
              ...styles.navLink,
              backgroundColor: location.pathname === '/schedule' ? '#004d26' : '#388e3c',
            }}
          >
            Schedule
          </Link>
        </li>
        <li>
          <Link
            to="/clicker"
            style={{
              ...styles.navLink,
              backgroundColor: location.pathname === '/clicker' ? '#004d26' : '#388e3c',
            }}
          >
            Clicker
          </Link>
        </li>
      </ul>
    </nav>
  );
};

const styles = {
  navBar: {
    backgroundColor: '#388e3c', 
    padding: '20px 40px',  // Increased padding for a longer navbar
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  navList: {
    listStyle: 'none',
    display: 'flex',
    justifyContent: 'center',
    margin: 0,
    padding: 0,
  },
  navLink: {
    color: 'white',
    textDecoration: 'none',
    padding: '12px 25px',
    borderRadius: '15px', 
    fontSize: '18px',
    margin: '0 15px',
    transition: 'background-color 0.3s ease',
  },
};

export default Nav;
