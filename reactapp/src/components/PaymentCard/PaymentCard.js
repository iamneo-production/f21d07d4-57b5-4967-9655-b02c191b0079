import React, { useState } from 'react'
import Cards from 'react-credit-cards'
import 'react-credit-cards/es/styles-compiled.css'
import '../PaymentCard/PaymentCard.css'
import { makePayment } from '../../api/myaxios'
import 'react-toastify/dist/ReactToastify.css';
import { toast,ToastContainer } from 'react-toastify';

function PaymentCard() {
        const [number, setNumber] = useState('')
        const [name, setName] = useState('')
        const [expiry, setExpiry] = useState('')
        const [cvc, setCvc] = useState('')
        const [focus, setFocus] = useState('')
        const setPaymentStatus=()=>{
                let id = localStorage.getItem('appointMentId')
                makePayment(id);
                toast.success('PAYMENT SUCCESSFULL',{position: "top-right",autoClose: 2000});
                setTimeout(() => { window.location.replace('/user/Mybooking'); }, 2000);
        };
        return (
                <div className='body'>
                        <ToastContainer/>
                        <div className='bgimage'></div>
                <div className='Card' style={{display:'flex',borderRadius:'1%',padding:40}}>
                        <div>
                        <Cards
                                number={number}
                                name={name}
                                expiry={expiry}
                                cvc={cvc}
                                focused={focus}
                        />
                        </div>
                        
                        <div style={{display:'flex',flexDirection:'row',marginLeft:20, marginTop:5}}>
                        <from>
                                <div >
                                        <input 
                                        type='tel' 
                                        name='number' 
                                        placeholder='Card Number' 
                                        value={number} 
                                        onChange={e => setNumber(e.target.value)}
                                        onFocus={e => setFocus(e.target.name)}
                                        style={{width:415,marginBottom:5}}
                                        />
                                </div>
                                <div>
                                        <input 
                                        type='text' 
                                        name='name' 
                                        placeholder='Name' 
                                        value={name} 
                                        onChange={e => setName(e.target.value)}
                                        onFocus={e => setFocus(e.target.name)}
                                        style={{width:415,marginBottom:5}}
                                        />
                                </div>
                                <div style={{marginBottom:5}}>
                                        <input 
                                        type='text' 
                                        name='expiry' 
                                        placeholder='MM/yy Expiry' 
                                        value={expiry} 
                                        onChange={e => setExpiry(e.target.value)}
                                        onFocus={e => setFocus(e.target.name)}
                                        style={{height:40,width:205,marginRight:5}}
                                        />
                                        <input 
                                        type='tel' 
                                        name='cvc' 
                                        placeholder='CVC' 
                                        value={cvc} 
                                        onChange={e => setCvc(e.target.value)}
                                        onFocus={e => setFocus(e.target.name)}
                                        style={{height:40,width:205}}
                                        />
                                </div>
                                <div>
                                        <input 
                                        type='text'
                                        name='charge'
                                        placeholder='Amount'
                                        value = '₹ 250.00 '
                                        disabled={true}
                                        style={{height:40,width:205,marginRight:5}}
                                        />
                                        <button 
                                        className="btn btn-success"
                                        style={{width:205,height:40,marginTop:-6}}
                                        onClick={()=>{setPaymentStatus()}}
                                        >Confirm</button>
                                </div>
                                
                        </from>        
                        </div>
                </div>
                </div>
        )
}

export default PaymentCard