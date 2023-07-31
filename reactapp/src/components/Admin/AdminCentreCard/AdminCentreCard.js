import React from 'react';
import styles from './AdminCentreCard.module.css';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {Link} from 'react-router-dom';
import {deleteCenter} from "../../../api/myaxios";

//This component is a functional component that receives props as its parameter. 
//It represents a card displaying information about a service center.
function AdminCentreCard(props) {

    const id = props.data.serviceCenterId;

    //The deleteCenter function is imported from the '../../../api/myaxios' module, 
    //which is likely used for making an HTTP request to delete a service center.
    const deleteURL = `deleteServiceCenter/${id}`;
    

    // This function is called when the delete icon is clicked.
    const handleOnClickDelete = async()=>{
        try{
            if(window.confirm('Are you sure you want to delete?')){
                const res = await deleteCenter(deleteURL);
                alert('Deleted Sucessfully');
                props.onDelete();
            }
        }catch(error){
            console.log("delete error: ",error);
            alert("Could Not Delete Try Again");
        }
        
    }

    // / This function is called when the edit icon is clicked. It stores the service center data (props.data) in the local storage
    const handleOnClickEdit = ()=>{
        localStorage.setItem("data",JSON.stringify(props.data));
    }

    //The component returns JSX markup representing a card displaying information about the service center.
  return (
    <div className={`container, ${styles.main}`} style={props.style}>
        <div className="row">
            <div className="col-sm">
                <div class="card" >
                    <img style={{width:'100%',height:'250px',objectFit:'fill'}}src={props.data.imgUrl} class="card-img-top" id="Grid1" alt="Vacuumservice"/>
                    <div class="card-body">
                        <h5 class="card-title">{props.data.name}</h5>
                        <p class="card-text">{`Place: ${props.data.address}`}</p>
                        <p class="card-text">{`City: ${props.data.city}`}</p>
                        <p class="card-text">{`Pincode: ${props.data.pincode}`}</p>
                        <p class="card-text">Timings: 10:00AM to 05:00PM</p>
                        <p class="card-text">{`Phone: ${props.data.mobileNumber}`}</p>
                        <p class="card-text">{`Email: ${props.data.email}`}</p>
                        <p style={{fontSize:'18px',color:'green'}} class="card-text">{props.data.description}</p>
                        <>
                        {
                            props.enableOptions ?  
                            <>
                                <Link to="/admin/edit-center" style={{marginRight:'8px'}}>
                                <EditIcon onClick={()=>handleOnClickEdit()}/>
                                </Link>
                                <Link to="/admin/home" onClick={()=>handleOnClickDelete()}
                                >
                                <DeleteIcon/>
                                </Link>
                            </> 
                            : ''
                        }
                        </>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AdminCentreCard



/*import React from 'react';
import styles from './AdminCentreCard.module.css';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {Link} from 'react-router-dom';
import {deleteCenter} from "../../../api/myaxios";

//This component is a functional component that receives props as its parameter. 
//It represents a card displaying information about a service center.
function AdminCentreCard(props) {

    const id = props.data.serviceCenterId;

    //The deleteCenter function is imported from the '../../../api/myaxios' module, 
    //which is likely used for making an HTTP request to delete a service center.
    const deleteURL = `deleteServiceCenter/${id}`;

    // This function is called when the delete icon is clicked.
    const handleOnClickDelete = async()=>{
        try{
            if(window.confirm('Are you sure you want to delete?')){
                const res = await deleteCenter(deleteURL);
                alert('Deleted Sucessfully');
                props.onDelete();
            }
        }catch(error){
            console.log("delete error: ",error);
            alert("Could Not Delete Try Again");
        }
        
    }

    // / This function is called when the edit icon is clicked. It stores the service center data (props.data) in the local storage
    const handleOnClickEdit = ()=>{
        localStorage.setItem("data",JSON.stringify(props.data));
    }

    //The component returns JSX markup representing a card displaying information about the service center.
  return (
    <div className={`container, ${styles.main}`} style={props.style}>
        <div className="row">
            <div className="col-sm">
                <div class="card" >
                    <img style={{width:'100%',height:'250px',objectFit:'fill'}}src={props.data.imgUrl} class="card-img-top" id="Grid1" alt="Vacuumservice"/>
                    <div class="card-body">
                        <h5 class="card-title">{props.data.name}</h5>
                        <p class="card-text">{`Place: ${props.data.address}`}</p>
                        <p class="card-text">{`City: ${props.data.city}`}</p>
                        <p class="card-text">{`Pincode: ${props.data.pincode}`}</p>
                        <p class="card-text">Timings: 10:00AM to 05:00PM</p>
                        <p class="card-text">{`Phone: ${props.data.mobileNumber}`}</p>
                        <p class="card-text">{`Email: ${props.data.email}`}</p>
                        <p style={{fontSize:'18px',color:'green'}} class="card-text">{props.data.description}</p>
                        <>
                        {
                            props.enableOptions ?  
                            <>
                                <Link to="/admin/edit-center" style={{marginRight:'8px'}}>
                                <EditIcon onClick={()=>handleOnClickEdit()}/>
                                </Link>
                                <Link to="/admin/home" onClick={()=>handleOnClickDelete()}
                                >
                                <DeleteIcon/>
                                </Link>
                            </> 
                            : ''
                        }
                        </>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}


export default AdminCentreCard */
