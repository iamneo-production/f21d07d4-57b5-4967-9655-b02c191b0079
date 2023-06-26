import signinImg from '../../assets/signin.jpg'
import { Login } from '../../components/Login/Login';
function LoginPage() {
  return (
   <div className='container mt-3'>
      <div className='row'>
        <div className='col-md-5'>
          <Login />
        </div>
        <div className='col-md-7 my-auto'>
          <img className="img-fluid w-100" src={signinImg} alt='' />
        </div>
      </div>
   </div>
  );
}

export default LoginPage;
