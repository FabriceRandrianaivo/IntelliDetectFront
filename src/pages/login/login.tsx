import { useState } from "react";
import Navbar from "../../components/navBar";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/store";
import { unwrapResult } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { login, setIsAuthenticated } from "../../store/features/authSlice";

interface userDetailObject {
    f_Name: string;
    l_Name: string;
    email: string;
    priority?: number;
    sk_onboard?: boolean;
    language: string;
}
interface headerType {
    theme: boolean;
    // setTheme: (theme: boolean) => void;
}
const Login = (props: headerType) => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [isEmailValid, setIsEmailValid] = useState<boolean | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [showLoading, setShowLoading] = useState(false);


    //Formalization of email data
    const validateEmail = async (inputEmail: string): Promise<void> => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setIsEmailValid(emailRegex.test(inputEmail));
        if (!emailRegex.test(inputEmail)) {
            await new Promise((resolve) => setTimeout(resolve, 1500));
        }
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isEmailValid) await validateEmail(email);
        if (isEmailValid && password.length > 0) {
            setShowLoading(true);
            dispatch(login({ email, password }))
                .then(unwrapResult)
                .then((originalPromiseResult) => {
                    const token = originalPromiseResult.token;
                    Cookies.set("user", token, { expires: 1 });
                    const userDetail: userDetailObject = {
                        f_Name: originalPromiseResult.first_name,
                        l_Name: originalPromiseResult.last_name,
                        email: originalPromiseResult.email,
                        language: originalPromiseResult.language,
                    };
                    Cookies.set("userDetail", JSON.stringify([userDetail]), { expires: 1 });
                    dispatch(setIsAuthenticated(originalPromiseResult));
                    // const API_BASE_URL = import.meta.env.VITE_API_SERVER_URL;
                    // fetchEventSource(`${API_BASE_URL}/notif-bo/events`, {
                    //     headers: {
                    //         Authorization: `Bearer ${token}`,
                    //     },
                
                    //     async onopen(response) {
                    //         if (response.ok) {
                    //             dispatch(setOpen(true));
                    //         }
                    //     },
                    //     onmessage(event) {
                    //         if (event.data === "true") {
                    //             dispatch(setChange(true));
                    //         }
                    //     },
                    //     onclose() {
                    //         // sse connection close
                    //     },
                    //     onerror(error) {
                    //         console.log("error see: ", error);
                    //     },
                    // });
                    navigate("/stream");
                })
                .catch((error) => {
                    console.error("Login error:", error);
                    setErrorMessage("Échec de la connexion. Vérifiez vos identifiants.");
                })
                .finally(() => setShowLoading(false));
        } else {
            setErrorMessage("Veuillez entrer un email et un mot de passe valides.");
        }
    };  


    return (
        <div className="login-container">
            <Navbar />
            <div className="scanner-overlay"></div>
            <div className="login-box">
                <h2>IntelliDetect Login</h2>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                <form onSubmit={handleLogin}>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your mail"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                validateEmail(e.target.value);
                            }}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="login-button" disabled={showLoading}>
                        {showLoading ? "Connexion..." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;