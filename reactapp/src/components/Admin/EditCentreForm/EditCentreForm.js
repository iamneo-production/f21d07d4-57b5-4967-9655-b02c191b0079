import React from "react";
import { Formik, Form } from 'formik';
import { TextField } from "./TextField";
import * as Yup from 'yup';
import styles from './EditCentreForm.module.css';
import {editCenter} from '../../../api/myaxios';
function EditCentreForm(props) {
    const id = props.data.serviceCenterId;

    //The editCenter function is imported from the '../../../api/myaxios' module, 
    //which is likely used for making an HTTP request to edit/update a service center.
    const editURL = `editServiceCenter/${id}`;
    
    //A validate object is created using the Yup library to define the form validation rules for each input field in the form. 
    const validate = Yup.object({
        name: Yup.string().max(25, 'Must be 15 characters or less')
            .required('Required'),
        mobileNumber: Yup.string().required('Required').matches("^[0-9]{10}$", 'Phone number is not valid'),
        address: Yup.string().max(100, 'Must be 100 characters or less').required('Required'),
        imageURL: Yup.string().url('Invalid URL'),
        email: Yup.string()
            .email('Email is invalid')
            .required('Required'),
        description: Yup.string().max(200, 'Must be 200 characters or less').required('Required')
    });

    //It calls the editCenter function with the form values and the editURL 
    //(constructed using the service center's ID) to make an HTTP PUT request to update the service center details.
    const handleOnSubmit = async (value) => {
        try {
            const res = await editCenter(value,editURL);

            //If the update is successful, it stores the updated service center data in the local storage 
            localStorage.setItem('data',JSON.stringify(res.data));
            props.getCardtoEdit();
            alert('Updated Sucessfully');
            window.location.replace("/admin/home");
        } catch (err) {
            alert("Error while updating")
        }
    }

    return (
        <Formik
        //The enableReinitialize prop is set to true to allow the form to be reinitialized with the initial values whenever they change.
            enableReinitialize
            initialValues={{
                name: props.data.name,
                mobileNumber: props.data.mobileNumber,
                address: props.data.address,
                imgUrl: props.data.imgUrl,
                email: props.data.email,
                description: props.data.description
            }}
            validationSchema={validate}
            onSubmit={
                (values) => {
                    handleOnSubmit(values);
                }
            }
        >
            {formik => (
                <div className={styles.container}>
                    <h1 className="my-4 font-weight-bold-display-4">Edit Center</h1>
                    <Form>
                        <TextField id="editName" placeholder='Name' name="name" type="text" />
                        <TextField id="editNumber" placeholder="Enter the phone number" name="mobileNumber" type="text" />
                        <TextField id="editAddress" placeholder="Enter the address" name="address" type="text" />
                        <TextField id="editImageUrl" placeholder="Enter the image url" name="imgUrl" type="text" />
                        <TextField id="editEmail" placeholder="Enter the email id" name="email" type="email" />
                        <TextField id="editCentreDescription" placeholder="Give Description" name="description" type="textarea" />
                        <br></br>
                        <button id='updateButton'className="btn btn-dark mt-3" type="submit">update</button>
                    </Form>
                    <br />
                </div>
            )}
        </Formik>
    )
}
export default EditCentreForm;







/*import React from "react";
import { Formik, Form } from 'formik';
import { TextField } from "./TextField";
import * as Yup from 'yup';
import styles from './EditCentreForm.module.css';
import {editCenter} from '../../../api/myaxios';
function EditCentreForm(props) {
    const id = props.data.serviceCenterId;

    //The editCenter function is imported from the '../../../api/myaxios' module, 
    //which is likely used for making an HTTP request to edit/update a service center.
    const editURL = `editServiceCenter/${id}`;
    
    //A validate object is created using the Yup library to define the form validation rules for each input field in the form. 
    const validate = Yup.object({
        name: Yup.string().max(25, 'Must be 15 characters or less')
            .required('Required'),
        mobileNumber: Yup.string().required('Required').matches("^[0-9]{10}$", 'Phone number is not valid'),
        address: Yup.string().max(100, 'Must be 100 characters or less').required('Required'),
        imageURL: Yup.string().url('Invalid URL'),
        email: Yup.string()
            .email('Email is invalid')
            .required('Required'),
        description: Yup.string().max(200, 'Must be 200 characters or less').required('Required')
    });

    //It calls the editCenter function with the form values and the editURL 
    //(constructed using the service center's ID) to make an HTTP PUT request to update the service center details.
    const handleOnSubmit = async (value) => {
        try {
            const res = await editCenter(value,editURL);

            //If the update is successful, it stores the updated service center data in the local storage 
            localStorage.setItem('data',JSON.stringify(res.data));
            props.getCardtoEdit();
            alert('Updated Sucessfully');
            window.location.replace("/admin/home");
        } catch (err) {
            alert("Error while updating")
        }
    }

    return (
        <Formik
        //The enableReinitialize prop is set to true to allow the form to be reinitialized with the initial values whenever they change.
            enableReinitialize
            initialValues={{
                name: props.data.name,
                mobileNumber: props.data.mobileNumber,
                address: props.data.address,
                imgUrl: props.data.imgUrl,
                email: props.data.email,
                description: props.data.description
            }}
            validationSchema={validate}
            onSubmit={
                (values) => {
                    handleOnSubmit(values);
                }
            }
        >
            {formik => (
                <div className={styles.container}>
                    <h1 className="my-4 font-weight-bold-display-4">Edit Center</h1>
                    <Form>
                        <TextField id="editName" placeholder='Name' name="name" type="text" />
                        <TextField id="editNumber" placeholder="Enter the phone number" name="mobileNumber" type="text" />
                        <TextField id="editAddress" placeholder="Enter the address" name="address" type="text" />
                        <TextField id="editImageUrl" placeholder="Enter the image url" name="imgUrl" type="text" />
                        <TextField id="editEmail" placeholder="Enter the email id" name="email" type="email" />
                        <TextField id="editCentreDescription" placeholder="Give Description" name="description" type="textarea" />
                        <br></br>
                        <button id='updateButton'className="btn btn-dark mt-3" type="submit">update</button>
                    </Form>
                    <br />
                </div>
            )}
        </Formik>
    )
}
export default EditCentreForm;*/
