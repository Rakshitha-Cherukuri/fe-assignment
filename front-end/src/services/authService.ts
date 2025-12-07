const API_URL = "http://localhost:3000/api";

export const authService = {
  async signup(username: string, email: string, phone: string, password: string) {
    const response = await fetch(`${API_URL}/auth/signup`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json" 
      },
      body: JSON.stringify({ username, email, phone, password }),
    });
    return response.json();
  },
   
  async login(email: string, password: string) {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST", 
      headers: { 
        "Content-Type": "application/json" 
      },
      body: JSON.stringify({ email, password }),
    });
    return response.json();
  }
};  