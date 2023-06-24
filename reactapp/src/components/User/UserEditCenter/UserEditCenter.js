import React from "react";
import { Formik, Form } from 'formik';
import { TextField } from "./TextField";
import * as Yup from 'yup';
import { updateBooking } from "../../../api/myaxios";
import styles from './UserEditCenter.module.css';
import { useNavigate } from "react-router-dom";

function EditCenter(props) {
    const id = props.data.appointmentId;
    
    const editURL = `editAppointment/${id}`;

    const navigate = useNavigate();

    const validate = Yup.object({
        productName: Yup.string().max(25, 'cannot exceed limit 25')
            .required('Required')
            .min(3,'Minimum 3 characters' ),
        productModelNo:Yup.string().max(15,'Maximum 15 character')
             .required('Required')
             .min(2,'Minimum 2  characters'),
        purchaseDate:Yup.date().max(new Date(),"select correct date").required('Required'),
        problemStatement: Yup.string().max(100, 'Must be 100 characters or less').required('Required'),
        bookingDate:Yup.string().required("Required"),
        bookingTime:Yup.string().required("Required")
    });
    const handleOnSubmit = async (value) => {
        
        try {
            const res = await updateBooking(value,editURL);
            alert('Updated Sucessfully');
            props.onClose(false);
            props.onEdit();
            navigate("/user/mybooking");
        } catch (err) {
            alert("Error while updating")
        }
    }

    
    return (
        
        <Formik
            enableReinitialize
            initialValues={{
                productName: props.data.productName,
                productModelNo: props.data.productModelNo,
                purchaseDate: props.data.purchaseDate,
                problemStatement: props.data.problemStatement,
                bookingDate: props.data.bookingDate,
                bookingTime: props.data.bookingTime
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
                
                    <h1 className="my-4 font-weight-bold-display-4">Edit the details</h1>
                    <Form>
                    
                        <TextField id="editProductName" placeholder='Enter the name of the product' name="productName" type="text" label="Product Name"/>
                        <TextField id="editModelNo" placeholder="Enter the model no of the product" name="productModelNo" type="text" label="Product Model No"/>
                        <TextField id="editDateOfPurchase" placeholder="Enter the date of purchase" name="purchaseDate" type="date" label="Purchase Date"/>
                        <TextField id="editProblem" placeholder="Enter the problem of the product" name="problemStatement" type="textarea" label="problem Statement"/>
                        <TextField id="editDateOfPurchase" placeholder="Enter the date of booking" name="bookingDate" type="date" label="booking Date" readonly="true"/>
                        <TextField  placeholder="Enter booking time" name="bookingTime" type="time" label="booking Time" readonly="true"/>
                        <br></br>
                        <button className="btn btn-secondary mt-3" type="submit">update</button>
                        
                    </Form>
                    <br/>
                </div>
                
            )}
        </Formik>
        
    )
}
export default EditCenter