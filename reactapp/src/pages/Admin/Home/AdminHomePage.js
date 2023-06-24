import React from "react";
import classes from './AdminHomePage.module.css';
import AdminCentreCard from "../../../components/Admin/AdminCentreCard/AdminCentreCard";
import { useEffect,useState} from "react";
import { fetchAllCenter } from "../../../api/myaxios";
import SearchIcon from '@material-ui/icons/Search';

const AdminHomePage = (props) => {

  const [centreList,setCentreList]= useState([]);
  const [displayList, setDisplayList] = useState([]);
 
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
    <div >
        <div className={classes.searchBar}>
       <SearchIcon/>
       <input onChange={(e)=>handleOnChange(e)} placeholder="Search by Name,City,Pincode"></input>
     
        </div>
        <br></br>
        <div className={classes.centreCardsContainer}>
           {
             displayList.length > 0 ?
             displayList.map((item)=>{
              
            return <div className={classes.card}> <AdminCentreCard data={item} key={item.serviceCenterId} onDelete={fetchCentreList} enableOptions={true} /></div>; 
             })
             :
             <h2>No items match the search result</h2>
}
        </div>
  </div>

  );
};
  
export default AdminHomePage;