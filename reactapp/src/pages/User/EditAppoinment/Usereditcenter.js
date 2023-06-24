import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import UserEditCenter from '../../../components/User/UserEditCenter/UserEditCenter'

function Usereditcenter(props) {
  const [editCard,setEditCard] = useState({});
  
  const getCardtoEdit = ()=>{
    const data=JSON.parse(localStorage.getItem('data'));
    setEditCard(data);
  }

  useEffect(()=>{
    getCardtoEdit();
  },[]);

  return (
  <>
    <UserEditCenter data={editCard} getCardtoEdit={getCardtoEdit}/>
  </>
  )
}

export default Usereditcenter