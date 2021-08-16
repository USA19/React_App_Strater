import MailIcon from "@material-ui/icons/Mail";
import HomeIcon from "@material-ui/icons/Home";
import PersonIcon from "@material-ui/icons/Person";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import FindInPageIcon from "@material-ui/icons/FindInPage";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
export const navigationRoutes = [
  {
    path: "/",
    title: "Home",
    icon: <HomeIcon color="primary" />,
    exact: true,
  },
  {
    path: "/notification",
    title: "Notifications",
    icon: <NotificationsActiveIcon color="primary" />,
    exact: true,
  },
  {
    title: "Friend Requests",
    icon: <PersonAddIcon color="primary" />,
    exact: true,
    path: "/friendRequest",
  },
  {
    path: "/jobs",
    title: "Jobs",
    icon: <FindInPageIcon color="primary" />,
    exact: true,
  },
  {
    path: "/message",
    title: "Inbox",
    icon: <MailIcon color="primary" />,
    exact: true,
  },
  {
    path: "/profile",
    title: "My Profile",
    icon: <PersonIcon color="primary" />,
    exact: true,
  },
];
