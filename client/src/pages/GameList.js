import { useEffect, useState } from "react";
import { getAllGames } from "../api/RAWG";
import GameCard from "../components/GameCard";

const GameList = () => {
  const [games, setGames] = useState([]);
  const [listChoice, setListChoice] = useState(getAllGames());

  const OrderButton = document.getElementById('order-btn');
  let OrderButtonText = "Order by: ";

  useEffect(() => {
    listChoice.then((gameData) => {
      setGames([...gameData]);
    });
  }, [listChoice]);

  const handleListChoice = (e) => {

    e.preventDefault();
    switch (e.target.value) {
      case "AddedDate":
        OrderButton.textContent = `${OrderButtonText} Date added`;
        setListChoice(getAllGames("added"));
        return;
      case "Name":
        OrderButton.textContent = `${OrderButtonText} Name`
        setListChoice(getAllGames("name"));
        return;
      case "ReleaseDate":
        OrderButton.textContent = `${OrderButtonText} Release Date`
        setListChoice(getAllGames("released"));
        return;
      case "Popular":
        OrderButton.textContent = `${OrderButtonText} Popular`
        setListChoice(getAllGames("popular"));
        return;
      case "AvgRating":
        OrderButton.textContent = `${OrderButtonText} Average Rating`
        setListChoice(getAllGames("rating"));
        return;
      default:
        OrderButton.textContent = `${OrderButtonText} Popular`
        return;
    }
  };

  function toggleDropdown() {
    document.getElementById("orderDropdown").classList.toggle("show");
  }

  window.onclick = function(event) {
    if (!event.target.matches('.dropdownBtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }

  return (
    <div className="game-list">
      <h1 className="title">All Games</h1>
      <div className="dropdown">
        <button id="order-btn" className="dropdownBtn" onClick={toggleDropdown}>{OrderButtonText}Popular</button>
        <div className="dropdown-content" id="orderDropdown">
          <ul>
            <li onClick={handleListChoice}><button value="AddedDate" className="dropdown-span">Date Added</button></li>
            <li onClick={handleListChoice}><button value="Name" className="dropdown-span">Name</button></li>
            <li onClick={handleListChoice}><button value="ReleaseDate" className="dropdown-span">Release Date</button></li>
            <li onClick={handleListChoice}><button value="Popular" className="dropdown-span">Popularity</button></li>
            <li onClick={handleListChoice}><button value="AvgRating" className="dropdown-span">Average Rating</button></li>
          </ul>
        </div>
      </div>
        
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