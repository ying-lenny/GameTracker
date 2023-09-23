import { BrowserRouter, Route, Routes } from "react-router-dom";
import './Styles/main.css';
import GameDetails from './pages/GameDetails';
import GenreDeails from "./pages/GenreDetails";
import Homepage from './pages/Homepage';
import GameList from "./pages/GameList";
import GenreList from "./pages/GenreList";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header/>
      <div className="body">
        <Routes>
          <Route exact path="/" element={<Homepage/>}/>
          <Route path="/catalog/games/" element={<GameList/>}/>
          <Route exact path="/catalog/game/:id" element={<GameDetails/>}/>
          <Route path="/catalog/genres/" element={<GenreList/>}/>
          <Route exact path="/catalog/genre/:id" element={<GenreDeails/>}/>
        </Routes>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
