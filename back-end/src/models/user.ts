import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  phoneNumber: string;
  password: string;
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      trim: true,
      minlength: [3, 'Username must be at least 3 characters'],
      maxlength: [50, 'Username cannot exceed 50 characters']
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please provide a valid email']
    },
    phoneNumber: {
      type: String,
      required: [true, 'Phone number is required'],
      match: [/^[7-9]\d{9}$/, 'Please provide a valid Indian phone number']
    },
    passwordHash: {
      type: String,
      required: [true, 'Password is required']
    }
  },
  {
    timestamps: true // Automatically adds createdAt and updatedAt
  }
);

// for faster lookups
UserSchema.index({ email: 1 });

export default mongoose.model<IUser>('User', UserSchema);