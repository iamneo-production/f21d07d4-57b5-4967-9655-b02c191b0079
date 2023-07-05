import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import bg from "./bg/signin.jpeg";
import bgimg from "./bg/backimg.jpg";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useState, forwardRef } from "react";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import MuiAlert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";
import { useNavigate } from "react-router-dom";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const boxstyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "75%",
  height: "70%",
  bgcolor: "background.paper",
  boxShadow: 24,
};

const center = {
  position: "relative",
  top: "50%",
  left: "30%",
};

export default function Signup() {
  const [open, setOpen] = useState(false);
  const [errorMessages, setErrorMessages] = useState({
    adminUser: "",
    email: "",
    username: "",
    mobileNumber: "",
    password: "",
    confirmPassword: "",
  });
  const vertical = "top";
  const horizontal = "right";
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    setOpen(true);
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    // Validate the form fields
    let hasError = false;
    const newErrorMessages = {
      adminUser: "",
      email: "",
      username: "",
      mobileNumber: "",
      password: "",
      confirmPassword: "",
    };

    // Validate Name (Must be 15 characters or less)
    const adminUser = data.get("admin/user");
    if (adminUser.length > 15) {
      newErrorMessages.adminUser = "Name must be 15 characters or less";
      hasError = true;
    }

    // Validate Email (Match Email Pattern)
    const email = data.get("email");
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    if (!emailPattern.test(email)) {
      newErrorMessages.email = "Enter a valid email address";
      hasError = true;
    }

    // Validate MobileNumber ("^[0-9]{10}$")
    const mobileNumber = data.get("mobileNumber");
    const mobileNumberPattern = /^[0-9]{10}$/;
    if (!mobileNumberPattern.test(mobileNumber)) {
      newErrorMessages.mobileNumber = "Enter a valid 10-digit mobile number";
      hasError = true;
    }

    // Validate Password (Should be at least 6 characters)
    const password = data.get("password");
    if (password.length < 6) {
      newErrorMessages.password = "Password should be at least 6 characters";
      hasError = true;
    }

    // Validate Confirm Password (Should be the same as password)
    const confirmPassword = data.get("confirmPassword");
    if (confirmPassword !== password) {
      newErrorMessages.confirmPassword = "Password does not match";
      hasError = true;
    }

    // Update the error messages state
    setErrorMessages(newErrorMessages);

    if (!hasError) {
      // Form submission logic here
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  function TransitionLeft(props) {
    return <Slide {...props} direction="left" />;
  }

  return (
    <>

      <div
        style={{
          backgroundImage: `url(${bgimg})`,
          backgroundSize: "cover",
          height: "100vh",
          color: "#f5f5f5",
        }}
      >
        <Box sx={boxstyle}>
          <Grid container>
            <Grid item xs={12} sm={12} lg={6}>
              <Box
                style={{
                  backgroundImage: `url(${bg})`,
                  backgroundSize: "cover",
                  marginTop: "40px",
                  marginLeft: "15px",
                  marginRight: "15px",
                  height: "63vh",
                  color: "#f5f5f5",
                }}
              ></Box>
            </Grid>
            <Grid item xs={12} sm={12} lg={6}>
              <Box
                style={{
                  backgroundSize: "cover",
                  height: "70vh",
                  minHeight: "650px",
                  backgroundColor: "#3b33d5",
                }}
              >
                <ThemeProvider theme={darkTheme}>
                  <Container>
                    <Box height={15} />
                    <Box sx={center}>
                      <Avatar
                        sx={{ ml: "85px", mb: "4px", bgcolor: "#ffffff" }}
                      >
                        <LockOutlinedIcon />
                      </Avatar>
                      <Typography component="h1" variant="h5" style={{ marginLeft: "60px" }}>
                        Register
                      </Typography>
                    </Box>
                    <Box
                      component="form"
                      noValidate
                      onSubmit={handleSubmit}
                      sx={{ mt: 2 }}
                    >
                      <Grid container spacing={0.5}>
                        <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                        <TextField
                        required
                        fullWidth
                        select
                        id="admin/user"
                        label="Select admin/user"
                        name="admin/user"
                        error={!!errorMessages.adminUser}
                        helperText={errorMessages.adminUser}
                    >
                      <MenuItem value="admin">Admin</MenuItem>
                       <MenuItem value="user">User</MenuItem>
                    </TextField>
                   </Grid>
                        <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                          <TextField
                            required
                            fullWidth
                            id="email"
                            label="Enter email"
                            name="email"
                            autoComplete="email"
                            error={!!errorMessages.email}
                            helperText={errorMessages.email}
                          />
                        </Grid>

                        <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                          <TextField
                            required
                            fullWidth
                            id="username"
                            label="Enter Username"
                            name="username"
                            error={!!errorMessages.username}
                            helperText={errorMessages.username}
                          />
                        </Grid>

                        <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                          <TextField
                            required
                            fullWidth
                            id="mobileNumber"
                            label="Enter Mobile Number"
                            name="mobileNumber"
                            error={!!errorMessages.mobileNumber}
                            helperText={errorMessages.mobileNumber}
                          />
                        </Grid>

                        <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                          <TextField
                            required
                            fullWidth
                            name="password"
                            label="Enter Password"
                            type="password"
                            id="password"
                            autoComplete="new-password"
                            error={!!errorMessages.password}
                            helperText={errorMessages.password}
                          />
                        </Grid>

                        <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                          <TextField
                            required
                            fullWidth
                            name="confirmPassword"
                            label="Confirm Password"
                            type="password"
                            id="confirmPassword"
                            autoComplete="new-password"
                            error={!!errorMessages.confirmPassword}
                            helperText={errorMessages.confirmPassword}
                          />
                        </Grid>

                        <Grid item xs={12} sx={{ ml: "5em", mr: "5em" }}>
                          <Button
                            type="submit"
                            id="submitButton"
                            variant="contained"
                            fullWidth
                            size="large"
                            sx={{
                              mt: "15px",
                              mr: "20px",
                              borderRadius: 28,
                              color: "#ffffff",
                              minWidth: "170px",
                              backgroundColor: "#FF9A01",
                            }}
                          >
                            Submit
                          </Button>
                        </Grid>
                        <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                          <Stack direction="row" spacing={2}>
                            <Typography
                              variant="body1"
                              component="span"
                              style={{
                                marginTop: "15px",
                                marginLeft: "165px",
                                fontSize: "20px",
                              }}
                            >
                              Already a user?{" "}
                              <span
                                id="signInLink"
                                style={{
                                  color: "#beb4fb",
                                  cursor: "pointer",
                                }}
                                onClick={() => {
                                  navigate("/");
                                }}
                              >
                                Login
                              </span>
                            </Typography>
                          </Stack>
                        </Grid>
                      </Grid>
                    </Box>
                  </Container>
                </ThemeProvider>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </div>
    </>
  );
}
