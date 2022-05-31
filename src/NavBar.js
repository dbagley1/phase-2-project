import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <div className="navbar">
      <nav className="navbar-nav">
        <div className="navlink">
          <NavLink to={'/'}>
            Home
          </NavLink>
        </div>
        <div className="navlink">
          <NavLink to={'/lists'}>
            Lists
          </NavLink>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
