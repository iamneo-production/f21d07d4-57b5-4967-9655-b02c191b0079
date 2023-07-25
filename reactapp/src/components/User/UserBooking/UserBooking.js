import React, { useEffect,useState } from "react";
import './UserBooking.module.css'
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Link, useNavigate } from "react-router-dom";
import { deleteBooking,fetchCenterById } from "../../../api/myaxios";
import { toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

//displays the details of a specific booking, such as the appointment ID, center name, product name, booking date, and booking time.
 // It also provides options to edit or delete the booking, and a button to make a payment 
 // if the booking date is in the future and the payment is not done yet.
const Mybooking = (props) => {

  const navigate = useNavigate();
  const [centerData, setCenterData] = useState({});
  const today = new Date().toISOString().slice(0,10);

  const id = props.data.appointmentId;
  const deleteURL = `deleteAppointment/${id}`;

  // getcenterData function is called using the useEffect hook to fetch the details of the service center associated with the booking and update the state accordingly.
  function getcenterData(){
    fetchCenterById(`${props.data.serviceCenterId}`)
    .then(res=>res.data)
    .then(data=>setCenterData(data));
  }

  useEffect(()=>{
    getcenterData();
  },[])

  // handleOnClickDelete function is called when the user clicks on the delete button for a booking. 
  //It shows a confirmation dialog, and if the user confirms the deletion,   // it sends a request to the server to delete the booking.
  // It also handles different response scenarios and shows appropriate toast messages for success or failure.
  const handleOnClickDelete = async()=>{
    try{
      if(window.confirm('Are you sure you want to delete?')){
          const res = await deleteBooking(deleteURL);
          console.log(res.data);
          if(res.data==='No data found'){
            toast.warn('No data found');
          }
          if(res.data==="You can't Delete"){
            toast.warn("You can't delete appointment now!");
            
          }
          if(res.data==='Deleted Successfully'){
            toast.success("Booking Deleted");
            props.onDelete();
          }
          
      }
  }catch(error){
      alert("Could Not Delete Try Again");
  }
  }

  //handleClickPay function is called when the user clicks on the pay button for a booking. 
  // It sets the appointment ID in local storage and redirects the user to the payment page.
  const handleClickPay = (props) =>{
    localStorage.setItem('appointMentId',JSON.stringify(props));
    window.location.replace('/user/payment');
  }

  //handleOnClickEdit function is called when the user clicks on the edit button for a booking. It sets the details of the service center and the booking 
  // in local storage and sets the isNewAppointment flag to false. It then navigates the user to the dashboard page for editing the booking.
  const handleOnClickEdit = ()=>{
    localStorage.setItem("bookCenterDetails",JSON.stringify(centerData)); 
    localStorage.setItem("AppointmentDetails",JSON.stringify(props.data));
    localStorage.setItem("isNewAppointment",false);
    navigate("/user/dashboard");
}
    return (
      // renders the table row with all the booking details and buttons for editing, deleting, and paying for the booking based on the booking date and payment status.
      <>
        <tr>
          <td>{props.data.appointmentId}</td>
          <td>{props.data.centerName}</td>
          <td>{props.data.productName}</td>
          <td>{props.data.bookingDate}</td><br></br>
          <td>{props.data.bookingTime}</td> 
          <td>
            {
              props.data.bookingDate <= today ?"Can't edit":
          <a  onClick={()=>handleOnClickEdit()}>
            <EditIcon/>
          </a>
          }
          </td>
          <td>
            <Link to="" onClick={()=>handleOnClickDelete()} className="btn_black">
              <DeleteIcon/>
            </Link>
          </td>
          {
            props.data.bookingDate>today?
            <td>
            <button
            className="btn btn-secondary"
            disabled={true}
             >
              Pay
            </button>
            </td>
            :props.data.bookingDate<=today && props.data.paymentDone==="no"
            ?
            <td>
            <button
            className="btn btn-primary"
            disabled={false} 
            onClick={()=>handleClickPay(props.data.appointmentId)}>
              Pay
            </button>
            </td>
            : props.data.bookingDate<=today && props.data.paymentDone==="yes"
            ?
            <td>
            <button
            className="btn btn-success"
            disabled={true} >
              Paid
            </button>
            </td>
            :
            <td>

            </td>
          }
          
        </tr>
      </>
                      
  );
};
  
export default Mybooking;