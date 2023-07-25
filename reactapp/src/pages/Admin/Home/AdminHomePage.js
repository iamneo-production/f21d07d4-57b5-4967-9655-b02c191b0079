import React from "react";
import classes from './AdminHomePage.module.css';
import AdminCentreCard from "../../../components/Admin/AdminCentreCard/AdminCentreCard";
import { useEffect,useState} from "react";
import { fetchAllCenter } from "../../../api/myaxios";
import SearchIcon from '@material-ui/icons/Search';

//AdminHomePage component is a React functional component that displays the home page of the admin dashboard. 
//It consists of a search bar and a list of center cards that represent different service centers.
const AdminHomePage = (props) => {

  const [centreList,setCentreList]= useState([]);
  const [displayList, setDisplayList] = useState([]);
 
  //component defines a function fetchCentreList using the useEffect hook to fetch the list of all service centers from the API.
  const fetchCentreList = async()=>{
    const res = await fetchAllCenter();
    setCentreList(res.data);
    setDisplayList(res.data);
  }

  useEffect(()=>{
    fetchCentreList();
  },[])

  //handleOnChange function is used to handle changes in the search input. It filters the centreList based on the search query and updates the displayList accordingly.
// The return block renders the component's content.
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
//div element with className searchBar displays the search bar and the search icon from the Material-UI library. 
// The onChange event of the search input is bound to the handleOnChange function to handle changes in the search query.
  return (
    <div >
        <div className={classes.searchBar}>
       <SearchIcon/>
       <input id='searchButton' onChange={(e)=>handleOnChange(e)} placeholder="Search by Name,City,Pincode"></input>
     
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