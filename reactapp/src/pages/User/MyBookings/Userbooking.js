import React from 'react'
import UserBooking from '../../../components/User/UserBooking/UserBooking'
import classes from './Userbooking.module.css';
import { useEffect,useState} from "react";
import ReactModal from "react-modal";
import UserEditCenter from "../../../components/User/UserEditCenter/UserEditCenter";
import {fetchUserBookings} from '../../../api/myaxios';

function Userbooking(props) {
  const [appointmentList,setAppointmentList]= useState([]);

  const [showModal,setShowModal] = useState(false);

  const [modalData,setModalData] = useState({});

  const user = JSON.parse(localStorage.getItem("user"));

  const fetchAppointments = async()=>{
    const res = await fetchUserBookings(user.userId);
    setAppointmentList(res.data.reverse());
  }

  useEffect(()=>{
    fetchAppointments();
  },[])
  return (
    <>
        <div className={classes.table}>
          <h2>Your Bookings</h2>
          <table className="table table-hover">
            <thead>
        <tr>
          <th>Booking id</th>
          <th>Center</th>
          <th>Product</th>
          <th>Date</th><br></br>
          <th>Timing</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
        </thead>
        <tbody>
           {
             appointmentList.length>0 ? 
             appointmentList.map((item,index)=>{
               return <UserBooking data={item} key={index} onDelete={fetchAppointments} showModal={setShowModal} setModalData={setModalData}/>; 
             })
             : <div className={classes.noBooking}>No bookings</div>
           }
           </tbody>
           </table>
        </div>
    </>
            
  )
}

export default Userbooking