import React, { useState } from "react";
import { resetPassword } from "../../Redux/actions";
import { useDispatch } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Grid from "@material-ui/core/Grid";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { useStyles } from "../styles";
import { useFormik } from "formik";
import * as yup from "yup";

export default function ResetPassword(props) {
  const classes = useStyles();
  const [passwordType, setPasswordType] = useState("password");
  const [rePasswordType, setRePasswordType] = useState("password");
  const dispatch = useDispatch();

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
        email: props.match.params.email,
        password: "",
        Repassword: "",
      },
      validationSchema,
      enableReinitialize: true,
      onSubmit: (values) => {
        dispatch(
          resetPassword({
            ...values,
            resetToken: props.match.params.resetToken,
          })
        );
      },
    });

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar} src="./user.jpeg" />

          <form className={classes.form} noValidate onSubmit={handleSubmit}>
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
              Reset Password
            </Button>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
