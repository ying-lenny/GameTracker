import { Link } from "react-router-dom";

const GameCard = ({ id, name, image }) => {
  return (  
    <div className="game-card">
      <Link to={`/catalog/game/${id}`}>
        <img src={image} alt={name}/>
        <p>Click here to see {name}'s details!</p>
      </Link>
    </div>
  )
}

export default GameCard;