import { useEffect, useState } from "react";
import { getPopularGames } from "../api/RAWG";
import GameCard from "../components/GameCard";

const GameList = () => {
  const [games, setGames] = useState([]);
  const [listChoice, setListChoice] = useState(getPopularGames());
  
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
        setListChoice(getPopularGames);
        break;
      default:
        setListChoice(getPopularGames);
        break;
    }
  };

  function toggleDropdown() {
    document.getElementById("orderDropdown").classList.toggle("show");
  }

  function sayHi() {
    alert("Say hi");
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
        <button className="dropdownBtn" onClick={toggleDropdown}>Order By:</button>
        <div className="dropdown-content" id="orderDropdown">
          <ul>
            <li onClick={sayHi}><span className="dropdown-span">Date Added</span></li>
            <li onClick={sayHi}><span className="dropdown-span">Name</span></li>
            <li onClick={sayHi}><span className="dropdown-span">Release Data</span></li>
            <li onClick={sayHi}><span className="dropdown-span">Popularity</span></li>
            <li onClick={sayHi}><span className="dropdown-span">Average Rating</span></li>
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