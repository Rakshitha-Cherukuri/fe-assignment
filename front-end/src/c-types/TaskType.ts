import { Priority } from "../enums/Priority";
import { Status } from "../enums/Status";

export type Task = {
    taskId: string;
    title: string;
    description?: string;
    dueDate?: string;
    priority: Priority;
    status: Status;
    createdBy: string;
    deleted: boolean;
}