import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo">
          🎬 Movie Explorer
        </Link>

        <Link to="/" className="home-link">
          Home
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;