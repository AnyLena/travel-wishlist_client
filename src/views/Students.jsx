import { useState, useEffect } from "react";
import { SERVER } from "../constants/server.js";
import axios from "axios";
import "../styles/students.css";
import StudentList from "../components/StudentList.jsx";

const Students = () => {
  const [students, setStudents] = useState([]);

  const studentData = async () => {
    try {
      const response = await axios.get(`${SERVER}/students?sort=true`);
      setStudents(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    studentData();
  }, []);

  return (
    <>
      {students ? <StudentList students={students}/> : null}
    </>
  );
};

export default Students;
