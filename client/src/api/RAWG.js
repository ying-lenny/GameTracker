export const getGameDetails = async (id) => {
  try {
    const res = await fetch(`https://rawg.io/api/games/${id}?key=${process.env.REACT_APP_RAWR_Key}`, {
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

export const getPopularGames = async () => {
  try {
    const res = await fetch(`https://rawg.io/api/games?&page_size=40&key=${process.env.REACT_APP_RAWR_Key}`, {
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
    return data.results;
  } catch (error) {
    throw error;
  }
}

export const getGenresList = async () => {
  try {
    const res = await fetch(`https://rawg.io/api/genre?key=${process.env.REACT_APP_RAWR_Key}`, {
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
    return data.results;
  } catch (error) {
    throw error;
  }
}