import "./header.css";   
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import { useState, useEffect } from "react";

const API_URL = "http://localhost:3000/api";

export function Header() {
    const navigate = useNavigate(); 
    const location = useLocation();
    const { user, token, logout } = useAuth();
    const [avatar, setAvatar] = useState("../src/assets/userIcon.png");

    useEffect(() => {
        if (user && token) {
            // Check localStorage first
            const cachedAvatar = localStorage.getItem("userAvatar");
            if (cachedAvatar) {
                setAvatar(cachedAvatar);
            }
            fetchAvatar();
        } else {
            setAvatar("../src/assets/userIcon.png");
            localStorage.removeItem("userAvatar");
        }
    }, [user, token, location.pathname]); // Re-fetch when route changes

    const fetchAvatar = async () => {
        if (!token) return;
        
        try {
            const response = await fetch(`${API_URL}/profile`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const data = await response.json();
                const avatarUrl = data.avatar || "../src/assets/userIcon.png";
                setAvatar(avatarUrl);
                localStorage.setItem("userAvatar", avatarUrl);
            }
        } catch (error) {
            console.error("Failed to fetch avatar:", error);
        }
    };

    const handleAuthAction = () => {
        if (user) {
            logout();
            navigate('/login');
        } else {
            navigate('/login');
        }
    };

    if ( user ) {
        return (
            <header>
                <div id="header1">
                    <div id="name">
                        <img id="image1" src="../src/assets/logo.png" alt="Logo"></img>
                        <div id="task-master-name">Task Master</div>
                    </div>
                    <div id="logo">
                        <button 
                            id="login-name"
                            onClick={handleAuthAction}
                        >
                            Logout
                        </button>
                        <img 
                            id="image2" 
                            src={avatar} 
                            alt="User Icon"
                            onClick={() => user && navigate('/profile')}
                            style={{ cursor: user ? "pointer" : "default" }}
                        />
                    </div>
                </div>
            </header>
        );
    } else {
        return (
            <header>
                <div id="header1">
                    <div id="name">
                        <img id="image1" src="../src/assets/logo.png" alt="Logo"></img>
                        <div id="task-master-name" onClick={() => navigate('/tasks')}>Task Master</div>
                    </div>
                </div>
            </header>
        );
    }
    
}