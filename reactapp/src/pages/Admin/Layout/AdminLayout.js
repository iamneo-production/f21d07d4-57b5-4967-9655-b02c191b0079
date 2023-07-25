import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { toast,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminNavbar from '../../../components/Admin/AdminNavbar/AdminNavbar'
import styles from './AdminLayout.module.css'; 

//The AdminLayout component is a React functional component that serves as the layout for the admin dashboard. 
//It includes the navigation bar (AdminNavbar component) at the top and the content area where other admin pages are rendered (using the Outlet component).
function AdminLayout() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  useEffect(()=>{
    if(user==null || user.userType !== "ADMIN"){
      toast.error("Please Login to see this page");
      navigate("/login");
    }
  })
  return (
    <>
      {user && (
        <div className={styles.container}>
          <AdminNavbar/>
          <div className={styles.content}>
            <h3 className={styles.greeting}>{`Welcome, Admin`}</h3>
            <Outlet />
          </div>
          <ToastContainer />
        </div>
      )}
    </>
  );
}

export default AdminLayout