import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { toast,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminNavbar from '../../../components/Admin/AdminNavbar/AdminNavbar'

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
    <div>
        <AdminNavbar/>
        <h1>Welcome, Admin</h1>
        <ToastContainer/>
        <br></br>
        <Outlet/>
    </div>
  )
}

export default AdminLayout