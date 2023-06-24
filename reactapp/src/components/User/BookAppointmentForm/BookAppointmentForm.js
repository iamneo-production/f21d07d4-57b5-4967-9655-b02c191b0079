import React from "react";
import { Formik, Form } from 'formik';
import { TextField } from "./TextField";
import * as Yup from 'yup';
import {useNavigate} from 'react-router-dom';
import { bookAppointment,updateBooking } from "../../../api/myaxios";
import styles from "./BookAppointmentForm.module.css";
import { toast } from "react-toastify";
function BookAppointmentForm(props) {


    const navigate=useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));
    const userInfo = user;

    const appointmentDetails = JSON.parse(localStorage.getItem("AppointmentDetails"));
    const isNewAppointment=JSON.parse(localStorage.getItem("isNewAppointment"));

    async function handleOnSubmit(val){
      val["userId"]=userInfo.userId;
      val["serviceCenterId"] = props.center.serviceCenterId;
      val["userName"]=userInfo.name;
      val["centerName"]=props.center.name;
      if(isNewAppointment == true){
        try{
          const res = await bookAppointment(val);
          toast.success("Booked successfuly");
          localStorage.removeItem("bookCenterDetails");
          navigate('/user/Mybooking');
        }catch(error){
          alert('Booking Failed');
        }
      }
      else{
        const editUrl = `editAppointment/${appointmentDetails.appointmentId}`
        try{
          updateBooking(val,editUrl);
          localStorage.removeItem("AppointmentDetails");
          localStorage.setItem("isNewAppointment",true);
          localStorage.removeItem("bookCenterDetails");
          toast.success("Appoinment Edited Successfuly");
          navigate('/user/Mybooking');
        }
        catch(error){
        }
      }
      }

    // Yup validate object for form validation
    const validate = Yup.object({
      productName: Yup.string().max(25, 'cannot exceed limit 25')
          .required('Required')
          .min(3,'Minimum 3 characters' ),
      productModelNo:Yup.string().max(15,'Maximum 15 character')
            .required('Required')
            .min(2,'Minimum 2 characters'),
      purchaseDate:Yup.date().max(new Date(),"select correct date").required('Required'),
      problemStatement: Yup.string().max(100, 'Must be 100 characters or less').required('Required'),
      bookingDate:Yup.string(),
      bookingTime:Yup.string()
    });

    return (
        <Formik
            enableReinitialize
            initialValues={{
                productName: appointmentDetails?appointmentDetails.productName:"",
                productModelNo: appointmentDetails?appointmentDetails.productModelNo:"",
                purchaseDate: appointmentDetails?appointmentDetails.purchaseDate:"",
                problemStatement: appointmentDetails?appointmentDetails.problemStatement:"",
                bookingDate:props.date,
                bookingTime:props.time
            }}
            validationSchema={validate}
          onSubmit={(values,{resetForm}) => {
            handleOnSubmit(values);
            resetForm({values:''});
          }}
            
            
        >
            {formik => (
                
                <div className={styles.container} >
                
                    <h3 className="my-3 font-weight-bold-display-3">Enter the details</h3>
                    <Form>
                    
                        <TextField id="enterProductName" placeholder='Enter the name of the product' name="productName" type="text" label="Product Name"/>
                        <TextField id="enterModelNo" placeholder="Enter the model no of the product" name="productModelNo" type="text" label="Model No."/>
                        <TextField id="enterDateOfPurchase" placeholder="Enter the date of purchase" name="purchaseDate" type="date" label="Purchase Date"/>
                        <TextField id="enterProblem" placeholder="Enter the problem of the product" name="problemStatement" type="textarea" label="Problem"/>
                        <TextField placeholder="click on select slot to choose date" type="text" name="bookingDate" label="Booking Date" readonly="true"/>
                        <TextField placeholder= "click on select slot to choose time" type="text"
                        name="bookingTime" label="Booking Time" readonly="true"/>
                        <br></br>
                        {isNewAppointment ?
                        <button className="btn btn-dark mt-3" id="bookButton" type="submit">Book </button> :
                        <button className="btn btn-dark mt-3" id="bookButton" type="submit">Update </button>
                           } 
                                </Form>
                             </div>
            )}
        </Formik>
    )
}
export default BookAppointmentForm