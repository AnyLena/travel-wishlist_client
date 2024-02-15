import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/countries.css";
import { Link } from "react-router-dom";

const Countries = () => {
  const [countries, setCounbtries] = useState([]);

  const server = import.meta.env.VITE_SERVER

  const countryData = async () => {
    try {
      const response = await axios.get(`${server}/countries?sort=true`);
      setCounbtries(response.data);
    } catch (error) {
      console.log(error.message);
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
                <Link to={`/countries/${country.name}/${country._id}`} >
                <div key={country.alpha2Code} className="country-item">
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
                <Link to={`/countries/${country.name}/${country._id}`} >
                <div key={country.alpha2Code} className="country-item">
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
    </section>
  );
};

export default Countries;
