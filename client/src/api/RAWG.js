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

export const getGenreDetails = async (id) => {
  try {
    const res = await fetch(`https://rawg.io/api/genres/${id}?key=${process.env.REACT_APP_RAWR_Key}`, {
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
    const res = await fetch(`https://rawg.io/api/games?page_size=40&key=${process.env.REACT_APP_RAWR_Key}`, {
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

export const getGamesByGenre = async (slug) => {
  try {
    const res = await fetch(`https://rawg.io/api/games?genres=${slug}&key=${process.env.REACT_APP_RAWR_Key}`, {
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
    const res = await fetch(`https://rawg.io/api/genres?key=${process.env.REACT_APP_RAWR_Key}`, {
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