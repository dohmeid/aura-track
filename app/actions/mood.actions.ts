'use server';
import { revalidatePath } from 'next/cache';
import { getCurrentUser } from './auth.actions';
import Mood from '@/lib/models/mood.model';
import dbConnect from '@/lib/mongodb';
import { MoodFormState } from '@/lib/types';

export async function saveMood(
  prevState: MoodFormState,
  formData: FormData
): Promise<MoodFormState> {
  try {
    await dbConnect();

    const user = await getCurrentUser();
    if (!user) {
      return {
        success: false,
        message: 'You must be logged in to save a mood entry.',
      };
    }

    // --- Data Extraction & Parsing ---
    
    // Helper to safely parse numbers
    const getNumber = (key: string, defaultVal: number) => {
      const val = formData.get(key);
      if (!val) return defaultVal;
      const parsed = Number(val);
      return isNaN(parsed) ? defaultVal : parsed;
    };

    // Helper to parse comma-separated lists
    const getArray = (key: string) => {
      const val = formData.get(key);
      if (!val || typeof val !== 'string') return [];
      return val.split(',').filter((item) => item.trim().length > 0);
    };

    const moodScore = getNumber('moodScore', 0); // Default 0 to trigger validation
    const sleepHours = getNumber('sleepHours', 7);
    const energyLevel = getNumber('energyLevel', 50);
    
    const emotion = formData.get('moodEmotion') as string;
    const description = formData.get('moodDescription') as string;

    const moodTriggers = getArray('moodTriggers');
    const copingActions = getArray('copingActions');
    const activities = getArray('activities');

    // --- Validation Logic ---

    if (moodScore < 1 || moodScore > 10) {
      return {
        success: false,
        message: 'Please select a valid mood score between 1 and 10.',
      };
    }

    if (!emotion || emotion.trim() === '') {
      return {
        success: false,
        message: 'Please select an emotion that best describes your state.',
      };
    }

    // --- Database Operation ---

    const moodEntry = new Mood({
      userId: user.userId,
      moodScore,
      emotion: emotion, // Mapped to 'emotion' in logic, but ensure model matches schema (moodEmotion in your model?)
      moodEmotion: emotion, // Covering both bases based on your schema file
      moodDescription: description,
      moodTriggers,
      copingActions,
      activities,
      sleepHours,
      energyLevel,
      timestamp: new Date(),
    });

    await moodEntry.save();

    // Revalidate paths to update UI immediately
    revalidatePath('/home');
    revalidatePath('/history');
    revalidatePath('/insights');

    return {
      success: true,
      message: 'Your mood has been logged successfully! ✨',
    };
  } catch (error) {
    console.error('Error saving mood:', error);
    return {
      success: false,
      message: 'Something went wrong. Please try again later.',
    };
  }
}