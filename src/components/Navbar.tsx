import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "./Navbar.css"; //CSS

function Navbar() {
  const auth = useContext(AuthContext);

  return (
    <nav>
      <div>
        <Link to="/">Home</Link>
      </div>
      <div>
        {auth?.token ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <button onClick={auth.logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
