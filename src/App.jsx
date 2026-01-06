import { useState, useEffect, useCallback } from 'react'
import {
    Target, Calendar, Clock, Check,
    ExternalLink, AlertTriangle,
    ChevronLeft, ChevronRight, ListTodo, BookOpen
} from 'lucide-react'
import { dailyTasks, getTasksForDay } from './data/dailyTasks'
import { getBufferedTime } from './utils/tasks'
import { phases, getPhaseForDay, toolUrls } from './data/phases'
import { CompactTimer } from './components/Timer'
import ProgressBar, { StreakCounter, MotivationalMessage } from './components/ProgressBar'
import WeeklyCalendar from './components/WeeklyCalendar'
import ReflectionModal from './components/ReflectionModal'
import ReflectionsTab from './components/ReflectionsTab'
import QuickLinks from './components/QuickLinks'
import {
    loadTodayTasks, saveTodayTasks, loadStreakData,
    getDaysRemainingToGoal, didMissYesterday,
    shouldShowReflection, getCurrentWeekKey, loadReflections,
    hasStartDate, setStartDate, getCurrentDayNumber, getTodayKey,
    recordTaskTime, getWeeklyCompletionData
} from './utils/storage'
import './styles/App.css'

function App() {
    const [tasks, setTasks] = useState([])
    const [currentDay, setCurrentDay] = useState(1)
    const [viewingDay, setViewingDay] = useState(1)
    const [showStartModal, setShowStartModal] = useState(false)
    const [startDateInput, setStartDateInput] = useState(getTodayKey())
    const [streakData, setStreakData] = useState({ currentStreak: 0, longestStreak: 0 })
    const [showMissedWarning, setShowMissedWarning] = useState(false)
    const [showReflectionModal, setShowReflectionModal] = useState(false)
    const [activeTimerId, setActiveTimerId] = useState(null)
    const [weeklyData, setWeeklyData] = useState({})
    const [activeTab, setActiveTab] = useState('tasks') // 'tasks' or 'reflections'

    // Current phase info
    const currentPhase = getPhaseForDay(viewingDay);

    // Initialize on mount
    useEffect(() => {
        // Check if start date is set
        if (!hasStartDate()) {
            setShowStartModal(true);
            return;
        }

        // Get current day number
        const dayNum = getCurrentDayNumber();
        setCurrentDay(dayNum);
        setViewingDay(dayNum);

        // Load streak
        setStreakData(loadStreakData());

        // Check if missed yesterday
        setShowMissedWarning(didMissYesterday());

        // Check for Sunday reflection (with 3+ days rule)
        if (shouldShowReflection()) {
            const weekKey = getCurrentWeekKey();
            const reflections = loadReflections();
            if (!reflections[weekKey]) {
                setShowReflectionModal(true);
            }
        }

        // Register service worker for PWA
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/bwg-accountability/sw.js')
                .then((reg) => console.log('SW registered:', reg.scope))
                .catch((err) => console.log('SW registration failed:', err));
        }
    }, []);

    // Load tasks when viewing day changes
    useEffect(() => {
        if (showStartModal) return;

        const dayData = getTasksForDay(viewingDay);
        if (!dayData) return;

        // Check if we have saved progress for today
        const savedTasks = loadTodayTasks();
        const isToday = viewingDay === currentDay;

        if (isToday && savedTasks && savedTasks.tasks && savedTasks.dayNumber === viewingDay) {
            // Load saved progress for today
            setTasks(savedTasks.tasks);
        } else {
            // Initialize fresh tasks for this day
            const initializedTasks = dayData.tasks.map(task => ({
                ...task,
                completed: false,
                timerActive: false,
                timeSpent: 0,
                bufferedMinutes: getBufferedTime(task.estimatedMinutes)
            }));
            setTasks(initializedTasks);
        }
    }, [viewingDay, currentDay, showStartModal]);

    // Save tasks whenever they change (only for current day)
    useEffect(() => {
        if (tasks.length > 0 && viewingDay === currentDay) {
            saveTodayTasks(tasks, viewingDay);
            // Update streak when all completed
            const allCompleted = tasks.every(t => t.completed);
            if (allCompleted) {
                setStreakData(loadStreakData());
            }
            // Update weekly data
            setWeeklyData(getWeeklyCompletionData());
        }
    }, [tasks, viewingDay, currentDay]);

    // Handler for recording time when timer stops
    const handleTimeUpdate = useCallback((taskId, actualSeconds, estimatedSeconds) => {
        const task = tasks.find(t => t.id === taskId);
        if (task) {
            recordTaskTime(taskId, actualSeconds, estimatedSeconds, task.name);
        }
    }, [tasks]);

    // Handler when timer expires
    const handleTimerComplete = useCallback((taskId) => {
        console.log(`Timer expired for task: ${taskId}`);
    }, []);

    const completedCount = tasks.filter(t => t.completed).length;
    const totalCount = tasks.length;
    const progressPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
    const allCompleted = completedCount === totalCount && totalCount > 0;
    const daysRemaining = getDaysRemainingToGoal();
    const isViewingToday = viewingDay === currentDay;

    const handleStartDateSubmit = () => {
        setStartDate(startDateInput);
        setShowStartModal(false);
        const dayNum = getCurrentDayNumber();
        setCurrentDay(dayNum);
        setViewingDay(dayNum);
    };

    const toggleTask = useCallback((taskId) => {
        if (!isViewingToday) return; // Can't toggle past/future tasks

        // Vibration feedback for mobile (25ms pulse)
        if ('vibrate' in navigator) {
            navigator.vibrate(25);
        }

        setTasks(prev => prev.map(task => {
            if (task.id === taskId) {
                const newCompleted = !task.completed;

                // If marking task as complete, stop the timer
                if (newCompleted) {
                    // Clear from active timers in localStorage
                    try {
                        const timers = JSON.parse(localStorage.getItem('bwg_active_timers') || '{}');
                        delete timers[taskId];
                        localStorage.setItem('bwg_active_timers', JSON.stringify(timers));
                    } catch (e) {
                        console.error('Error clearing timer:', e);
                    }

                    // Clear active timer ID if this was the active timer
                    if (activeTimerId === taskId) {
                        setActiveTimerId(null);
                    }
                }

                return { ...task, completed: newCompleted };
            }
            return task;
        }));
    }, [isViewingToday, activeTimerId]);

    // Activate a timer (only one can be active at a time)
    const activateTimer = useCallback((taskId) => {
        setActiveTimerId(taskId);
    }, []);

    const navigateDay = (direction) => {
        const newDay = viewingDay + direction;
        if (newDay >= 1 && newDay <= 60) {
            setActiveTimerId(null); // Clear active timer when navigating
            setViewingDay(newDay);
        }
    };

    const goToToday = () => {
        setActiveTimerId(null);
        setViewingDay(currentDay);
    };

    const handleCloseReflectionModal = () => {
        setShowReflectionModal(false);
    };

    const getToolUrl = (toolName) => toolUrls[toolName] || null;

    // Get current date display
    const today = new Date();
    const dateString = today.toLocaleDateString('en-US', {
        weekday: 'short', month: 'short', day: 'numeric'
    });

    // Day data for viewing
    const dayData = getTasksForDay(viewingDay);

    // Start Date Modal
    if (showStartModal) {
        return (
            <div className="app">
                <div className="bg-gradient"></div>
                <div className="bg-grid"></div>
                <div className="container">
                    <div className="start-modal glassmorphism animate-fadeIn">
                        <div className="start-modal-icon">
                            <Target size={48} />
                        </div>
                        <h2>Welcome to Your 60-Day Sprint! 🚀</h2>
                        <p>When do you want to start your ghostwriting journey?</p>
                        <div className="start-date-input">
                            <label>Start Date:</label>
                            <input
                                type="date"
                                value={startDateInput}
                                onChange={(e) => setStartDateInput(e.target.value)}
                            />
                        </div>
                        <button className="btn btn-primary" onClick={handleStartDateSubmit}>
                            Start My Journey
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="app">
            <div className="bg-gradient"></div>
            <div className="bg-grid"></div>

            <div className="container">
                {/* Header */}
                <header className="header animate-fadeIn">
                    <div className="logo">
                        <Target className="logo-icon" />
                        <span className="logo-text">
                            <span className="gradient-text">60-Day Sprint</span>
                        </span>
                    </div>
                    <p className="date">
                        <Calendar size={14} />
                        {dateString}
                    </p>
                </header>

                {/* Missed Day Warning */}
                {showMissedWarning && !allCompleted && isViewingToday && activeTab === 'tasks' && (
                    <div className="alert-banner warning animate-fadeIn">
                        <AlertTriangle size={18} />
                        <span>You missed yesterday, but don't miss today! 💪</span>
                    </div>
                )}

                {/* Tab Toggle */}
                <div className="tab-toggle glassmorphism animate-fadeIn">
                    <button
                        className={`tab-btn ${activeTab === 'tasks' ? 'active' : ''}`}
                        onClick={() => setActiveTab('tasks')}
                    >
                        <ListTodo size={16} />
                        Today's Tasks
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'reflections' ? 'active' : ''}`}
                        onClick={() => setActiveTab('reflections')}
                    >
                        <BookOpen size={16} />
                        Reflections
                    </button>
                </div>

                {/* Reflection Modal */}
                {showReflectionModal && (
                    <ReflectionModal onClose={handleCloseReflectionModal} />
                )}

                {/* Main Content */}
                {activeTab === 'tasks' ? (
                    <>
                        {/* Quick Links */}
                        <QuickLinks />

                        {/* Day Navigation */}
                        <div className="day-nav glassmorphism animate-fadeIn">
                            <button
                                className="day-nav-btn"
                                onClick={() => navigateDay(-1)}
                                disabled={viewingDay <= 1}
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <div className="day-nav-center">
                                <div className="day-number">Day {viewingDay} of 60</div>
                                <div className="day-phase" style={{ color: currentPhase.color }}>
                                    {currentPhase.name}
                                </div>
                                {!isViewingToday && (
                                    <button className="btn btn-sm btn-secondary" onClick={goToToday}>
                                        Go to Today
                                    </button>
                                )}
                            </div>
                            <button
                                className="day-nav-btn"
                                onClick={() => navigateDay(1)}
                                disabled={viewingDay >= 60}
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>

                        {/* Motivational Message */}
                        {isViewingToday && (
                            <MotivationalMessage
                                streakBroken={showMissedWarning}
                                currentStreak={streakData.currentStreak}
                                dayNumber={currentDay}
                                allCompleteToday={allCompleted}
                            />
                        )}

                        {/* Streak Counter */}
                        {isViewingToday && (
                            <StreakCounter
                                currentStreak={streakData.currentStreak}
                                longestStreak={streakData.longestStreak}
                                daysRemaining={daysRemaining}
                                tasksRemaining={totalCount - completedCount}
                                totalTasks={totalCount}
                            />
                        )}

                        {/* Progress Bar with Celebration */}
                        <ProgressBar
                            completed={completedCount}
                            total={totalCount}
                            showCelebration={isViewingToday}
                            label={isViewingToday ? "Today's Progress" : `Day ${viewingDay} Progress`}
                        />

                        {/* Weekly Calendar */}
                        {isViewingToday && (
                            <WeeklyCalendar completionData={weeklyData} />
                        )}

                        {/* Task List */}
                        <section className="tasks-section animate-fadeIn">
                            <div className="section-header">
                                <h2>{dayData?.dayOfWeek || 'Today'}'s Tasks</h2>
                                {!isViewingToday && (
                                    <span className="viewing-past-label">Viewing Only</span>
                                )}
                            </div>
                            <div className="task-list">
                                {tasks.map((task, index) => (
                                    <div
                                        key={task.id}
                                        className={`task-item glassmorphism animate-slideIn ${task.completed ? 'completed' : ''} ${!isViewingToday ? 'readonly' : ''}`}
                                        style={{ animationDelay: `${index * 0.05}s` }}
                                    >
                                        <div
                                            className="task-checkbox"
                                            onClick={() => toggleTask(task.id)}
                                        >
                                            {task.completed && <Check size={14} color="#22c55e" />}
                                        </div>
                                        <div className="task-content">
                                            <div className="task-header">
                                                <span className="task-name">{task.name}</span>
                                                <span className="task-time">
                                                    <Clock size={10} />
                                                    {task.bufferedMinutes}m
                                                </span>
                                            </div>
                                            {isViewingToday && (
                                                <div className="task-actions">
                                                    <CompactTimer
                                                        taskId={task.id}
                                                        estimatedMinutes={task.estimatedMinutes}
                                                        onComplete={handleTimerComplete}
                                                        onTimeUpdate={handleTimeUpdate}
                                                        onActivate={activateTimer}
                                                        disabled={task.completed}
                                                    />
                                                    {getToolUrl(task.tool) && (
                                                        <a
                                                            href={getToolUrl(task.tool)}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="task-link-btn external"
                                                            onClick={(e) => e.stopPropagation()}
                                                        >
                                                            <ExternalLink size={12} />
                                                            {task.tool}
                                                        </a>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </>
                ) : (
                    <ReflectionsTab />
                )}

                {/* Phase Info */}
                <div className="phase-info animate-fadeIn">
                    <div className="phase-badge" style={{ backgroundColor: currentPhase.color + '20', borderColor: currentPhase.color }}>
                        <span className="phase-name" style={{ color: currentPhase.color }}>
                            Phase {currentPhase.id}: {currentPhase.name}
                        </span>
                    </div>
                    <p className="phase-goal">{currentPhase.goal}</p>
                </div>
            </div>
        </div>
    );
}

export default App
