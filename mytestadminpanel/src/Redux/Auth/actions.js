import {
  signupApi,
  loginApi,
  forgetPasswordApi,
  setNewPasswordApi,
} from "./apis";
import { SIGN_IN, SIGN_OUT } from "./constant";
import { setToken, removeToken } from "../Utils/token";
import history from "../../history";
import {
  showLoginErrorAlert,
  showSignupErrorAlert,
  showForgotPasswordFailureAlert,
  showForgotPasswordSuccessAlert,
  startLoading,
  stopLoading,
  showServerErrorAlert,
  showResetPasswordSuccessAlert,
  showResetPasswordFailureAlert,
} from "../actions";

export const signup = (data, resetForm) => async (dispatch) => {
  try {
    dispatch(startLoading());
    await signupApi(data);

    history.push("/");
    dispatch(stopLoading());
    resetForm({
      values: "",
    });
  } catch (e) {
    dispatch(stopLoading());
    if (e.response && e.response.status === 400) {
      dispatch(showSignupErrorAlert());
    } else {
      dispatch(showServerErrorAlert());
    }
  }
};

export const login = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await loginApi(data);
    dispatch({
      type: SIGN_IN,
      payload: response.data.user,
    });

    setToken(response.data.token);

    history.push("/");
    dispatch(stopLoading());
  } catch (e) {
    dispatch(stopLoading());
    if (e.response && e.response.status === 400) {
      dispatch(showLoginErrorAlert());
    } else {
      dispatch(showServerErrorAlert());
    }
    console.log(e);
  }
};

export const forgetPassword = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    await forgetPasswordApi(data);
    dispatch(stopLoading());

    dispatch(showForgotPasswordSuccessAlert());
    history.push("/");
  } catch (e) {
    dispatch(stopLoading());
    if (e.response && e.response.status === 400) {
      dispatch(showForgotPasswordFailureAlert());
    } else {
      dispatch(showServerErrorAlert());
    }
  }
};

export const resetPassword = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    await setNewPasswordApi(data);
    dispatch(stopLoading());

    dispatch(showResetPasswordSuccessAlert());
    history.push("/");
  } catch (e) {
    dispatch(stopLoading());
    if (e.response && e.response.status === 400) {
      dispatch(showResetPasswordFailureAlert());
    } else {
      dispatch(showServerErrorAlert());
    }
  }
};

export const loggedInUser = (data) => async (dispatch) => {
  try {
    dispatch({
      type: SIGN_IN,
      payload: data,
    });
  } catch (e) {
    console.log(e.message);
  }
};
export const Signout = (data) => async (dispatch) => {
  removeToken();
  dispatch({ type: SIGN_OUT });
  history.push("/");
};
