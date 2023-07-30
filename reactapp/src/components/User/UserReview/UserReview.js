import styles from './UserReview.module.css';
import DeleteIcon from '@material-ui/icons/Delete';
import {Link} from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import { deleteReview } from '../../../api/myaxios';

function UserReview(props) {

  const review = props.review;
  const id= review.reviewId;
  const delurl=`deleteReview/${id}`;
 
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