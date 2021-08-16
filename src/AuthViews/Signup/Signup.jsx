import React, { useState } from "react";
import { signup } from "../../Redux/actions";
import { useDispatch } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { useStyles } from "../styles";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { useFormik } from "formik";
import * as yup from "yup";

export default function Signup() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [passwordType, setPasswordType] = useState("password");
  const [rePasswordType, setRePasswordType] = useState("password");

  const handleClickShowPassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
    } else {
      setPasswordType("password");
    }
  };

  const handleClickShowRetypePassword = () => {
    if (rePasswordType === "password") {
      setRePasswordType("text");
    } else {
      setRePasswordType("password");
    }
  };
  let validationSchema = yup.object({
    firstName: yup
      .string()
      .matches(/^[A-Za-z ]*$/, "Please enter valid firstName")
      .min(3)
      .required("firstName is required"),
    lastName: yup
      .string()
      .matches(/^[A-Za-z ]*$/, "Please enter valid lastName")
      .min(3)
      .required("lastName is required"),
    date_of_birth: yup.date().required("please select your date  of birth"),
    // mobileNumber: yup.number().required("enter your mobile number"),
    email: yup.string().email().required("email is required"),

    password: yup
      .string()
      .required("Password is required")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      ),
    Repassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("confirm your password"),
  });
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        firstName: "",
        lastName: "",
        date_of_birth: "",
        email: "",
        password: "",
        Repassword: "",
      },
      validationSchema,
      onSubmit: (values, { resetForm }) => {
        dispatch(signup(values, resetForm));
      },
    });

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar} src="./user.jpeg" />
          {/* <LockOutlinedIcon />
          </Avatar> */}
          {/* <Typography component="h1" variant="h5">
            Sign in
          </Typography> */}
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <Box className={classes.row}>
              <Box width="50%">
                <TextField
                  error={errors.firstName && touched.firstName ? true : false}
                  onBlur={handleBlur}
                  helperText={
                    errors.firstName && touched.firstName
                      ? errors.firstName
                      : ""
                  }
                  value={values.firstName}
                  onChange={handleChange}
                  name="firstName"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoComplete="firstName"
                  autoFocus
                />
              </Box>
              <Box width="50%" ml={2}>
                <TextField
                  error={errors.lastName && touched.lastName ? true : false}
                  onBlur={handleBlur}
                  helperText={
                    errors.lastName && touched.lastName ? errors.lastName : ""
                  }
                  value={values.lastName}
                  onChange={handleChange}
                  name="lastName"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  autoComplete="lastName"
                  autoFocus
                />
              </Box>
            </Box>

            <TextField
              error={errors.email && touched.email ? true : false}
              onBlur={handleBlur}
              helperText={errors.email && touched.email ? errors.email : ""}
              value={values.email}
              onChange={handleChange}
              name="email"
              variant="outlined"
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              autoComplete="email"
              autoFocus
            />
            <TextField
              name="date_of_birth"
              id="date"
              error={
                errors.date_of_birth && touched.date_of_birth ? true : false
              }
              onBlur={handleBlur}
              helperText={
                errors.date_of_birth && touched.date_of_birth
                  ? errors.date_of_birth
                  : ""
              }
              value={values.date_of_birth}
              onChange={handleChange}
              label="Birthday"
              variant="outlined"
              type="date"
              fullWidth
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              required
            />
            <TextField
              error={errors.password && touched.password ? true : false}
              onBlur={handleBlur}
              helperText={
                errors.password && touched.password ? errors.password : ""
              }
              value={values.password}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={passwordType}
              id="password"
              autoComplete="current-password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword}>
                      {passwordType === "password" ? (
                        <Visibility />
                      ) : (
                        <VisibilityOff />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              margin="normal"
              variant="outlined"
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.Repassword && touched.Repassword ? true : false}
              value={values.Repassword}
              helperText={
                errors.Repassword && touched.Repassword ? errors.Repassword : ""
              }
              label="Confirm Password"
              name="Repassword"
              fullWidth
              type={rePasswordType}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowRetypePassword}>
                      {rePasswordType === "password" ? (
                        <Visibility />
                      ) : (
                        <VisibilityOff />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="/forgotPassword" className={classes.linkStyle}>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/" className={classes.linkStyle}>
                  {"Already have an account? Sign In"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
