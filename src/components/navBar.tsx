const Navbar: React.FC = () => {
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
          <button>Sign up</button>
          <button>Login</button>
        </div>
      </nav>
    );
  };
  
  export default Navbar;