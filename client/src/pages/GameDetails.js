import { useParams } from "react-router-dom";
import { getGameDetails } from "../api/RAWG";
import { useEffect, useState } from "react";

function GameDetails() {
  
  const [details, setDetails] = useState({});
  const { 
    name, description, metacritic, released, 
    rating, platforms, genres, tags
  } = details;
  const { id } = useParams();

  useEffect(() => {
    getGameDetails(id).then((game) => setDetails(game));
  }, [id])
  
  return (
    <div>
      <h2>{name}</h2>
      <div dangerouslySetInnerHTML={{__html: description}}/>
      <h4>Metacritic review: {metacritic}</h4>
      <h4>Release Date: {released}</h4>
      <h4>Rating: {rating} / 5</h4>

      <h1>Platforms</h1>
      {platforms && (
        <ul>
        {platforms.map(({platform}) => {
          return (
            <li key={platform.id}>
              <h2>{platform.name}</h2>
            </li>
          );
        })}
      </ul>
      )}

      <h3>Genres</h3>
      {genres && (
        <ul>
        {genres.map((genre) => (
          <li key={genre.id}>
            <h3>{genre.name}</h3>
          </li>
        ))}
      </ul>
      )}

      <h3>Tags</h3>
      {tags && (
        <ul>
        {tags.map((tag) => (
          <li className="tag" key={tag.id}>
            <h3>{tag.name}</h3>
          </li>
        ))}
      </ul>
      )}
      
    </div>
  )
}



export default GameDetails;