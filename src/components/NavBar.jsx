import "../styles/navbar.css";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NavBar = () => {
  const { logout, user } = useAuth();

  return (
    <nav>
      {user ? (
        <>
          <NavLink to="/">Country List</NavLink>
          <NavLink to="/students">Student List</NavLink>
          <NavLink to="/add-country">Add New Country</NavLink>
          <NavLink to="/add-student">Add New Student</NavLink>
          <p onClick={logout}>Logout</p>
        </>
      ) : (
        <NavLink to="/login">Login</NavLink>
      )}
    </nav>
  );
};

export default NavBar;
