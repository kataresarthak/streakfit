'use client';

import { StreakDisplayProps } from '@/types/workout';
import { formatStreak } from '@/lib/workout-utils';

export default function StreakDisplay({ currentStreak, longestStreak }: StreakDisplayProps) {
  const getStreakEmoji = (streak: number) => {
    if (streak === 0) return '❄️';
    if (streak < 7) return '🔥';
    if (streak < 30) return '🔥🔥';
    if (streak < 100) return '🔥🔥🔥';
    return '🔥🔥🔥🔥';
  };

  const getStreakMessage = (streak: number) => {
    if (streak === 0) return "Let's start your fitness journey!";
    if (streak === 1) return "Great start! Keep it going!";
    if (streak < 7) return "You're building momentum!";
    if (streak < 30) return "Incredible consistency!";
    if (streak < 100) return "You're unstoppable!";
    return "Legendary dedication!";
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
      <div className="text-center space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-slate-900">Your Streak</h3>
          <p className="text-slate-600">Keep the momentum going!</p>
        </div>

        {/* Current Streak */}
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl p-6 border border-emerald-200">
            <div className="text-6xl mb-2">
              {getStreakEmoji(currentStreak)}
            </div>
            <div className="text-3xl font-bold text-emerald-600 mb-1">
              {currentStreak}
            </div>
            <div className="text-sm text-emerald-700 font-medium">
              {formatStreak(currentStreak)} streak
            </div>
            <div className="text-xs text-emerald-600 mt-2">
              {getStreakMessage(currentStreak)}
            </div>
          </div>

          {/* Longest Streak */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-slate-600">Longest Streak</div>
                <div className="text-xl font-bold text-slate-900">
                  {longestStreak} {longestStreak === 1 ? 'day' : 'days'}
                </div>
              </div>
              <div className="text-2xl">
                🏆
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar for Current Streak */}
        {currentStreak > 0 && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-slate-600">
              <span>Progress to next milestone</span>
              <span>{currentStreak} / {Math.max(7, Math.ceil(currentStreak / 7) * 7)}</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-emerald-500 to-blue-500 h-3 rounded-full transition-all duration-500"
                style={{ 
                  width: `${Math.min(100, (currentStreak / Math.max(7, Math.ceil(currentStreak / 7) * 7)) * 100)}%` 
                }}
              ></div>
            </div>
          </div>
        )}

        {/* Motivational Message */}
        {currentStreak === 0 ? (
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-blue-800 text-sm">
              💪 Start your streak today by completing your first workout!
            </p>
          </div>
        ) : currentStreak < longestStreak ? (
          <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
            <p className="text-emerald-800 text-sm">
              🎯 You&apos;re {longestStreak - currentStreak} {longestStreak - currentStreak === 1 ? 'day' : 'days'} away from your record!
            </p>
          </div>
        ) : (
          <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <p className="text-yellow-800 text-sm">
              🏆 New record! You&apos;re at your longest streak ever!
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 