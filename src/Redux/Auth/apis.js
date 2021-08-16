import server from "../apis/server";

export const signupApi = (data) => {
  return server.post("/signup", data);
};

export const loginApi = (data) => {
  return server.post("/login", data);
};

export const forgetPasswordApi = (data) => {
  return server.post("/forgetPassword", data);
};

export const setNewPasswordApi = (data) => {
  return server.post("/setNewPassword", data);
};
