import React from "react";
import './AdminBooking.module.css'
import 'react-toastify/dist/ReactToastify.css';

//The booking component is a functional component that receives props as its parameter. It appears to represent a row of booking data in a table.
const booking = (props) => {

  //The props object is used to access the booking data for each column in the table row:
    return (  
      <>
        <tr>
          <td>{props.data.appointmentId}</td>
          <td>{props.data.centerName}</td>
          <td>{props.data.userName}</td>
          <td>{props.data.productName}</td>
          <td>{props.data.bookingDate}</td><br></br>
          <td>{props.data.bookingTime}</td> 
        </tr>
      </>
                      
  );
};
  
export default booking;
