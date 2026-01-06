import { useState, useEffect, useCallback, useRef } from 'react';
import { playAlarm, dismissAlarm as dismissAlarmSound, getAlarmThresholds, checkAlarmTrigger } from '../utils/alarms';

/**
 * Custom hook for robust countdown timer with persistence
 * 
 * Features:
 * - Countdown from estimated time (with 15% buffer)
 * - Persists across tab switches using timestamps
 * - Warning state when < 1 minute remains
 * - Notification when timer expires
 * - Tracks actual time spent
 */

const TIMER_STORAGE_KEY = 'bwg_active_timers';

/**
 * Get buffered time (add 15% to estimate)
 */
export const getBufferedMinutes = (minutes) => Math.ceil(minutes * 1.15);

/**
 * Format seconds to MM:SS
 */
export const formatTime = (totalSeconds) => {
    const isNegative = totalSeconds < 0;
    const absSeconds = Math.abs(totalSeconds);
    const mins = Math.floor(absSeconds / 60);
    const secs = absSeconds % 60;
    const formatted = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    return isNegative ? `-${formatted}` : formatted;
};

/**
 * Format time for display with context
 */
export const formatTimeDisplay = (seconds, showOvertime = true) => {
    if (seconds < 0 && showOvertime) {
        return `+${formatTime(Math.abs(seconds))} overtime`;
    }
    return formatTime(seconds);
};

/**
 * Load active timers from storage
 */
const loadActiveTimers = () => {
    try {
        const data = localStorage.getItem(TIMER_STORAGE_KEY);
        return data ? JSON.parse(data) : {};
    } catch {
        return {};
    }
};

/**
 * Save active timers to storage
 */
const saveActiveTimers = (timers) => {
    try {
        localStorage.setItem(TIMER_STORAGE_KEY, JSON.stringify(timers));
    } catch (error) {
        console.error('Error saving timers:', error);
    }
};

/**
 * Request notification permission
 */
export const requestNotificationPermission = async () => {
    if ('Notification' in window && Notification.permission === 'default') {
        await Notification.requestPermission();
    }
};

/**
 * Send notification
 */
const sendNotification = (title, body, taskName) => {
    // Browser notification
    if ('Notification' in window && Notification.permission === 'granted') {
        new Notification(title, {
            body,
            icon: '/favicon.ico',
            tag: `timer-${taskName}`,
            requireInteraction: true
        });
    }

    // Audio alert
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        gainNode.gain.value = 0.3;

        oscillator.start();

        // Beep pattern: beep-beep-beep
        setTimeout(() => { gainNode.gain.value = 0; }, 150);
        setTimeout(() => { gainNode.gain.value = 0.3; }, 250);
        setTimeout(() => { gainNode.gain.value = 0; }, 400);
        setTimeout(() => { gainNode.gain.value = 0.3; }, 500);
        setTimeout(() => { gainNode.gain.value = 0; }, 650);
        setTimeout(() => {
            oscillator.stop();
            audioContext.close();
        }, 700);
    } catch (error) {
        console.log('Audio notification not available');
    }
};

/**
 * Timer states
 */
export const TIMER_STATE = {
    IDLE: 'idle',
    RUNNING: 'running',
    PAUSED: 'paused',
    WARNING: 'warning',
    EXPIRED: 'expired',
    OVERTIME: 'overtime'
};

/**
 * useTimer hook
 * 
 * @param {string} taskId - Unique task identifier
 * @param {number} estimatedMinutes - Base estimated time in minutes
 * @param {function} onComplete - Callback when timer completes
 * @param {function} onTimeUpdate - Callback for time tracking
 */
