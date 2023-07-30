import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import AdminCentreCard from '../../../components/Admin/AdminCentreCard/AdminCentreCard'
import EditCentreForm from '../../../components/Admin/EditCentreForm/EditCentreForm'

//Centerprofilescreen component is a React functional component that displays the profile screen for a center on the admin dashboard.
// It consists of an AdminCentreCard component to display center details and an EditCentreForm component to edit the center details.
function Centerprofilescreen(props) {

  //The component initializes a state variable editCard using the useState hook to store the center details to be edited.
  const [editCard,setEditCard] = useState({});
  
  //The component defines a function getCardtoEdit using the useEffect and localStorage to get the
  // center details from local storage and update the editCard state.
  const getCardtoEdit = ()=>{
    const data=JSON.parse(localStorage.getItem('data'));
    setEditCard(data);
  }

  useEffect(()=>{
    getCardtoEdit();
  },[]);

//The AdminCentreCard component displays the center details by passing the editCard state as data and sets enableOptions prop to false to disable editing options.

//The EditCentreForm component is used to edit the center details by passing the editCard state as data and the getCardtoEdit function as a
//  prop to update the editCard state after editing.
  return (
    <div style={{ display: 'flex', flexDirection: "row",justifyContent:'space-between'}}>
      <div style={{width:'40%'}}>
        
        <AdminCentreCard data={editCard} enableOptions={false}/>  
      </div>
      <div style={{width:'40%'}}>
        <EditCentreForm  data={editCard} getCardtoEdit={getCardtoEdit} />
      </div>
    </div>
  )
}
export default Centerprofilescreen