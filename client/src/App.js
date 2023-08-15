import GameList from './pages/GameList';
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Welcome to Game Tracker</h1>

      <BrowserRouter>
        <Link to="/catalog/games">
          <p>Click here to see Games!</p>
        </Link>
        <Routes>
          <Route 
            path="/"
          />
          <Route 
            path='/catalog/games'
            element={GameList}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
