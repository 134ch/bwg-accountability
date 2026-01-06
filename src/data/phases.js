/**
 * Phase definitions for the 60-day ghostwriting sprint
 */

export const phases = [
    {
        id: 1,
        name: "Foundation",
        shortName: "Foundation",
        dayRange: [1, 7],
        goal: "Set up infrastructure, scripts, and first prospect list",
        color: "#f97316"
    },
    {
        id: 2,
        name: "Outreach Sprint 1",
        shortName: "Sprint 1",
        dayRange: [8, 21],
        goal: "Build consistent daily outreach habit, get first responses",
        color: "#eab308"
    },
    {
        id: 3,
        name: "Outreach Sprint 2",
        shortName: "Sprint 2",
        dayRange: [22, 35],
        goal: "Increase outreach volume, move conversations toward sales",
        color: "#22c55e"
    },
    {
        id: 4,
        name: "Conversion Focus",
        shortName: "Conversion",
        dayRange: [36, 50],
        goal: "Close first client(s), maintain outreach momentum",
        color: "#06b6d4"
    },
    {
        id: 5,
        name: "Scaling",
        shortName: "Scaling",
        dayRange: [51, 60],
        goal: "Maintain client delivery, continue outreach for clients #2-3",
        color: "#8b5cf6"
    }
];

/**
 * Get phase for a specific day number
 */
export const getPhaseForDay = (dayNumber) => {
    return phases.find(phase =>
        dayNumber >= phase.dayRange[0] && dayNumber <= phase.dayRange[1]
    ) || phases[0];
};

/**
 * Tool URL mappings
 */
export const toolUrls = {
    'LinkedIn': 'https://www.linkedin.com',
    'Google Docs': 'https://docs.google.com',
    'Claude': 'https://claude.ai',
    'Notion': 'https://notion.so',
    'Google Sheets': 'https://sheets.google.com',
    'Calendar': 'https://calendar.google.com',
    'Phone': null,
    'Notes': null,
    'Zoom/Phone': 'https://zoom.us',
    'Email': 'https://mail.google.com',
    'Email/Google Docs': 'https://mail.google.com',
    'LinkedIn/Notion': 'https://www.linkedin.com'
};
