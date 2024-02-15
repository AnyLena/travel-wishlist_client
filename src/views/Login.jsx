import "../styles/login.css";

const Login = () => {

  const server = import.meta.env.VITE_SERVER

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    const response = await fetch(`${server}/login/`)
    const result = await response.json();
  };
  return (
    <section className="login">
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Email Address <input type="text" id="name" name="name" />
        </label>
        <label htmlFor="password">
          Password <input type="text" id="password" name="password" />
        </label>
        <button type="submit">Log In</button>
      </form>
    </section>
  );
};

export default Login;
