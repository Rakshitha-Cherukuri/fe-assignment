import { Priority } from "../enums/Priority";
import { Status } from "../enums/Status";

// request parameter interfaces
export interface UserParams {
  userId: string;
}

export interface TaskParams {
  userId: string;
  taskId: string;
}

// Define request body interfaces
export interface CreateTaskBody {
  title: string;
  description?: string;
  dueDate?: Date;
  priority?: Priority;
  status?: Status;
}

export interface UpdateTaskBody {
  title?: string;
  description?: string;
  dueDate?: Date;
  priority?: Priority;
  status?: Status;
  deleted?: boolean;
}

// Define response interfaces
export interface TaskResponse {
  taskId: string;
  title: string;
  description?: string;
  dueDate?: Date;
  priority?: Priority;
  status?: Status;
  createdBy: string;
  deleted: boolean;
}

export interface TasksResponse extends Array<TaskResponse> {}

export interface SuccessResponse {
  message: string;
}

export interface ErrorResponse {
  error: string;
}