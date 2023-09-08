import { BrowserRouter, Route, Routes } from "react-router-dom";
import './Styles/main.css';
import GameDetails from './pages/GameDetails';
import Homepage from './pages/Homepage';
import GameList from "./pages/GameList";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header/>
        <Routes>
          <Route exact path="/" element={<Homepage/>}/>
          <Route exact path="/catalog/game/:id" element={<GameDetails/>}/>
          <Route path="catalog/games/" element={<GameList/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
