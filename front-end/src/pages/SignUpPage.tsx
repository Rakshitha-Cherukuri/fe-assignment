import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { useAuth } from "../contexts/authContext";
import "./SignUpPage.css";

const SignUpPage = () => {
    const navigate = useNavigate();
    const { signup } = useAuth();
    
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        phone: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        setError(""); 
    };

    const handleSignUp = async () => {
        //validation
        if (!formData.username || !formData.email || !formData.phone || !formData.password) {
            setError("All fields are required");
            return;
        }

        setIsLoading(true);
        setError("");

        try {
            await signup(formData.username, formData.email, formData.phone, formData.password);
            navigate("/tasks"); // Redirect to tasks page after successful signup
        } catch (err: any) {
            setError(err.message || "Signup failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Header />
            <div className="signup-container">
                <h2>Create an account</h2>

                {error && <div className="error-message">{error}</div>}

                <InputField
                    label=""
                    type="text"
                    placeholder="Enter Your Username"
                    value={formData.username}
                    onChange={(e) => handleChange("username", e.target.value)}
                />

                <InputField
                    label=""
                    type="email"
                    placeholder="Enter Your Email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                />

                <InputField
                    label=""
                    type="tel"
                    placeholder="Enter Your Phone Number"
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                />

                <InputField
                    label=""
                    type="password"
                    placeholder="Enter Your Password"
                    hasEyeIcon={true}
                    value={formData.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                />

                <Button 
                    text={isLoading ? "Signing up..." : "Sign Up"} 
                    type="primary" 
                    onClick={handleSignUp}
                    disabled={isLoading}
                />

                <p className="login-text">
                    Already have an account? <span onClick={() => navigate('/login')}>Login</span>
                </p>
            </div>
            <Footer />
        </>
    );
};

export default SignUpPage;