export interface User {
  userId: string;
  email: string;
  username: string;
}

export interface Mood {
  _id: string;
  userId: string;
  moodScore: number;
  moodEmotion: string;
  moodDescription: string;
  moodTriggers: string[];
  copingActions: string[];
  activities: string[];
  sleepHours: number;
  energyLevel: number;
  timestamp: Date;
}

export interface MoodFormState {
  success: boolean;
  message?: string;
  errors?: Record<string, string>;
}
