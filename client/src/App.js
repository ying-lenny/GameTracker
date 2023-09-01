import GameDetails from './pages/GameDetails';
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Welcome to Game Tracker</h1>

      <BrowserRouter>
        <Link to="/catalog/game/devil-may-cry-5/">
          <p>Click here to see a game's details!</p>
        </Link>
        <Routes>
          <Route exact path="/"/>
          <Route path="/catalog/game/devil-may-cry-5/" element={<GameDetails/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
