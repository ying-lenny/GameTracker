import { useParams } from "react-router-dom";
import { getDmcDetails } from "../api/server";
import { useEffect, useState } from "react";

function GameDetails() {
  
  const [details, setDetails] = useState({});
  const { name } = details;
  const { id } = useParams();

  useEffect(() => {
    getDmcDetails().then((game) => setDetails(game));
  }, [])
  
  return (
    <div>
      <h2>{name}</h2>
    </div>
  )
}



export default GameDetails