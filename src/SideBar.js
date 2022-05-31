import { NavLink } from "react-router-dom";
import { HomeIcon, ListIcon } from "./TwitterIcons";

function SideBar() {
  return (
    <div className="sidebar">
      {/* SideBar */}
      <nav>
        <div className="sidebar-item">
          <NavLink to={'/'}>
            <HomeIcon /> Home
          </NavLink>
        </div>
        <div className="sidebar-item">
          <NavLink to={'/lists'}>
            <ListIcon /> Lists
          </NavLink>
        </div>
      </nav>
    </div>
  );
}

export default SideBar;
