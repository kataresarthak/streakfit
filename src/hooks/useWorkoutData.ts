'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { WorkoutData, WorkoutEntry } from '@/types/workout';
import { 
  loadWorkoutData, 
  saveWorkoutData, 
  addWorkout, 
  removeWorkout,
  getTodayString,
  isToday,
  calculateStreak,
  calculateConsistencyStats
} from '@/lib/workout-utils';

export function useWorkoutData() {
  const [workoutData, setWorkoutData] = useState<WorkoutData>({
    workouts: [],
    currentStreak: 0,
    longestStreak: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load data from localStorage on mount
  useEffect(() => {
    try {
      const data = loadWorkoutData();
      setWorkoutData(data);
      setError(null);
    } catch (err) {
      console.error('Error loading workout data:', err);
      setError('Failed to load workout data');
      // Initialize with empty data if loading fails
      setWorkoutData({
        workouts: [],
        currentStreak: 0,
        longestStreak: 0
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (!isLoading) {
      try {
        saveWorkoutData(workoutData);
        setError(null);
      } catch (err) {
        console.error('Error saving workout data:', err);
        setError('Failed to save workout data');
      }
    }
  }, [workoutData, isLoading]);

  // Memoized calculations for performance
  const streakInfo = useMemo(() => {
    return calculateStreak(workoutData.workouts);
  }, [workoutData.workouts]);

  const consistencyStats = useMemo(() => {
    return calculateConsistencyStats(workoutData.workouts);
  }, [workoutData.workouts]);

  // Core workout functions
  const addWorkoutEntry = useCallback((date: string = getTodayString()) => {
    setWorkoutData(prevData => {
      const updatedData = addWorkout(prevData, date);
      
      // Validate the updated data
      if (!updatedData || !Array.isArray(updatedData.workouts)) {
        throw new Error('Invalid workout data structure');
      }
      
      return updatedData;
    });
  }, []);

  const removeWorkoutEntry = useCallback((date: string) => {
    setWorkoutData(prevData => {
      const updatedData = removeWorkout(prevData, date);
      
      // Validate the updated data
      if (!updatedData || !Array.isArray(updatedData.workouts)) {
        throw new Error('Invalid workout data structure');
      }
      
      return updatedData;
    });
  }, []);

  // Note: getWorkouts is available but not currently used in components
  // Uncomment if needed for future use
  // const getWorkouts = useCallback(() => {
  //   return workoutData.workouts;
  // }, [workoutData.workouts]);

  const getCompletedWorkouts = useCallback(() => {
    return workoutData.workouts.filter(w => w.completed);
  }, [workoutData.workouts]);

  const getWorkoutsForDateRange = useCallback((startDate: string, endDate: string) => {
    return workoutData.workouts.filter(w => {
      const workoutDate = new Date(w.date);
      const start = new Date(startDate);
      const end = new Date(endDate);
      return workoutDate >= start && workoutDate <= end;
    });
  }, [workoutData.workouts]);

  // Streak calculations
  const calculateCurrentStreak = useCallback(() => {
    return streakInfo.currentStreak;
  }, [streakInfo.currentStreak]);

  const calculateLongestStreak = useCallback(() => {
    return streakInfo.longestStreak;
  }, [streakInfo.longestStreak]);

  const getStreakInfo = useCallback(() => {
    return streakInfo;
  }, [streakInfo]);

  // Consistency calculations
  const getConsistencyPercentage = useCallback((period: "week" | "month") => {
    if (period === "week") {
      return consistencyStats.weeklyPercentage;
    } else if (period === "month") {
      return consistencyStats.monthlyPercentage;
    }
    return 0;
  }, [consistencyStats]);

  const getConsistencyStats = useCallback(() => {
    return consistencyStats;
  }, [consistencyStats]);

  // Today's workout status
  const isTodayCompleted = useCallback(() => {
    const today = getTodayString();
    return workoutData.workouts.some(w => w.date === today && w.completed);
  }, [workoutData.workouts]);

  const getTodayWorkout = useCallback(() => {
    const today = getTodayString();
    return workoutData.workouts.find(w => w.date === today);
  }, [workoutData.workouts]);

  // Date-specific functions
  const isDateCompleted = useCallback((date: string) => {
    return workoutData.workouts.some(w => w.date === date && w.completed);
  }, [workoutData.workouts]);

  const getWorkoutForDate = useCallback((date: string): WorkoutEntry | undefined => {
    return workoutData.workouts.find(w => w.date === date);
  }, [workoutData.workouts]);

  // Data management functions
  const clearAllData = useCallback(() => {
    const emptyData: WorkoutData = {
      workouts: [],
      currentStreak: 0,
      longestStreak: 0
    };
    setWorkoutData(emptyData);
  }, []);

  const exportData = useCallback(() => {
    return JSON.stringify(workoutData, null, 2);
  }, [workoutData]);

  const importData = useCallback((dataString: string) => {
    try {
      const importedData = JSON.parse(dataString);
      
      // Validate imported data structure
      if (!importedData || typeof importedData !== 'object') {
        throw new Error('Invalid data format');
      }
      
      if (!Array.isArray(importedData.workouts)) {
        throw new Error('Invalid workouts array');
      }
      
      if (typeof importedData.currentStreak !== 'number' || typeof importedData.longestStreak !== 'number') {
        throw new Error('Invalid streak data');
      }
      
      // Validate each workout entry
      for (const workout of importedData.workouts) {
        if (!workout.date || typeof workout.completed !== 'boolean') {
          throw new Error('Invalid workout entry');
        }
      }
      
      setWorkoutData(importedData);
      setError(null);
      return true;
    } catch (err) {
      console.error('Error importing data:', err);
      setError('Failed to import data: Invalid format');
      return false;
    }
  }, []);

  // Utility functions
  const getWorkoutCount = useCallback(() => {
    return workoutData.workouts.filter(w => w.completed).length;
  }, [workoutData.workouts]);

  const getTotalDaysTracked = useCallback(() => {
    return workoutData.workouts.length;
  }, [workoutData.workouts]);

  const getSuccessRate = useCallback(() => {
    const total = workoutData.workouts.length;
    if (total === 0) return 0;
    const completed = workoutData.workouts.filter(w => w.completed).length;
    return Math.round((completed / total) * 100);
  }, [workoutData.workouts]);

  // Edge case handling
  const validateWorkoutData = useCallback((data: WorkoutData): boolean => {
    try {
      if (!data || typeof data !== 'object') return false;
      if (!Array.isArray(data.workouts)) return false;
      if (typeof data.currentStreak !== 'number' || typeof data.longestStreak !== 'number') return false;
      if (data.currentStreak < 0 || data.longestStreak < 0) return false;
      
      // Check for duplicate dates
      const dates = data.workouts.map(w => w.date);
      const uniqueDates = new Set(dates);
      if (dates.length !== uniqueDates.size) return false;
      
      // Validate each workout entry
      for (const workout of data.workouts) {
        if (!workout.date || typeof workout.completed !== 'boolean') return false;
        // Validate date format (YYYY-MM-DD)
        if (!/^\d{4}-\d{2}-\d{2}$/.test(workout.date)) return false;
      }
      
      return true;
    } catch {
      return false;
    }
  }, []);

  // Auto-cleanup function for invalid data
  const cleanupInvalidData = useCallback(() => {
    setWorkoutData(prevData => {
      const validWorkouts = prevData.workouts.filter(workout => {
        return workout.date && typeof workout.completed === 'boolean' && /^\d{4}-\d{2}-\d{2}$/.test(workout.date);
      });
      
      // Remove duplicates
      const uniqueWorkouts = validWorkouts.filter((workout, index, self) => 
        index === self.findIndex(w => w.date === workout.date)
      );
      
      const cleanedData = {
        workouts: uniqueWorkouts,
        currentStreak: 0,
        longestStreak: 0
      };
      
      // Recalculate streaks
      const streakInfo = calculateStreak(uniqueWorkouts);
      cleanedData.currentStreak = streakInfo.currentStreak;
      cleanedData.longestStreak = streakInfo.longestStreak;
      
      return cleanedData;
    });
  }, []);

  return {
    // State
    workoutData,
    isLoading,
    error,
    
    // Core functions
    addWorkout: addWorkoutEntry,
    removeWorkout: removeWorkoutEntry,
    getCompletedWorkouts,
    getWorkoutsForDateRange,
    
    // Streak functions
    calculateCurrentStreak,
    calculateLongestStreak,
    getStreakInfo,
    
    // Consistency functions
    getConsistencyPercentage,
    getConsistencyStats,
    
    // Today's status
    isTodayCompleted,
    getTodayWorkout,
    
    // Date functions
    isDateCompleted,
    getWorkoutForDate,
    
    // Data management
    clearAllData,
    exportData,
    importData,
    
    // Utility functions
    getWorkoutCount,
    getTotalDaysTracked,
    getSuccessRate,
    
    // Validation and cleanup
    validateWorkoutData,
    cleanupInvalidData
  };
} 