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

    // Parse numeric values safely
    const moodScore = parseInt(formData.get('moodScore') as string);
    const sleepHours = parseFloat(formData.get('sleepHours') as string) || 7;
    const energyLevel = parseInt(formData.get('energyLevel') as string) || 50;

    // Parse text values
    const emotion = formData.get('moodEmotion') as string;
    const description = formData.get('moodDescription') as string;

    // Parse array values (comma separated strings from hidden inputs)
    const parseArray = (key: string) =>
      formData
        .get(key)
        ?.toString()
        .split(',')
        .filter((t) => t.trim().length > 0) || [];

    const triggers = parseArray('moodTriggers');
    const copingActions = parseArray('copingActions');
    const activities = parseArray('activities');

    // Validation
    if (!moodScore || moodScore < 1 || moodScore > 10) {
      console.log(moodScore);
      console.log(formData.get('moodScore'));
      return {
        success: false,
        message: 'Mood score must be between 1 and 10.',
        errors: { moodScore: 'Invalid mood score' },
      };
    }

    if (!emotion) {
      return {
        success: false,
        message: 'Please select an emotion that best describes your state.',
        errors: { emotion: 'Emotion is required' },
      };
    }

    const moodEntry = new Mood({
      userId: user.userId,
      moodScore,
      emotion,
      description,
      triggers,
      copingActions,
      activities,
      sleepHours,
      energyLevel,
      timestamp: new Date(),
    });

    await moodEntry.save();

    // Revalidate pages that display mood data so they show the new entry immediately
    revalidatePath('/history');
    revalidatePath('/home');
    revalidatePath('/insights');

    return {
      success: true,
      message: 'Your emotional aura has been recorded ✨',
    };
  } catch (error) {
    console.error('Error saving mood:', error);
    return {
      success: false,
      message: 'An error occurred while saving your mood. Please try again.',
    };
  }
}
