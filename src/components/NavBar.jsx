import "../styles/navbar.css";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NavBar = () => {
  const { logout, user } = useAuth();
  console.log(user);

  return (
    <nav>
      {user ? (
        <>
          <NavLink to="/">Country List</NavLink>
          <NavLink to="/students">Student List</NavLink>
        </>
      ) : null }
      {user && user.admin ? (
        <>
          <NavLink to="/add-country">Add New Country</NavLink>
          <NavLink to="/add-student">Add New Student</NavLink>
         
        </>
      ) : null}
       {user ? (
        <>
           <p onClick={logout}>Logout</p>
        </>
      ) : null }
       {user ? null : (
        <NavLink to="/login">Login</NavLink>
      )}
    </nav>
  );
};

export default NavBar;
