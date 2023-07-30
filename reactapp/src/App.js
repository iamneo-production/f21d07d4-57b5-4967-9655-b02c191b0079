import { BrowserRouter, Routes,Route } from 'react-router-dom';
import './App.css';
import LandingPage from './pages/LandingPage/LandingPage';
import AdminHomePage from './pages/Admin/Home/AdminHomePage';
import AdminAddCentrePage from './pages/Admin/AddCenter/AdminAddCentrePage';
import AdminLayout from './pages/Admin/Layout/AdminLayout';
import Adminbooking from './pages/Admin/BookingsPage/Adminbooking';
import UserLayOut from './pages/User/Layout/UserLayOut';
import Centerprofilescreen from './pages/Admin/CenterProfile/Centerprofilescreen';
import { ErrorPage } from './pages/ErrorPage/ErrorPage';
import  UserHomePage  from './pages/User/Home/UserHomePage';
import UserDashboard from './pages/User/Dashboard/UserDashboard';
import Userbooking from './pages/User/MyBookings/Userbooking';
import Usereditcenter from './pages/User/EditAppoinment/Usereditcenter';
import AvailableSlots from './components/User/AvailableSlots/AvailableSlots';
import PaymentCard from './components/PaymentCard/PaymentCard';
import Userreview from './pages/User/Userreview/Userreview';
import Login from "./components/Auth/Login/Login"
import Signup from "./components/Auth/Signup/Signup"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/admin" element={<AdminLayout/>}>
          <Route path="/admin/home" element={<AdminHomePage/>}></Route>
          <Route path="/admin/add-centre" element={<AdminAddCentrePage/>}></Route>
          <Route path="/admin/edit-center" element={<Centerprofilescreen/>}></Route>
          <Route path="/admin/bookings" element={<Adminbooking/>}></Route>
        </Route>
        <Route path="/user" element={<UserLayOut/>}>
          <Route path='/user/home' element={<UserHomePage/>}></Route>
          <Route path='/user/EditCenter' element={<Usereditcenter/>}></Route>
          <Route path="/user/booking/slot" element={<AvailableSlots/>}></Route>
          <Route path="/user/payment" element={<PaymentCard/>}></Route>
          <Route path='/user/Mybooking' element={<Userbooking/>}></Route>
          <Route path='/user/dashboard' element={<UserDashboard/>}></Route>
          <Route path="/user/center/reviews/:centerId" element={<Userreview/>}></Route>
        </Route>

        <Route path="*" element={<ErrorPage/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;