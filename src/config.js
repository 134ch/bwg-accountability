/**
 * ============================================
 * BWG ACCOUNTABILITY - CONFIGURATION
 * ============================================
 * 
 * Edit this file to customize your app!
 * No need to touch any other code.
 * 
 * After changes: save and refresh app.
 */

// ============================================
// THEME COLORS
// ============================================
export const theme = {
    // Primary accent (buttons, highlights)
    accentPrimary: '#f97316',     // Orange
    accentSecondary: '#22c55e',   // Green

    // Background colors
    bgPrimary: '#0f1110',
    bgSecondary: '#161a17',

    // Text colors
    textPrimary: '#f8fafc',
    textSecondary: '#a1a1aa',
    textMuted: '#71717a'
};

// ============================================
// QUICK LINKS (Tool shortcuts)
// ============================================
export const quickLinks = [
    { id: 'notion', name: 'Notion', url: 'https://notion.so', icon: '📝' },
    { id: 'chatgpt', name: 'ChatGPT', url: 'https://chatgpt.com', icon: '🤖' },
    { id: 'claude', name: 'Claude', url: 'https://claude.ai', icon: '🧠' },
    { id: 'googledocs', name: 'Docs', url: 'https://docs.google.com', icon: '📄' },
    { id: 'linkedin', name: 'LinkedIn', url: 'https://linkedin.com', icon: '💼' }

    // Add more tools:
    // { id: 'twitter', name: 'X', url: 'https://x.com', icon: '🐦' },
];

// ============================================
// TIMER SETTINGS
// ============================================
export const timerSettings = {
    // Buffer percentage added to estimated time
    // 1.2 = 20% buffer (5 min task → 6 min)
    bufferMultiplier: 1.2,

    // Minimum buffer in minutes
    minBuffer: 1,

    // Maximum buffer in minutes
    maxBuffer: 15
};

// ============================================
// STREAK CELEBRATION MESSAGES
// ============================================
export const streakMessages = {
    // When all tasks completed today
    completed: [
        "🔥 You crushed it today!",
        "💪 All tasks done! Keep the momentum!",
        "⭐ Perfect day! You're unstoppable!",
        "🚀 Mission accomplished! See you tomorrow!"
    ],

    // Based on streak length
    streakMilestones: {
        3: "🔥 3-day streak! You're building momentum!",
        7: "🌟 1 week streak! Consistency is key!",
        14: "💎 2 weeks! You're forming a real habit!",
        21: "🏆 21 days! Habit officially formed!",
        30: "👑 30-day streak! You're a legend!",
        60: "🎉 60 DAYS! YOU DID IT! CHAMPION!"
    },

    // When streak is at risk
    atRisk: [
        "⚠️ Don't break your {streak}-day streak!",
        "💪 You've got {tasks} tasks left today!",
        "🎯 Stay focused! Almost there!"
    ]
};

// ============================================
// MOTIVATIONAL MESSAGES
// ============================================
export const motivationalMessages = {
    // Morning messages (before noon)
    morning: [
        "Fresh start! Make today count 🌅",
        "New day, new opportunities 💪",
        "Let's build that client base! 🎯"
    ],

    // Afternoon messages
    afternoon: [
        "Keep pushing! You've got this 💪",
        "Halfway there! Stay focused 🎯",
        "Progress over perfection 📈"
    ],

    // Evening messages
    evening: [
        "Finish strong! 🏁",
        "End the day with purpose ✨",
        "Almost done! Push through 💪"
    ]
};

// ============================================
// APP SETTINGS
// ============================================
export const appSettings = {
    // Total days in the challenge
    totalDays: 60,

    // Days until first client goal
    daysToFirstClient: 14,

    // Show reflection modal on which day? (0 = Sunday)
    reflectionDay: 0,

    // Minimum days before first reflection prompt
    minDaysBeforeReflection: 3,

    // Vibration duration in ms when completing task
    vibrationDuration: 25
};

export default {
    theme,
    quickLinks,
    timerSettings,
    streakMessages,
    motivationalMessages,
    appSettings
};
