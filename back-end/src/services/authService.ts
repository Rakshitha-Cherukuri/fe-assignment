import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user";

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret";

export class AuthService {

  // validating email
  isEmailValid(email: string): boolean {
    const emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  // validating phone number 
  isPhoneNumberValid(phone: string): boolean {
    const phoneNumberRegex: RegExp = /^[7-9]\d{9}$/;
    return phoneNumberRegex.test(phone);
  }

  // validation password
  isPasswordValid(password: string): boolean {
    if (password.length < 8) return false;
    if (!/[A-Z]/.test(password)) return false;
    if (!/[a-z]/.test(password)) return false;
    if (!/[0-9]/.test(password)) return false;
    if (!/[!@#$%^&*]/.test(password)) return false;
    return true;
  }

  // generating token
  generateToken(userId: string): string {
    return jwt.sign(
      { userId }, // payload
      JWT_SECRET,  // secret key
      { expiresIn: "7d" } 
    );
  }

  // verifying token
  verifyToken(token: string): any {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (error) {
      return null;
    }
  }

  async signup( username: string, email: string, phone: string, password: string ): Promise<{ user: any; token: string }> {
    
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    if (!username || username.trim() === "") {
      throw new Error("Username is required");
    }

    if (!email || email.trim() === "" || !this.isEmailValid(email)) {
      throw new Error("Invalid email address");
    }

    if (!this.isPhoneNumberValid(phone)) {
      throw new Error("Invalid phone number");
    }

    if (!this.isPasswordValid(password)) {
      throw new Error(
        "Password must be at least 8 characters with uppercase, lowercase, number, and special character (!@#$%^&*)"
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username: username.trim(),
      email: email.toLowerCase().trim(),
      phoneNumber: phone,
      passwordHash,
    });

    const token = this.generateToken((newUser._id as any).toString());

    return {
      user: 
      {
        userId: (newUser._id as any).toString(),
        username: newUser.username,
        email: newUser.email,
        phoneNumber: newUser.phoneNumber,
      },
      token
    };
  }

  async login(email: string, password: string): Promise<{ user: any; token: string } | null> {
    const user = await User.findOne({ email: email });
    
    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    
    if (!isPasswordValid) {
      return null;
    }

    const token = this.generateToken((user._id as any).toString());

    return {
      user: {
        userId: (user._id as any).toString(),
        password: user.password,
      },
      token
    };
  }
}