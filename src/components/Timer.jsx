import React, { useEffect } from 'react';
import { Play, Pause, Square, RotateCcw, Clock, AlertTriangle } from 'lucide-react';
import { useTimer, TIMER_STATE, requestNotificationPermission } from '../hooks/useTimer';
import './Timer.css';

/**
 * Timer Component
 * 
 * Displays countdown timer with controls for a task
 * 
 * @param {string} taskId - Unique task identifier
 * @param {string} taskName - Display name for the task
 * @param {number} estimatedMinutes - Base time estimate in minutes
 * @param {function} onComplete - Callback when timer expires
 * @param {function} onTimeUpdate - Callback to save time tracking data
 * @param {boolean} isActive - Whether this timer should be active
 * @param {function} onActivate - Callback when timer is started
 */
const Timer = ({
    taskId,
    taskName,
    estimatedMinutes,
    onComplete,
    onTimeUpdate,
    isActive: externalActive,
    onActivate
}) => {
    const {
        remainingSeconds,
        elapsedSeconds,
        bufferedMinutes,
        formattedRemaining,
        formattedElapsed,
        timerState,
        isActive,
        isPaused,
        isExpired,
        isWarning,
        progress,
        start,
        pause,
        stop,
        reset,
        toggle
    } = useTimer(taskId, estimatedMinutes, onComplete, onTimeUpdate);

    // Request notification permission on mount
    useEffect(() => {
        requestNotificationPermission();
    }, []);

    const handleStart = () => {
        if (onActivate) onActivate(taskId);
        start();
    };

    const handleToggle = () => {
        if (!isActive && onActivate) onActivate(taskId);
        toggle();
    };

    const handleStop = () => {
        stop();
    };

    // Determine timer class based on state
    const getTimerClass = () => {
        switch (timerState) {
            case TIMER_STATE.WARNING:
                return 'timer-warning';
            case TIMER_STATE.OVERTIME:
            case TIMER_STATE.EXPIRED:
                return 'timer-expired';
            case TIMER_STATE.PAUSED:
                return 'timer-paused';
            case TIMER_STATE.RUNNING:
                return 'timer-running';
            default:
                return 'timer-idle';
        }
    };

    return (
        <div className={`timer-container ${getTimerClass()}`}>
            {/* Timer Display */}
            <div className="timer-display-wrapper">
                <div className="timer-main-display">
                    {isExpired && <span className="overtime-indicator">+</span>}
                    <span className="timer-digits">{formattedRemaining}</span>
                </div>

                {isActive && (
                    <div className="timer-elapsed">
                        Elapsed: {formattedElapsed}
                    </div>
                )}

                {isWarning && !isExpired && (
                    <div className="timer-warning-badge">
                        <AlertTriangle size={12} />
                        Less than 1 min left!
                    </div>
                )}
            </div>

            {/* Progress Bar */}
            <div className="timer-progress-bar">
                <div
                    className={`timer-progress-fill ${isWarning ? 'warning' : ''} ${isExpired ? 'expired' : ''}`}
                    style={{ width: `${Math.min(progress, 100)}%` }}
                />
            </div>

            {/* Controls */}
            <div className="timer-controls">
                {!isActive && !isPaused ? (
                    <button
                        className="timer-btn timer-btn-start"
                        onClick={handleStart}
                        title="Start timer"
                    >
                        <Play size={16} />
                        <span>Start</span>
                    </button>
                ) : (
                    <>
                        <button
                            className={`timer-btn ${isPaused ? 'timer-btn-start' : 'timer-btn-pause'}`}
                            onClick={handleToggle}
                            title={isPaused ? 'Resume' : 'Pause'}
                        >
                            {isPaused ? <Play size={16} /> : <Pause size={16} />}
                            <span>{isPaused ? 'Resume' : 'Pause'}</span>
                        </button>
                        <button
                            className="timer-btn timer-btn-stop"
                            onClick={handleStop}
                            title="Stop and save time"
                        >
                            <Square size={16} />
                            <span>Stop</span>
                        </button>
                    </>
                )}
            </div>

            {/* Time Info */}
            <div className="timer-info">
                <Clock size={12} />
                <span>Est: {estimatedMinutes}m → {bufferedMinutes}m (w/ buffer)</span>
            </div>
        </div>
    );
};

/**
 * Compact timer for task list items
 */
export const CompactTimer = ({
    taskId,
    estimatedMinutes,
    onComplete,
    onTimeUpdate,
    onActivate,
    disabled = false
}) => {
    const {
        formattedRemaining,
        formattedElapsed,
        timerState,
        isActive,
        isPaused,
        isExpired,
        isWarning,
        start,
        pause,
        stop,
        toggle
    } = useTimer(taskId, estimatedMinutes, onComplete, onTimeUpdate);

    // Stop timer when task is marked complete (disabled becomes true)
    useEffect(() => {
        if (disabled && (isActive || isPaused)) {
            stop();
        }
    }, [disabled, isActive, isPaused, stop]);

    const handleToggle = (e) => {
        e.stopPropagation();
        if (disabled) return;
        if (!isActive && onActivate) onActivate(taskId);
        toggle();
    };

    const handleStop = (e) => {
        e.stopPropagation();
        stop();
    };

    const getButtonClass = () => {
        if (isExpired) return 'compact-timer-expired';
        if (isWarning) return 'compact-timer-warning';
        if (isActive) return 'compact-timer-active';
        if (isPaused) return 'compact-timer-paused';
        return '';
    };

    return (
        <div className={`compact-timer ${getButtonClass()}`}>
            <button
                className="compact-timer-btn"
                onClick={handleToggle}
                disabled={disabled}
            >
                {isActive ? (
                    <>
                        <Pause size={12} />
                        <span className="compact-timer-time">{formattedRemaining}</span>
                    </>
                ) : isPaused ? (
                    <>
                        <Play size={12} />
                        <span className="compact-timer-time">{formattedRemaining}</span>
                    </>
                ) : (
                    <>
                        <Play size={12} />
                        <span>Start Timer</span>
                    </>
                )}
            </button>

            {(isActive || isPaused) && (
                <button
                    className="compact-timer-stop"
                    onClick={handleStop}
                    title="Stop timer"
                >
                    <Square size={12} />
                </button>
            )}
        </div>
    );
};

export default Timer;
