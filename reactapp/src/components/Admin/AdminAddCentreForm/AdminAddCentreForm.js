import React from 'react'
import { Formik, Form } from 'formik';
import { TextField } from './TextField';
import * as Yup from 'yup';
import axios from 'axios';
import styles from './AdminAddCentreForm.module.css';
import { useNavigate } from 'react-router-dom';
import * as myaxios from '../../../api/myaxios';
function AdminAddCentreForm() {

    const navigate = useNavigate();
    
    const validate = Yup.object({
        name: Yup.string()
          .max(25,'Should be less than 15 characters')
          .required('Name is required'),
          mobileNumber: Yup.string().matches("^[0-9]{10}$", 'Phone number is not valid')
          .required('Required'),
          address:Yup.string().max(50,'Should be less than 50 characters').required('Required'),
          city:Yup.string().required("City is a required field").max(25,"Should be less than 25 charachters"),
          pincode:Yup.string().max(6,"Invalid Pincode").min(6,"Ivalid Pincode").required("Pincode is a required field"),
          imgUrl: Yup.string().url('Invalid URL'),
          email:Yup.string().email('Invalid email').required('Required'),
          description:Yup.string().max(100,'Should not exceed 100 characters')

      });
    
      async function handleOnSubmit(val){
        try{
          const res = await myaxios.addCenter(val);
          alert("Centre Added Successfully");
          navigate('/admin/home');
        }catch(error){
          console.log(error);
          alert('Add Centre Failed');
        }
      }
    
      return (
        <Formik
          initialValues={{
            name: '',
            mobileNumber: '',
            address:'',
            city:'',
            pincode:'',
            imgUrl:'',
            email:'',
            description:''
          }}
          validationSchema={validate}
          onSubmit={(values,{resetForm}) => {
            handleOnSubmit(values);
            resetForm({values:''});
          }}
        >
          {formik => (
            <div className={styles.container}>
              <h1 >Add Centre</h1>
              <Form>
                <TextField id="addName" label='Name' name="name" type="text" />
                <TextField id="addNumber" label="Enter the phone number" name="mobileNumber" type="text" />
                <TextField id="addAddress" label="Enter the address" name="address" type="text" />
                <TextField id="addCity" label="City" name="city" type="text" />
                <TextField id="addPincode" label="Pincode" name="pincode" type="text" />
                <TextField id="addImageUrl" label="Enter the image url" name="imgUrl" type="text" />
                <TextField id="addEmail" label="Enter the email id" name="email" type="email" />
                <TextField id="addCentreDescription" label="Give Description" name="description" type="textarea" />
                <br></br>
                <button className="btn btn-dark mt-3" type="submit">Add Centre</button>
              </Form>
              <br />
            </div>
          )}
        </Formik>
      )
}

export default AdminAddCentreForm