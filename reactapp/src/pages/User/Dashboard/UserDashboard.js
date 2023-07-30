import React, { useEffect, useState } from 'react'
import BookAppointmentForm from '../../../components/User/BookAppointmentForm/BookAppointmentForm'
import styles from './UserDashboard.module.css';
import UserCentreCard from '../../../components/User/UserCentreCard/UserCentreCard';
import AvailableSlots from '../../../components/User/AvailableSlots/AvailableSlots';
import ReactModal from 'react-modal';
function UserDashboard(props) {

  const [cardData,setCardData] = useState({});

  const [showModal,setShowModal] = useState(false);

  const [_time,setTime] = useState();

  const [_date,setDate] = useState();

  const card = JSON.parse(localStorage.getItem("bookCenterDetails"));

  const isNewAppointment = JSON.parse(localStorage.getItem("isNewAppointment"));

  const appointmentInfo = JSON.parse(localStorage.getItem("AppointmentDetails"));

  useEffect(()=>{
    setCardData(card);
    if(! isNewAppointment){
      setDate(appointmentInfo.bookingDate);
      setTime(appointmentInfo.bookingTime);
    }
  },[])
  
  //Date operations for getting slots**************************************************

  const convertDateToString = (date) => {
    let dd = date.getDate();
    dd = dd >= 10 ? dd : '0' + dd;
    let mm = date.getMonth()+1;
    mm = mm >= 10 ? mm : '0' + mm;
    let yyyy = date.getFullYear();
    return yyyy+"-"+mm+"-"+dd;
  }


  const createFilteredSlotList = ()=>{

      const slots = card.slots;
      
      const currentDate = new Date();

      //creating a list of 5 dates that we need
      const dateList = [];

      for(let i=0;i<5;i++){
      let newDate = currentDate;
      newDate.setDate(newDate.getDate()+1);
      dateList.push(convertDateToString(newDate));
    }

    //filtering slots base on dateList array
    let filteredSlots = slots.filter(item => {
      let flag = false;
      for(let date of dateList){
        if(date === item.date){
          flag = true;
        }
      }
      return flag;
    });

    return filteredSlots;
  }

  //End of slot operations **********************************************************************

  const filteredSlots = createFilteredSlotList();

  const setDateTime = (date,time) =>{
    setDate(date);
    setTime(time);
  }

  return (
    <>
    <div className={styles.sidePanel}>
      <p>D</p>
      <p>A</p>
      <p>S</p>
      <p>H</p>
      <p>B</p>
      <p>0</p>
      <p>A</p>
      <p>R</p>
      <p>D</p>
    </div>
    <div className={styles.container}>
      <div className={styles.card}>
        <UserCentreCard data={cardData} enableOptions={false} enableSlotButton={true} showModal={setShowModal}/>
      </div>
      <div className={styles.form}>
        {
          <BookAppointmentForm center={cardData} date={_date} time={_time}/>
        }
      </div>
    </div>
    <ReactModal isOpen={showModal} className={styles.modal}>
      <AvailableSlots slots={filteredSlots} showModal={setShowModal} setDateTime={setDateTime}/>
      <button className={`btn btn-danger ${styles.closeButton}`} onClick={()=>setShowModal(false)}>Close</button>
    </ReactModal>
    </>
  )
}

export default UserDashboard