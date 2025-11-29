'use client';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { Moon, Battery, Activity, Brain, Zap, Sparkles, Plus, X } from 'lucide-react';
import { saveMood } from '@/app/actions/mood.actions';
import SnackBar from '@/app/components/general/SnackBar';

// --- Constants ---
const EMOTIONS = [
  { label: 'Joy', emoji: '🥰', value: 'joy' },
  { label: 'Excited', emoji: '🤩', value: 'excited' },
  { label: 'Peaceful', emoji: '😌', value: 'peaceful' },
  { label: 'Motivated', emoji: '🚀', value: 'motivated' },
  { label: 'Hopeful', emoji: '✨', value: 'hopeful' },
  { label: 'Tired', emoji: '😴', value: 'tired' },
  { label: 'Anxious', emoji: '😰', value: 'anxiety' },
  { label: 'Sad', emoji: '😢', value: 'sad' },
  { label: 'Angry', emoji: '😠', value: 'angry' },
  { label: 'Overwhelmed', emoji: '🤯', value: 'overwhelmed' },
];

const SUGGESTED_TRIGGERS = ['Work', 'Family', 'Sleep', 'Weather', 'Health', 'Money'];
const SUGGESTED_COPING = ['Music', 'Walk', 'Nap', 'Reading', 'Meditation'];
const SUGGESTED_ACTIVITIES = ['Work', 'Exercise', 'Socializing', 'Gaming', 'Reading'];

// --- Helper Components ---
const Chip = ({ 
  children, 
  active, 
  onClick 
}: { 
  children: React.ReactNode; 
  active?: boolean; 
  onClick?: () => void 
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`
      px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ease-out transform
      ${active 
        ? 'bg-wistful text-white shadow-md scale-105' 
        : 'bg-white/50 text-gray-600 border border-wistful/20 hover:bg-mint-tulip/30 hover:border-wistful/50'
      }
    `}
  >
    {children}
  </button>
);

const RangeSlider = ({ 
  value, 
  min, 
  max, 
  onChange, 
  colorClass 
}: { value: number, min: number, max: number, onChange: (val: number) => void, colorClass: string }) => (
  <div className="relative w-full h-6 flex items-center">
    <input
      type="range"
      min={min}
      max={max}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-200 z-10"
      style={{
        background: `linear-gradient(to right, var(--${colorClass}) 0%, var(--${colorClass}) ${(value - min) / (max - min) * 100}%, #e5e7eb ${(value - min) / (max - min) * 100}%, #e5e7eb 100%)`
      }}
    />
    <div 
      className="absolute h-4 w-4 bg-white border-2 rounded-full shadow-md pointer-events-none transition-all duration-200"
      style={{ 
        left: `calc(${((value - min) / (max - min)) * 100}% - 8px)`,
        borderColor: `var(--${colorClass})`
      }} 
    />
  </div>
);

