/**
 * Storage utility for persisting task data, streaks, reflections, and time tracking
 */

const STORAGE_KEY = 'bwg_accountability_data';
const STREAK_KEY = 'bwg_streak_data';
const REFLECTION_KEY = 'bwg_reflections';
const START_DATE_KEY = 'bwg_start_date';
const TIME_TRACKING_KEY = 'bwg_time_tracking';

// 60-day goal configuration
const GOAL_DAYS = 60;

/**
 * Get today's date as a string key (YYYY-MM-DD)
 */
export const getTodayKey = () => {
    return new Date().toISOString().split('T')[0];
};

/**
 * Get yesterday's date as a string key
 */
export const getYesterdayKey = () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return yesterday.toISOString().split('T')[0];
};

/**
 * Load all stored data
 */
export const loadData = () => {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : {};
    } catch (error) {
        console.error('Error loading data:', error);
        return {};
    }
};

/**
 * Save data to storage
 */
export const saveData = (data) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
        console.error('Error saving data:', error);
    }
};

/**
 * Load today's tasks state
 */
export const loadTodayTasks = () => {
    const data = loadData();
    const todayKey = getTodayKey();
    return data[todayKey] || null;
};

/**
 * Save today's tasks state
 */
export const saveTodayTasks = (tasks, dayNumber = null) => {
    const data = loadData();
    const todayKey = getTodayKey();
    data[todayKey] = {
        tasks,
        dayNumber,
        updatedAt: new Date().toISOString()
    };
    saveData(data);

    // Update streak when all tasks are completed
    const allCompleted = tasks.every(t => t.completed);
    if (allCompleted) {
        updateStreak(true);
    }
};

/**
 * Streak management
 */
export const loadStreakData = () => {
    try {
        const data = localStorage.getItem(STREAK_KEY);
        return data ? JSON.parse(data) : {
            currentStreak: 0,
            lastCompletedDate: null,
            longestStreak: 0
        };
    } catch (error) {
        console.error('Error loading streak data:', error);
        return { currentStreak: 0, lastCompletedDate: null, longestStreak: 0 };
    }
};

export const saveStreakData = (streakData) => {
    try {
        localStorage.setItem(STREAK_KEY, JSON.stringify(streakData));
    } catch (error) {
        console.error('Error saving streak data:', error);
    }
};

export const updateStreak = (completed) => {
    const streakData = loadStreakData();
    const today = getTodayKey();
    const yesterday = getYesterdayKey();

    if (completed) {
        // Already completed today
        if (streakData.lastCompletedDate === today) {
            return streakData;
        }

        // Continuing streak from yesterday
        if (streakData.lastCompletedDate === yesterday) {
            streakData.currentStreak += 1;
        } else {
            // Starting fresh or after a gap
            streakData.currentStreak = 1;
        }

        streakData.lastCompletedDate = today;

        // Update longest streak
        if (streakData.currentStreak > streakData.longestStreak) {
            streakData.longestStreak = streakData.currentStreak;
        }
    }

    saveStreakData(streakData);
    return streakData;
};

/**
 * Check if user missed yesterday
 */
export const didMissYesterday = () => {
    const streakData = loadStreakData();
    const yesterday = getYesterdayKey();
    const today = getTodayKey();

    // If last completion was before yesterday and not today, they missed
    if (streakData.lastCompletedDate &&
        streakData.lastCompletedDate !== yesterday &&
        streakData.lastCompletedDate !== today) {
        return true;
    }

    // Check if yesterday had incomplete tasks
    const data = loadData();
    const yesterdayData = data[yesterday];
    if (yesterdayData && yesterdayData.tasks) {
        const allCompleted = yesterdayData.tasks.every(t => t.completed);
        if (!allCompleted) {
            return true;
        }
    }

    return false;
};

/**
 * Start Date Management - determines which day of the 60-day sprint user is on
 */
export const getStartDate = () => {
    try {
        const data = localStorage.getItem(START_DATE_KEY);
        if (data) {
            return JSON.parse(data).startDate;
        }
        return null; // No start date set yet
    } catch (error) {
        return null;
    }
};

export const setStartDate = (dateString) => {
    try {
        localStorage.setItem(START_DATE_KEY, JSON.stringify({ startDate: dateString }));
        return dateString;
    } catch (error) {
        console.error('Error setting start date:', error);
        return null;
    }
};

