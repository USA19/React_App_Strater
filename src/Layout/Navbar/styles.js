import { makeStyles, withStyles, fade } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
const drawerWidth = 240;

export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    width: "100%",
    overflowX: "hidden",
  },
  link: {
    textDecoration: "none",
    color: "black",
  },
  drawer: {
    //  "@media (max-width: 598px)": {},1024
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    backgroundColor: "white",
    // width: "100%",
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    "@media (max-width: 1279px)": {
      width: "100%",
      marginLeft: 0,
    },

    position: "relative",
    overflowX: "hidden",
  },
  menuButton: {
    marginRight: theme.spacing(2),
    display: "none",
    [theme.breakpoints.down("md")]: {
      display: "block",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  // custom Drawer Class for permanent Drawer
  customDrawerClass: {
    width: drawerWidth,
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  logoBox: {
    // width: theme.spacing(7),
    // height: theme.spacing(7),
    position: "absolute",
    right: "20px",
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  userImage: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  mainLogo: {
    width: theme.spacing(8),
    height: theme.spacing(8),
    "@media (max-width: 798px)": {
      display: "none",
    },
  },
  search: {
    // position: "relative",
    // borderRadius: theme.shape.borderRadius,
    // backgroundColor: fade(theme.palette.common.white, 0.15),
    // "&:hover": {
    //   backgroundColor: fade(theme.palette.common.white, 0.25),
    // },
    // marginRight: theme.spacing(2),
    // marginLeft: 0,
    // width: "100%",
    // [theme.breakpoints.up("sm")]: {
    //   marginLeft: theme.spacing(3),
    //   width: "auto",
    // },
    position: "relative",
    width: "260px",
    display: "flex",
    left: "28%",
    // [theme.breakpoints.down("sm")]: {
    //   display: "none",
    // },
    // 894
    "@media (max-width: 894px)": {
      // left: "20%",
      position: "absolute",
      right: 0,
    },

    "@media (max-width: 280px)": {
      position: "absolute",
      right: "10px",
      width: "200px",
    },
  },
  searchIcon: {
    position: "absolute",
    right: "55px",
    // bottom: "0px",
    // left: "3px",
    zIndex: 1,
    "@media(max-width:280px)": {
      position: "absolute",
      right: "10px",
    },
  },
  emailText: {
    marginTop: "12px",
    "@media (max-width: 1223px)": {
      display: "none",
    },
  },
}));

export const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.common.white,
    border: "1px solid #ced4da",
    fontSize: 16,
    // width: "auto",
    width: "78%",
    padding: "10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}))(InputBase);
