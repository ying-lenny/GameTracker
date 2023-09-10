import { useEffect, useState } from "react";
import { getGenresList } from "../api/RAWG";
import GenreCard from "../components/GenreCard";

const GenreList = () => {
  const [genres, setGames] = useState([]);
  const [listChoice, setListChoice] = useState(getGenresList);
  
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
        setListChoice(getGenresList);
        break;
      default:
        setListChoice(getGenresList);
        break;

    }
  };

  return (
    <div className="game-list">
      <h2>{genres.length} Genres</h2>
      <ul className="game-list-ul">
        {genres.map((genre) => {
          return (
            <GenreCard
              key={genre.id}
              id={genre.id}
              image={genre.image_background}
              name={genre.name}
            />
          );
        })}
      </ul>
    </div>
  )
}

export default GenreList