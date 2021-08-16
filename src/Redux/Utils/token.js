export const getToken = () => {
  return window.localStorage.getItem("MY_TEST_ADMIN_PANEL_TOKEN");
};

export const setToken = (token) => {
  return window.localStorage.setItem("MY_TEST_ADMIN_PANEL_TOKEN", token);
};

export const removeToken = () => {
  return window.localStorage.removeItem("MY_TEST_ADMIN_PANEL_TOKEN");
};