export const useTimer = (taskId, estimatedMinutes, onComplete, onTimeUpdate) => {
    const bufferedMinutes = getBufferedMinutes(estimatedMinutes);
    const totalSeconds = bufferedMinutes * 60;

    const [remainingSeconds, setRemainingSeconds] = useState(totalSeconds);
    const [timerState, setTimerState] = useState(TIMER_STATE.IDLE);
    const [elapsedSeconds, setElapsedSeconds] = useState(0);
    const [showAlarmModal, setShowAlarmModal] = useState(false);

    const intervalRef = useRef(null);
    const startTimeRef = useRef(null);
    const pausedAtRef = useRef(null);
    const notifiedRef = useRef(false);
    const playedAlarmsRef = useRef({ stage1: false, stage2: false, stage3: false, stage4: false });
    const alarmThresholdsRef = useRef(getAlarmThresholds(totalSeconds));
    const stage4StopRef = useRef(null);

    // Calculate current state based on remaining time
    const getTimerState = useCallback((remaining) => {
        if (remaining <= 0) return TIMER_STATE.OVERTIME;
        if (remaining <= 60) return TIMER_STATE.WARNING;
        return TIMER_STATE.RUNNING;
    }, []);

    // Load persisted timer state on mount
    useEffect(() => {
        const timers = loadActiveTimers();
        const savedTimer = timers[taskId];

        if (savedTimer && savedTimer.isRunning) {
            // Calculate time elapsed since timer was saved
            const now = Date.now();
            const elapsedSinceStart = Math.floor((now - savedTimer.startTime) / 1000);
            const newRemaining = savedTimer.totalSeconds - elapsedSinceStart;

            setRemainingSeconds(newRemaining);
            setElapsedSeconds(elapsedSinceStart);
            startTimeRef.current = savedTimer.startTime;
            setTimerState(getTimerState(newRemaining));
        }
    }, [taskId, getTimerState]);

    // Main timer tick
    useEffect(() => {
        if (timerState === TIMER_STATE.RUNNING ||
            timerState === TIMER_STATE.WARNING ||
            timerState === TIMER_STATE.OVERTIME) {

            intervalRef.current = setInterval(() => {
                const now = Date.now();
                const elapsed = Math.floor((now - startTimeRef.current) / 1000);
                const remaining = totalSeconds - elapsed;

                setRemainingSeconds(remaining);
                setElapsedSeconds(elapsed);

                // Update state based on remaining time
                const newState = getTimerState(remaining);
                if (newState !== timerState && newState !== TIMER_STATE.RUNNING) {
                    setTimerState(newState);
                }

                // Check and trigger alarms at thresholds
                const alarmStage = checkAlarmTrigger(remaining, alarmThresholdsRef.current, playedAlarmsRef.current);
                if (alarmStage) {
                    playedAlarmsRef.current[`stage${alarmStage}`] = true;
                    const stopFn = playAlarm(alarmStage);
                    if (alarmStage === 4) {
                        stage4StopRef.current = stopFn;
                        setShowAlarmModal(true);
                    }
                }

                // Send notification when timer expires (only once)
                if (remaining <= 0 && !notifiedRef.current) {
                    notifiedRef.current = true;
                    sendNotification(
                        '⏰ Timer Expired!',
                        `Time's up for your task. You've been working for ${formatTime(elapsed)}.`,
                        taskId
                    );
                    if (onComplete) onComplete(taskId, elapsed);
                }

                // Persist timer state
                const timers = loadActiveTimers();
                timers[taskId] = {
                    startTime: startTimeRef.current,
                    totalSeconds,
                    isRunning: true,
                    taskId
                };
                saveActiveTimers(timers);

            }, 1000);
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [timerState, taskId, totalSeconds, onComplete, getTimerState]);

    // Start timer
    const start = useCallback(() => {
        if (timerState === TIMER_STATE.IDLE || timerState === TIMER_STATE.EXPIRED) {
            // Fresh start
            startTimeRef.current = Date.now();
            setRemainingSeconds(totalSeconds);
            setElapsedSeconds(0);
            notifiedRef.current = false;
        } else if (timerState === TIMER_STATE.PAUSED) {
            // Resume from pause
            const pausedDuration = Date.now() - pausedAtRef.current;
            startTimeRef.current += pausedDuration;
        }

        setTimerState(TIMER_STATE.RUNNING);

        // Persist
        const timers = loadActiveTimers();
        timers[taskId] = {
            startTime: startTimeRef.current,
            totalSeconds,
            isRunning: true,
            taskId
        };
        saveActiveTimers(timers);
    }, [timerState, taskId, totalSeconds]);

    // Pause timer
    const pause = useCallback(() => {
        if (timerState === TIMER_STATE.RUNNING ||
            timerState === TIMER_STATE.WARNING ||
            timerState === TIMER_STATE.OVERTIME) {

            pausedAtRef.current = Date.now();
            setTimerState(TIMER_STATE.PAUSED);

            // Update persistence
            const timers = loadActiveTimers();
            if (timers[taskId]) {
                timers[taskId].isRunning = false;
                timers[taskId].pausedAt = pausedAtRef.current;
                saveActiveTimers(timers);
            }
        }
    }, [timerState, taskId]);

    // Stop timer and record time
    const stop = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        // Record final elapsed time
        if (onTimeUpdate && elapsedSeconds > 0) {
            onTimeUpdate(taskId, elapsedSeconds, totalSeconds);
        }

        // Clear from persistence
        const timers = loadActiveTimers();
        delete timers[taskId];
        saveActiveTimers(timers);

        // Reset state
        setTimerState(TIMER_STATE.IDLE);
        setRemainingSeconds(totalSeconds);
        setElapsedSeconds(0);
        startTimeRef.current = null;
        notifiedRef.current = false;
    }, [taskId, elapsedSeconds, totalSeconds, onTimeUpdate]);

    // Reset timer
    const reset = useCallback(() => {
        stop();
        setRemainingSeconds(totalSeconds);
        setElapsedSeconds(0);
    }, [stop, totalSeconds]);

    // Toggle timer (start/pause)
    const toggle = useCallback(() => {
        if (timerState === TIMER_STATE.RUNNING ||
            timerState === TIMER_STATE.WARNING ||
            timerState === TIMER_STATE.OVERTIME) {
            pause();
        } else {
            start();
        }
    }, [timerState, start, pause]);

    // Dismiss stage 4 alarm
    const dismissAlarm = useCallback(() => {
        if (stage4StopRef.current) {
            stage4StopRef.current();
            stage4StopRef.current = null;
        }
        dismissAlarmSound();
        setShowAlarmModal(false);
    }, []);

    // Check if timer is active
    const isActive = timerState === TIMER_STATE.RUNNING ||
        timerState === TIMER_STATE.WARNING ||
        timerState === TIMER_STATE.OVERTIME;

    const isPaused = timerState === TIMER_STATE.PAUSED;
    const isExpired = remainingSeconds <= 0;
    const isWarning = remainingSeconds > 0 && remainingSeconds <= 60;

    return {
        // Time values
        remainingSeconds,
        elapsedSeconds,
        totalSeconds,
        bufferedMinutes,

        // Formatted time
        formattedRemaining: formatTime(remainingSeconds),
        formattedElapsed: formatTime(elapsedSeconds),

        // State
        timerState,
        isActive,
        isPaused,
        isExpired,
        isWarning,
        showAlarmModal,

        // Progress (0-100, can exceed 100 for overtime)
        progress: Math.min(100, ((totalSeconds - remainingSeconds) / totalSeconds) * 100),

        // Actions
        start,
        pause,
        stop,
        reset,
        toggle,
        dismissAlarm
    };
};

/**
 * Hook for managing multiple timers
 */
export const useTimerManager = () => {
    const [activeTaskId, setActiveTaskId] = useState(null);

    // Load active timer on mount
    useEffect(() => {
        const timers = loadActiveTimers();
        const activeTimer = Object.values(timers).find(t => t.isRunning);
        if (activeTimer) {
            setActiveTaskId(activeTimer.taskId);
        }
    }, []);

    const setActiveTimer = useCallback((taskId) => {
        setActiveTaskId(taskId);
    }, []);

    const clearActiveTimer = useCallback(() => {
        if (activeTaskId) {
            const timers = loadActiveTimers();
            delete timers[activeTaskId];
            saveActiveTimers(timers);
        }
        setActiveTaskId(null);
    }, [activeTaskId]);

    return {
        activeTaskId,
        setActiveTimer,
        clearActiveTimer,
        hasActiveTimer: activeTaskId !== null
    };
};

export default useTimer;
