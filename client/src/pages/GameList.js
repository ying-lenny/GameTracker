import { useEffect, useState } from "react";
import { getPopularGames } from "../api/RAWG";
import GameCard from "../components/GameCard";

const GameList = () => {
  const [games, setGames] = useState([]);
  const [listChoice, setListChoice] = useState(getPopularGames());
  
  useEffect(() => {
    listChoice.then((gameData) => {
      setGames([...gameData]);
    });
  }, [listChoice]);

  // eslint-disable-next-line
  const handleListChoice = (e) => {
    e.preventDefault();
    switch (e.target.value) {
      case "popular":
        setListChoice(getPopularGames);
        break;
      default:
        setListChoice(getPopularGames);
        break;
    }
  };

  return (
    <div className="game-list">
      <h2>{games.length} most popular games</h2>
      <ul className="game-list-ul">
        {games.map((game) => {
          return (
            <GameCard
              key={game.id}
              id={game.id}
              image={game.background_image}
              name={game.name}
            />
          );
        })}
      </ul>
    </div>
  )
}

export default GameList