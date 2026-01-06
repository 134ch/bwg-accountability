/**
 * Default task configuration for Ghostwriting Client Goal
 * 
 * Each task has:
 * - id: unique identifier
 * - name: display name
 * - description: what the task involves
 * - estimatedMinutes: base time estimate (will have 15% buffer added)
 * - icon: icon name from lucide-react
 * - externalLink: optional URL to open related tool
 * - linkLabel: label for the external link
 */

export const defaultTasks = [
    {
        id: 'linkedin-prospects',
        name: 'Find 5 prospects on LinkedIn',
        description: 'Search for potential ghostwriting clients',
        estimatedMinutes: 10,
        icon: 'Search',
        externalLink: 'https://www.linkedin.com',
        linkLabel: 'LinkedIn'
    },
    {
        id: 'connection-requests',
        name: 'Send 3 connection requests',
        description: 'Personalized connection requests to prospects',
        estimatedMinutes: 15,
        icon: 'UserPlus',
        externalLink: 'https://www.linkedin.com/mynetwork/',
        linkLabel: 'LinkedIn'
    },
    {
        id: 'warm-dms',
        name: 'Send 2 DMs to warm connections',
        description: 'Follow up with existing connections',
        estimatedMinutes: 10,
        icon: 'MessageCircle',
        externalLink: 'https://www.linkedin.com/messaging/',
        linkLabel: 'LinkedIn'
    },
    {
        id: 'sales-script',
        name: 'Practice sales script',
        description: 'Rehearse your pitch out loud',
        estimatedMinutes: 5,
        icon: 'Mic',
        externalLink: null,
        linkLabel: null
    },
    {
        id: 'content-creation',
        name: 'Write 1 LinkedIn post',
        description: 'Create value-driven content',
        estimatedMinutes: 20,
        icon: 'PenTool',
        externalLink: 'https://www.linkedin.com/post/new/',
        linkLabel: 'LinkedIn'
    },
    {
        id: 'client-research',
        name: 'Research 2 potential clients',
        description: 'Deep dive into prospect businesses',
        estimatedMinutes: 15,
        icon: 'FileSearch',
        externalLink: 'https://www.notion.so',
        linkLabel: 'Notion'
    }
];

/**
 * External tools/links for quick access
 */
export const externalTools = [
    { name: 'Notion', url: 'https://www.notion.so', icon: 'BookOpen' },
    { name: 'ChatGPT', url: 'https://chat.openai.com', icon: 'Bot' },
    { name: 'Claude', url: 'https://claude.ai', icon: 'Sparkles' },
    { name: 'Google Docs', url: 'https://docs.google.com', icon: 'FileText' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com', icon: 'Linkedin' }
];

/**
 * Apply buffer to estimated time using config settings
 */
import { timerSettings } from '../config';

export const getBufferedTime = (minutes) => {
    const buffered = Math.ceil(minutes * timerSettings.bufferMultiplier);
    const buffer = buffered - minutes;

    // Apply min/max buffer constraints
    if (buffer < timerSettings.minBuffer) {
        return minutes + timerSettings.minBuffer;
    }
    if (buffer > timerSettings.maxBuffer) {
        return minutes + timerSettings.maxBuffer;
    }
    return buffered;
};

/**
 * Initialize tasks with completion state and timer
 */
export const initializeTasks = (tasks = defaultTasks) => {
    return tasks.map(task => ({
        ...task,
        completed: false,
        timerActive: false,
        timeSpent: 0,
        startedAt: null,
        bufferedMinutes: getBufferedTime(task.estimatedMinutes)
    }));
};

/**
 * Format time in mm:ss
 */
export const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

/**
 * Format time display with estimate
 */
export const formatTimeDisplay = (minutes) => {
    if (minutes < 60) {
        return `${minutes} min`;
    }
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hrs}h ${mins}m` : `${hrs}h`;
};
