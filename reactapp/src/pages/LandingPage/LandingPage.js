import React ,{useEffect} from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import classes from './LandingPage.module.css';

const LandingPage = () => {
  useEffect(()=>{
    localStorage.clear();
  },[])
  return (
    <div className={classes.container}>
      <div className={classes.image}></div>
        <div className={classes.element} >
          <h1>Welcome to </h1>
          <h1>Vaccum Cleaner Service App</h1>
          <br></br>
          <h4>Now book your vaccum cleaner service at your finger tips.</h4>
          <br></br>
          <h5>Get Started !</h5>
          <Link className="btn btn-primary btn-lg" style={{marginRight:"16px"}}to="/signup">Signup</Link>
          <br></br>
          <br></br>
          <h3>Already have an account?</h3>
          <Link className="btn btn-success btn-lg" to="/login">Login</Link>
          </div>
          <ToastContainer/>
        </div>   
  );
};

export default LandingPage;
