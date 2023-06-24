import React from 'react';
import { useEffect, useState } from "react";
import styles from './Userreview.module.css';
import UserReview from '../../../components/User/UserReview/UserReview';
import { fetchAllReviewsByCenter } from "../../../api/myaxios";
import { submitReview } from '../../../api/myaxios';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

function Userreview(props) {
  const [reviews,setReviews] = useState([]);

  const [myReview,setMyReview] = useState("");

  const param = useParams();

  const user = JSON.parse(localStorage.getItem("user"));

  const fetchReviews = async()=>{
    const url = `getReviews/${param.centerId}`;
    fetchAllReviewsByCenter(url).then(res=>res.data).then(data=>setReviews(data.reverse()));
  }

  useEffect(()=>{
    fetchReviews();
  },[]);

  const convertDateToString = (date) => {
    let dd = date.getDate();
    dd = dd >= 10 ? dd : '0' + dd;
    let mm = date.getMonth()+1;
    mm = mm >= 10 ? mm : '0' + mm;
    let yyyy = date.getFullYear();
    return yyyy+"-"+mm+"-"+dd;
  }

  const handleOnChange = (e) =>{
    setMyReview(e.target.value);
  }

  const handleOnClickSubmit = async()=>{
    let data = {};
    data["dateCreated"] = convertDateToString(new Date());
    data["reviewContent"] = myReview;
    data["user"] = user;
    data["center"] = {"serviceCenterId":param.centerId};

    try{
      const res = await submitReview(data);
      toast.success("Review Submitted");
      setTimeout(()=>{
        window.location.reload();
      },2000);
    }
    catch(error){
      console.log(error);
      toast.error("Review Submit Failed");
    }


  }
  return(
    <div className={styles.mainContainer}>
      <div className={styles.leftPanel}>
        <textarea  placeholder='Write your review.........'  onChange={(e)=>handleOnChange(e)}></textarea>
        <br/>
        <button className={`btn btn-success ${styles.submitButton}`} onClick={()=>handleOnClickSubmit()}>Submit Review</button>
      </div>
      <div className={styles.rightPanel}>
      <h2>User Reviews</h2>
      <div className={styles.container}>
        {
          reviews.length > 0 ?
          reviews.map(review=>{
            let showOptions = review.user.userId == user.userId;
            return <UserReview review={review} key={review.reviewId}
          onDelete={fetchReviews} showOptions={showOptions}/>
        }):
          <h2>No Reviews Found</h2>
        }
      </div> 
      </div>
    </div>
  );
}

export default Userreview

