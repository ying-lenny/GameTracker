import axios from "axios";

export const registerUser = async (user) => {
  try {
    const res = await fetch('http://localhost:5000/users/register', {
    method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "name": `${user.name}`,
        "email": `${user.email}`,
        "password": `${user.password}`,
      })
    });
    if (res.data) {
      localStorage.setItem("user", JSON.stringify(res.data));
    }
    return res.data;
  } catch (error) {
    throw error
  }
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