export const hasStartDate = () => {
    return getStartDate() !== null;
};

/**
 * Calculate current day number (1-60) based on start date
 */
export const getCurrentDayNumber = () => {
    const startDate = getStartDate();
    if (!startDate) return 1;

    const start = new Date(startDate);
    const today = new Date(getTodayKey());
    const daysPassed = Math.floor((today - start) / (1000 * 60 * 60 * 24));

    // Day 1 is the start date, so add 1
    const currentDay = daysPassed + 1;

    // Clamp between 1 and 60
    return Math.max(1, Math.min(60, currentDay));
};

/**
 * Get days remaining until day 60
 */
export const getDaysRemainingToGoal = () => {
    const currentDay = getCurrentDayNumber();
    return Math.max(0, GOAL_DAYS - currentDay + 1);
};

/**
 * Get goal progress percentage
 */
export const getGoalProgress = () => {
    const currentDay = getCurrentDayNumber();
    return Math.min(100, Math.round(((currentDay - 1) / GOAL_DAYS) * 100));
};

/**
 * Reflection management
 */
export const loadReflections = () => {
    try {
        const data = localStorage.getItem(REFLECTION_KEY);
        return data ? JSON.parse(data) : {};
    } catch (error) {
        console.error('Error loading reflections:', error);
        return {};
    }
};

export const saveReflection = (weekKey, reflection) => {
    try {
        const reflections = loadReflections();
        reflections[weekKey] = {
            worked: reflection.worked || '',
            derailed: reflection.derailed || '',
            change: reflection.change || '',
            savedAt: new Date().toISOString()
        };
        localStorage.setItem(REFLECTION_KEY, JSON.stringify(reflections));
    } catch (error) {
        console.error('Error saving reflection:', error);
    }
};

export const getCurrentWeekKey = () => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 1);
    const week = Math.ceil(((now - start) / 86400000 + start.getDay() + 1) / 7);
    return `${now.getFullYear()}-W${week.toString().padStart(2, '0')}`;
};

/**
 * Check if reflection modal should show
 * Returns true only if: Sunday AND 3+ days since start date
 */
export const shouldShowReflection = () => {
    const today = new Date();
    // Must be Sunday
    if (today.getDay() !== 0) return false;

    // Must have a start date
    const startDate = getStartDate();
    if (!startDate) return false;

    // Calculate days since start
    const start = new Date(startDate);
    const daysSinceStart = Math.floor((today - start) / (1000 * 60 * 60 * 24));

    // Need at least 3 days since start
    return daysSinceStart >= 3;
};

/**
 * Get all reflections sorted by week (newest first)
 */
export const getAllReflectionsSorted = () => {
    const reflections = loadReflections();
    return Object.entries(reflections)
        .map(([weekKey, data]) => ({
            weekKey,
            ...data
        }))
        .sort((a, b) => b.weekKey.localeCompare(a.weekKey));
};

/**
 * Export all reflections as plain text for clipboard
 */
export const exportReflectionsAsText = () => {
    const reflections = getAllReflectionsSorted();
    if (reflections.length === 0) {
        return 'No reflections yet.';
    }

    return reflections.map(r => {
        const lines = [`=== Week ${r.weekKey} ===`];
        if (r.worked) lines.push(`What worked: ${r.worked}`);
        if (r.derailed) lines.push(`What derailed: ${r.derailed}`);
        if (r.change) lines.push(`What to change: ${r.change}`);
        return lines.join('\n');
    }).join('\n\n');
};

// ============================================
// TOOL LINK TRACKING
// ============================================

const TOOL_CLICKS_KEY = 'bwg_tool_clicks';

/**
 * Track a click on a tool link
 */
export const trackToolClick = (toolId) => {
    try {
        const stats = getToolClickStats();
        stats[toolId] = (stats[toolId] || 0) + 1;
        localStorage.setItem(TOOL_CLICKS_KEY, JSON.stringify(stats));
    } catch (error) {
        console.error('Error tracking tool click:', error);
    }
};

/**
 * Get all tool click stats
 */
export const getToolClickStats = () => {
    try {
        const data = localStorage.getItem(TOOL_CLICKS_KEY);
        return data ? JSON.parse(data) : {};
    } catch (error) {
        console.error('Error loading tool stats:', error);
        return {};
    }
};

