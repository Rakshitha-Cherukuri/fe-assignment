import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { useAuth } from "../contexts/authContext";
import "./LoginPage.css";

const LoginPage = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        setError(""); 
    };

    const handleLogin = async () => {
        if (!formData.email || !formData.password) {
            setError("Email and password are required");
            return;
        }

        console.log("Attempting login with:", formData); 

        setIsLoading(true);
        setError("");

        try {
            // console.log(`email: ${formData.email}, password: ${formData.password}`);
            await login(formData.email, formData.password);
            navigate("/tasks");
        } catch (err: any) {
            console.error("Login error:", err); // Add this line
            setError(err.message || "Login failed. Please check your credentials.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Header />
            <div className="login-container">
                <div className="main-text">
                    <h2>Hi, Welcome Back!</h2>
                </div>

                {error && <div className="error-message">{error}</div>}

                <div className="input-fields">
                    <InputField
                        label="Email"
                        type="email"
                        placeholder="example@gmail.com"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                    />

                    <InputField
                        label="Password"
                        type="password"
                        placeholder="Enter Your Password"
                        hasEyeIcon={true}
                        value={formData.password}
                        onChange={(e) => handleChange("password", e.target.value)}
                    />
                </div>

                <div className="options">
                    <div className="remember-me"> 
                        <div className="toggle-box">
                            <input type="checkbox" className="toggle-box-box"/> 
                        </div>
                        <div className="remember-text">
                            <p>Remember Me</p>
                        </div>
                    </div>
                    <span onClick={() => navigate('')}>Forgot Password?</span>
                </div>

                <Button 
                    text={isLoading ? "Logging in..." : "Login"} 
                    type="primary" 
                    onClick={handleLogin}
                    disabled={isLoading}
                />

                <p className="signup-text">
                    Don't have an account? <span onClick={() => navigate('/signUp')}>Sign Up</span>
                </p>
            </div>
            <Footer />
        </>
    );
};

export default LoginPage;