import React, { useState } from "react";
import history from "../../history";
import { baseUrl } from "../../Redux/apis/server";
// import { searchUsersAction } from "../../Redux/actions";
import { navigationRoutes } from "../../Routes/SidebarNavigationRoutes";
import { Signout } from "../../Redux/actions";
import { Link } from "react-router-dom";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import { useSelector, useDispatch } from "react-redux";
import { useTheme } from "@material-ui/core/styles";
import { useStyles, BootstrapInput } from "./styles";
import Avatar from "@material-ui/core/Avatar";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Typography from "@material-ui/core/Typography";
import SearchIcon from "@material-ui/icons/Search";

import Box from "@material-ui/core/Box";

function ResponsiveDrawer(props) {
  const { window } = props;

  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const authState = useSelector((state) => state.auth);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [activeRoute, setActiveRoute] = React.useState(0);
  const isMenuOpen = Boolean(anchorEl);
  const dispatch = useDispatch();
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSignout = () => {
    dispatch(Signout());
    handleMenuClose();
  };

  const onSearch = (e) => {
    if (e.charCode === 13 && name.length !== 0) {
      handleSearch();
    }
  };
  const handleSearch = () => {
    if (name.length !== 0) {
      // dispatch(searchUsersAction({ name }));
    }
  };
  const menuId = "primary-search-account-menu";
  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />

      <List>
        {navigationRoutes.map((route, index) => (
          <Link
            to={route.path}
            onClick={() => setActiveRoute(index)}
            className={classes.link}
          >
            <ListItem
              button
              key={route.title}
              selected={index === activeRoute ? true : false}
            >
              <ListItemIcon>{route.icon}</ListItemIcon>
              <ListItemText primary={route.title} />
            </ListItem>
          </Link>
        ))}

        <ListItem button key="Signout" onClick={handleSignout}>
          <ListItemIcon>
            <ExitToAppIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Signout" />
        </ListItem>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const [name, setName] = useState("");
  return authState.isSignedIn ? (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar} color="transparent">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Avatar
            alt="Allumini Portal"
            src="/logo.jpeg"
            className={classes.mainLogo}
          />
          {/* <Typography
            variant="h6"
            noWrap
            color="inherit"
            style={{ marginTop: "10px" }}
          >
            Alumini Portal
          </Typography> */}
          <Box className={classes.search}>
            <IconButton className={classes.searchIcon} onClick={handleSearch}>
              <SearchIcon />
            </IconButton>
            <BootstrapInput
              id="bootstrap-input"
              placeholder="Search..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              onClick={() => history.push("/searchUser")}
              onKeyPress={onSearch}
            />
          </Box>
          <Box
            className={classes.logoBox}
            style={{ display: "flex" }}
            onClick={handleProfileMenuOpen}
          >
            <Avatar
              alt="Allumini Portal"
              src={
                authState.user && authState.user.profileImageUrl
                  ? baseUrl + authState.user.profileImageUrl
                  : ""
              }
              className={classes.userImage}
            />
            <Typography className={classes.emailText}>
              {authState && authState.user ? authState.user.email : ""}
            </Typography>
          </Box>
          <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            open={isMenuOpen}
            onClose={handleMenuClose}
          >
            <Link to="/profile" className={classes.link}>
              {" "}
              <MenuItem onClick={handleMenuClose}>My Profile</MenuItem>
            </Link>
            <MenuItem onClick={handleSignout}>Signout</MenuItem>
          </Menu>
        </Toolbar>
        <Divider />
      </AppBar>

      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        {/* permanent Drawer starts */}
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.customDrawerClass,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
        {/* permanent Drawer ends */}
      </nav>
    </div>
  ) : (
    ""
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
