import React, { useState } from 'react'
import styles from './Dates.module.css';
const Dates= (props) => {
    const weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const fulldate = new Date(props.date);
    const day = weekdays[fulldate.getDay()];
    const date = fulldate.getDate();
    const year = fulldate.getFullYear();
    const month = months[fulldate.getMonth()];
    
    const selectedstyle = {
        borderTop:"4px solid green",
        boxShadow:"16px 16px 8px gray"
    }

  return (
        <div className={styles.dateContainer} style={props.slotData.selected ? selectedstyle:{}}  onClick={()=>{
            props.handleDateClick(props.slotData,props.index);
        }}>
            <p>{month}</p>
            <p>{date}</p>
            <p style={{color:"green"}}>{day}</p>
        </div>
  )
}

export default Dates;