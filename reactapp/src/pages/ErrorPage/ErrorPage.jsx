import React from 'react'
import errorPage from '../../assets/error.png'

//The ErrorPage component is a simple React functional component that displays an error image when there is 
// an error or the requested page is not found. It uses the errorPage image from the assets folder.
export const ErrorPage = () => {
  return (
    <div style={{display:'flex',justifyContent:'center',marginTop:'10%'}}>
        <img src={errorPage} alt='' />
        
    </div>
  )
}
