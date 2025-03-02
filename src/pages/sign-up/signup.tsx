import Navbar from "../../components/navBar";

interface headerType {
    theme: boolean;
    // setTheme: (theme: boolean) => void;
}
const Signup: React.FC = () => {
  return (
    <div className="login-container">
      <Navbar />
      <div className="scanner-overlay"></div>
      <div className="login-box">
        <h2>IntelliDetect Sign Up</h2>
        <form>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" placeholder="Enter your username" />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Enter your email" />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Enter your password" />
          </div>
          <button type="submit" className="login-button">Sign Up</button>
        </form>
      </div>
    </div>
  );
};
export default Signup;