import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "../styles/login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { login, user } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formData, setLoading, setError);
  };

  return (
    <>
      {error ? (
        <p>Error: {error} </p>
      ) : (
        <section className="login">
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">
              Email Address{" "}
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </label>
            <label htmlFor="password">
              Password{" "}
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </label>
            <button disabled={loading} type="submit">
              Log In
            </button>
          </form>
          {user ? <p>Welcome {user.name}</p> : null}
        </section>
      )}
    </>
  );
};

export default Login;
