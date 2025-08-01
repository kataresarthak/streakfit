'use client';

import { ConsistencyGridProps } from '@/types/workout';
import { generateGridData, isToday } from '@/lib/workout-utils';

export default function ConsistencyGrid({ workouts, daysToShow = 365 }: ConsistencyGridProps) {
  const gridData = generateGridData(workouts, daysToShow);
  const weeks = Math.ceil(daysToShow / 7);

  const getCellColor = (completed: boolean, date: string) => {
    if (isToday(date)) {
      return completed ? 'bg-emerald-500' : 'bg-slate-300 border-2 border-emerald-500';
    }
    if (completed) {
      return 'bg-emerald-500';
    }
    return 'bg-slate-100';
  };

  const getCellTooltip = (date: string, completed: boolean) => {
    const dateObj = new Date(date);
    const formattedDate = dateObj.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    if (isToday(date)) {
      return completed 
        ? `${formattedDate} - Workout completed! 🎉`
        : `${formattedDate} - Today - No workout yet`;
    }
    
    return completed 
      ? `${formattedDate} - Workout completed! ✅`
      : `${formattedDate} - No workout`;
  };

  const getWeekdayLabels = () => {
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return weekdays.map((day, index) => (
      <div key={day} className="text-xs text-slate-500 text-center h-4 flex items-center justify-center">
        {index % 2 === 0 ? day : ''}
      </div>
    ));
  };

  const getMonthLabels = () => {
    const months = [];
    const today = new Date();
    
    for (let i = 0; i < weeks; i++) {
      const weekStart = new Date(today);
      weekStart.setDate(today.getDate() - (daysToShow - 1) + (i * 7));
      
      const monthName = weekStart.toLocaleDateString('en-US', { month: 'short' });
      const isFirstWeekOfMonth = weekStart.getDate() <= 7;
      
      months.push(
        <div key={i} className="text-xs text-slate-500 text-center h-4 flex items-center justify-center">
          {isFirstWeekOfMonth ? monthName : ''}
        </div>
      );
    }
    
    return months;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-slate-900">Consistency Grid</h3>
          <div className="flex items-center space-x-4 text-xs text-slate-500">
            <span>Less</span>
            <div className="flex space-x-1">
              <div className="w-3 h-3 bg-slate-100 rounded-sm"></div>
              <div className="w-3 h-3 bg-emerald-200 rounded-sm"></div>
              <div className="w-3 h-3 bg-emerald-400 rounded-sm"></div>
              <div className="w-3 h-3 bg-emerald-500 rounded-sm"></div>
            </div>
            <span>More</span>
          </div>
        </div>

        {/* Grid Container */}
        <div className="overflow-x-auto">
          <div className="flex space-x-2 min-w-max">
            {/* Weekday Labels */}
            <div className="flex flex-col space-y-1 pt-6">
              {getWeekdayLabels()}
            </div>

            {/* Month Labels */}
            <div className="flex space-x-1 pb-2">
              {getMonthLabels()}
            </div>

            {/* Grid */}
            <div className="flex flex-col space-y-1">
              {Array.from({ length: 7 }, (_, rowIndex) => (
                <div key={rowIndex} className="flex space-x-1">
                  {Array.from({ length: weeks }, (_, colIndex) => {
                    const dayIndex = rowIndex + (colIndex * 7);
                    const workout = gridData[dayIndex];
                    
                    if (!workout) return <div key={colIndex} className="w-3 h-3"></div>;
                    
                    return (
                      <div
                        key={colIndex}
                        className={`w-3 h-3 rounded-sm transition-all duration-200 hover:scale-125 cursor-pointer ${getCellColor(workout.completed, workout.date)}`}
                        title={getCellTooltip(workout.date, workout.completed)}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-200">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-slate-100 rounded-sm"></div>
              <span>No workout</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-emerald-500 rounded-sm"></div>
              <span>Workout completed</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-slate-300 border-2 border-emerald-500 rounded-sm"></div>
              <span>Today</span>
            </div>
          </div>
          <span>{daysToShow} days</span>
        </div>
      </div>
    </div>
  );
} 