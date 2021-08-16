import { makeStyles } from "@material-ui/core/styles";
export const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});
export const useStyles = makeStyles({
  dialogPaper: {
    width: "60%",
    height: "60%",
  },
  description: {
    width: "100%",
    height: "100%",
    // "&::placeholder": {
    fontSize: "2em",

    // },
  },
  addMedia: {
    position: "absolute",
    bottom: "0",
    width: "100%",
  },
  absolute: {
    position: "absolute",
    bottom: "60px",
    right: "16px",
  },
  input: {
    display: "none",
    position: "absolute",
    bottom: "60px",
    right: "16px",
  },
  bold: {
    fontWeight: "bold",
  },
  avatar: {
    backgroundColor: "blue",
    marginTop: "6px",
  },
});
