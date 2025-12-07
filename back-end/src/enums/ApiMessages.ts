export enum ApiMessages {
  // 400 errors
  INVALID_EMAIL = "Please provide a valid email",
  PASSWORD_TOO_WEAK = "Password must be at least 8 characters",
  TITLE_REQUIRED = "Task title is required",
  
  // 401 errors  
  INVALID_CREDENTIALS = "Invalid email or password",
  NO_TOKEN = "No token provided",
  INVALID_TOKEN = "Invalid or expired token",
  
  // 404 errors
  USER_NOT_FOUND = "User not found",
  TASK_NOT_FOUND = "Task not found",
  PROFILE_NOT_FOUND = "Profile not found",
  
  // 500 errors
  INTERNAL_ERROR = "Something went wrong"
}