import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/countries.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Countries = () => {
  const [countries, setCounbtries] = useState([]);
  const navigate = useNavigate();
  const [loading, setloading] = useState(true);
  const [error, setError] = useState(null);

  const { token } = useAuth();

  const server = import.meta.env.VITE_SERVER;

  const countryData = async () => {
    try {
      const response = await axios.get(`${server}/countries?sort=true`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : null,
        },
      });
      setCounbtries(response.data);
    } catch (error) {
      console.log(error.message);
      setError(error.response.data);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    countryData();
  }, []);

  return (
    <section className="countries-section">
      <h2>Countries I want to visit</h2>
      <div className="country-container">
        {countries ? (
          <>
            {countries.map((country) =>
              !country.visited ? (
                <Link
                  key={country.alpha2Code}
                  to={`/countries/${country.name}/${country._id}`}
                >
                  <div className="country-item">
                    <h3>{country.name}</h3>
                    <p>
                      {country.alpha2Code} | {country.alpha3Code}
                    </p>
                  </div>
                </Link>
              ) : null
            )}
          </>
        ) : (
          NULL
        )}
      </div>
      <h2>Countries I have visited</h2>
      <div className="country-container">
        {countries ? (
          <>
            {countries.map((country) =>
              country.visited ? (
                <Link
                  key={country.alpha2Code}
                  to={`/countries/${country.name}/${country._id}`}
                >
                  <div className="country-item">
                    <h3>{country.name}</h3>
                    <p>
                      {country.alpha2Code} | {country.alpha3Code}
                    </p>
                  </div>
                </Link>
              ) : null
            )}
          </>
        ) : (
          null
        )}
      </div>
    </section>
  );
};

export default Countries;
