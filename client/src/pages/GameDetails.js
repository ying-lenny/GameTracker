import { useParams } from "react-router-dom";
import { getGameDetails } from "../api/RAWG";
import { useEffect, useState } from "react";

function GameDetails() {
  
  const [details, setDetails] = useState({});
  const { name, description, metacritic, released, rating, parent_platforms, genres } = details;
  const { id } = useParams();

  useEffect(() => {
    getGameDetails(id).then((game) => setDetails(game));
  }, [id])

  // console.log(genres)
  // console.log(parent_platforms)
  
  return (
    <div>
      <h2>{name}</h2>
      <div dangerouslySetInnerHTML={{__html: description}}/>
      <h4>{metacritic}</h4>
      <h4>{released}</h4>
      <h4>{rating}</h4>
      {/* <ul>
        {parent_platforms.map((platform) => {
          return (
            <h3>{platform.name}</h3>
          );
        })}
      </ul> */}
      {/* <ul>
        {genres.map((genre) => (
          <li>
            <h3>{genre.name}</h3>
          </li>
        ))}
      </ul> */}
    </div>
  )
}



export default GameDetails;