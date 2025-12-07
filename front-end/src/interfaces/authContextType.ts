import type { User } from "./userInterface";

export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (username: string, email: string, phone: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}