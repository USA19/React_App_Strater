import Signup from "../AuthViews/Signup/Signup";
import Login from "../AuthViews/Login/Login";
import ResetPassword from "../AuthViews/ResetPassword/ResetPassword";
import ForgetPassword from "../AuthViews/ForgetPassword/ForgetPassword";

export const authRoutes = [
  {
    path: "/",
    component: Login,
    exact: true,
  },
  {
    path: "/signup",
    component: Signup,
    exact: true,
  },
  {
    path: "/forgotPassword",
    component: ForgetPassword,
    exact: true,
  },
  {
    path: "/reset/:email/token/:resetToken",
    component: ResetPassword,
    exact: true,
  },
];
