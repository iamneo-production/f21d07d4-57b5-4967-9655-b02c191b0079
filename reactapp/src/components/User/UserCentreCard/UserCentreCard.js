import React from 'react';
import styles from './UserCentreCard.module.css';
import AddIcon from '@material-ui/icons/Add';
import LocationOnSharpIcon from '@mui/icons-material/LocationOnSharp';
import AccessTimeFilledSharpIcon from '@mui/icons-material/AccessTimeFilledSharp';
import PhoneAndroidSharpIcon from '@mui/icons-material/PhoneAndroidSharp';
import EmailSharpIcon from '@mui/icons-material/EmailSharp';
import {Link, Navigate, useNavigate} from 'react-router-dom';

//The component takes props as input, which contains information about the service center to be displayed, 
// such as name, address, mobile number, email, description, and availability of booking and slot selection options.
function UserCentreCard(props) {  
    const navigate = useNavigate();

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

export default UserCentreCard



