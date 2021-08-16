import {
  SHOW_ALERT,
  HIDE_ALERT,
  message_login_error,
  message_signup_error,
  message_forgot_password_failure,
  message_forgot_password_succes,
  error_severity,
  info_severity,
  message_server_error,
  message_change_password_succes,
  message_change_password_failure,
} from "./constant";

export const showLoginErrorAlert = () => (dispatch) => {
  dispatch({
    type: SHOW_ALERT,
    payload: {
      message: message_login_error,
      open: true,
      severity: error_severity,
    },
  });
};

export const showSignupErrorAlert = () => (dispatch) => {
  dispatch({
    type: SHOW_ALERT,
    payload: {
      message: message_signup_error,
      open: true,
      severity: error_severity,
    },
  });
};

export const showForgotPasswordFailureAlert = () => (dispatch) => {
  dispatch({
    type: SHOW_ALERT,
    payload: {
      message: message_forgot_password_failure,
      open: true,
      severity: error_severity,
    },
  });
};

export const showForgotPasswordSuccessAlert = () => (dispatch) => {
  dispatch({
    type: SHOW_ALERT,
    payload: {
      message: message_forgot_password_succes,
      open: true,
      severity: info_severity,
    },
  });
};

export const showResetPasswordSuccessAlert = () => (dispatch) => {
  dispatch({
    type: SHOW_ALERT,
    payload: {
      message: message_change_password_succes,
      open: true,
      severity: info_severity,
    },
  });
};

export const showResetPasswordFailureAlert = () => (dispatch) => {
  dispatch({
    type: SHOW_ALERT,
    payload: {
      message: message_change_password_failure,
      open: true,
      severity: info_severity,
    },
  });
};

export const showServerErrorAlert = () => (dispatch) => {
  dispatch({
    type: SHOW_ALERT,
    payload: {
      message: message_server_error,
      open: true,
      severity: error_severity,
    },
  });
};
export const hideAlert = () => (dispatch) => {
  dispatch({
    type: HIDE_ALERT,
  });
};