/**
 * Get the most used tool ID
 */
export const getMostUsedTool = () => {
    const stats = getToolClickStats();
    const entries = Object.entries(stats);
    if (entries.length === 0) return null;

    const sorted = entries.sort((a, b) => b[1] - a[1]);
    return sorted[0][0]; // Return tool ID with most clicks
};

// Keep for backward compatibility
export const isWeekendReflectionTime = () => {
    return new Date().getDay() === 0;
};

/**
 * Get completion stats for the last N days
 */
export const getStats = (days = 7) => {
    const data = loadData();
    const stats = [];

    for (let i = 0; i < days; i++) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const key = date.toISOString().split('T')[0];
        const dayData = data[key];

        if (dayData && dayData.tasks) {
            const total = dayData.tasks.length;
            const completed = dayData.tasks.filter(t => t.completed).length;
            stats.push({
                date: key,
                total,
                completed,
                percentage: total > 0 ? Math.round((completed / total) * 100) : 0
            });
        } else {
            stats.push({
                date: key,
                total: 0,
                completed: 0,
                percentage: 0
            });
        }
    }

    return stats;
};

/**
 * Clear all stored data
 */
export const clearAllData = () => {
    try {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(STREAK_KEY);
        localStorage.removeItem(REFLECTION_KEY);
        localStorage.removeItem(START_DATE_KEY);
    } catch (error) {
        console.error('Error clearing data:', error);
    }
};

/**
 * Reset start date to today
 */
export const resetStartDate = () => {
    try {
        const startDate = getTodayKey();
        localStorage.setItem(START_DATE_KEY, JSON.stringify({ startDate }));
        return startDate;
    } catch (error) {
        console.error('Error resetting start date:', error);
        return getTodayKey();
    }
};

// ============================================
// TIME TRACKING
// ============================================

/**
 * Load all time tracking data
 */
export const loadTimeTracking = () => {
    try {
        const data = localStorage.getItem(TIME_TRACKING_KEY);
        return data ? JSON.parse(data) : { tasks: {}, summary: {} };
    } catch (error) {
        console.error('Error loading time tracking:', error);
        return { tasks: {}, summary: {} };
    }
};

/**
 * Save time tracking data
 */
export const saveTimeTracking = (data) => {
    try {
        localStorage.setItem(TIME_TRACKING_KEY, JSON.stringify(data));
    } catch (error) {
        console.error('Error saving time tracking:', error);
    }
};

/**
 * Record time spent on a task
 * 
 * @param {string} taskId - Task identifier
 * @param {number} actualSeconds - Actual time spent in seconds
 * @param {number} estimatedSeconds - Estimated time (with buffer) in seconds
 * @param {string} taskName - Task name for display
 */
export const recordTaskTime = (taskId, actualSeconds, estimatedSeconds, taskName = '') => {
    const data = loadTimeTracking();
    const today = getTodayKey();

    // Initialize task history if needed
    if (!data.tasks[taskId]) {
        data.tasks[taskId] = {
            name: taskName,
            history: [],
            totalActual: 0,
            totalEstimated: 0,
            completions: 0
        };
    }

    // Add this session
    const session = {
        date: today,
        actualSeconds,
        estimatedSeconds,
        difference: actualSeconds - estimatedSeconds,
        completedUnder: actualSeconds <= estimatedSeconds,
        timestamp: Date.now()
    };

    data.tasks[taskId].history.push(session);
    data.tasks[taskId].totalActual += actualSeconds;
    data.tasks[taskId].totalEstimated += estimatedSeconds;
    data.tasks[taskId].completions += 1;
    if (taskName) data.tasks[taskId].name = taskName;

    // Update daily summary
    if (!data.summary[today]) {
        data.summary[today] = {
            totalActual: 0,
            totalEstimated: 0,
            tasksCompleted: 0,
            underTime: 0,
            overTime: 0
        };
    }

    data.summary[today].totalActual += actualSeconds;
    data.summary[today].totalEstimated += estimatedSeconds;
    data.summary[today].tasksCompleted += 1;

    if (actualSeconds <= estimatedSeconds) {
        data.summary[today].underTime += 1;
    } else {
        data.summary[today].overTime += 1;
    }

    saveTimeTracking(data);
    return session;
};

/**
 * Get time tracking stats for a specific task
 */
