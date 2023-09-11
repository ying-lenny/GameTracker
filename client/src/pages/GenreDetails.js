import { useParams } from "react-router-dom";
import { getGamesByGenre, getGenreDetails } from "../api/RAWG";
import { useEffect, useState } from "react";
import GameCard from "../components/GameCard";

function GenreDeails() {
  
  const [games, setGames] = useState([]);
  const [details, setDetails] = useState({});
  const { name, description, slug } = details;
  const { id } = useParams();
  const [list, setList] = useState(getGamesByGenre(slug));

  useEffect(() => {
    getGenreDetails(id).then((genre) => setDetails(genre));
  }, [id])

  useEffect(() => {
    list.then((gameData) => {
      setGames([...gameData]);
    });
  }, [list]);

    // eslint-disable-next-line
    const handleListChoice = (e) => {
      e.preventDefault();
      switch (e.target.value) {
        case "popular":
          setList(getGamesByGenre());
          break;
        default:
          setList(getGamesByGenre());
          break;
      }
    };
  
  return (
    <div>
      <h2>{name}</h2>
      <div dangerouslySetInnerHTML={{__html: description}}/>
      <h4>{games.length}</h4>
      <h4>{slug}</h4>
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

export default GenreDeails;