// --- Main Component ---
export default function MoodForm() {
  const [state, formAction] = useFormState(saveMood, { success: false, message: '' });
  const { pending } = useFormStatus();
  
  // Local state for UI feedback (Snackbar)
  const [snackState, setSnackState] = useState<{ show: boolean, msg: string, type: 'success' | 'error' }>({
    show: false, msg: '', type: 'success'
  });

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

  // Reset form on success
  useEffect(() => {
    if (state.message) {
      if (state.success) {
        setSnackState({ show: true, msg: state.message, type: 'success' });
        // Reset values
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
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setSnackState({ show: true, msg: state.message, type: 'error' });
      }
    }
  }, [state]);

  const toggleArrayItem = useCallback((key: 'moodTriggers' | 'copingActions' | 'activities', item: string) => {
    setValues(prev => {
      const arr = prev[key];
      return {
        ...prev,
        [key]: arr.includes(item) ? arr.filter(i => i !== item) : [...arr, item]
      };
    });
  }, []);

  const isValid = values.moodEmotion !== '';

  return (
    <>
      <SnackBar 
        isVisible={snackState.show} 
        message={snackState.msg} 
        type={snackState.type} 
        onClose={() => setSnackState(prev => ({ ...prev, show: false }))} 
      />

      <form action={formAction} className="space-y-6 pb-20">
        
        {/* Card 1: Main Mood */}
        <div className="bg-white/80 backdrop-blur-md rounded-[30px] p-8 shadow-sm border border-white/50 relative overflow-hidden group hover:shadow-md transition-shadow duration-300">
          <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-chantilly to-wistful opacity-50" />
          
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-chantilly/20 rounded-xl text-wistful">
              <Sparkles size={24} />
            </div>
            <h2 className="text-xl font-bold text-gray-700">How do you feel?</h2>
          </div>

          <div className="mb-8">
            <div className="flex justify-between items-end mb-4">
              <label className="text-sm font-semibold text-gray-500">Mood Score</label>
              <span className="text-2xl font-bold text-wistful">{values.moodScore}<span className="text-sm text-gray-400 font-normal">/10</span></span>
            </div>
            <RangeSlider 
              min={1} max={10} value={values.moodScore} 
              onChange={(val) => setValues(v => ({ ...v, moodScore: val }))}
              colorClass="chantilly"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-2 font-medium">
              <span>Low</span>
              <span>Neutral</span>
              <span>High</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-500 mb-4">Emotion</label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {EMOTIONS.map((e) => (
                <button
                  key={e.value}
                  type="button"
                  onClick={() => setValues(v => ({ ...v, moodEmotion: e.value }))}
                  className={`
                    flex flex-col items-center justify-center p-3 rounded-2xl border-2 transition-all duration-200
                    ${values.moodEmotion === e.value 
                      ? 'border-wistful bg-wistful/10 text-wistful transform scale-105' 
                      : 'border-transparent bg-gray-50 hover:bg-gray-100 text-gray-500 hover:scale-105'}
                  `}
                >
                  <span className="text-2xl mb-1 filter drop-shadow-sm">{e.emoji}</span>
                  <span className="text-xs font-bold">{e.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Card 2: Context */}
        <div className="bg-white/80 backdrop-blur-md rounded-[30px] p-8 shadow-sm border border-white/50 relative overflow-hidden">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-sidecar/30 rounded-xl text-gray-600">
              <Brain size={24} />
            </div>
            <h2 className="text-xl font-bold text-gray-700">Context</h2>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-500 mb-3">Triggers</label>
              <div className="flex flex-wrap gap-2">
                {SUGGESTED_TRIGGERS.map(t => (
                  <Chip key={t} active={values.moodTriggers.includes(t)} onClick={() => toggleArrayItem('moodTriggers', t)}>
                    {t}
                  </Chip>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-500 mb-3">Coping Mechanisms</label>
              <div className="flex flex-wrap gap-2">
                {SUGGESTED_COPING.map(c => (
                  <Chip key={c} active={values.copingActions.includes(c)} onClick={() => toggleArrayItem('copingActions', c)}>
                    {c}
                  </Chip>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-500 mb-2">Notes</label>
              <textarea
                value={values.moodDescription}
                onChange={(e) => setValues(v => ({ ...v, moodDescription: e.target.value }))}
                placeholder="What's on your mind?..."
                className="w-full p-4 bg-gray-50 rounded-xl border-transparent focus:bg-white focus:border-wistful focus:ring-0 transition-all text-sm resize-none h-32"
              />
            </div>
          </div>
        </div>

        {/* Card 3: Physical & Activities */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="bg-white/80 backdrop-blur-md rounded-[30px] p-6 shadow-sm border border-white/50">
              <div className="flex items-center gap-2 mb-4">
                <Moon className="w-5 h-5 text-wistful" />
                <span className="font-bold text-gray-700">Sleep</span>
              </div>
              <div className="flex items-center gap-4">
                <input 
                  type="number" 
                  min={0} max={24} step={0.5}
                  value={values.sleepHours}
                  onChange={(e) => setValues(v => ({ ...v, sleepHours: Number(e.target.value) }))}
                  className="w-20 text-center font-bold text-xl p-2 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-wistful/50"
                />
                <span className="text-sm text-gray-500">hours</span>
              </div>
           </div>

           <div className="bg-white/80 backdrop-blur-md rounded-[30px] p-6 shadow-sm border border-white/50">
              <div className="flex items-center gap-2 mb-4">
                <Battery className="w-5 h-5 text-mint-tulip" style={{ color: 'var(--mint-tulip-dark)' }} />
                <span className="font-bold text-gray-700">Energy</span>
              </div>
              <RangeSlider 
                min={0} max={100} value={values.energyLevel} 
                onChange={(val) => setValues(v => ({ ...v, energyLevel: val }))}
                colorClass="mint-tulip"
              />
              <div className="text-right mt-2 font-bold text-gray-400 text-sm">{values.energyLevel}%</div>
           </div>
        </div>

        {/* Activities */}
        <div className="bg-white/80 backdrop-blur-md rounded-[30px] p-6 shadow-sm border border-white/50">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-5 h-5 text-sidecar" style={{ color: '#d4c066' }} />
              <span className="font-bold text-gray-700">Activities</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {SUGGESTED_ACTIVITIES.map(a => (
                <Chip key={a} active={values.activities.includes(a)} onClick={() => toggleArrayItem('activities', a)}>
                  {a}
                </Chip>
              ))}
            </div>
        </div>

        {/* Hidden Inputs for Form Submission */}
        <input type="hidden" name="moodScore" value={values.moodScore} />
        <input type="hidden" name="moodEmotion" value={values.moodEmotion} />
        <input type="hidden" name="moodDescription" value={values.moodDescription} />
        <input type="hidden" name="moodTriggers" value={values.moodTriggers.join(',')} />
        <input type="hidden" name="copingActions" value={values.copingActions.join(',')} />
        <input type="hidden" name="activities" value={values.activities.join(',')} />
        <input type="hidden" name="sleepHours" value={values.sleepHours} />
        <input type="hidden" name="energyLevel" value={values.energyLevel} />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!isValid || pending}
          className={`
            w-full py-4 rounded-2xl font-bold text-white text-lg tracking-wide uppercase shadow-lg transition-all duration-300
            ${!isValid || pending 
              ? 'bg-gray-300 cursor-not-allowed shadow-none' 
              : 'bg-wistful hover:bg-chantilly hover:shadow-xl hover:-translate-y-1 active:translate-y-0'
            }
          `}
        >
          {pending ? 'Saving Aura...' : 'Log Mood'}
        </button>

      </form>
    </>
  );
}