import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IconButton, ThemeProvider, createTheme } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ListAltIcon from '@mui/icons-material/ListAlt';
import LogoutIcon from '@mui/icons-material/Logout';
import styles from './AdminNavbar.module.css';

const AdminNavbar = () => {
  const navigate = useNavigate();

  //This function is called when the user clicks the "Logout" button. It performs the following tasks:
  //Removes the user data from the local storage using localStorage.removeItem('user'), presumably to log out the user.
  const handleOnClickLogout = () => {
    localStorage.removeItem('user');
    setTimeout(() => {
      toast.success('Logged out successfully');
    }, 1000);
    navigate('/');
  };

  //    The component defines a custom theme for certain MUI components using the createTheme function from MUI.
  // The theme customization involves changing the link color on hover and adjusting the icon size.
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
            fontSize: '24px',
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <nav className={`navbar navbar-expand-lg ${styles.navbar}`}>
        <div className="container-fluid">
          <h4 className={styles.logo}>Vacuum Service</h4>
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
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className={`nav-item ${styles.navItem}`}>
                <Link id='adminCenterProfile' className={`nav-link ${styles.navLink}`} to="/admin/home">
                  <HomeIcon />
                  <span className={styles.navLinkText}>Home</span>
                </Link>
              </li>
              <li className={`nav-item ${styles.navItem}`}>
                <Link id='adminAddCenter' className={`nav-link ${styles.navLink}`} to="/admin/add-centre">
                  <AddCircleOutlineIcon />
                  <span className={styles.navLinkText}>Add Centre</span>
                </Link>
              </li>
              <li className={`nav-item ${styles.navItem}`}>
                <Link id='BookingButton' className={`nav-link ${styles.navLink}`} to="/admin/bookings">
                  <ListAltIcon />
                  <span className={styles.navLinkText}>Bookings</span>
                </Link>
              </li>
            </ul>
          </div>
          <div className={`navbar-nav ml-auto ${styles.logout}`}>
            <span className={styles.logoutText}>Logout</span>
            <IconButton color="inherit" onClick={handleOnClickLogout}>
              <LogoutIcon fontSize="large" />
            </IconButton>
          </div>
        </div>
      </nav>
    </ThemeProvider>
  );
};

export default AdminNavbar;
