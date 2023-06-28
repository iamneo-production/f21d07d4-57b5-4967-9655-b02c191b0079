import React, { useEffect,useState } from "react";
import './UserBooking.module.css'
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Link, useNavigate } from "react-router-dom";
import { deleteBooking,fetchCenterById } from "../../../api/myaxios";
import { toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const Mybooking = (props) => {

  const navigate = useNavigate();
  const [centerData, setCenterData] = useState({});
  const today = new Date().toISOString().slice(0,10);

  const id = props.data.appointmentId;
  const deleteURL = `deleteAppointment/${id}`;

  function getcenterData(){
    fetchCenterById(`getServiceCenter/${props.data.serviceCenterId}`)
    .then(res=>res.data)
    .then(data=>setCenterData(data));
  }

  useEffect(()=>{
    getcenterData();
  },[])

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
  const handleClickPay = (props) =>{
    localStorage.setItem('appointMentId',JSON.stringify(props));
    window.location.replace('/user/payment');
  }
  const handleOnClickEdit = ()=>{
    localStorage.setItem("bookCenterDetails",JSON.stringify(centerData)); 
    localStorage.setItem("AppointmentDetails",JSON.stringify(props.data));
    localStorage.setItem("isNewAppointment",false);
    navigate("/user/dashboard");
}
    return (
      
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