import mongoose, { Schema, Document } from 'mongoose';

export interface IProfile extends Document {
  userId: mongoose.Types.ObjectId;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProfileSchema: Schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true
    },
    avatar: {
      type: String,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

ProfileSchema.index({ userId: 1 });

export default mongoose.model<IProfile>('Profile', ProfileSchema);