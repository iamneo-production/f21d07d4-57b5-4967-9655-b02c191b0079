import React from 'react';
import styles from './UserCentreCard.module.css';
import AddIcon from '@material-ui/icons/Add';
import LocationOnSharpIcon from '@mui/icons-material/LocationOnSharp';
import AccessTimeFilledSharpIcon from '@mui/icons-material/AccessTimeFilledSharp';
import PhoneAndroidSharpIcon from '@mui/icons-material/PhoneAndroidSharp';
import EmailSharpIcon from '@mui/icons-material/EmailSharp';
import {Link, Navigate, useNavigate} from 'react-router-dom';
//begins by importing necessary dependencies from React, Material-UI, and React Router DOM.

//The component takes props as input, which contains information about the service center to be displayed, 
// such as name, address, mobile number, email, description, and availability of booking and slot selection options.
function UserCentreCard(props) {  
    const navigate = useNavigate();
    //This declares the UserCentreCard component, which is a functional component that takes props as input

    // handleOnClickAdd function is called when the user clicks on the "Book" button. It sets the service center details in local 
    //storage and sets the isNewAppointment flag to true. This flag indicates that the booking is a new appointment, not an edit of an existing one.
    const handleOnClickAdd=()=>{
        localStorage.setItem("bookCenterDetails",JSON.stringify(props.data));
        localStorage.setItem("isNewAppointment","true");
        
    }

    // handleOnClickReviews function is called when the user clicks on the "Reviews" button. 
    // It navigates the user to the reviews page for the specific service center.
    const handleOnClickReviews = ()=>{
        navigate(`/user/center/reviews/${props.data.serviceCenterId}`);
    }

    //conditionally renders buttons based on the props received:
    // If enableOptions is true, it shows the "Book" button.
    // If enableSlotButton is true, it shows the "Select Slot" button.
    // If enableOptions is true, it shows the "Reviews" button
  return (
    <div className={`card ${styles.card}`} >
        <div>
            <img style={{width:'100%',height:'200px',objectFit:'fill'}}src={props.data.imgUrl} class="card-img-top" id="Grid1" alt="Vacuumservice"/>
        </div>
        <div class="card-body">
            <h5 class="card-title" data-testid="centerName">{props.data.name}</h5>
            <p class="card-text" data-testid="place"><LocationOnSharpIcon style={{fontSize:"small",color:"black",marginRight:"4px"}}/>{` ${props.data.address}, ${props.data.city}-${props.data.pincode}`}</p>
            <p class="card-text"><AccessTimeFilledSharpIcon style={{fontSize:"small",color:"black",marginRight:"4px"}}/> 10:00AM to 05:00PM</p>
            <p class="card-text"><PhoneAndroidSharpIcon style={{fontSize:"small",color:"black",marginRight:"4px"}}/>{` ${props.data.mobileNumber}`}</p>
            <p class="card-text"><EmailSharpIcon style={{fontSize:"small",color:"black",marginRight:"4px"}}/>{` ${props.data.email}`}</p>
            <p style={{fontSize:'18px',color:'darkgray'}} class="card-text">{props.data.description}</p>
            <>
            {   props.enableOptions &&
                <Link to="/user/dashboard" onClick={()=>handleOnClickAdd()}
                >
                <span className={`btn-success ${styles.bookButton}`}>Book</span>
                </Link>
            }
            </>
            <>
            {
                props.enableSlotButton &&
                <button onClick={()=>props.showModal(true)} className={`btn btn-success ${styles.bookButton}`}>Select Slot</button>
            }
            </>
            <>
            {
                props.enableOptions &&
                <button onClick={()=>handleOnClickReviews()} className={`btn btn-success ${styles.reviewButton}`}>Reviews</button>
            }
            </>
        </div>
    </div>
  )
}
//This is the JSX part of the component
//The component takes a prop called enableOptions, enableSlotButton, and props.data
//If props.enableOptions is true, the "Book" button will be rendered.
//Clicking on it will call the handleOnClickAdd function.

export default UserCentreCard



/*
const [field,meta] = useField(props);
    return(
        <div className="mb-2">
            <label htmlFor={field.name}>{label}</label>
            <input className={`form-control shadow-none ${meta.touched && meta.error && 'is-invalid'}`} 
            {...field} {...props}
            autoComplete="off"/>
            <ErrorMessage component="div" name={field.name} className="error"/>
        </div>
    )
    const navigate = useNavigate();
  const [centerData, setCenterData] = useState({});
  const today = new Date().toISOString().slice(0,10);

  const id = props.data.appointmentId;
  const deleteURL = `deleteAppointment/${id}`;
  try{
      if(window.confirm('Are you sure you want to delete?')){
          const res = await deleteBooking(deleteURL);
          console.log(res.data);
          if(res.data==='No data found'){
            toast.warn('No data found');
            toast.success("Booking Deleted");
          }
          }
          if(res.data==="You can't Delete"){
            toast.warn("You can't delete appointment now!");
            
          }
          if(res.data==='Deleted Successfully'){
            toast.success("Booking Deleted");
            props.onDelete();
            catch(error){
      alert("Could Not Delete Try Again");
      props.onDelete();
      props.enableOptions &&
                <Link to="/user/dashboard" onClick={()=>handleOnClickAdd()}
                >
                <span className={`btn-success ${styles.bookButton}`}>Book</span>
                </Link>
                props.enableSlotButton &&
                <button onClick={()=>props.showModal(true)}
                 props.enableOptions &&
                <button onClick={()=>handleOnClickReviews()}
      
      
          }
          
      }
*/

  


