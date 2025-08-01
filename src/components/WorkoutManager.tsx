'use client';

import { useState } from 'react';
import { useWorkoutData } from '@/hooks/useWorkoutData';
import { getTodayString } from '@/lib/workout-utils';

export default function WorkoutManager() {
  const {
    workoutData,
    isLoading,
    error,
    addWorkout,
    removeWorkout,
    getWorkouts,
    calculateCurrentStreak,
    calculateLongestStreak,
    getConsistencyPercentage,
    isTodayCompleted,
    getWorkoutCount,
    getSuccessRate,
    clearAllData,
    exportData,
    importData,
    cleanupInvalidData
  } = useWorkoutData();

  const [selectedDate, setSelectedDate] = useState(getTodayString());
  const [importDataString, setImportDataString] = useState('');

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading workout data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6">
        <h3 className="text-red-800 font-semibold mb-2">Error</h3>
        <p className="text-red-600">{error}</p>
        <button
          onClick={cleanupInvalidData}
          className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
        >
          Cleanup Invalid Data
        </button>
      </div>
    );
  }

  const todayCompleted = isTodayCompleted();
  const currentStreak = calculateCurrentStreak();
  const longestStreak = calculateLongestStreak();
  const weeklyConsistency = getConsistencyPercentage("week");
  const monthlyConsistency = getConsistencyPercentage("month");
  const workoutCount = getWorkoutCount();
  const successRate = getSuccessRate();

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Workout Manager</h2>
      
      {/* Error Display */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {/* Today's Status */}
      <div className="mb-6 p-4 bg-slate-50 rounded-lg">
        <h3 className="font-semibold text-slate-900 mb-2">Today's Status</h3>
        <div className="flex items-center justify-between">
          <span className="text-slate-600">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </span>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            todayCompleted 
              ? 'bg-emerald-100 text-emerald-800' 
              : 'bg-slate-100 text-slate-600'
          }`}>
            {todayCompleted ? '✅ Completed' : '⏳ Pending'}
          </span>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-6 space-y-3">
        <h3 className="font-semibold text-slate-900">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => addWorkout()}
            disabled={todayCompleted}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              todayCompleted
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                : 'bg-emerald-600 text-white hover:bg-emerald-700'
            }`}
          >
            {todayCompleted ? 'Already Completed' : 'Mark Today Complete'}
          </button>
          
          {todayCompleted && (
            <button
              onClick={() => removeWorkout(getTodayString())}
              className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
            >
              Mark Today Incomplete
            </button>
          )}
        </div>
      </div>

      {/* Stats Overview */}
      <div className="mb-6">
        <h3 className="font-semibold text-slate-900 mb-3">Stats Overview</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-emerald-50 rounded-lg">
            <div className="text-2xl font-bold text-emerald-600">{currentStreak}</div>
            <div className="text-sm text-emerald-700">Current Streak</div>
          </div>
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{longestStreak}</div>
            <div className="text-sm text-blue-700">Longest Streak</div>
          </div>
          <div className="text-center p-3 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">{workoutCount}</div>
            <div className="text-sm text-purple-700">Total Workouts</div>
          </div>
          <div className="text-center p-3 bg-orange-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">{successRate}%</div>
            <div className="text-sm text-orange-700">Success Rate</div>
          </div>
        </div>
      </div>

      {/* Consistency Stats */}
      <div className="mb-6">
        <h3 className="font-semibold text-slate-900 mb-3">Consistency</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-slate-50 rounded-lg">
            <div className="text-lg font-bold text-slate-900">{weeklyConsistency}%</div>
            <div className="text-sm text-slate-600">This Week</div>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg">
            <div className="text-lg font-bold text-slate-900">{monthlyConsistency}%</div>
            <div className="text-sm text-slate-600">This Month</div>
          </div>
        </div>
      </div>

      {/* Date-specific Actions */}
      <div className="mb-6">
        <h3 className="font-semibold text-slate-900 mb-3">Date-specific Actions</h3>
        <div className="flex flex-wrap gap-3 items-center">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
          <button
            onClick={() => addWorkout(selectedDate)}
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors"
          >
            Mark Complete
          </button>
          <button
            onClick={() => removeWorkout(selectedDate)}
            className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
          >
            Mark Incomplete
          </button>
        </div>
      </div>

      {/* Data Management */}
      <div className="mb-6">
        <h3 className="font-semibold text-slate-900 mb-3">Data Management</h3>
        <div className="space-y-3">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => {
                const data = exportData();
                navigator.clipboard.writeText(data);
                alert('Data copied to clipboard!');
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Export Data
            </button>
            <button
              onClick={clearAllData}
              className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
            >
              Clear All Data
            </button>
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">
              Import Data (JSON format)
            </label>
            <textarea
              value={importDataString}
              onChange={(e) => setImportDataString(e.target.value)}
              placeholder="Paste your exported data here..."
              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none"
              rows={4}
            />
            <button
              onClick={() => {
                const success = importData(importDataString);
                if (success) {
                  setImportDataString('');
                  alert('Data imported successfully!');
                } else {
                  alert('Failed to import data. Please check the format.');
                }
              }}
              disabled={!importDataString.trim()}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                importDataString.trim()
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
            >
              Import Data
            </button>
          </div>
        </div>
      </div>

      {/* Raw Data Display */}
      <div>
        <h3 className="font-semibold text-slate-900 mb-3">Raw Data (Debug)</h3>
        <details className="bg-slate-50 rounded-lg p-4">
          <summary className="cursor-pointer font-medium text-slate-700">Click to view raw data</summary>
          <pre className="mt-3 text-xs text-slate-600 overflow-auto max-h-40">
            {JSON.stringify(workoutData, null, 2)}
          </pre>
        </details>
      </div>
    </div>
  );
} 