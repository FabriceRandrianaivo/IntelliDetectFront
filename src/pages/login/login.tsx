import { CgProfile } from "react-icons/cg";
import { RiLockPasswordLine } from "react-icons/ri";

interface headerType {
    theme: boolean;
    // setTheme: (theme: boolean) => void;
}
const Login = (props: headerType) => {

    return (
        <div className="login-container">
            <div className="scanner-overlay"></div>
            <div className="login-box">
                <div className="login">
                    <h2>LOGIN</h2>
                    <form>
                        <div className="input-group">
                            <input type="text" id="username" placeholder="Username"/>
                            <CgProfile className="icon"/>
                        </div>
                        <div className="input-group">
                            <input  type="password" id="password" placeholder="Password" />
                            <RiLockPasswordLine className="icone"/>
                        </div>
                        <button type="submit" className="login-button">Login</button>              
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;