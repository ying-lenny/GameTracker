import { Link } from "react-router-dom";

function Header() {
  return (
    <section className="header">
      <div className="header-body">
        <Link to={`/`}>
          <h3>Home</h3>
        </Link>
        <Link to={`/catalog/games/`}>
          <h3>All Games</h3>
        </Link>
        <Link to={`/catalog/genres/`}>
          <h3>Genres</h3>
        </Link>
      </div>
    </section>
  )
}
  
export default Header;