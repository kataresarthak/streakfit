'use client';

import { useState } from 'react';
import Link from 'next/link';
import DailyCheck from '@/components/DailyCheck';
import StreakDisplay from '@/components/StreakDisplay';
import ConsistencyGrid from '@/components/ConsistencyGrid';
import ProgressStats from '@/components/ProgressStats';
import WorkoutManager from '@/components/WorkoutManager';
import { useWorkoutData } from '@/hooks/useWorkoutData';
import { calculateConsistencyStats, getTodayString } from '@/lib/workout-utils';

export default function Dashboard() {
  const {
    workoutData,
    isLoading,
    addWorkout,
    isTodayCompleted
  } = useWorkoutData();

  const [showGrid, setShowGrid] = useState(false);
  const [showManager, setShowManager] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading your fitness data...</p>
        </div>
      </div>
    );
  }

  const consistencyStats = calculateConsistencyStats(workoutData.workouts);
  const todayCompleted = isTodayCompleted();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              StreakFit
            </Link>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowGrid(!showGrid)}
                className="text-slate-600 hover:text-emerald-600 transition-colors"
              >
                {showGrid ? 'Hide Grid' : 'Show Grid'}
              </button>
              <button
                onClick={() => setShowManager(!showManager)}
                className="text-slate-600 hover:text-emerald-600 transition-colors"
              >
                {showManager ? 'Hide Manager' : 'Show Manager'}
              </button>
              <Link
                href="/"
                className="text-slate-600 hover:text-emerald-600 transition-colors"
              >
                Home
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Daily Check */}
            <DailyCheck
              onWorkoutComplete={addWorkout}
              isCompleted={todayCompleted}
              date={getTodayString()}
            />

            {/* Streak Display */}
            <StreakDisplay
              currentStreak={workoutData.currentStreak}
              longestStreak={workoutData.longestStreak}
            />

            {/* Consistency Grid */}
            {showGrid && (
              <ConsistencyGrid
                workouts={workoutData.workouts}
                daysToShow={365}
              />
            )}

            {/* Workout Manager */}
            {showManager && (
              <WorkoutManager />
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress Stats */}
            <ProgressStats
              weeklyPercentage={consistencyStats.weeklyPercentage}
              monthlyPercentage={consistencyStats.monthlyPercentage}
              totalDays={consistencyStats.totalDays}
              completedDays={consistencyStats.completedDays}
            />

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={() => setShowGrid(!showGrid)}
                  className="w-full bg-slate-100 text-slate-700 py-3 px-4 rounded-lg hover:bg-slate-200 transition-colors text-left"
                >
                  {showGrid ? '📊 Hide Consistency Grid' : '📊 Show Consistency Grid'}
                </button>
                <button
                  onClick={() => setShowManager(!showManager)}
                  className="w-full bg-slate-100 text-slate-700 py-3 px-4 rounded-lg hover:bg-slate-200 transition-colors text-left"
                >
                  {showManager ? '⚙️ Hide Workout Manager' : '⚙️ Show Workout Manager'}
                </button>
                <button
                  onClick={() => window.location.reload()}
                  className="w-full bg-slate-100 text-slate-700 py-3 px-4 rounded-lg hover:bg-slate-200 transition-colors text-left"
                >
                  🔄 Refresh Data
                </button>
              </div>
            </div>

            {/* Motivation Card */}
            <div className="bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl shadow-lg p-6 text-white">
              <h3 className="text-lg font-bold mb-2">Today&apos;s Motivation</h3>
              <p className="text-emerald-100 mb-4">
                {todayCompleted 
                  ? "Amazing work! You&apos;ve completed today&apos;s workout. Keep the momentum going! 💪"
                  : "Ready to crush your fitness goals? Every workout brings you closer to your best self! 🏃‍♂️"
                }
              </p>
              <div className="text-2xl text-center">🔥</div>
            </div>

            {/* Stats Summary */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-600">Current Streak</span>
                  <span className="font-semibold text-emerald-600">
                    {workoutData.currentStreak} {workoutData.currentStreak === 1 ? 'day' : 'days'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Longest Streak</span>
                  <span className="font-semibold text-blue-600">
                    {workoutData.longestStreak} {workoutData.longestStreak === 1 ? 'day' : 'days'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Total Workouts</span>
                  <span className="font-semibold text-slate-900">
                    {workoutData.workouts.filter(w => w.completed).length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">This Week</span>
                  <span className="font-semibold text-slate-900">
                    {consistencyStats.weeklyPercentage}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 