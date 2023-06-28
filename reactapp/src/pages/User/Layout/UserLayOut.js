import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import UserNavbar from '../../../components/User/UserNavbar/UserNavbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './UserLayout.module.css';

function UserLayout() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (user == null || user.userType !== 'USER') {
      toast.error('Please Login to view this page');
      navigate('/login');
    }
  }, []);

  return (
    <>
      {user && (
        <div className={styles.container}>
          <UserNavbar />
          <div className={styles.content}>
            <h3 className={styles.greeting}>{`Hi, ${user.name}`}</h3>
            <Outlet />
          </div>
          <ToastContainer />
        </div>
      )}
    </>
  );
}

export default UserLayout;
