import axios from "axios"

export const getGamesList = async () => {
  try {
    const res = await fetch("http://localhost:5000/catalog/games", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        //!Fix Authorization
        // Authorization: `Bearer ${
        //   JSON.parse(localStorage.getItem("user")).token
        // }`,
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
}