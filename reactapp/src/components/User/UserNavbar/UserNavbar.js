import {  Link, useNavigate } from "react-router-dom";
import { toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import styles from './UserNavbar.module.css';
const Navbar = () => {
    const navigate = useNavigate();
    const handleOnClickLogout = () =>{
        localStorage.removeItem("user");
        setTimeout(()=>{
            toast.success("Logged out successfully");
        },1000);
        navigate("/");
    }
    return (
      <div>
        
<nav className={`navbar navbar-expand-lg bg-dark ${styles.navbar}`}>
         <div className="container-fluid">
             <ul className="navbar-nav">
             <li>  
                 <h4 style={{marginRight:"300px",color: "white",textDecoration:"none"}} >Vacuum service</h4>
                 </li>
                 <li class="nav-item">  
                 <Link id='HomeButton'style={{marginRight:"260px",color: "white",textDecoration:"none"}}to="/user/home">Home</Link>
                 </li>
                 <li class="nav-item">
                 <Link id='myBookingButton'style={{marginRight:"260px",color: "white",textDecoration:"none"}}to="/user/mybooking">Mybooking</Link>
                 </li>
                 <li class="nav-item">
                 <a id='Logout' style={{color: "white"}}  onClick={()=>handleOnClickLogout()}>Logout</a>
                 </li>
             </ul>
</div>

</nav>
</div>
);
};
export default Navbar;