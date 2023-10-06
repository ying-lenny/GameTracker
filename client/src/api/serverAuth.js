import axios from "axios";

export const registerUser = async (user) => {
  try {
    const res = await axios.post("http://localhost:5000/users/register", user);

    if (res.data) {
      localStorage.setItem("user", JSON.stringify(res.data));
    }

    return res.data;
  } catch (error) {}
};

export const loginUser = async (user) => {
  try {
    const res = await axios.post("http://localhost:5000/users/login", user);

    if (res.data) {
      localStorage.setItem("user", JSON.stringify(res.data));
    }

    return res.data;
  } catch (error) {}
};
