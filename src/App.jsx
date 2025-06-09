import './App.css';
import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthContext from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Products from "./pages/Products";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import NavBar from "./pages/NavBar";
import ProductForm from "./pages/ProductForm";

const ProtectedRoute = ({ children }) => {
  const { token } = useContext(AuthContext);
  return token ? children : <Navigate to="/pages/loginpage" />;
};

function App() {
  const { token } = useContext(AuthContext);

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/pages/loginpage" element={<LoginPage />} />
        <Route path="/pages/registerpage" element={<RegisterPage />} />
        <Route path="/pages/about" element={<About />} />
        <Route path="/pages/products" element={<Products />} />
        <Route path="/pages/productform" element={<ProductForm />} />
        <Route path="/pages/services" element={<Services />} />
        <Route path="/pages/contact" element={<Contact />} />
        <Route path="/pages/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to={token ? "/pages/dashboard" : "/pages/loginpage"} />} />
      </Routes>


      <div>
        <img src="/images/cropFooter.png" alt="Green crops growing under a bright sky" className="cropImage" />
      </div>
      <div className="Body bg-gray-300">
        <div className="footer-container">
          <div className="footer-item flex flex-col text-s justify-start p-4">
            <p>Member of the community since 1955</p>
            <p>Tulelake, California <a href="tel:15355551234">(535) 555-1234</a></p>
            <p>Macdoel, California <a href="tel:15355551234">(535) 555-1234</a></p>
            <p>Susanville, California <a href="tel:15302546867">(530) 254-6867</a></p>
          </div>
          <div className="footer-item flex flex-col text-s justify-start p-4">
            <p>Specializing In:</p>
            <p>Trees and Large Growth Boundaries</p>
            <p>Commercial Nursery Supply</p>
            <p>Exotic Plants</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;