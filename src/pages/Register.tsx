import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/api";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    setError(""); // Clear previous errors
    setLoading(true);

    try {
      await registerUser(email, password);
      navigate("/login"); // Redirect to login on success
    } catch (err: any) {
      setError(err.message); // Show error message from API
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-sm">
        <h2 className="text-center mb-3">Register</h2>
        
        <input
          type="email"
          className="form-control mb-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        
        <input
          type="password"
          className="form-control mb-2"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        
        <button 
          className="btn btn-primary w-100 mt-2"
          onClick={handleRegister} 
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>

        {error && <p className="text-danger text-center mt-2">{error}</p>}
      </div>
    </div>
  );
}

export default Register;
