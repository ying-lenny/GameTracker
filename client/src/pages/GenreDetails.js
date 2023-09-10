import { useParams } from "react-router-dom";
import { getGenreDetails } from "../api/RAWG";
import { useEffect, useState } from "react";

function GenreDeails() {
  
  const [details, setDetails] = useState({});
  const { name, description } = details;
  const { id } = useParams();

  useEffect(() => {
    getGenreDetails(id).then((game) => setDetails(game));
  }, [id])
  
  return (
    <div>
      <h2>{name}</h2>
      <p>{description}</p>
    </div>
  )
}



export default GenreDeails;