import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import UserContext from "../context/UserContext";
import "../index.css";


const apiUrl = import.meta.env.VITE_API_URL;

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${apiUrl}/api/login`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();

      console.log("User data from API:", data.user);
      console.log("Token from API:", data.token);

      if (data.token) {
        login(data.token); // Store token in AuthContext
        setUser(data.user);
        sessionStorage.setItem("user", JSON.stringify(data.user));
        console.log("User stored in session:", sessionStorage.getItem("user"));
        navigate("/pages/dashboard");
      } else {
        setError("Invalid login credentials");
      }
    } catch (err) {
      setError("Error logging in");
    }
  };

  return (
    <>
      <h2 className="loginpage" style={{ fontFamily: "Playfair Display", fontSize: "41px", color: "white" }}>Login  Page</h2>
      <h3 className="loginpage" style={{ fontFamily: "Playfair Display", fontSize: "21px", color: "white" }}>You may use test@test.com for login and test for password - demo only</h3>
      <div className="auth-container">
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="login-grid flex items-center justify-center gap-4 border-2 border-gray-600 rounded-lg">
            <div className="login-item grid grid-cols-1 gap-y-2 border-2 border-red-600 rounded-lg p-[6px] -m-[6px]">
              <label htmlFor="email">Email</label>
              <input className="" type="email" id="email" name="email" placeholder="Email" onChange={handleChange} required />
            </div>
            <div className="login-item rounded-[var(--border-radius)] border-[3px] border-[3px] border-[color:var(--border-color)] p-[6px] -m-[6px]">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" placeholder="Password" onChange={handleChange} required />
            </div>
          </div>
          <button className="button-1 mt-4" type="submit">Login</button>
        </form>
        <p>Don't have an account? <a href="/pages/registerpage">Register</a></p>
      </div>
    </>
  );
};

export default LoginPage;
