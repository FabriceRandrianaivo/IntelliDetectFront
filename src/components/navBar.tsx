import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
    return (
      <nav className="navbar">
        <div className="logo">AI Detect</div>
        <ul className="nav-links">
          <li><a href="#">Home</a></li>
          <li><a href="#">About us</a></li>
          <li><a href="#">User-guide</a></li>
          <li><a href="#">Pricing</a></li>
        </ul>
        <div className="auth-buttons">
          <button onClick={()=>navigate("/sign-up")}>Sign up</button>
          <button onClick={()=>navigate("/login")}>Login</button>
        </div>
      </nav>
    );
  };
  
  export default Navbar;