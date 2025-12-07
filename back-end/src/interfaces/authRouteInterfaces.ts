export interface SignupRequestBody {
  username: string;
  email: string;
  phone: string;
  password: string;
}

export interface LoginRequestBody {
  email: string;
  password: string;
}

export interface AuthResponse {
  userId: string;
  username: string;
  email: string;
  phoneNumber: string;
}

export interface ErrorResponse {
  error: string;
}