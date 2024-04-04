import axios from "axios";

export const registerUser = async (user) => {
  try {
    console.log("Register User test 2")
    console.log(user)
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
      console.log("Register User test 3")
      localStorage.setItem("user", JSON.stringify(res.data));
    }
    console.log(res.data)
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
