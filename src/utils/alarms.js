/**
 * Timer Alarm System - 4 Progressive Stages
 * 
 * Stage 1 (75% remaining): Soft beep - gentle reminder
 * Stage 2 (50% remaining): Soft beep - halfway point
 * Stage 3 (25% remaining): Medium alarm - getting urgent
 * Stage 4 (0% / expired): Loud alarm - needs dismissal
 */

// Audio context singleton
let audioContext = null;

const getAudioContext = () => {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioContext;
};

// Active alarm reference for stage 4 (so it can be dismissed)
let activeAlarm = null;

/**
 * Play alarm sound based on stage
 * @param {number} stage - 1, 2, 3, or 4
 * @returns {function} Stop function for stage 4 alarm
 */
export const playAlarm = (stage) => {
    try {
        const ctx = getAudioContext();

        // Resume audio context if suspended (browser autoplay policy)
        if (ctx.state === 'suspended') {
            ctx.resume();
        }

        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        // Different settings per stage
        switch (stage) {
            case 1: // 75% - Soft beep (low pitch, quiet)
                oscillator.frequency.value = 440; // A4
                oscillator.type = 'sine';
                gainNode.gain.value = 0.1;
                playBeepPattern(oscillator, gainNode, 1, 150);
                break;

            case 2: // 50% - Soft beep (slightly higher)
                oscillator.frequency.value = 523; // C5
                oscillator.type = 'sine';
                gainNode.gain.value = 0.15;
                playBeepPattern(oscillator, gainNode, 2, 150);
                break;

            case 3: // 25% - Medium alarm (louder, multiple beeps)
                oscillator.frequency.value = 659; // E5
                oscillator.type = 'triangle';
                gainNode.gain.value = 0.25;
                playBeepPattern(oscillator, gainNode, 3, 200);
                break;

            case 4: // 0% - Loud alarm (continuous until dismissed)
                return playLoudAlarm(ctx);

            default:
                return null;
        }

        return null;
    } catch (error) {
        console.log('Audio not available:', error);
        return null;
    }
};

/**
 * Play beep pattern for stages 1-3
 */
const playBeepPattern = (oscillator, gainNode, beepCount, duration) => {
    oscillator.start();

    let time = 0;
    for (let i = 0; i < beepCount; i++) {
        setTimeout(() => { gainNode.gain.value = gainNode.gain.value; }, time);
        setTimeout(() => { gainNode.gain.value = 0; }, time + duration);
        time += duration + 100; // gap between beeps
    }

    setTimeout(() => {
        oscillator.stop();
    }, time + 100);
};

/**
 * Play continuous loud alarm for stage 4
 * Returns a stop function
 */
const playLoudAlarm = (ctx) => {
    // Stop any existing alarm
    if (activeAlarm) {
        activeAlarm.stop();
    }

    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    // Loud buzzer sound - alternating frequencies
    oscillator.type = 'square';
    oscillator.frequency.value = 800;
    gainNode.gain.value = 0.4;

    oscillator.start();

    // Alternate frequency for urgency
    let high = true;
    const intervalId = setInterval(() => {
        oscillator.frequency.value = high ? 800 : 600;
        high = !high;
    }, 300);

    const stopAlarm = () => {
        try {
            clearInterval(intervalId);
            gainNode.gain.value = 0;
            oscillator.stop();
            activeAlarm = null;
        } catch (e) {
            // Already stopped
        }
    };

    activeAlarm = { stop: stopAlarm };
    return stopAlarm;
};

/**
 * Dismiss the active stage 4 alarm
 */
export const dismissAlarm = () => {
    if (activeAlarm) {
        activeAlarm.stop();
        activeAlarm = null;
    }
};

/**
 * Calculate alarm thresholds from total seconds
 * @param {number} totalSeconds - Total timer duration
 * @returns {object} Threshold values in seconds remaining
 */
export const getAlarmThresholds = (totalSeconds) => ({
    stage1: Math.floor(totalSeconds * 0.75), // 75% remaining
    stage2: Math.floor(totalSeconds * 0.50), // 50% remaining
    stage3: Math.floor(totalSeconds * 0.25), // 25% remaining
    stage4: 0 // Timer expired
});

/**
 * Check which alarm should play based on remaining seconds
 * @param {number} remainingSeconds - Current remaining time
 * @param {object} thresholds - From getAlarmThresholds
 * @param {object} playedAlarms - Track which alarms have played
 * @returns {number|null} Stage to play (1-4) or null
 */
export const checkAlarmTrigger = (remainingSeconds, thresholds, playedAlarms) => {
    // Check from stage 4 to 1 (most urgent first)
    if (remainingSeconds <= thresholds.stage4 && !playedAlarms.stage4) {
        return 4;
    }
    if (remainingSeconds <= thresholds.stage3 && !playedAlarms.stage3) {
        return 3;
    }
    if (remainingSeconds <= thresholds.stage2 && !playedAlarms.stage2) {
        return 2;
    }
    if (remainingSeconds <= thresholds.stage1 && !playedAlarms.stage1) {
        return 1;
    }
    return null;
};

export default { playAlarm, dismissAlarm, getAlarmThresholds, checkAlarmTrigger };
