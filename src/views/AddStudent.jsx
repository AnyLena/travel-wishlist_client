import "../styles/addstudent.css";
import { SERVER } from "../constants/server.js";
import { useEffect, useState } from "react";
import axios from 'axios'

const AddStudent = () => {
  const [status, setStatus] = useState(null);
  const [studentname, setStudentname] = useState();
  const [firstname, setFirstname] = useState();
  const [email, setEmail] = useState();
  const [countryId, setCountryId] = useState();
  const [countryList, setCountryList] = useState([]);

  const countryData = async () => {
    try {
      const response = await axios.get(`${SERVER}/countries?sort=true`);
      setCountryList(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    const response = await fetch(`${SERVER}/students`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    setStudentname("");
    setFirstname("");
    setEmail("");
    setCountryId("");
    const result = await response.json();
    setStatus(result);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setStatus(null);
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [status]);

  useEffect(() => {
    countryData();
  }, []);

  return (
    <section className="student-section">
      <form onSubmit={handleSubmit}>
        <label htmlFor="studentname">
          Last Name:{" "}
          <input
            type="text"
            id="studentname"
            name="name"
            value={studentname}
            onChange={(e) => setStudentname(e.target.value)}
          />
        </label>
        <label htmlFor="studentfirstname">
          First Name:{" "}
          <input
            type="text"
            name="first_name"
            id="studentfirstname"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
        </label>
        <label htmlFor="email">
          E-Mail Address:{" "}
          <input
            type="text"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label htmlFor="country">
          Choose a Country:{" "}
          <select
            name="country"
            id="country"
            value={countryId}
            onChange={(e) => setCountryId(e.target.value)}
          >
            {countryList.length > 0 ? (
              countryList.map((country, index) => (
                <option key={index} value={country._id}>{country.name}</option>
              ))
            ) : (
              <></>
            )}
          </select>
        </label>
        <button type="submit">Submit New Student</button>
      </form>

      {status ? <p className="success">{status.message}</p> : null}
    </section>
  );
};

export default AddStudent;
