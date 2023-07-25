import styles from './UserReview.module.css';
import DeleteIcon from '@material-ui/icons/Delete';
import {Link} from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import { deleteReview } from '../../../api/myaxios';

function UserReview(props) {

  //The component receives the review data as a prop (props.review) and extracts the review ID (id) from the review object.
  const review = props.review;
  const id= review.reviewId;
  const delurl=`deleteReview/${id}`;
 
  //handleOnClickDelete function is called when the user clicks the delete icon. It prompts the user with a confirmation message using window.confirm. 
  //If the user confirms, it sends a delete request to the server using the deleteReview function from the api/myaxios module. 
  //After successful deletion, it displays an alert and calls the onDelete prop function to update the review list.
  const handleOnClickDelete = async()=>{
    try{
        if(window.confirm('Are you sure you want to delete?')){
            const res = await deleteReview(delurl);
            alert('Deleted Sucessfully');
            props.onDelete();
        }
      }
      catch(error){
        console.log("delete error: ",error);
        alert("Could Not Delete Try Again");
    }
    
}
// handleOnClickEdit function is called when the user clicks the edit icon. 
// It stores the review data in the local storage using the localStorage.setItem method. This allows the user to edit the review on another page.
const handleOnClickEdit = ()=>{
  localStorage.setItem("reviewData",JSON.stringify(props.review));
}

  return(
    <div className={styles.container}>
      <div className={styles.header}>
        <h5>{review.user.name}</h5>
        <p>{`Date Created: ${review.dateCreated}`}</p>
      </div>
      <div className={styles.body}>
        <p>
          {review.reviewContent}
        </p>
        {
          props.showOptions &&
        <div className={styles.options}>
        <Link to='' onClick={()=>handleOnClickDelete()}>
            <DeleteIcon/></Link>
        {/* <Link to='' onClick={()=>handleOnClickEdit()}><EditIcon/></Link> */}
        </div>
        }
        </div>
      </div>
   
  )
};


export default UserReview