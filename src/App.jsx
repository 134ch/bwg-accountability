import { useState, useEffect, useCallback } from 'react'
import {
    Target, Calendar, Clock, Check,
    ExternalLink, AlertTriangle, RotateCcw,
    ChevronLeft, ChevronRight, ListTodo, BookOpen
} from 'lucide-react'
import { dailyTasks, getTasksForDay } from './data/dailyTasks'
import { getBufferedTime } from './utils/tasks'
import { phases, getPhaseForDay, toolUrls } from './data/phases'
import { getDayFocus } from './utils/dayFocus'
import { CompactTimer } from './components/Timer'
import ProgressBar, { StreakCounter, MotivationalMessage } from './components/ProgressBar'
import WeeklyCalendar from './components/WeeklyCalendar'
import ReflectionModal from './components/ReflectionModal'
import ReflectionsTab from './components/ReflectionsTab'
import QuickLinks from './components/QuickLinks'
import CarryoverReminder from './components/CarryoverReminder'
import Celebration from './components/Celebration'
import ResetDataModal from './components/ResetDataModal'
import FutureStartTimer from './components/FutureStartTimer'
import { initializeStorage } from './utils/storage-service'
import {
    loadTodayTasks, saveTodayTasks, loadStreakData,
    getDaysRemainingToGoal, didMissYesterday,
    shouldShowReflection, getCurrentWeekKey, loadReflections,
    hasStartDate, setStartDate, getStartDate, getCurrentDayNumber, getTodayKey,
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
    const [showCelebration, setShowCelebration] = useState(false)
    const [celebrationTriggered, setCelebrationTriggered] = useState(false)
    const [showResetModal, setShowResetModal] = useState(false)
    const [storageReady, setStorageReady] = useState(false)
    const [isStartInFuture, setIsStartInFuture] = useState(false)
    const [storedStartDate, setStoredStartDate] = useState(null)

    // Current phase info
    const currentPhase = getPhaseForDay(viewingDay);

    // Initialize on mount
    useEffect(() => {
        const init = async () => {
            // Initialize IndexedDB + localStorage storage
            await initializeStorage();
            setStorageReady(true);

            // Check if start date is set
            if (!hasStartDate()) {
                setShowStartModal(true);
                return;
            }

            // Get and store the start date
            const savedStartDate = getStartDate();
            setStoredStartDate(savedStartDate);

            // Check if start date is in the future
            const today = new Date(getTodayKey());
            const startDateObj = new Date(savedStartDate);
            const isFuture = startDateObj > today;
            setIsStartInFuture(isFuture);

            // Get current day number (will be 1 or less if future)
            const dayNum = getCurrentDayNumber();
            setCurrentDay(dayNum);
            setViewingDay(dayNum);

            // Load streak (only if not in future)
            if (!isFuture) {
                setStreakData(loadStreakData());

                // Check if missed yesterday
                setShowMissedWarning(didMissYesterday());

                // Check for reflection day
                if (shouldShowReflection()) {
                    const weekKey = getCurrentWeekKey();
                    const reflections = loadReflections();
                    if (!reflections[weekKey]) {
                        setShowReflectionModal(true);
                    }
                }
            }

            // Register service worker for PWA
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.register('/bwg-accountability/sw.js')
                    .then((reg) => console.log('SW registered:', reg.scope))
                    .catch((err) => console.log('SW registration failed:', err));
            }
        };
        init();
    }, []);

    // Load tasks when viewing day changes
    useEffect(() => {
        // Wait for storage to be ready before loading tasks
        if (!storageReady || showStartModal) return;

        const dayData = getTasksForDay(viewingDay);
        if (!dayData) return;

        const isToday = viewingDay === currentDay;

        // ALWAYS start with fresh tasks for this day from the template
        const freshTasks = dayData.tasks.map(task => ({
            ...task,
            completed: false,
            timerActive: false,
            timeSpent: 0,
            bufferedMinutes: getBufferedTime(task.estimatedMinutes)
        }));

        if (isToday) {
            // For today: check if we have saved progress
            const savedTasks = loadTodayTasks();
            if (savedTasks && savedTasks.tasks && savedTasks.dayNumber === viewingDay) {
                // Load saved progress (includes any carryover tasks)
                setTasks(savedTasks.tasks);
            } else {
                // No saved progress, use fresh tasks
                setTasks(freshTasks);
            }
        } else {
            // For other days: always use fresh tasks from template (no carryovers)
            setTasks(freshTasks);
        }
    }, [viewingDay, currentDay, showStartModal, storageReady]);

    // Save tasks whenever they change (only for current day)
    useEffect(() => {
        // Only save once storage is ready and we have tasks
        if (!storageReady || tasks.length === 0 || viewingDay !== currentDay) return;
        saveTodayTasks(tasks, viewingDay);
        // Update streak when all completed
        const allCompleted = tasks.every(t => t.completed);
        if (allCompleted) {
            setStreakData(loadStreakData());
            // Trigger celebration if not already triggered today
            if (!celebrationTriggered) {
                setShowCelebration(true);
                setCelebrationTriggered(true);
            }
        }
        // Update weekly data
        setWeeklyData(getWeeklyCompletionData());
    }, [tasks, viewingDay, currentDay, celebrationTriggered, storageReady]);

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
    // Tasks are only interactive if viewing today AND start date is not in the future
    const isTasksInteractive = isViewingToday && !isStartInFuture;

    const handleStartDateSubmit = () => {
        setStartDate(startDateInput);
        setStoredStartDate(startDateInput);
        setShowStartModal(false);

        // Check if selected date is in the future
        const today = new Date(getTodayKey());
        const selectedDate = new Date(startDateInput);
        const isFuture = selectedDate > today;
        setIsStartInFuture(isFuture);

        const dayNum = getCurrentDayNumber();
        setCurrentDay(dayNum);
        setViewingDay(dayNum);
    };

    // Handler when countdown timer reaches zero
    const handleCountdownComplete = useCallback(() => {
        setIsStartInFuture(false);
        // Reload streak and other data
        setStreakData(loadStreakData());
        setShowMissedWarning(didMissYesterday());
    }, []);

    const toggleTask = useCallback((taskId) => {
        if (!isTasksInteractive) return; // Can't toggle when future or not viewing today

        // Vibration feedback for mobile (25ms pulse)
        if ('vibrate' in navigator) {
            navigator.vibrate(25);
        }

        setTasks(prev => prev.map(task => {
            if (task.id === taskId) {
                const newCompleted = !task.completed;

                // If marking task as complete, clear active timer
                if (newCompleted && activeTimerId === taskId) {
                    setActiveTimerId(null);
                }

                return { ...task, completed: newCompleted };
            }
            return task;
        }));
    }, [isTasksInteractive, activeTimerId]);

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

    // Add carryover tasks from yesterday to today
    const handleAddCarryoverTasks = useCallback((carryoverTasks) => {
        setTasks(prev => {
            // Create new tasks from carryover, marking them as carryover
            const newTasks = carryoverTasks.map(task => {
                // Strip any existing carryover- prefix to prevent nesting
                const baseId = task.id.replace(/^(carryover-)+/, '');
                // Add unique timestamp to prevent ID collisions across days
                const uniqueId = `carryover-${baseId}-${Date.now()}`;
                return {
                    ...task,
                    id: uniqueId,
                    completed: false,
                    isCarryover: true,
                    timerActive: false,
                    timeSpent: 0,
                    startedAt: null
                };
            });
            return [...prev, ...newTasks];
        });
    }, []);

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

    // Get today's date in YYYY-MM-DD format for min attribute
    const todayForInput = getTodayKey();

    // Validate that selected date is not in the past
    const isStartDateValid = startDateInput >= todayForInput;

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
                                min={todayForInput}
                                onChange={(e) => setStartDateInput(e.target.value)}
                                title="You can only start today or in the future"
                            />
                            {!isStartDateValid && (
                                <p className="date-error">
                                    <AlertTriangle size={14} />
                                    Start date cannot be in the past
                                </p>
                            )}
                        </div>
                        <button
                            className="btn btn-primary"
                            onClick={handleStartDateSubmit}
                            disabled={!isStartDateValid}
                        >
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
                    <div className="header-actions">
                        <button
                            className="btn btn-sm reset-btn-visible"
                            onClick={() => setShowResetModal(true)}
                            title="Reset Data"
                        >
                            <RotateCcw size={16} />
                            <span>Reset</span>
                        </button>
                        <p className="date">
                            <Calendar size={14} />
                            {dateString}
                        </p>
                    </div>
                </header>

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
                        {/* Carryover Reminder for incomplete yesterday tasks */}
                        {!isStartInFuture && <CarryoverReminder onAddTasks={handleAddCarryoverTasks} />}

                        {/* Future Start Timer - shows countdown when start date is in future */}
                        {isStartInFuture && storedStartDate && (
                            <FutureStartTimer
                                startDate={storedStartDate}
                                onCountdownComplete={handleCountdownComplete}
                            />
                        )}

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
                                <h2>{getDayFocus(viewingDay)}</h2>
                                {!isViewingToday && (
                                    <span className="viewing-past-label">Viewing Only</span>
                                )}
                            </div>
                            <div className={`task-list ${isStartInFuture ? 'tasks-locked' : ''}`}>
                                {tasks.map((task, index) => (
                                    <div
                                        key={task.id}
                                        className={`task-item glassmorphism animate-slideIn ${task.completed ? 'completed' : ''} ${!isTasksInteractive ? 'readonly' : ''}`}
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
                                            {isTasksInteractive && (
                                                <div className="task-actions">
                                                    <CompactTimer
                                                        taskId={task.id}
                                                        estimatedMinutes={task.estimatedMinutes}
                                                        onComplete={handleTimerComplete}
                                                        onTimeUpdate={handleTimeUpdate}
                                                        onActivate={activateTimer}
                                                        disabled={task.completed || isStartInFuture}
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

                {/* Celebration Modal */}
                <Celebration
                    show={showCelebration}
                    streakDays={streakData.currentStreak}
                    daysRemaining={getDaysRemainingToGoal()}
                    onClose={() => setShowCelebration(false)}
                />

                {/* Reset Data Modal */}
                <ResetDataModal
                    show={showResetModal}
                    onClose={() => setShowResetModal(false)}
                />
            </div>
        </div>
    );
}

export default App
