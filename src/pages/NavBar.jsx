import { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";
import "../styles/NavBar.css";
import "../index.css"; 


const NavBar = () => {
  const { user, setUser } = useContext(UserContext);

  const handleSignOut = () => {
    sessionStorage.removeItem("user"); // ✅ Clears user session data
    localStorage.removeItem("token"); // ✅ Removes token
    setUser(null); // ✅ Clears user state
  };




  return (
    <nav>
      {user ? (
        <>
          <div className="welcome"></div>
          <ul className="nav-links fixed top-0 inset-x-0 z-50 text-gray-200 bg-[#2a3950] py-8 mb-4 h-14 flex items-center">
            <li><Link to="/pages/dashboard">Dashboard</Link></li>
            <li><Link to="/pages/about">About Us</Link></li>
            <li><Link to="/pages/services">Services</Link></li>
            <li><Link to="/pages/products">Products</Link></li>
            <li><Link to="/pages/productform">Add Products</Link></li>
            <li><Link to="/pages/contact">Contact Us</Link></li>
            <li><Link to="/" onClick={handleSignOut}>Sign Out</Link></li>
          </ul>
        </>
      ) : (
        <ul className="nav-links fixed top-0 inset-x-0 z-50 text-gray-200 bg-[#2a3950] py-8 mb-4 h-14 flex items-center">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/pages/loginpage">Login</Link></li>
          <li><Link to="/pages/registerpage">Register</Link></li>
        </ul>
      )}
    </nav>
  );
};

export default NavBar;
