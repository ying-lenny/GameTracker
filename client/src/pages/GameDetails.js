import { useParams } from "react-router-dom";
import { getGameDetails } from "../api/RAWG";
import { useEffect, useState } from "react";

function GameDetails() {
  
  const [details, setDetails] = useState({});
  const { name } = details;
  const { id } = useParams();

  useEffect(() => {
    getGameDetails(id).then((game) => setDetails(game));
  }, [id])
  
  return (
    <div>
      <h2>{name}</h2>
    </div>
  )
}



export default GameDetails;