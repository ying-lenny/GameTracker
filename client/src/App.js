import { BrowserRouter, Route, Routes } from "react-router-dom";
import './Styles/main.css';
import GameDetails from './pages/GameDetails';
import Homepage from './pages/Homepage';
import GameList from "./pages/GameList";

function App() {
  return (
    <div className="App">
      <h1>Welcome to Game Tracker</h1>

      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Homepage/>}/>
          <Route exact path="/catalog/game/:id" element={<GameDetails/>}/>
          <Route path="/catalog/game/devil-may-cry-5/" element={<GameDetails/>} />
          <Route path="catalog/games/" element={<GameList/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
