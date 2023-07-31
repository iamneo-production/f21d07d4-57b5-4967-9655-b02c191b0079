import React from "react";
import { Formik, Form } from "formik";
import { TextField } from '../TextField';
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import * as myaxios from "../../../api/myaxios";
import rocketImg from '../../../assets/rocket.png'

export default function Signup(){
  const validate = Yup.object({
    name: Yup.string().max(25, "Must be 15 characters or less").required("Required"),
    email: Yup.string().email("Email is invalid").required("Required"),
    mobileNumber: Yup.string()
      .matches("^[0-9]{10}$", "Phone number is not valid")
      .required("Required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Password must match")
      .required("Required"),
  });

  const handleOnSubmit = async (values) => {
    try {
      const res = await myaxios.signup(values);
      if (res.data === "Email id already exists" || res.data === "Mobile number already exists") {
        toast.error(res.data);
      } else {
        toast.success("SIGNUP SUCCESSFULL", { position: "top-center", autoClose: 2000 });
        setTimeout(() => {
          window.location.replace("/login");
        }, 2000);
      }
    } catch (err) {
      toast.error("SIGNUP FAILED !");
    }
  };

  return (
    <div className='container mt-3'>
    <div className='row'>
      <div className='col-md-5'>
    <Formik
      initialValues={{
        userType: "",
        name: "",
        email: "",
        mobileNumber: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={validate}
      onSubmit={(values, { resetForm }) => {
        handleOnSubmit(values);
        resetForm({ values: "" });
      }}
    >
      {(formik) => (
        <div>
          <h1 className="my-4 font-weight-bold-display-4">Sign Up</h1>
          <Form>
            <FormControl>
              <InputLabel id="user-type-label"
                sx={{
                  marginTop: "35px",
                }}
              >User-Type</InputLabel>
              <Select
                sx={{
                  marginTop: 5,
                  width: 525,
                  height: 50,
                }}
                labelId="user-type-label"
                id="admin/user"
                name="userType"
                value={formik.values.userType}
                onChange={formik.handleChange}
              >
                <MenuItem value={"USER"}>USER</MenuItem>
                <MenuItem value={"ADMIN"}>ADMIN</MenuItem>
              </Select>
            </FormControl>
            <TextField data-testid="username" label="Name" name="name" type="text" />
            <TextField data-testid="email" label="Email" name="email" type="text" />
            <TextField data-testid="mobileNumber" label="Mobile Number" name="mobileNumber" type="text" />
            <TextField data-testid="password" label="Password" name="password" type="password" />
            <TextField
              id="confirmPassword"
              label="Confirm Password"
              name="confirmPassword"
              type="password"
            />
            <button data-testid='submitButton' className="btn btn-dark mt-3" type="submit">
              Register
            </button>
          </Form>
          <br />
          <p>
            Already have an account? <Link data-testid='signinLink' to="/login">Login</Link>
          </p>
          <ToastContainer />
        </div>
      )}
    </Formik>
    </div>
        <div className='col-md-7 my-auto'>
          <img className="img-fluid w-100" src={rocketImg} alt='' />
        </div>
      </div>
   </div>
  );
};





//Signup Page

































