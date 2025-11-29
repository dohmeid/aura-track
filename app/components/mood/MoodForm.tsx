'use client';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { AlertCircle, CheckCircle2, Moon, Battery, Activity, Brain, Zap } from 'lucide-react';
import { saveMood } from '@/app/actions/mood.actions';

// constants
const EMOTIONS = [
  { label: 'Joy', emoji: ' ', value: 'joy' },
  { label: 'Excited', emoji: ' ', value: 'excited' },
  { label: 'Peaceful', emoji: ' ', value: 'peaceful' },
  { label: 'Motivated', emoji: ' ', value: 'motivated' },
  { label: 'Hopeful', emoji: ' ', value: 'hopeful' },
  { label: 'Tired', emoji: ' ', value: 'tired' },
  { label: 'Anxious', emoji: ' ', value: 'anxiety' },
  { label: 'Sad', emoji: ' ', value: 'sad' },
  { label: 'Angry', emoji: ' ', value: 'angry' },
  { label: 'Overwhelmed', emoji: ' ', value: 'overwhelmed' },
];
const COPING_ACTIONS = ['Meditation', 'Exercise', 'Music', 'Reading', 'Talking', 'Journaling', 'Napping', 'Screen Time'];
const MOOD_TRIGGERS = ['School pressure', 'Relationship issue', 'Work stress', 'Health', 'Social media', 'Loneliness', 'Money', 'Routine'];
const ACTIVITIES = ['Working', 'Studying', 'Socializing', 'Exercising', 'Relaxing', 'Hobbies', 'Chores', 'Commuting'];

// helper method
const joinArray = (arr: string[]) => arr.join(',');

// Simple presentational subcomponents
const Chip: React.FC<{
  children: React.ReactNode; active?: boolean;
  onClick?: () => void
}> = ({ children, active, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`px-4 py-2 rounded-full text-sm font-semibold border-2 transition-colors duration-200 ease-in-out whitespace-nowrap ${active ? 'bgindigo-600 text-white border-indigo-600' : 'bg-white text-clam-shell border-gray-200 hover:bg-indigo-50hover:border-indigo-300'}`}
  >
    {children}
  </button>
);

