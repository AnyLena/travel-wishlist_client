import "./styles/App.css";
import Countries from "./views/Countries";
import Country from "./views/Country";
import AddCountry from "./views/AddCountry";
import AddStudent from "./views/AddStudent";
import Students from "./views/Students";
import NavBar from "./components/NavBar";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <NavBar />
      <h1>Travel Wish List</h1>
      <Routes>
        <Route path="/" element={<Countries />} />
        <Route path="/countries/:name/:id" element={<Country />} />
        <Route path="/students" element={<Students />} />
        <Route path="/add-country" element={<AddCountry />} />
        <Route path="/add-student" element={<AddStudent />} />
      </Routes>
    </>
  );
}

export default App;
