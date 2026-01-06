/**
 * Timer utility functions
 */

/**
 * Format seconds to MM:SS display
 */
export const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

/**
 * Format seconds to HH:MM:SS for longer durations
 */
export const formatTimeLong = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
        return `${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return formatTime(seconds);
};

/**
 * Parse a duration string (e.g., "30m", "1h", "1h30m") to seconds
 */
export const parseDuration = (durationStr) => {
    const hourMatch = durationStr.match(/(\d+)h/);
    const minMatch = durationStr.match(/(\d+)m/);

    let seconds = 0;
    if (hourMatch) seconds += parseInt(hourMatch[1]) * 3600;
    if (minMatch) seconds += parseInt(minMatch[1]) * 60;

    return seconds;
};

/**
 * Calculate progress percentage
 */
export const calculateProgress = (elapsed, total) => {
    if (total <= 0) return 0;
    return Math.min(100, Math.round((elapsed / total) * 100));
};

/**
 * Get time remaining text
 */
export const getTimeRemaining = (remaining) => {
    if (remaining <= 0) return 'Complete!';
    if (remaining < 60) return `${remaining}s remaining`;
    if (remaining < 3600) return `${Math.ceil(remaining / 60)}m remaining`;
    return `${Math.floor(remaining / 3600)}h ${Math.ceil((remaining % 3600) / 60)}m remaining`;
};
