import mongoose from 'mongoose';

// This file defines the Mood model for MongoDB.
const moodSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  moodScore: {
    type: Number,
    min: 1,
    max: 10,
    default: 5,
    required: true,
  },
  moodEmotion: {
    type: String,
    required: true,
  },
  moodDescription: String,
  moodTriggers: [String],
  copingActions: [String],
  activities: [String],
  sleepHours: {
    type: Number,
    min: 0,
    max: 24,
    default: 7,
  },
  energyLevel: {
    type: Number,
    min: 0,
    max: 100,
    default: 50,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Model = mongoose.models.Mood || mongoose.model('Mood', moodSchema);
export default Model;
