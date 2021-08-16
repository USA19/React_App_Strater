import React from "react";
import { forgetPassword } from "../../Redux/actions";
import { useDispatch } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
// import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
// import Typography from "@material-ui/core/Typography";
import { useStyles } from "../styles";

import { useFormik } from "formik";
import * as yup from "yup";

export default function SignInSide() {
  const classes = useStyles();
  const dispatch = useDispatch();

  let validationSchema = yup.object({
    email: yup.string().required("enter your email"),
  });

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
      },
      enableReinitialize: true,
      validationSchema,
      onSubmit: (values) => {
        dispatch(forgetPassword(values));
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

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Send Email
            </Button>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
