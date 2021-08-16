import React from "react";
import { useSelector } from "react-redux";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  CircularProgress: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100vh",
    backgroundColor: "#AARRGGBB",
  },
  loader: {
    position: "absolute",
    top: "45%",
    left: "50%",

    zIndex: 1000,
  },
}));
export default function FullPageLoader() {
  const classes = useStyles();
  const loading = useSelector((state) => state.loading);
  return loading ? (
    <Box className={classes.CircularProgress}>
      <CircularProgress className={classes.loader} />
    </Box>
  ) : (
    ""
  );
}
