import React from 'react';
import { Formik, Form } from 'formik';
import { TextField } from './TextField';
import { Link } from 'react-router-dom';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup';
import axios from 'axios';
import * as myaxios from "../../api/myaxios";

export const Login = () => {
  const validate = Yup.object({
    email: Yup.string()
      .email('Email is invalid')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  async function handleOnSubmit(val) {
    try {
      const res = await myaxios.login(val);
      localStorage.setItem('user',JSON.stringify(res.data.users));
      localStorage.setItem('jwtToken',JSON.stringify(res.data.token));
      if (res.data.users === "") {
        toast.error('INVALID CREDENTIAL');
      } else {
        if (res.data.users.userType === "USER") {
          toast.success('WELCOME USER',{position: "top-center",autoClose: 2000});
          setTimeout(() => { window.location.replace('/user/home'); }, 2000);
        }
        if (res.data.users.userType === "ADMIN") {
          toast.success('WELCOME ADMIN',{position: "top-center",autoClose: 2000});
          setTimeout(() => { window.location.replace('/admin/home'); }, 2000);
          
        }
      }

    } catch (error) {
      toast.error('LOGIN FAILED');
    }

  }
  
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={validate}
      onSubmit={(values, { resetForm }) => {
        handleOnSubmit(values);
        resetForm({ values: '' });
      }}
    >
      {formik => (
        <div>
          <h1 >Login</h1>
          <Form>
            <div>
              <TextField id="email" label='Enter Email' name="email" type="email" />
              <br></br>
            </div>
            <TextField id="password" label="Enter password" name="password" type="password" />
            <br></br>
            <button className="btn btn-dark mt-3" type="submit">Login</button>
            <ToastContainer/>
          </Form>
          <br />
          <p>New User/Admin? <Link to="/signup">Signup</Link></p>
        </div>
      )}
    </Formik>
  )
}