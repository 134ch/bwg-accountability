import React, { useEffect, useState, useRef } from 'react';
import { PartyPopper, Sparkles, Zap, Trophy, Target, AlertTriangle } from 'lucide-react';
import './ProgressBar.css';

/**
 * Enhanced Progress Bar with celebration animation
 */
const ProgressBar = ({
    completed,
    total,
    showCelebration = true,
    label = "Today's Progress"
}) => {
    const [celebrating, setCelebrating] = useState(false);
    const [confetti, setConfetti] = useState([]);
    const prevCompletedRef = useRef(completed);

    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    const isComplete = completed === total && total > 0;

    // Trigger celebration when hitting 100%
    useEffect(() => {
        if (isComplete && prevCompletedRef.current !== total && showCelebration) {
            triggerCelebration();
        }
        prevCompletedRef.current = completed;
    }, [completed, total, isComplete, showCelebration]);

    const triggerCelebration = () => {
        setCelebrating(true);

        // Generate confetti particles
        const particles = Array.from({ length: 50 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            delay: Math.random() * 0.5,
            duration: 1 + Math.random() * 1,
            color: ['#f97316', '#22c55e', '#eab308', '#8b5cf6', '#06b6d4'][Math.floor(Math.random() * 5)]
        }));
        setConfetti(particles);

        // End celebration after 3 seconds
        setTimeout(() => {
            setCelebrating(false);
            setConfetti([]);
        }, 3000);
    };

    // Get progress color class
    const getProgressClass = () => {
        if (percentage === 100) return 'complete';
        if (percentage >= 75) return 'high';
        if (percentage >= 50) return 'medium';
        return 'low';
    };

    return (
        <div className={`progress-container ${celebrating ? 'celebrating' : ''}`}>
            {/* Confetti */}
            {celebrating && (
                <div className="confetti-container">
                    {confetti.map(particle => (
                        <div
                            key={particle.id}
                            className="confetti-particle"
                            style={{
                                left: `${particle.x}%`,
                                animationDelay: `${particle.delay}s`,
                                animationDuration: `${particle.duration}s`,
                                backgroundColor: particle.color
                            }}
                        />
                    ))}
                </div>
            )}

            {/* Header */}
            <div className="progress-header">
                <span className="progress-label">{label}</span>
                <span className={`progress-percentage ${getProgressClass()}`}>
                    {percentage}%
                </span>
            </div>

            {/* Progress Bar */}
            <div className="progress-track">
                <div
                    className={`progress-fill ${getProgressClass()}`}
                    style={{ width: `${percentage}%` }}
                >
                    {percentage > 10 && (
                        <span className="progress-text">{completed}/{total}</span>
                    )}
                </div>
            </div>

            {/* Status Message */}
            <div className="progress-status">
                {isComplete ? (
                    <span className="status-complete">
                        <Sparkles size={14} />
                        All tasks complete! 🎉
                    </span>
                ) : total - completed === 1 ? (
                    <span className="status-almost">
                        <Zap size={14} />
                        Just 1 more task to go!
                    </span>
                ) : total - completed <= 3 ? (
                    <span className="status-close">
                        <Target size={14} />
                        {total - completed} tasks left - you're almost there!
                    </span>
                ) : null}
            </div>

            {/* Celebration Overlay */}
            {celebrating && (
                <div className="celebration-overlay">
                    <div className="celebration-content">
                        <PartyPopper className="celebration-icon-large" />
                        <h2>Amazing Work! 🎉</h2>
                        <p>You crushed every task today!</p>
                    </div>
                </div>
            )}
        </div>
    );
};

/**
 * Streak Counter Component
 */
