import mongoose, { Schema, Document } from 'mongoose'

// This file defines the User model for MongoDB.
export interface IUser extends Document {
  username: string
  email: string
  passwordHash: string // for security, we store the hash of the password not the password itself
  birthDate: Date
  createdAt: Date
  updatedAt: Date
}

const userSchema: Schema<IUser> = new Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
      trim: true,
      minlength: [3, 'Username must be at least 3 characters long.']
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        'Please provide a valid email address.'
      ]
    },
    passwordHash: {
      type: String,
      required: [true, 'Password is required'],
      select: false
    },
    birthDate: {
      type: Date,
      required: [true, 'Birth date is required']
    }
  },
  {
    // Automatically add `createdAt` and `updatedAt` timestamps.
    timestamps: true
  }
)

/**
 * In a serverless environment like Next.js, we need to check if the model
 * has already been compiled to avoid Mongoose errors during hot-reloading.
 *
 * If `mongoose.models.User` exists, we use it.
 * If not, we create it using `mongoose.model('User', userSchema)`.
 */
const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema)

export default User
