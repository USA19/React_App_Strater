import server from "./server";

export const getPendingUser = async (setUsers, setLoading) => {
  try {
    const token = window.localStorage.getItem("tamilNewsWebToken");
    const { data } = await server.get("/pendingUser", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setUsers(data);
    setLoading(false);
  } catch (e) {
    console.log(e.message);
    alert("Check your connection");
    return [];
  }
};

export const getUserById = async (
  id,
  setUser,
  setLoading,
  handleCountryChnage
) => {
  try {
    const token = window.localStorage.getItem("tamilNewsWebToken");
    const { data } = await server.get(`/getUserById/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setUser(data);
    handleCountryChnage(data.country);
    setLoading(false);
  } catch (e) {
    alert("Check your connection");
    console.log(e);
  }
};
