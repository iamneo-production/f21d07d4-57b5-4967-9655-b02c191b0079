import Dates from './Dates';
import { useState } from 'react';
import Slots from './Slots.jsx'
import styles from './AvailableSlots.module.css';

//This component is a functional component that represents a component displaying available slots for booking.
function AvailableSlots(props){

  //he component receives slots and other props from its parent component.
//The slots prop represents the available slots data, which is an array of objects containing date and slot information.
    const slots = props.slots;
    console.log(slots)
    const [slotList,setSlotList] = useState([...slots.map(slot=>{
      return {...slot,selected:false}
    })]);

    //slotList: Represents the list of slots with a new property selected that indicates whether a slot is selected or not. 
    //The state is initialized with the transformed slots data, where each slot is given an additional property selected initialized to false.
//showSlots: Represents whether to show the available slots section or not. It is initialized as false.
//slotData: Represents the data of the selected slot.
//selectedTime: Represents the selected time slot.
    const [showSlots,setShowSlots] = useState(false);
    const [slotData,setSlotData] = useState({});
    const [selectedTime, setSelectedTime] = useState({});


    //handleDateClick: This function is called when a date slot is clicked. It sets the selected date's slot data, shows the available slots section 
    //(showSlots is set to true), and updates the selected property of the clicked date slot to true (and others to false) to indicate the selected date.
    const handleDateClick = (slotData,index) =>{
      setSlotData(slotData);
      setShowSlots(true);
      let tempSlotList = slotList.map((item)=>{
        item.selected = false;
        return item;
      })
      tempSlotList[index].selected = true;
      setSlotList(tempSlotList);
    }

    //handleOnClickNext: This function is called when the "Next" button is clicked. It extracts the selected date and time data, updates the parent component 
    //with the selected date and time using props.setDateTime(selectedDate[0].date, selectedTime.time), and hides the modal by calling props.showModal(false).
    const handleOnClickNext = ()=>{
      let selectedDate = slotList.filter(item=>{
        return item.selected == true;
      });

      props.setDateTime(selectedDate[0].date,selectedTime.time);

      props.showModal(false);
      // alert("Selected Date: "+selectedDate[0].date+"\nSelected Time: "+selectedTime.time);
    }

    //The available slots are displayed using the Dates and Slots components.
//The "Next" button is displayed with the class styles.button and is associated with the handleOnClickNext event handler.
  return (
    <div className={styles.main}>
      <div className={styles.Dates}>
      {
        slotList.map((item,index)=>{
          return <Dates date={item.date} slotData={item}  key={item.slotId} index={index} handleDateClick={handleDateClick}/>
        })
      }
      </div>
      <div className={styles.slots}>
        {showSlots && <Slots slotData={slotData} setSelectedTime={setSelectedTime}/>}
      </div>
      <button className={styles.button} onClick={()=>handleOnClickNext()}>Next</button>
    </div>
  )
}


export default AvailableSlots;
