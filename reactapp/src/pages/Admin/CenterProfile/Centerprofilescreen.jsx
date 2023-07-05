import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import AdminCentreCard from '../../../components/Admin/AdminCentreCard/AdminCentreCard'
import EditCentreForm from '../../../components/Admin/EditCentreForm/EditCentreForm'
function Centerprofilescreen(props) {

  const [editCard,setEditCard] = useState({});
  
  const getCardtoEdit = ()=>{
    const data=JSON.parse(localStorage.getItem('data'));
    setEditCard(data);
  }

  useEffect(()=>{
    getCardtoEdit();
  },[]);


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