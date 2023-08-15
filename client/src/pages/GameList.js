import { getGamesList } from "../api/server";
import { useEffect, useState } from "react";

const GameList = () => {
  const [games, setGames] = useState([]);
  const [listChoice, setListChoice] = useState(getGamesList);

  useEffect(() => {
    listChoice.then((gameData) =>
    setGames([...gameData]));
  })

  console.log(games);

  return (
    <div>
      <h1>Hi</h1>
    </div>
  )
}

export default GameList