export const getTaskTimeStats = (taskId) => {
    const data = loadTimeTracking();
    const taskData = data.tasks[taskId];

    if (!taskData || taskData.completions === 0) {
        return null;
    }

    const avgActual = Math.round(taskData.totalActual / taskData.completions);
    const avgEstimated = Math.round(taskData.totalEstimated / taskData.completions);
    const accuracy = Math.round((avgActual / avgEstimated) * 100);

    return {
        ...taskData,
        avgActualSeconds: avgActual,
        avgEstimatedSeconds: avgEstimated,
        accuracyPercent: accuracy,
        suggestedMinutes: Math.ceil(avgActual / 60)
    };
};

/**
 * Get overall time tracking summary
 */
export const getTimeTrackingSummary = (days = 7) => {
    const data = loadTimeTracking();
    let totalActual = 0;
    let totalEstimated = 0;
    let totalTasks = 0;
    let underCount = 0;
    let overCount = 0;

    for (let i = 0; i < days; i++) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const key = date.toISOString().split('T')[0];
        const dayData = data.summary[key];

        if (dayData) {
            totalActual += dayData.totalActual;
            totalEstimated += dayData.totalEstimated;
            totalTasks += dayData.tasksCompleted;
            underCount += dayData.underTime;
            overCount += dayData.overTime;
        }
    }

    return {
        totalActualSeconds: totalActual,
        totalEstimatedSeconds: totalEstimated,
        totalTasks,
        underTimeCount: underCount,
        overTimeCount: overCount,
        accuracyPercent: totalEstimated > 0 ? Math.round((totalActual / totalEstimated) * 100) : 100,
        avgMinutesPerTask: totalTasks > 0 ? Math.round(totalActual / totalTasks / 60) : 0
    };
};

/**
 * Format seconds to readable string
 */
export const formatSecondsToReadable = (seconds) => {
    if (seconds < 60) return `${seconds}s`;
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (mins < 60) return secs > 0 ? `${mins}m ${secs}s` : `${mins}m`;
    const hours = Math.floor(mins / 60);
    const remainMins = mins % 60;
    return remainMins > 0 ? `${hours}h ${remainMins}m` : `${hours}h`;
};

/**
 * Get weekly completion data for calendar view
 * Returns object keyed by date with completion status
 */
export const getWeeklyCompletionData = () => {
    const data = loadData();
    const result = {};

    for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const key = date.toISOString().split('T')[0];
        const dayData = data[key];

        if (dayData && dayData.tasks) {
            const tasks = dayData.tasks;
            const completed = tasks.filter(t => t.completed).length;
            const total = tasks.length;
            result[key] = {
                completed: completed === total && total > 0,
                tasksCompleted: completed,
                totalTasks: total
            };
        } else {
            result[key] = {
                completed: false,
                tasksCompleted: 0,
                totalTasks: 0
            };
        }
    }

    return result;
};

// ============================================
// CARRYOVER REMINDER
// ============================================

const CARRYOVER_DISMISSED_KEY = 'bwg_carryover_dismissed';

/**
 * Get yesterday's incomplete tasks
 * Returns array of task objects that were not completed
 */
export const getYesterdaysIncompleteTasks = () => {
    const data = loadData();
    const yesterdayKey = getYesterdayKey();
    const yesterdayData = data[yesterdayKey];

    if (!yesterdayData || !yesterdayData.tasks) {
        return [];
    }

    return yesterdayData.tasks.filter(task => !task.completed);
};

/**
 * Check if carryover reminder was dismissed for today
 */
export const isCarryoverDismissed = () => {
    try {
        const dismissed = localStorage.getItem(CARRYOVER_DISMISSED_KEY);
        if (!dismissed) return false;

        const dismissedData = JSON.parse(dismissed);
        const todayKey = getTodayKey();

        // Only dismissed for today if dismissedDate matches
        return dismissedData.dismissedDate === todayKey;
    } catch (error) {
        return false;
    }
};

/**
 * Dismiss carryover reminder for today
 */
export const dismissCarryover = () => {
    try {
        const todayKey = getTodayKey();
        localStorage.setItem(CARRYOVER_DISMISSED_KEY, JSON.stringify({
            dismissedDate: todayKey
        }));
    } catch (error) {
        console.error('Error dismissing carryover:', error);
    }
};
