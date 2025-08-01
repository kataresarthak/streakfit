'use client';

import { ProgressStatsProps } from '@/types/workout';
import { formatPercentage } from '@/lib/workout-utils';

export default function ProgressStats({ 
  weeklyPercentage, 
  monthlyPercentage, 
  totalDays, 
  completedDays 
}: ProgressStatsProps) {
  const getConsistencyLevel = (percentage: number) => {
    if (percentage >= 90) return { level: 'Excellent', color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200' };
    if (percentage >= 70) return { level: 'Good', color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' };
    if (percentage >= 50) return { level: 'Fair', color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-200' };
    return { level: 'Needs Improvement', color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200' };
  };

  const getProgressEmoji = (percentage: number) => {
    if (percentage >= 90) return '🏆';
    if (percentage >= 70) return '🎯';
    if (percentage >= 50) return '📈';
    return '💪';
  };

  const weeklyLevel = getConsistencyLevel(weeklyPercentage);
  const monthlyLevel = getConsistencyLevel(monthlyPercentage);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-slate-900 mb-2">Progress Stats</h3>
          <p className="text-slate-600">Your consistency over time</p>
        </div>

        {/* Weekly Progress */}
        <div className={`rounded-xl p-6 ${weeklyLevel.bg} border ${weeklyLevel.border}`}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-lg font-semibold text-slate-900">Weekly Consistency</h4>
              <p className="text-sm text-slate-600">Last 7 days</p>
            </div>
            <div className="text-3xl">
              {getProgressEmoji(weeklyPercentage)}
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600">Progress</span>
              <span className={`font-bold text-lg ${weeklyLevel.color}`}>
                {formatPercentage(weeklyPercentage)}
              </span>
            </div>
            
            <div className="w-full bg-slate-200 rounded-full h-3">
              <div 
                className={`h-3 rounded-full transition-all duration-500 ${
                  weeklyPercentage >= 90 ? 'bg-emerald-500' :
                  weeklyPercentage >= 70 ? 'bg-blue-500' :
                  weeklyPercentage >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${weeklyPercentage}%` }}
              ></div>
            </div>
            
            <div className="text-center">
              <span className={`text-sm font-medium ${weeklyLevel.color}`}>
                {weeklyLevel.level}
              </span>
            </div>
          </div>
        </div>

        {/* Monthly Progress */}
        <div className={`rounded-xl p-6 ${monthlyLevel.bg} border ${monthlyLevel.border}`}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-lg font-semibold text-slate-900">Monthly Consistency</h4>
              <p className="text-sm text-slate-600">Last 30 days</p>
            </div>
            <div className="text-3xl">
              {getProgressEmoji(monthlyPercentage)}
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600">Progress</span>
              <span className={`font-bold text-lg ${monthlyLevel.color}`}>
                {formatPercentage(monthlyPercentage)}
              </span>
            </div>
            
            <div className="w-full bg-slate-200 rounded-full h-3">
              <div 
                className={`h-3 rounded-full transition-all duration-500 ${
                  monthlyPercentage >= 90 ? 'bg-emerald-500' :
                  monthlyPercentage >= 70 ? 'bg-blue-500' :
                  monthlyPercentage >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${monthlyPercentage}%` }}
              ></div>
            </div>
            
            <div className="text-center">
              <span className={`text-sm font-medium ${monthlyLevel.color}`}>
                {monthlyLevel.level}
              </span>
            </div>
          </div>
        </div>

        {/* Overall Stats */}
        <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
          <h4 className="text-lg font-semibold text-slate-900 mb-4">Overall Stats</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600 mb-1">
                {completedDays}
              </div>
              <div className="text-sm text-slate-600">Workouts Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">
                {totalDays}
              </div>
              <div className="text-sm text-slate-600">Total Days Tracked</div>
            </div>
          </div>
          
          {totalDays > 0 && (
            <div className="mt-4 pt-4 border-t border-slate-200">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Overall Success Rate</span>
                <span className="font-bold text-slate-900">
                  {formatPercentage(Math.round((completedDays / totalDays) * 100))}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Motivational Message */}
        <div className="text-center p-4 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-lg border border-emerald-200">
          <p className="text-emerald-800 font-medium">
            {weeklyPercentage >= 70 && monthlyPercentage >= 70 
              ? "🎉 Amazing consistency! You're building great habits!"
              : weeklyPercentage >= 50 || monthlyPercentage >= 50
              ? "📈 You're making progress! Keep pushing forward!"
              : "💪 Every workout counts! Start building your consistency today!"
            }
          </p>
        </div>
      </div>
    </div>
  );
} 