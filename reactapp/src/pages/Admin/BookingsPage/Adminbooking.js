import React from 'react'
import AdminBooking from '../../../components/Admin/AdminBooking/AdminBooking'
import classes from './Adminbooking.module.css';
import { useEffect,useState} from "react";
import {fetchAllBookings} from '../../../api/myaxios';

// Adminbooking component is a React functional component that serves as a page for the
// admin to view all the bookings made by users. It imports the AdminBooking component to render individual booking details.
function Adminbooking(props) {
  const [appointmentList,setAppointmentList]= useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  //The component defines a function fetchAppointments using the useEffect and async/await to fetch all
  // bookings from the server and update the appointmentList state.
  const fetchAppointments = async()=>{
    const res = await fetchAllBookings(user.userId);
    setAppointmentList(res.data);
  }

  useEffect(()=>{
    fetchAppointments();
  },[])

  // div element with class table contains a table to display booking details.
// The table header contains the column names: "Booking id," "Center," "UserName," "Product," "Date," and "Timing."
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