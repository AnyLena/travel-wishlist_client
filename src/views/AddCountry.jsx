import "../styles/addcountry.css";
import { useEffect, useState } from "react";

const AddCountry = () => {
  const [status, setStatus] = useState(null);
  const [countryname, setCountryname] = useState();
  const [alpha2Code, setAlpha2Code] = useState();
  const [alpha3Code, setAlpha3Code] = useState();

  const server = import.meta.env.VITE_SERVER

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    const response = await fetch(`${server}/countries/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    setCountryname('');
    setAlpha2Code('');
    setAlpha3Code('');
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

  return (
    <section className="country-section">
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Country Name:{" "}
          <input type="text" id="name" name="name" value={countryname} onChange={e => setCountryname(e.target.value)}/>
        </label>
        <label htmlFor="alpha2Code">
          Alpha-2 Code:{" "}
          <input
            type="text"
            name="alpha2Code"
            id="alpha2Code"
            value={alpha2Code} onChange={e => setAlpha2Code(e.target.value)}
          />
        </label>
        <label htmlFor="alpha3Code">
          Alpha-3 Code:{" "}
          <input
            type="text"
            name="alpha3Code"
            id="alpha3Code"
            value={alpha3Code} onChange={e => setAlpha3Code(e.target.value)}
          />
        </label>
        <button type="submit">Submit New Country</button>
      </form>

      {status ? <p className="success">{status.message}</p> : null}
    </section>
  );
};

export default AddCountry;
