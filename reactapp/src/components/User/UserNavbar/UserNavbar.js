import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IconButton, ThemeProvider, createTheme } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import EventNoteIcon from '@mui/icons-material/EventNote';
import LogoutIcon from '@mui/icons-material/Logout';
import styles from './UserNavbar.module.css';

const Navbar = () => {
  const navigate = useNavigate();
//handleOnClickLogout function is called when the user clicks the Logout button.
//  It removes the user data from local storage and displays a success toast message. After that, it navigates the user to the homepage ("/").
  const handleOnClickLogout = () => {
    localStorage.removeItem('user');
    setTimeout(() => {
      toast.success('Logged out successfully');
    }, 1000);
    navigate('/');
  };

  const theme = createTheme({
    components: {
      MuiLink: {
        styleOverrides: {
          root: {
            transition: 'color 0.3s ease-in-out',
            '&:hover': {
              color: '#ff4081',
            },
          },
        },
      },
      MuiSvgIcon: {
        styleOverrides: {
          root: {
            fontSize: '28px',
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <nav className={`navbar navbar-expand-lg ${styles.navbar}`}>
        <div className="container-fluid">
          <h4 className={styles.logo}>Vacuum Solution</h4>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
            <ul className="navbar-nav">
              <li className={`nav-item ${styles.navItem}`}>
                <Link id='HomeButton' className={`nav-link ${styles.navLink}`} to="/user/home">
                  <HomeIcon />
                  <span className={styles.navLinkText}>Home</span>
                </Link>
              </li>
              <li className={`nav-item ${styles.navItem}`}>
                <Link id='myBookingButton' className={`nav-link ${styles.navLink}`} to="/user/mybooking">
                  <EventNoteIcon />
                  <span className={styles.navLinkText}>My Bookings</span>
                </Link>
              </li>
            </ul>
          </div>
          <div className={`navbar-nav ml-auto ${styles.logout}`}>
            <span className={styles.logoutText}>Logout</span>
            <IconButton id='logout' color="inherit" onClick={handleOnClickLogout}>
              <LogoutIcon fontSize="large" />
            </IconButton>
          </div>
        </div>
      </nav>
    </ThemeProvider>
  );
};

export default Navbar;
