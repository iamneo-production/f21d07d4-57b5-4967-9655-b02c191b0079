import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Button, Typography } from '@mui/material';
import vacuumImage from '../../assets/start.jpg';

const containerStyle = {
  display: 'flex',
  height: '100vh',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'row',
  color: '#252121',
  backgroundColor: '#F3F5F7',
};

const imageStyle = {
  width: '55%',
  height: '80%',
  backgroundImage: `url(${vacuumImage})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
};

const elementStyle = {
  flex: 1,
  padding: '24px',
};

const titleStyle = {
  marginBottom: '16px',
  fontWeight: 'bold',
  fontSize: '2.5rem',
};

const subtitleStyle = {
  marginBottom: '24px',
  fontSize: '1.5rem',
};

const actionButtonsStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '16px',
};

const buttonStyle = {
  minWidth: '200px',
  maxWidth: '300px',
};

const LandingPage = () => {
  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <div style={containerStyle}>
      <div style={imageStyle}></div>
      <div style={elementStyle}>
        <Typography variant="h1" style={titleStyle}>
          Welcome To<br />VACUUM CLEANER SERVICE APP
        </Typography>
        <Typography variant="h4" style={subtitleStyle}>
          Now Book Your Vacuum Cleaner Service At Your Fingertips.
        </Typography>
        <div style={actionButtonsStyle}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/signup"
            style={buttonStyle}
          >
            Sign Up
          </Button>
          <Typography variant="h5">Already have an account?</Typography>
          <Button
            variant="contained"
            color="success"
            component={Link}
            to="/login"
            style={buttonStyle}
          >
            Login
          </Button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LandingPage;