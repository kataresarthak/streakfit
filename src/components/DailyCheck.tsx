'use client';

import { DailyCheckProps } from '@/types/workout';
import { isToday } from '@/lib/workout-utils';

export default function DailyCheck({ onWorkoutComplete, isCompleted, date }: DailyCheckProps) {
  const isTodayDate = isToday(date);
  
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 border border-slate-200">
      <div className="text-center space-y-6">
        {/* Header */}
        <div className="space-y-2">
                      <h2 className="text-3xl font-bold text-slate-900">
              {isTodayDate ? "Today&apos;s Workout" : "Daily Check"}
            </h2>
          <p className="text-slate-600">
            {isTodayDate 
              ? "Ready to crush your fitness goals today?" 
              : `Workout for ${new Date(date).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}`
            }
          </p>
        </div>

        {/* Status Indicator */}
        <div className="flex justify-center">
          {isCompleted ? (
            <div className="flex items-center space-x-3 bg-emerald-50 border border-emerald-200 rounded-full px-6 py-3">
              <div className="w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center">
                <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-emerald-800 font-semibold">Workout Completed!</span>
            </div>
          ) : (
            <div className="flex items-center space-x-3 bg-slate-50 border border-slate-200 rounded-full px-6 py-3">
              <div className="w-4 h-4 bg-slate-400 rounded-full"></div>
              <span className="text-slate-600 font-semibold">Not completed yet</span>
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="pt-4">
          {isCompleted ? (
            <div className="space-y-4">
              <button
                onClick={onWorkoutComplete}
                className="w-full bg-slate-600 text-white py-4 px-8 rounded-xl text-lg font-semibold hover:bg-slate-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                Mark as Incomplete
              </button>
                              <p className="text-sm text-slate-500">
                  Great job! You&apos;ve completed today&apos;s workout. Keep up the momentum! 💪
                </p>
            </div>
          ) : (
            <div className="space-y-4">
              <button
                onClick={onWorkoutComplete}
                className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 text-white py-6 px-8 rounded-xl text-xl font-bold hover:from-emerald-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 shadow-xl hover:shadow-2xl"
              >
                🏃‍♂️ Mark Workout Complete
              </button>
              <p className="text-sm text-slate-500">
                Click the button above to log your workout and maintain your streak!
              </p>
            </div>
          )}
        </div>

        {/* Motivational Quote */}
        {!isCompleted && (
          <div className="mt-8 p-4 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-lg border border-emerald-200">
            <p className="text-emerald-800 font-medium italic">
              &ldquo;The only bad workout is the one that didn&apos;t happen.&rdquo;
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 