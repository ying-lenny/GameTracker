import { Link } from "react-router-dom";

const GameCard = ({ id, name, image }) => {
  return (  
    <div className="game-card" id={id}>
      <Link to={`/catalog/game/${id}`}>
        <div className="game-card-image">
          <img src={image} alt={name}/>
        </div>
        <div className="game-card-name">
          <h2>{name}</h2>
        </div>
      </Link>
    </div>
  )
}

export default GameCard;