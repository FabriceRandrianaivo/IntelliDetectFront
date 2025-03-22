//import Navbar from "../../components/navBar";
import { CgProfile } from "react-icons/cg";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdMailOutline } from "react-icons/md";

interface headerType {
    theme: boolean;
    // setTheme: (theme: boolean) => void;
}
const Signup: React.FC = () => {
  return (
    <div className="login-container">
        <div className="scanner-overlay"></div>
        <div className="login-box">
          <h2>SIGN UP</h2>
          <form>
            <div className="input-group">
              <input type="text" id="username" placeholder="Enter your username" />
              <CgProfile className="icon"/>
            </div>
            <div className="input-group">
              <input type="email" id="email" placeholder="Enter your email" />
              <MdMailOutline className="icons"/>
            </div>
            <div className="input-group">
              <input type="password" id="password" placeholder="Enter your password" />
              <RiLockPasswordLine className="icone"/>
            </div>
            <button type="submit" className="login-button">Sign Up</button>
          </form>
        </div>
        </div>
  );
};
export default Signup;