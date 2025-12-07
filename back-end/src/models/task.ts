import { Status } from "../enums/Status";
import { Priority } from "../enums/Priority";
import mongoose, { Schema, Document } from 'mongoose';

export interface ITask extends Document {
  title: string;
  description?: string;
  dueDate?: Date;
  priority: Priority;
  status: Status;
  createdBy: mongoose.Types.ObjectId;
  deleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TaskSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Task title is required'],
      trim: true,
      minlength: [1, 'Title cannot be empty'],
      maxlength: [200, 'Title cannot exceed 200 characters']
    },
    description: {
      type: String,
      trim: true,
      maxlength: [1000, 'Description cannot exceed 1000 characters']
    },
    dueDate: {
      type: Date,
      validate: {
        validator: function(value: Date) {
          return !value || value > new Date();
        },
        message: 'Due date cannot be in the past'
      }
    },
    priority: {
      type: String,
      enum: Object.values(Priority),
      default: Priority.MEDIUM,
      required: true
    },
    status: {
      type: String,
      enum: Object.values(Status),
      default: Status.PENDING,
      required: true
    },
    createdBy: {
      type: Schema.Types.ObjectId, // refers to the user
      ref: 'User',
      required: [true, 'Task must belong to a user']
    },
    deleted: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

TaskSchema.index({ createdBy: 1, deleted: 1 });
TaskSchema.index({ status: 1 });
TaskSchema.index({ dueDate: 1 });

export default mongoose.model<ITask>('Task', TaskSchema);