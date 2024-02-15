import Countries from "../views/Countries";
import Country from "../views/Country";
import AddCountry from "../views/AddCountry";
import AddStudent from "../views/AddStudent";
import Students from "../views/Students";
import Login from "../views/Login";

export const publicRoutes = [{ path: "/login", element: <Login /> }];

export const privateRoutes = [
  { path: "/", element: <Countries /> },
  { path: "/countries/:name/:id", element: <Country /> },
  { path: "/students", element: <Students /> },
  { path: "/add-country", element: <AddCountry /> },
  { path: "/add-student", element: <AddStudent /> },
];

export const adminRoutes = [
  { path: "/add-country", element: <AddCountry /> },
  { path: "/add-student", element: <AddStudent /> },
];