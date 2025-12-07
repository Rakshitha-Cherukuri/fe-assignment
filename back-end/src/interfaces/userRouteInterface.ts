// Define request parameter interfaces
export interface UsernameParams {
  username: string;
}

export interface EmailParams {
  email: string;
}

export interface UserIdParams {
  id: string;
}

// Define request body interfaces
export interface UpdateUserBody {
  username?: string;
  email?: string;
  phoneNumber?: string;
}

// Define response interfaces
export interface UserResponse {
  id: number;
  username: string;
  email: string;
  phoneNumber: string;
}

export interface SuccessResponse {
  message: string;
}

export interface ErrorResponse {
  error: string;
}