import React from 'react';
import { Check, X, Flame, TrendingUp } from 'lucide-react';
import './WeeklyCalendar.css';

/**
 * Weekly Calendar Component
 * Shows last 7 days of task completion with visual indicators
 */

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const WeeklyCalendar = ({ completionData = {} }) => {
    // Generate last 7 days
    const getLast7Days = () => {
        const days = [];
        for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const key = date.toISOString().split('T')[0];
            const dayOfWeek = date.getDay();
            const dayNum = date.getDate();
            const isToday = i === 0;

            days.push({
                key,
                dayOfWeek,
                dayName: DAYS[dayOfWeek],
                dayNum,
                isToday,
                completed: completionData[key]?.completed || false,
                tasksCompleted: completionData[key]?.tasksCompleted || 0,
                totalTasks: completionData[key]?.totalTasks || 0
            });
        }
        return days;
    };

    const days = getLast7Days();
    const completedDays = days.filter(d => d.completed).length;
    const currentStreak = calculateStreak(days);

    return (
        <div className="weekly-calendar">
            <div className="weekly-header">
                <h3>This Week</h3>
                <div className="weekly-stats">
                    <span className="stat-badge">
                        <Flame size={14} />
                        {currentStreak} day streak
                    </span>
                    <span className="stat-badge green">
                        <TrendingUp size={14} />
                        {completedDays}/7 completed
                    </span>
                </div>
            </div>

            <div className="days-grid">
                {days.map((day) => (
                    <div
                        key={day.key}
                        className={`day-cell ${day.completed ? 'completed' : ''} ${day.isToday ? 'today' : ''}`}
                        title={`${day.tasksCompleted}/${day.totalTasks} tasks completed`}
                    >
                        <span className="day-name">{day.dayName}</span>
                        <div className="day-indicator">
                            {day.completed ? (
                                <Check size={16} className="check-icon" />
                            ) : day.totalTasks > 0 ? (
                                <X size={16} className="x-icon" />
                            ) : (
                                <span className="day-num">{day.dayNum}</span>
                            )}
                        </div>
                        {day.isToday && <span className="today-label">Today</span>}
                    </div>
                ))}
            </div>
        </div>
    );
};

/**
 * Calculate current streak from days array
 */
const calculateStreak = (days) => {
    let streak = 0;
    // Start from yesterday (index length-2) going backwards
    for (let i = days.length - 2; i >= 0; i--) {
        if (days[i].completed) {
            streak++;
        } else {
            break;
        }
    }
    // Add today if completed
    if (days[days.length - 1].completed) {
        streak++;
    }
    return streak;
};

export default WeeklyCalendar;
