import Task, { ITask } from "../models/task";
import { Status } from "../enums/Status";

export class TaskService {
  /**
   * Get all non-deleted tasks for a specific user
   */
  async getTasks(userId: string): Promise<ITask[]> {
    return await Task.find({ 
      createdBy: userId, 
      deleted: false 
    }).sort({ createdAt: -1 }); // Most recent first
  }

  /**
   * Get a single non deleted task by ID 
   */
  async getTaskById(taskId: string, userId: string): Promise<ITask | null> {
    return await Task.findOne({ 
      _id: taskId, 
      createdBy: userId,
      deleted: false 
    });
  }

  /**
   * Create a new task
   */
  async addTask(userId: string, taskData: Partial<ITask>): Promise<ITask> {
    if (!taskData.title || taskData.title.trim() === "") {
      throw new Error("Task title is required");
    }

    const newTask = await Task.create({
      ...taskData,
      title: taskData.title.trim(),
      createdBy: userId,
      status: Status.PENDING,
      deleted: false
    });

    return newTask;
  }

  /**
   * Update an existing task 
   */
  async updateTask( taskId: string, userId: string, updates: Partial<ITask> ): Promise<ITask | null> {
    
    if (updates.title !== undefined && updates.title.trim() === "") {
      throw new Error("Title cannot be empty");
    }

    // to prevent updating protected fields
    const allowedUpdates = {
      title: updates.title?.trim(),
      description: updates.description?.trim(),
      dueDate: updates.dueDate,
      priority: updates.priority,
      status: updates.status
    };

    // to remove undefined values
    Object.keys(allowedUpdates).forEach(key => 
      allowedUpdates[key as keyof typeof allowedUpdates] === undefined && 
      delete allowedUpdates[key as keyof typeof allowedUpdates]
    );

    const updatedTask = await Task.findOneAndUpdate(
      { _id: taskId, createdBy: userId, deleted: false },
      { $set: allowedUpdates },
      { new: true, runValidators: true }
    );

    return updatedTask;
  }

  /**
   * to delete a task (mark as deleted)
   */
  async deleteTask(taskId: string, userId: string): Promise<ITask | null> {
    const deletedTask = await Task.findOneAndUpdate(
      { _id: taskId, createdBy: userId, deleted: false },
      { $set: { deleted: true } },
      { new: true }
    );

    return deletedTask;
  }

  /**
   * to mark a task as completed
   */
  async markCompleted(taskId: string, userId: string): Promise<ITask | null> {
    const completedTask = await Task.findOneAndUpdate(
      { _id: taskId, createdBy: userId, deleted: false },
      { $set: { status: Status.COMPLETED } },
      { new: true }
    );

    return completedTask;
  }

  /**
   * Get tasks by status
   */
  async getTasksByStatus(userId: string, status: Status): Promise<ITask[]> {
    return await Task.find({ 
      createdBy: userId, 
      status,
      deleted: false 
    }).sort({ createdAt: -1 });
  }
}