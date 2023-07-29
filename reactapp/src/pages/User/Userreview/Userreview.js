
import React from 'react';
import { useEffect, useState } from "react";
import styles from './Userreview.module.css';
import UserReview from '../../../components/User/UserReview/UserReview';
import { fetchAllReviewsByCenter } from "../../../api/myaxios";
import { submitReview } from '../../../api/myaxios';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaStar } from 'react-icons/fa';

function Userreview(props) {
  const [reviews, setReviews] = useState([]);
  const [myReview, setMyReview] = useState("");
  const [rating, setRating] = useState(0);

  const param = useParams();

  const user = JSON.parse(localStorage.getItem("user"));

  const fetchReviews = async () => {
    const url = `getReviews/${param.centerId}`;
    fetchAllReviewsByCenter(url).then(res => res.data).then(data => setReviews(data.reverse()));
  }

  useEffect(() => {
    fetchReviews();
  }, []);

  const convertDateToString = (date) => {
    let dd = date.getDate();
    dd = dd >= 10 ? dd : '0' + dd;
    let mm = date.getMonth() + 1;
    mm = mm >= 10 ? mm : '0' + mm;
    let yyyy = date.getFullYear();
    return yyyy + "-" + mm + "-" + dd;
  }

  const handleOnChange = (e) => {
    setMyReview(e.target.value);
  }

  const handleOnClickSubmit = async () => {
    let data = {};
    data["dateCreated"] = convertDateToString(new Date());
    data["reviewContent"] = myReview;
    data["rating"] = rating;
    data["user"] = user;
    data["center"] = { "serviceCenterId": param.centerId };

    try {
      const res = await submitReview(data);
      toast.success("Review Submitted");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
    catch (error) {
      console.log(error);
      toast.error("Review Submit Failed");
    }
  }

  const handleStarClick = (ratingValue) => {
    setRating(ratingValue);
  }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.leftPanel}>
        <textarea placeholder='Write your review.........' onChange={(e) => handleOnChange(e)}></textarea>
        <div className={styles.ratingContainer}>
          <p>Rate the center:</p>
          {[1, 2, 3, 4, 5].map((value) => (
            <FaStar
              className={styles.star}
              key={value}
              size={24}
              onClick={() => handleStarClick(value)}
              color={value <= rating ? '#ffc107' : '#e4e5e9'}
              role="button"
            />
          ))}
        </div>
        <br />
        <button className={`btn btn-success ${styles.submitButton}`} onClick={() => handleOnClickSubmit()}>Submit Review</button>
      </div>
      <div className={styles.rightPanel}>
        <h2>User Reviews</h2>
        <div className={styles.container}>
          {
            reviews.length > 0 ?
              reviews.map(review => {
                let showOptions = review.user.userId === user.userId;
                return <UserReview review={review} key={review.reviewId}
                  onDelete={fetchReviews} showOptions={showOptions} />;
              }) :
              <h2>No Reviews Found</h2>
          }
        </div>
      </div>
    </div>
  );
}

export default Userreview;







/*


import React from "react";
import classes from './UserHomePage.module.css';
import UserCentreCard from "../../../components/User/UserCentreCard/UserCentreCard";
import { useEffect,useState} from "react";
import { fetchAllCenter } from "../../../api/myaxios";
import SearchIcon from '@material-ui/icons/Search';
const UserHomePage = (props) => {

  const [centreList,setCentreList]= useState([]);
  const [displayList, setDisplayList] = useState([]);

  console.log(centreList);
  
  const fetchCentreList = async()=>{
    const res = await fetchAllCenter();
    setCentreList(res.data);
    setDisplayList(res.data);
  }

  useEffect(()=>{
    fetchCentreList();
  },[])

  const handleOnChange = event => {
    const text = event.target.value.toLowerCase();
    if(text === ""){
      setDisplayList(centreList);
    }
    else{
      const filterCentreListByName = centreList.filter(item => {
        let name = item.name.toLowerCase();
        return name.startsWith(text);
      });

      const filterCentreListByCity = centreList.filter(item=>{
        let city = item.city.toLowerCase();
        return city.startsWith(text);
      })

      const filterCentreListByPincode = centreList.filter(item=>{
        let pincode = item.pincode;
        return pincode.startsWith(text);
      });

      if(filterCentreListByName.length > 0){
        setDisplayList(filterCentreListByName);
      }
      else if(filterCentreListByCity.length > 0){
        setDisplayList(filterCentreListByCity);
      }
      else if(filterCentreListByPincode.length > 0){
        setDisplayList(filterCentreListByPincode);
      }
      else setDisplayList([]);
    }
  }

  return (
    <div>
        <div className={classes.searchBar}>
          <SearchIcon/>
          <input id='searchButton' onChange={(e)=>handleOnChange(e)} placeholder="Search by Name,City,Pincode"></input>
        </div>
        <br></br>
        <div className={classes.centreCardsContainer}>
           {
             displayList.length > 0 ?
             displayList.map((item)=>{
               return <div className={classes.card}><UserCentreCard data={item} key={item.serviceCenterId} enableOptions={true}/></div>;
             })
             :
             <h2>No items match the search result</h2>

           }
        </div>
</div>

  );
};
  
export default UserHomePage; */
