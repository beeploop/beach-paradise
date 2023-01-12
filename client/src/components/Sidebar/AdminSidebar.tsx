import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const AdminSidebar = () => {
  return (
    <nav className="sidebar">
      <ul className="nav-item">
        <NavLink
          className={({ isActive }) => {
            return isActive ? "nav-link active" : "nav-link";
          }}
          to="/admin/dashboard"
        >
          Dashboard
        </NavLink>
      </ul>
      <ul className="nav-item">
        <NavLink
          className={({ isActive }) => {
            return isActive ? "nav-link active" : "nav-link";
          }}
          to="/admin/rooms"
        >
          Rooms
        </NavLink>
      </ul>
      <ul className="nav-item">
        <NavLink
          className={({ isActive }) => {
            return isActive ? "nav-link active" : "nav-link";
          }}
          to="/admin/cottages"
        >
          Cottages
        </NavLink>
      </ul>
      <ul className="nav-item">
        <NavLink
          className={({ isActive }) => {
            return isActive ? "nav-link active" : "nav-link";
          }}
          to="/admin/reservations"
        >
          Reservations
        </NavLink>
      </ul>
      <ul className="nav-item">
        <NavLink
          className={({ isActive }) => {
            return isActive ? "nav-link active" : "nav-link";
          }}
          to="/admin/logout"
        >
          Logout
        </NavLink>
      </ul>
    </nav>
  );
};

export default AdminSidebar;
