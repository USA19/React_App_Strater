import {
  SHOW_ALERT,
  HIDE_ALERT,
  message_server_error,
  error_severity,
} from "./constant";

const alertReducer = (
  state = {
    open: false,
    message: message_server_error,
    severity: error_severity,
  },
  action
) => {
  switch (action.type) {
    case SHOW_ALERT:
      return action.payload;
    case HIDE_ALERT: {
      return {
        ...state,
        open: false,
      };
    }

    default:
      return state;
  }
};

export default alertReducer;
