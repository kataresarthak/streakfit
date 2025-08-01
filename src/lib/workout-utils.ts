import { WorkoutEntry, WorkoutData, StreakInfo, ConsistencyStats } from '@/types/workout';

const STORAGE_KEY = 'streakfit-data';

// LocalStorage operations
export function saveWorkoutData(data: WorkoutData): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }
}

export function loadWorkoutData(): WorkoutData {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  }
  return {
    workouts: [],
    currentStreak: 0,
    longestStreak: 0
  };
}

// Date utilities
export function getTodayString(): string {
  return new Date().toISOString().split('T')[0];
}

export function getDateString(date: Date): string {
  return date.toISOString().split('T')[0];
}

export function isToday(dateString: string): boolean {
  return dateString === getTodayString();
}

export function isYesterday(dateString: string): boolean {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return dateString === getDateString(yesterday);
}

export function getDaysDifference(date1: string, date2: string): number {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diffTime = Math.abs(d2.getTime() - d1.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

// Streak calculations
export function calculateStreak(workouts: WorkoutEntry[]): StreakInfo {
  if (workouts.length === 0) {
    return {
      currentStreak: 0,
      longestStreak: 0,
      totalWorkouts: 0
    };
  }

  // Sort workouts by date (most recent first)
  const sortedWorkouts = [...workouts]
    .filter(w => w.completed)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  if (sortedWorkouts.length === 0) {
    return {
      currentStreak: 0,
      longestStreak: 0,
      totalWorkouts: 0
    };
  }

  const today = getTodayString();
  const yesterday = getDateString(new Date(Date.now() - 24 * 60 * 60 * 1000));

  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 0;
  let lastDate: string | null = null;

  // Calculate current streak
  for (let i = 0; i < sortedWorkouts.length; i++) {
    const workoutDate = sortedWorkouts[i].date;

    if (i === 0) {
      // Check if the most recent workout is today or yesterday
      if (workoutDate === today || workoutDate === yesterday) {
        currentStreak = 1;
        tempStreak = 1;
        lastDate = workoutDate;
      }
    } else {
      const prevWorkoutDate = sortedWorkouts[i - 1].date;
      const daysDiff = getDaysDifference(prevWorkoutDate, workoutDate);

      if (daysDiff === 1) {
        tempStreak++;
        if (lastDate && getDaysDifference(lastDate, workoutDate) <= 1) {
          currentStreak = tempStreak;
        }
      } else {
        tempStreak = 1;
      }
    }

    longestStreak = Math.max(longestStreak, tempStreak);
  }

  return {
    currentStreak,
    longestStreak,
    totalWorkouts: sortedWorkouts.length,
    lastWorkoutDate: sortedWorkouts[0]?.date
  };
}

// Consistency calculations
export function calculateConsistencyStats(workouts: WorkoutEntry[]): ConsistencyStats {
  const today = new Date();
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - 7);
  
  const monthStart = new Date(today);
  monthStart.setDate(today.getDate() - 30);

  const weekWorkouts = workouts.filter(w => {
    const workoutDate = new Date(w.date);
    return workoutDate >= weekStart && w.completed;
  });

  const monthWorkouts = workouts.filter(w => {
    const workoutDate = new Date(w.date);
    return workoutDate >= monthStart && w.completed;
  });

  const weeklyPercentage = Math.round((weekWorkouts.length / 7) * 100);
  const monthlyPercentage = Math.round((monthWorkouts.length / 30) * 100);

  const totalWorkouts = workouts.filter(w => w.completed).length;
  const totalDays = workouts.length;

  return {
    weeklyPercentage,
    monthlyPercentage,
    totalDays,
    completedDays: totalWorkouts
  };
}

// Workout data operations
export function addWorkout(workoutData: WorkoutData, date: string = getTodayString()): WorkoutData {
  const existingIndex = workoutData.workouts.findIndex(w => w.date === date);
  
  if (existingIndex >= 0) {
    // Update existing entry
    const updatedWorkouts = [...workoutData.workouts];
    updatedWorkouts[existingIndex] = { date, completed: true };
    
    const streakInfo = calculateStreak(updatedWorkouts);
    
    return {
      workouts: updatedWorkouts,
      currentStreak: streakInfo.currentStreak,
      longestStreak: streakInfo.longestStreak
    };
  } else {
    // Add new entry
    const updatedWorkouts = [...workoutData.workouts, { date, completed: true }];
    const streakInfo = calculateStreak(updatedWorkouts);
    
    return {
      workouts: updatedWorkouts,
      currentStreak: streakInfo.currentStreak,
      longestStreak: streakInfo.longestStreak
    };
  }
}

export function removeWorkout(workoutData: WorkoutData, date: string): WorkoutData {
  const updatedWorkouts = workoutData.workouts.filter(w => w.date !== date);
  const streakInfo = calculateStreak(updatedWorkouts);
  
  return {
    workouts: updatedWorkouts,
    currentStreak: streakInfo.currentStreak,
    longestStreak: streakInfo.longestStreak
  };
}

// Grid utilities
export function generateGridData(workouts: WorkoutEntry[], daysToShow: number = 365): WorkoutEntry[] {
  const today = new Date();
  const gridData: WorkoutEntry[] = [];
  
  for (let i = daysToShow - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const dateString = getDateString(date);
    
    const existingWorkout = workouts.find(w => w.date === dateString);
    gridData.push(existingWorkout || { date: dateString, completed: false });
  }
  
  return gridData;
}

// Format utilities
export function formatStreak(streak: number): string {
  if (streak === 1) return '1 day';
  return `${streak} days`;
}

export function formatPercentage(percentage: number): string {
  return `${percentage}%`;
} 