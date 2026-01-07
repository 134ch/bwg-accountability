import { useState, useEffect } from 'react';
import { Rocket, Clock } from 'lucide-react';
import { getCurrentDate } from '../utils/testDate';
import './FutureStartTimer.css';

/**
 * FutureStartTimer - Countdown display for future start dates
 * 
 * Shows countdown until start date and blocks task interaction.
 * Automatically disappears when countdown reaches zero.
 */
const FutureStartTimer = ({ startDate, onCountdownComplete }) => {
    const [timeRemaining, setTimeRemaining] = useState(null);

    useEffect(() => {
        if (!startDate) return;

        const calculateTimeRemaining = () => {
            const now = getCurrentDate(); // Use mock date when testing
            const start = new Date(startDate);
            // Set start time to beginning of day
            start.setHours(0, 0, 0, 0);

            const diff = start.getTime() - now.getTime();

            if (diff <= 0) {
                // Countdown complete
                onCountdownComplete?.();
                return null;
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            return { days, hours, minutes, seconds, total: diff };
        };

        // Initial calculation
        setTimeRemaining(calculateTimeRemaining());

        // Update every second
        const interval = setInterval(() => {
            const remaining = calculateTimeRemaining();
            setTimeRemaining(remaining);

            if (!remaining) {
                clearInterval(interval);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [startDate, onCountdownComplete]);

    // Don't render if no time remaining (countdown complete or no start date)
    if (!timeRemaining) return null;

    // Format the start date for display
    const formatStartDate = () => {
        const date = new Date(startDate);
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="future-start-timer glassmorphism animate-fadeIn">
            <div className="timer-header">
                <Rocket className="timer-icon" size={32} />
                <h2>Your Sprint is Coming!</h2>
            </div>

            <p className="timer-message">
                Your 60-day sprint begins on <strong>{formatStartDate()}</strong>
            </p>

            <div className="countdown-display">
                <div className="countdown-item">
                    <span className="countdown-value">{timeRemaining.days}</span>
                    <span className="countdown-label">days</span>
                </div>
                <span className="countdown-separator">:</span>
                <div className="countdown-item">
                    <span className="countdown-value">{String(timeRemaining.hours).padStart(2, '0')}</span>
                    <span className="countdown-label">hours</span>
                </div>
                <span className="countdown-separator">:</span>
                <div className="countdown-item">
                    <span className="countdown-value">{String(timeRemaining.minutes).padStart(2, '0')}</span>
                    <span className="countdown-label">minutes</span>
                </div>
                <span className="countdown-separator">:</span>
                <div className="countdown-item">
                    <span className="countdown-value">{String(timeRemaining.seconds).padStart(2, '0')}</span>
                    <span className="countdown-label">seconds</span>
                </div>
            </div>

            <div className="timer-info">
                <Clock size={14} />
                <span>Tasks are available for preview but will unlock when your sprint begins</span>
            </div>
        </div>
    );
};

export default FutureStartTimer;
