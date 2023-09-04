import { Link } from "react-router-dom";

function Homepage() {
  return (
    <div>
      <Link to="/catalog/games/">
        <p>Click here to see a list of games</p>
      </Link>
      <h2>Hello</h2>
    </div>
  );
}

export default Homepage;
