import { NavLink } from "react-router-dom";
import React from "react";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <nav className="sidebar">
      <ul className="nav-item">
        <NavLink
          className={({ isActive }) => {
            return isActive ? "nav-link active" : "nav-link";
          }}
          to="/"
        >
          &larr; <br /> Back to Home
        </NavLink>
      </ul>
      <ul className="nav-item">
        <NavLink
          className={({ isActive }) => {
            return isActive ? "nav-link active" : "nav-link";
          }}
          to="/service/rooms"
        >
          Rooms
        </NavLink>
      </ul>
      <ul className="nav-item">
        <NavLink
          className={({ isActive }) => {
            return isActive ? "nav-link active" : "nav-link";
          }}
          to="/service/cottages"
        >
          Cottages
        </NavLink>
      </ul>
    </nav>
  );
};

export default Sidebar;
