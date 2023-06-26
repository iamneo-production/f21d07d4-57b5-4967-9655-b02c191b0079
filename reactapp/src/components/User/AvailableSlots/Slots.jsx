import React, { useState } from 'react'
import styles from './Slots.module.css';
const Slots = (props) => {

    const [timeSlots,setTimeSlots] = useState(
        [
            {time:"10:00", words:"ten", selected:false},
            {time:"11:00", words:"eleven", selected:false},
            {time:"12:00", words:"twelve", selected:false},
            {time:"13:00", words:"thirteen", selected:false},
            {time:"14:00", words:"fourteen", selected:false},
            {time:"15:00", words:"fifteen", selected:false},
            {time:"16:00", words:"sixteen", selected:false},
            {time:"17:00", words:"seventeen", selected:false},
            {time:"18:00", words:"eighteen", selected:false}
        ]
    );

    const availableSlotsStyle = {
        color:"green",
    }

    const notAvailabeSlotStyle = {
        color:"red",
        textDecoration:"line-through",
        cursor:"not-allowed"
    }

    const handleOnClickTime = (index)=>{
        const temp = timeSlots.map(item=>{
            item.selected = false;
            return item;
        });
        temp[index].selected = true;
        setTimeSlots(temp);
        props.setSelectedTime(temp[index]);
    }

  return (
    <>
    <h2 style={{color:"green"}}>Available Slots</h2>
    <div className={styles.slotContainer}>

        {
            timeSlots.map( (item,index) =>{
                const isAvailable = props.slotData[item.words];
                return <p  style={{
                    color:isAvailable?"green":"red",
                    textDecoration:isAvailable?"none":"line-through",
                    cursor:isAvailable?"pointer":"not-allowed",
                    backgroundColor:item.selected?"lightgreen":"aliceblue",
                    pointerEvents: isAvailable ? "auto":"none"
                }} onClick={()=>handleOnClickTime(index)}>
                    {item.time}
                </p>
            })
        }
    </div>
    </>
  )
}

export default Slots