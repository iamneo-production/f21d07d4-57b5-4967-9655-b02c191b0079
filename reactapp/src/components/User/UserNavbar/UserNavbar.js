import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IconButton, ThemeProvider, createTheme } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import EventNoteIcon from '@mui/icons-material/EventNote';
import LogoutIcon from '@mui/icons-material/Logout';
import styles from './UserNavbar.module.css';
//This line imports the Link component and useNavigate hook from the 'react-router-dom' library.
//This line imports styles from an external CSS module file named 'UserNavbar.module.css'.
//This declares a functional component named Navbar

const Navbar = () => {
  const navigate = useNavigate();
//handleOnClickLogout function is called when the user clicks the Logout button.
//  It removes the user data from local storage and displays a success toast message. After that, it navigates the user to the homepage ("/").
 //This function handleOnClickLogout is called when the user clicks the Logout button.
  const handleOnClickLogout = () => {
    localStorage.removeItem('user');
    setTimeout(() => {
      toast.success('Logged out successfully');
    }, 1000);
    navigate('/');
  };
//This block of code defines a custom Material-UI theme using createTheme.
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
              // When the Logout button is clicked, the handleOnClickLogout function is called
              //which performs the logout process, shows a success toast
              //and navigates to the homepage.
              <LogoutIcon fontSize="large" />
            </IconButton>
          </div>
        </div>
      </nav>
    </ThemeProvider>
  );
};

//This returns the JSX (UI elements) of the Navbar wrapped inside a ThemeProvider component with the custom theme applied to it. 
  //The ThemeProvider ensures that the custom theme is available to all the child components within it.

export default Navbar;

//The ThemeProvider ensures that the custom theme is available to all the child components within it.


            /*  <div className={`navbar-nav ml-auto ${styles.logout}`}>
            <span className={styles.logoutText}>Logout</span>
            <IconButton id='logout' color="inherit" onClick={handleOnClickLogout}>
              // When the Logout button is clicked, the handleOnClickLogout function is called
              //which performs the logout process, shows a success toast
              //and navigates to the homepage.
              <LogoutIcon fontSize="large" />
            </IconButton>
          </div>
                </IconButton>
          </div>
        </div>
      </nav>
    </ThemeProvider>
  );
};<div className={`navbar-nav ml-auto ${styles.logout}`}>
            <span className={styles.logoutText}>Logout</span>
            <IconButton id='logout' color="inherit" onClick={handleOnClickLogout}>
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
        },*/
//This returns the JSX (UI elements) of the Navbar wrapped inside a ThemeProvider component with the custom theme applied to it. 
  //The ThemeProvider ensures that the custom theme is available to all the child components within it.
//The ThemeProvider ensures that the custom theme is available to all the child components within it.
//handleOnClickLogout function is called when the user clicks the Logout button.
//  It removes the user data from local storage and displays a success toast message. After that, it navigates the user to the homepage ("/").
 //This function handleOnClickLogout is called when the user clicks the Logout button.







  


