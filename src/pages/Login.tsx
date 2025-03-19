import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/login", { email, password });
      if (auth) {
        auth.login(res.data.token);
        navigate("/dashboard");
      }
    } catch (error) {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-sm">
        <h2 className="text-center mb-3">Login</h2>
        
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          
          <input
            type="password"
            className="form-control mb-2"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          
          <button className="btn btn-success w-100 mt-2" type="submit">
            Login
          </button>
        </form>

        {error && <p className="text-danger text-center mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default Login;