export default function MoodForm() {
  const [state, formAction] = useFormState(saveMood, { success: false });
  const { pending } = useFormStatus();
  const [values, setValues] = useState({
    moodScore: 5,
    moodEmotion: '',
    moodDescription: '',
    moodTriggers: [] as string[],
    copingActions: [] as string[],
    activities: [] as string[],
    sleepHours: 7,
    energyLevel: 50,
  });


  useEffect(() => {
    if (state.success) {
      // Reset to defaults
      setValues({
        moodScore: 5,
        moodEmotion: '',
        moodDescription: '',
        moodTriggers: [],
        copingActions: [],
        activities: [],
        sleepHours: 7,
        energyLevel: 50,
      });
      // Scroll to top for confirmation
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [state.success]);

  // Derived: form validity
  const isValid = useMemo(() => {
    if (!values.moodScore || values.moodScore < 1 || values.moodScore > 10)
      return false;
    if (!values.moodEmotion) return false;
    return true;
  }, [values.moodScore, values.moodEmotion]);


  // Toggle helpers
  const toggle = useCallback((key: 'moodTriggers' | 'copingActions' | 'activities', item: string) => {
    setValues((prev) => {
      const arr = prev[key];
      const has = arr.includes(item);
      const next = has ? arr.filter((i) => i !== item) : [...arr, item];
      return { ...prev, [key]: next };
    });
  }, []);



  return (
    <form action={formAction} className="space-y-8 pb-12" >

      {/* Status messages */}
      {state.success === false && state.message && (
        <div className="flex items-center gap-3 p-4 rounded-lg bg-red-50 text-red-800 border-2 border-red-200 shadow-sm">
          <AlertCircle className="h-5 w-5" />
          <p className="font-medium">{state.message}</p>
        </div>
      )}
      {state.success && (
        <div className="flex items-center gap-3 p-4 rounded-lg bg-green-50 text-green-800 border-2 border-green-200 shadow-sm">
          <CheckCircle2 className="h-5 w-5" />
          <div>
            <p className="font-bold">Success!</p>
            <p className="text-sm">{state.message}</p>
          </div>
        </div>
      )}

      {/* Section: Mood */}
      <div className="bg-white/90 rounded-2xl p-6 shadow-sm backdrop-blur-sm
border border-gray-100">
        <div className="flex items-center gap-3 mb-4">
          <Brain className="w-6 h-6 text-gray-600" />
          <h2 className="text-xl font-bold text-sidecar">How are you feeling today?</h2>
        </div>
        {/* Mood Score */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-(--clamshell) mb-2">Mood Score: <span className="font-bold">{values.moodScore}</
          span></label>
          <input
            type="range"
            name="moodScore"
            min={1}
            max={10}
            value={values.moodScore}
            onChange={(e) => setValues((v) => ({
              ...v, moodScore:
                Number(e.target.value)
            }))}
            className="w-full h-2 bg-gray-200 rounded-full appearance-none
cursor-pointer accent-indigo-600"
          />
        </div>
        {/* Emotions */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-[var(--clamshell)] mb-2">Select an emotion </label>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
            {EMOTIONS.map((e) => (
              <button
                key={e.value}
                type="button"
                onClick={() => setValues((v) => ({
                  ...v, moodEmotion:
                    e.value
                }))}
                className={`flex flex-col items-center gap-1 p-3 rounded-xl
border-2 transition-all ${values.moodEmotion === e.value ? 'bg-indigo-600text-white border-indigo-600' : 'bg - white text - [var(--clam-shell)] bordergray-200 hover:bg-indigo-50'}`}
              >
                <span className="text-2xl">{e.emoji}</span>
                <span className="text-xs font-semibold">{e.label}</span>
              </button>
            ))}
          </div>
          {/* Hidden input for server */}
          <input type="hidden" name="moodEmotion"
            value={values.moodEmotion} />
        </div>
        {/* Description */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-[var(--clamshell)] mb-1">Description / Journal</label>
          <textarea
            name="moodDescription"
            value={values.moodDescription}
            onChange={(e) => setValues((v) => ({
              ...v, moodDescription:
                e.target.value
            }))}
            placeholder="Write about your day..."
            className="w-full p-3 border-2 rounded-lg text-[var(--clamshell)] border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-200
transition-shadow resize-none min-h-[120px]"
          />
        </div>
        {/* Triggers & Coping Actions */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-[var(--clamshell)] mb-2">What may have caused this mood?</label>
          <div className="flex flex-wrap gap-3 mb-3">
            {MOOD_TRIGGERS.map((t) => (
              <Chip key={t} active={values.moodTriggers.includes(t)}
                onClick={() => toggle('moodTriggers', t)}>{t}</Chip>
            ))}
          </div>
          <label className="block text-sm font-medium text-[var(--clamshell)] mb-2">Did anything help you cope?</label>
          <div className="flex flex-wrap gap-3">
            {COPING_ACTIONS.map((c) => (
              <Chip key={c} active={values.copingActions.includes(c)}
                onClick={() => toggle('copingActions', c)}>{c}</Chip>
            ))}
          </div>
          {/* Hidden inputs to pass arrays to server as CSV strings */}
          <input type="hidden" name="moodTriggers"
            value={joinArray(values.moodTriggers)} />
          <input type="hidden" name="copingActions"
            value={joinArray(values.copingActions)} />
        </div>
      </div>
      {/* Activities */}
      <div className="bg-white/90 rounded-2xl p-6 shadow-sm border bordergray-100">
        <div className="flex items-center gap-3 mb-4">
          <Activity className="w-6 h-6 text-gray-600" />
          <h3 className="text-lg font-bold">Daily Activities</h3>
        </div>
        <div className="flex flex-wrap gap-3">
          {ACTIVITIES.map((a) => (
            <Chip key={a} active={values.activities.includes(a)} onClick={() => toggle('activities', a)}>{a}</Chip>
          ))}
        </div>
        <input type="hidden" name="activities"
          value={joinArray(values.activities)} />
      </div>
      {/* Physical state */}
      <div className="bg-white/90 rounded-2xl p-6 shadow-sm border bordergray-100">
        <div className="flex items-center gap-3 mb-4">
          <Zap className="w-6 h-6 text-gray-600" />
          <h3 className="text-lg font-bold">Physical State</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-[var(--clamshell)] mb-2 flex items-center gap-2"><Moon className="w-4 h-4" /> Sleep
              hours</label>
            <input
              type="number"
              name="sleepHours"
              min={0}
              max={24}
              step={0.5}
              value={values.sleepHours}
              onChange={(e) => setValues((v) => ({
                ...v, sleepHours:
                  Number(e.target.value)
              }))}
              className="w-28 p-2 border-2 rounded-lg text-(--clamshell) border-gray-200 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--clamshell)] mb-2 flex items-center gap-2"><Battery className="w-4 h-4" /> Energy
              level</label>
            <div className="flex items-center gap-4">
              <input
                name="energyLevel"
                type="range"
                min={0}
                max={100}
                value={values.energyLevel}
                onChange={(e) => setValues((v) => ({
                  ...v, energyLevel:
                    Number(e.target.value)
                }))}
                className="w-full h-2 bg-gray-200 rounded-full appearancenone cursor-pointer accent-indigo-600"
              />
              <span className="text-sm font-bold">{values.energyLevel}%</
              span>
            </div>
          </div>
        </div>
      </div>
      {/* Hidden inputs summary for server action - ensure numeric values are
strings for FormData */}
      <input type="hidden" name="moodScore"
        value={String(values.moodScore)} />
      <input type="hidden" name="sleepHours"
        value={String(values.sleepHours)} />
      <input type="hidden" name="energyLevel"
        value={String(values.energyLevel)} />
      {/* Submit */}
      <div>
        <button
          type="submit"
          disabled={!isValid || pending}
          className={`w-full py-3 rounded-xl text-white font-semibold textbase tracking-wider transition-colors duration-300 ${pending ?
            'bg-indigo-300 cursor-wait' : 'bg-indigo-600 hover:bg-indigo-700'}`}
        >
          {pending ? 'Saving...' : 'Save Entry'}
        </button>
      </div>
    </form >
  );
}