import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { useSelector, useDispatch } from "react-redux";
import { hideAlert } from "../../Redux/actions";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function MessageAlert() {
  const alert = useSelector((state) => state.alert);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(hideAlert());
  };
  return (
    <Snackbar
      style={{ zIndex: 2000 }}
      open={alert.open}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      autoHideDuration={2000}
      onClose={handleClose}
    >
      <Alert severity={alert.severity}>{alert.message}</Alert>
    </Snackbar>
  );
}
