'use client';

import { useState } from 'react';
import { Workout, WorkoutType, WorkoutIntensity } from '@/types/workout';
import { WORKOUT_TYPES, formatDuration } from '@/lib/workout-utils';

interface WorkoutTrackerProps {
  onWorkoutAdd?: (workout: Workout) => void;
}

export default function WorkoutTracker({ onWorkoutAdd }: WorkoutTrackerProps) {
  const [workoutType, setWorkoutType] = useState<WorkoutType>('cardio');
  const [duration, setDuration] = useState(30);
  const [intensity, setIntensity] = useState<WorkoutIntensity>('medium');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newWorkout: Workout = {
      id: Date.now().toString(),
      userId: 'user-1', // This would come from auth
      date: new Date().toISOString().split('T')[0],
      type: workoutType,
      duration,
      intensity,
      notes: notes.trim() || undefined,
      completed: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    onWorkoutAdd?.(newWorkout);
    
    // Reset form
    setDuration(30);
    setNotes('');
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Log Your Workout</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Workout Type */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3">
            Workout Type
          </label>
          <div className="grid grid-cols-3 gap-3">
            {Object.entries(WORKOUT_TYPES).map(([type, info]) => (
              <button
                key={type}
                type="button"
                onClick={() => setWorkoutType(type as WorkoutType)}
                className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                  workoutType === type
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="text-2xl mb-1">{info.icon}</div>
                <div className="text-xs font-medium">{info.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Duration */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Duration: {formatDuration(duration)}
          </label>
          <input
            type="range"
            min="5"
            max="180"
            step="5"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-slate-500 mt-1">
            <span>5m</span>
            <span>3h</span>
          </div>
        </div>

        {/* Intensity */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3">
            Intensity
          </label>
          <div className="flex gap-3">
            {(['low', 'medium', 'high'] as const).map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => setIntensity(level)}
                className={`flex-1 py-2 px-4 rounded-lg border-2 transition-all duration-200 ${
                  intensity === level
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <span className="capitalize font-medium">{level}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Notes (optional)
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="How did your workout feel? Any achievements?"
            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none"
            rows={3}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-emerald-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-emerald-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
        >
          Log Workout
        </button>
      </form>
    </div>
  );
} 