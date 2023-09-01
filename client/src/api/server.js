export const getDmcDetails= async () => {
  try {
    const res = await fetch(`https://rawg.io/api/games/devil-may-cry-5?key=${process.env.REACT_APP_RAWR_Key}`, {
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