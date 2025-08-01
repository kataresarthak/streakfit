export interface WorkoutEntry {
  date: string;
  completed: boolean;
}

export interface WorkoutData {
  workouts: WorkoutEntry[];
  currentStreak: number;
  longestStreak: number;
}

export interface StreakInfo {
  currentStreak: number;
  longestStreak: number;
  totalWorkouts: number;
  lastWorkoutDate?: string;
}

export interface ConsistencyStats {
  weeklyPercentage: number;
  monthlyPercentage: number;
  totalDays: number;
  completedDays: number;
}

export interface DailyCheckProps {
  onWorkoutComplete: () => void;
  isCompleted: boolean;
  date: string;
}

export interface StreakDisplayProps {
  currentStreak: number;
  longestStreak: number;
}

export interface ConsistencyGridProps {
  workouts: WorkoutEntry[];
  daysToShow?: number;
}

export interface ProgressStatsProps {
  weeklyPercentage: number;
  monthlyPercentage: number;
  totalDays: number;
  completedDays: number;
} 