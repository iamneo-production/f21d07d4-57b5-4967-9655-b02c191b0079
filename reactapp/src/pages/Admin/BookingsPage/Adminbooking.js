import React from 'react'
import AdminBooking from '../../../components/Admin/AdminBooking/AdminBooking'
import classes from './Adminbooking.module.css';
import { useEffect,useState} from "react";
import {fetchAllBookings} from '../../../api/myaxios';

function Adminbooking(props) {
  const [appointmentList,setAppointmentList]= useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  const fetchAppointments = async()=>{
    const res = await fetchAllBookings(user.userId);
    setAppointmentList(res.data);
  }

  useEffect(()=>{
    fetchAppointments();
  },[])
  return (
    <>
        <div className={classes.table}>
          <h2>Bookings</h2>
          <table className="table table-hover">
            <thead>
        <tr>
          <th>Booking id</th>
          <th>Center</th>
          <th>UserName</th>
          <th>Product</th>
          <th>Date</th><br></br>
          <th>Timing</th>
        </tr>
        </thead>
        <tbody>
           {
             appointmentList.length>0 ? 
             appointmentList.map((item,index)=>{
               return <AdminBooking data={item} key={index} />; 
             })
             : <div className={classes.noBooking}>No bookings</div>
           }
           </tbody>
           </table>
        </div>
    </>
            
  )
}

export default Adminbooking