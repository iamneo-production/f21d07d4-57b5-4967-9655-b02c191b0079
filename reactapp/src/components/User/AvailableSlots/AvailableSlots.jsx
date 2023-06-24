import Dates from './Dates';
import { useState } from 'react';
import Slots from './Slots';
import styles from './AvailableSlots.module.css';
function AvailableSlots(props){

    const slots = props.slots;

    const [slotList,setSlotList] = useState([...slots.map(slot=>{
      return {...slot,selected:false}
    })]);

    const [showSlots,setShowSlots] = useState(false);
    const [slotData,setSlotData] = useState({});
    const [selectedTime, setSelectedTime] = useState({});

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

    const handleOnClickNext = ()=>{
      let selectedDate = slotList.filter(item=>{
        return item.selected == true;
      });

      props.setDateTime(selectedDate[0].date,selectedTime.time);

      props.showModal(false);
      // alert("Selected Date: "+selectedDate[0].date+"\nSelected Time: "+selectedTime.time);
    }

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
