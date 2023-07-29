import React from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import { TextField } from './TextField';
import * as Yup from 'yup';
import axios from 'axios';
import styles from './AdminAddCentreForm.module.css';
import { useNavigate } from 'react-router-dom';
import * as myaxios from '../../../api/myaxios';

function AdminAddCentreForm() {

  const navigate = useNavigate();

  //Yup library to define the form validation rules for each input field in the form.
  // These rules specify the required fields, max length, valid email format, valid phone number format, etc.

  const validate = Yup.object({
    name: Yup.string().max(25, 'Should be less than 15 characters').required('Name is required'),
    mobileNumber: Yup.string()
      .matches("^[0-9]{10}$", 'Phone number is not valid')
      .required('Required'),
    address: Yup.string().max(50, 'Should be less than 50 characters').required('Required'),
    city: Yup.string().required('City is a required field').max(25, 'Should be less than 25 characters'),
    pincode: Yup.string().max(6, 'Invalid Pincode').min(6, 'Invalid Pincode').required('Pincode is a required field'),
    imgUrl: Yup.string().url('Invalid URL'),
    email: Yup.string().email('Invalid email').required('Required'),
    description: Yup.string().max(100, 'Should not exceed 100 characters'),
  });

  //make an HTTP POST request to the server, presumably to add a new service center with the form data (val).
  async function handleOnSubmit(val) {
    try {
      const res = await myaxios.addCenter(val);
      alert('Centre Added Successfully');
      navigate('/admin/home');
    } catch (error) {
      console.log(error);
      alert('Add Centre Failed');
    }
  }
// component wraps the form and handles form state, validation, and form submission logic.
  return (
    <Formik
      initialValues={{
        name: '',
        mobileNumber: '',
        address: '',
        city: '',
        pincode: '',
        imgUrl: '',
        email: '',
        description: '',
      }}

      //The validationSchema prop is set to validate, which enforces the defined validation rules on the form inputs.
      validationSchema={validate}
      onSubmit={(values, { resetForm }) => {
        handleOnSubmit(values);
        resetForm({ values: '' });
      }}
    >
      {formik => (
        <div className={styles.container}>
          <h1 className={styles.title}>Add Centre</h1>
          <Form className={styles.form}>
            <TextField id="addName" label="Name" name="name" type="text" />
            <TextField id="addNumber" label="Phone Number" name="mobileNumber" type="text" />
            <TextField id="addAddress" label="Address" name="address" type="text" />
            <TextField id="addCity" label="City" name="city" type="text" />
            <TextField id="addPincode" label="Pincode" name="pincode" type="text" />
            <TextField id="addImageUrl" label="Image URL" name="imgUrl" type="text" />
            <TextField id="addEmail" label="Email" name="email" type="email" />
            <TextField id="addCentreDescription" label="Description" name="description" type="textarea" />
            <ErrorMessage name="description" component="div" className={styles.error} />
            <button className={styles.button} id="addButton" type="submit">
              Add Centre
            </button>
          </Form>
        </div>
      )}
    </Formik>
  );
}

export default AdminAddCentreForm;

/*import React from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import { TextField } from './TextField';
import * as Yup from 'yup';
import axios from 'axios';
import styles from './AdminAddCentreForm.module.css';
import { useNavigate } from 'react-router-dom';
import * as myaxios from '../../../api/myaxios';

function AdminAddCentreForm() {

  const navigate = useNavigate();

  //Yup library to define the form validation rules for each input field in the form.
  // These rules specify the required fields, max length, valid email format, valid phone number format, etc.

  const validate = Yup.object({
    name: Yup.string().max(25, 'Should be less than 15 characters').required('Name is required'),
    mobileNumber: Yup.string()
      .matches("^[0-9]{10}$", 'Phone number is not valid')
      .required('Required'),
    address: Yup.string().max(50, 'Should be less than 50 characters').required('Required'),
    city: Yup.string().required('City is a required field').max(25, 'Should be less than 25 characters'),
    pincode: Yup.string().max(6, 'Invalid Pincode').min(6, 'Invalid Pincode').required('Pincode is a required field'),
    imgUrl: Yup.string().url('Invalid URL'),
    email: Yup.string().email('Invalid email').required('Required'),
    description: Yup.string().max(100, 'Should not exceed 100 characters'),
  });

  //make an HTTP POST request to the server, presumably to add a new service center with the form data (val).
  async function handleOnSubmit(val) {
    try {
      const res = await myaxios.addCenter(val);
      alert('Centre Added Successfully');
      navigate('/admin/home');
    } catch (error) {
      console.log(error);
      alert('Add Centre Failed');
    }
  }
// component wraps the form and handles form state, validation, and form submission logic.
  return (
    <Formik
      initialValues={{
        name: '',
        mobileNumber: '',
        address: '',
        city: '',
        pincode: '',
        imgUrl: '',
        email: '',
        description: '',
      }}

      //The validationSchema prop is set to validate, which enforces the defined validation rules on the form inputs.
      validationSchema={validate}
      onSubmit={(values, { resetForm }) => {
        handleOnSubmit(values);
        resetForm({ values: '' });
      }}
    >
      {formik => (
        <div className={styles.container}>
          <h1 className={styles.title}>Add Centre</h1>
          <Form className={styles.form}>
            <TextField id="addName" label="Name" name="name" type="text" />
            <TextField id="addNumber" label="Phone Number" name="mobileNumber" type="text" />
            <TextField id="addAddress" label="Address" name="address" type="text" />
            <TextField id="addCity" label="City" name="city" type="text" />
            <TextField id="addPincode" label="Pincode" name="pincode" type="text" />
            <TextField id="addImageUrl" label="Image URL" name="imgUrl" type="text" />
            <TextField id="addEmail" label="Email" name="email" type="email" />
            <TextField id="addCentreDescription" label="Description" name="description" type="textarea" />
            <ErrorMessage name="description" component="div" className={styles.error} />
            <button className={styles.button} id="addButton" type="submit">
              Add Centre
            </button>
          </Form>
        </div>
      )}
    </Formik>
  );
}

export default AdminAddCentreForm; */


