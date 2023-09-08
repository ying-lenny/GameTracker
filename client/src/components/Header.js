import { Link } from "react-router-dom";

function Header() {
  return (
    <div>
      <h2>Welcome to Radar</h2>
      <Link to={`/`}>
        <h2>Home</h2>
      </Link>
      <Link to={`/catalog/games/`}>
        <h2>All Games</h2>
      </Link>
    </div>
  )
}
  
export default Header;