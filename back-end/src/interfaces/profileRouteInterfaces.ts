// request parameter interfaces
export interface ProfileParams {
  userId: string;
}

// request body interfaces
export interface CreateProfileBody {
  avatar?: string;
}

export interface UpdateProfileBody {
  avatar?: string;
}

// response interfaces
export interface ProfileResponse {
  _id: string;
  userId: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SuccessResponse {
  message: string;
}

export interface ErrorResponse {
  error: string;
}