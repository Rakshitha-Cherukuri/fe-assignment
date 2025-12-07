import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { authService } from "../services/authService";
import type { User } from "../interfaces/userInterface";
import type { AuthContextType } from "../interfaces/authContextType";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedAuth = localStorage.getItem("auth");
    
    if (savedAuth) {
      try {
        const { user, token } = JSON.parse(savedAuth);
        setUser(user);
        setToken(token);
      } catch (error) {
        localStorage.removeItem("auth");
      }
    }
    setIsLoading(false);
  }, []);

  const signup = async (username: string, email: string, phone: string, password: string) => {
    const data = await authService.signup(username, email, phone, password);
    console.log(`Full response for sign up : ${JSON.stringify(data)}`);
    if (data){
      const userData = {
        userId: data.user.userId,
        username: data.user.username,
        email: data.user.email,
        phoneNumber: data.user.phoneNumber,
      };
      
      setUser(userData);
      setToken(data.token);
      const authData = { user: userData, token: data.token};
      localStorage.setItem("auth", JSON.stringify(authData));
    }
    else {
      throw new Error(data.error);
    }
  };

  const login = async (email: string, password: string) => {
    const data = await authService.login(email, password);
    console.log("\n\n Full response: ", data);
    const userData = {
      userId: data.user.userId,  // the returned userId is undefined
      username: data.user.username,
      email: data.user.email,
      phoneNumber: data.user.phoneNumber,
    };
    
    setUser(userData);
    setToken(data.token);
    const authData = { user: userData, token: data.token};
    localStorage.setItem("auth", JSON.stringify(authData));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("auth");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};