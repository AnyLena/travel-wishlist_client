import "./styles/App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { privateRoutes, publicRoutes, adminRoutes } from "./routes/routes";
import NavBar from "./components/NavBar";
import NotFound from "./views/NotFound";

function App() {
  const { token, user } = useAuth();
  console.log(user)

  return (
    <>
      <NavBar />
      <h1>Travel Wish List</h1>
      <Routes>
        {publicRoutes.map(({ path, element }) => (
          <Route
            key={path}
            path={path}
            element={!token ? element : <Navigate to="/" />}
          />
        ))}
        {privateRoutes.map(({ path, element }) => (
          <Route
            key={path}
            path={path}
            element={token ? element : <Navigate to="/login" />}
          />
        ))}
        {adminRoutes.map(({ path, element }) => (
          <Route
            key={path}
            path={path}
            element={(token && !user.admin) ? element : <Navigate to="/login" />}
          />
        ))}

        <Route path="/not-found" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/not-found" replace />} />
      </Routes>
    </>
  );
}

export default App;