export const StreakCounter = ({
    currentStreak,
    longestStreak,
    daysRemaining,
    tasksRemaining = 0,
    totalTasks = 0
}) => {
    const getStreakMessage = () => {
        if (currentStreak >= 30) return "🔥 Unstoppable!";
        if (currentStreak >= 21) return "🏆 Three Weeks Strong!";
        if (currentStreak >= 14) return "⚡ Two Weeks of Fire!";
        if (currentStreak >= 7) return "🌟 One Week Champion!";
        if (currentStreak >= 5) return "💪 Building Momentum!";
        if (currentStreak >= 3) return "🚀 Great Start!";
        if (currentStreak >= 1) return "✨ Keep Going!";
        return "Start your streak today!";
    };

    const streakStatus = tasksRemaining > 0 && tasksRemaining <= 3;

    return (
        <div className="streak-counter">
            <div className="streak-main">
                <div className="streak-number">
                    <span className="number">{currentStreak}</span>
                    <span className="unit">day{currentStreak !== 1 ? 's' : ''}</span>
                </div>
                <div className="streak-label">
                    <span className="streak-title">Current Streak</span>
                    <span className="streak-message">{getStreakMessage()}</span>
                </div>
            </div>

            {/* Streak at risk warning */}
            {streakStatus && (
                <div className="streak-warning">
                    <AlertTriangle size={14} />
                    <span>
                        {tasksRemaining} task{tasksRemaining !== 1 ? 's' : ''} left to keep your streak!
                    </span>
                </div>
            )}

            {/* Goal countdown */}
            <div className="goal-countdown">
                <Trophy size={16} />
                <span className="countdown-text">
                    <strong>{daysRemaining}</strong> days until first client
                </span>
            </div>
        </div>
    );
};

/**
 * Motivational Message Component
 */
export const MotivationalMessage = ({
    streakBroken = false,
    currentStreak,
    dayNumber,
    allCompleteToday = false
}) => {
    const getMessage = () => {
        // If streak broken
        if (streakBroken) {
            return {
                type: 'warning',
                icon: <AlertTriangle size={18} />,
                title: "You missed yesterday",
                message: "But don't miss today! Every day is a fresh start. 💪"
            };
        }

        // If all complete today
        if (allCompleteToday) {
            const messages = [
                "You're building something amazing!",
                "Consistency is your superpower!",
                "One step closer to your goal!",
                "Your future self will thank you!"
            ];
            return {
                type: 'success',
                icon: <Sparkles size={18} />,
                title: "Day Complete!",
                message: messages[Math.floor(Math.random() * messages.length)]
            };
        }

        // Milestone messages based on streak
        if (currentStreak >= 30) {
            return {
                type: 'celebration',
                icon: <Trophy size={18} />,
                title: "30-Day Legend!",
                message: "You've achieved elite consistency. Nothing can stop you now! 🏆"
            };
        }

        if (currentStreak >= 21) {
            return {
                type: 'celebration',
                icon: <Trophy size={18} />,
                title: "21 Days - Habit Formed!",
                message: "Research says habits form in 21 days. You've made it! 🎯"
            };
        }

        if (currentStreak >= 14) {
            return {
                type: 'milestone',
                icon: <Zap size={18} />,
                title: "Two Weeks Strong!",
                message: "You're in the top 10% of people who stick with goals."
            };
        }

        if (currentStreak >= 7) {
            return {
                type: 'milestone',
                icon: <Sparkles size={18} />,
                title: "One Week Complete!",
                message: "Most people quit by now. You didn't. 💪"
            };
        }

        // Default encouraging message
        const dayMessages = [
            "Every task you complete brings you closer to your goal.",
            "Small consistent actions create big results.",
            "You're doing better than 90% of people who just dream.",
            "Building a business one task at a time."
        ];

        return {
            type: 'info',
            icon: <Target size={18} />,
            title: `Day ${dayNumber} of 60`,
            message: dayMessages[dayNumber % dayMessages.length]
        };
    };

    const msg = getMessage();

    return (
        <div className={`motivational-message ${msg.type}`}>
            <div className="message-icon">{msg.icon}</div>
            <div className="message-content">
                <h4>{msg.title}</h4>
                <p>{msg.message}</p>
            </div>
        </div>
    );
};

export default ProgressBar;
