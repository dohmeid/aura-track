import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI as string

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  )
}

let isConnected = false // Track the connection status

export const connectDB = async (): Promise<void> => {
  if (isConnected) {
    console.log('Using existing MongoDB connection')
    return
  }

  try {
    const mongooseInstance = await mongoose.connect(
      process.env.MONGODB_URI as string,
      {
        dbName: 'moodtracker' 
      }
    )

    isConnected = mongooseInstance.connection.readyState === 1
    console.log('✅ MongoDB connected:', mongooseInstance.connection.host)
  } catch (error) {
    console.error('❌ MongoDB connection error:', error)
    throw new Error('Failed to connect to MongoDB')
  }
}
