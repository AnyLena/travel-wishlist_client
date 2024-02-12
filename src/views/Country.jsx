import axios from "axios";
import { useState, useEffect } from "react";
import { SERVER } from "../constants/server.js";
import { useParams } from "react-router-dom";
import StudentList from "../components/StudentList.jsx";
import "../styles/students.css";

const Country = () => {
  const [students, setStudents] = useState([]);

  const { name, id } = useParams();

  const studentList = async () => {
    try {
      const response = await axios.get(`${SERVER}/students?country=${id}`);
      setStudents(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    studentList();
  }, []);
  return (
    <>
    <h2>{name}</h2>
     {students.length > 0 ? <StudentList students={students}/> : <div style={{ textAlign: 'center'}}>No students available.</div>}
    </>
  );
};

export default Country;
