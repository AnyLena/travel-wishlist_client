
import '../styles/navbar.css'
import {NavLink} from 'react-router-dom'

const NavBar = () => {
  return (
    <nav>
      <NavLink to="/">Country List</NavLink>
      <NavLink to="/students">Student List</NavLink>
      <NavLink to="/add-country">Add New Country</NavLink>
      <NavLink to="/add-student">Add New Student</NavLink>
    </nav>
  );
};

export default NavBar;
