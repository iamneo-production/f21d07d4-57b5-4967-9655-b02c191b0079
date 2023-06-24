import React from 'react';
import styles from './UserCentreCard.module.css';
import AddIcon from '@material-ui/icons/Add';
import LocationOnSharpIcon from '@mui/icons-material/LocationOnSharp';
import AccessTimeFilledSharpIcon from '@mui/icons-material/AccessTimeFilledSharp';
import PhoneAndroidSharpIcon from '@mui/icons-material/PhoneAndroidSharp';
import EmailSharpIcon from '@mui/icons-material/EmailSharp';
import {Link, Navigate, useNavigate} from 'react-router-dom';

function UserCentreCard(props) {  

    const navigate = useNavigate();

    const handleOnClickAdd=()=>{
        localStorage.setItem("bookCenterDetails",JSON.stringify(props.data));
        localStorage.setItem("isNewAppointment","true");
        
    }

    const handleOnClickReviews = ()=>{
        navigate(`/user/center/reviews/${props.data.serviceCenterId}`);
    }

  return (
    <div className={`card ${styles.card}`} >
        <div>
            <img style={{width:'100%',height:'200px',objectFit:'fill'}}src={props.data.imgUrl} class="card-img-top" id="Grid1" alt="Vacuumservice"/>
        </div>
        <div class="card-body">
            <h5 class="card-title">{props.data.name}</h5>
            <p class="card-text"><LocationOnSharpIcon style={{fontSize:"small",color:"black",marginRight:"4px"}}/>{` ${props.data.address}, ${props.data.city}-${props.data.pincode}`}</p>
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



