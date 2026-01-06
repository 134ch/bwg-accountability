/**
 * 60-Day Ghostwriting Sprint: Complete Task Data
 * 
 * HOW TO CUSTOMIZE:
 * - Edit task names, time estimates, or tools directly in this file
 * - Add new tasks by copying an existing task object
 * - Time estimates are in minutes (no buffer - buffer added in app)
 * - Tool names should match keys in phases.js toolUrls
 */

export const dailyTasks = {
    // ========== PHASE 1: FOUNDATION (Days 1-7) ==========
    1: {
        dayOfWeek: "Monday", phase: 1, totalMinutes: 26,
        tasks: [
            { id: "d1-1", name: "Write your ideal client avatar in 1 document", estimatedMinutes: 2, tool: "Google Docs" },
            { id: "d1-2", name: "List 5 people you already know who might need ghostwriting", estimatedMinutes: 2, tool: "Google Docs" },
            { id: "d1-3", name: "Create 3-line outreach message template", estimatedMinutes: 5, tool: "Claude" },
            { id: "d1-4", name: "Save your sales script as phone note", estimatedMinutes: 10, tool: "Claude" },
            { id: "d1-5", name: "Download LinkedIn mobile app and log in", estimatedMinutes: 2, tool: "LinkedIn" },
            { id: "d1-6", name: "Take screenshot of your offer stack and save to phone", estimatedMinutes: 2, tool: "Google Docs" },
            { id: "d1-7", name: "Set phone reminder for 7pm: Outreach time", estimatedMinutes: 3, tool: "Phone" }
        ]
    },
    2: {
        dayOfWeek: "Tuesday", phase: 1, totalMinutes: 38,
        tasks: [
            { id: "d2-1", name: "Review your ideal client avatar and refine it", estimatedMinutes: 5, tool: "Google Docs" },
            { id: "d2-2", name: "Find 5 new prospects on LinkedIn", estimatedMinutes: 10, tool: "LinkedIn" },
            { id: "d2-3", name: "Send 3 connection requests with personalized note", estimatedMinutes: 15, tool: "LinkedIn" },
            { id: "d2-4", name: "Read your sales script once", estimatedMinutes: 3, tool: "Notes" },
            { id: "d2-5", name: "Create simple follow-up message template", estimatedMinutes: 5, tool: "Claude" }
        ]
    },
    3: {
        dayOfWeek: "Wednesday", phase: 1, totalMinutes: 38,
        tasks: [
            { id: "d3-1", name: "Find 5 more prospects on LinkedIn", estimatedMinutes: 10, tool: "LinkedIn" },
            { id: "d3-2", name: "Send 3 connection requests with personalized notes", estimatedMinutes: 15, tool: "LinkedIn" },
            { id: "d3-3", name: "Identify 3 existing connections who might need ghostwriting", estimatedMinutes: 5, tool: "LinkedIn" },
            { id: "d3-4", name: "Send 1 DM to warm connection", estimatedMinutes: 5, tool: "LinkedIn" },
            { id: "d3-5", name: "Practice sales script - read aloud once", estimatedMinutes: 3, tool: "Notes" }
        ]
    },
    4: {
        dayOfWeek: "Thursday", phase: 1, totalMinutes: 45,
        tasks: [
            { id: "d4-1", name: "Find 5 more prospects on LinkedIn", estimatedMinutes: 10, tool: "LinkedIn" },
            { id: "d4-2", name: "Send 3 more connection requests", estimatedMinutes: 15, tool: "LinkedIn" },
            { id: "d4-3", name: "Send 2 DMs to warm connections", estimatedMinutes: 10, tool: "LinkedIn" },
            { id: "d4-4", name: "Review and refine your offer stack", estimatedMinutes: 5, tool: "Google Docs" },
            { id: "d4-5", name: "Read sales script aloud twice", estimatedMinutes: 5, tool: "Notes" }
        ]
    },
    5: {
        dayOfWeek: "Friday", phase: 1, totalMinutes: 45,
        tasks: [
            { id: "d5-1", name: "Find 5 more prospects on LinkedIn", estimatedMinutes: 10, tool: "LinkedIn" },
            { id: "d5-2", name: "Send 3 more connection requests", estimatedMinutes: 15, tool: "LinkedIn" },
            { id: "d5-3", name: "Send 2 more DMs to warm connections", estimatedMinutes: 10, tool: "LinkedIn" },
            { id: "d5-4", name: "Create list of all prospects contacted so far", estimatedMinutes: 5, tool: "Google Docs" },
            { id: "d5-5", name: "Practice pitch on voice memo", estimatedMinutes: 5, tool: "Phone" }
        ]
    },
    6: {
        dayOfWeek: "Saturday", phase: 1, totalMinutes: 55,
        tasks: [
            { id: "d6-1", name: "Check all pending requests and DMs - take notes", estimatedMinutes: 10, tool: "LinkedIn" },
            { id: "d6-2", name: "Write 1 LinkedIn post about ghostwriting pain point", estimatedMinutes: 20, tool: "LinkedIn" },
            { id: "d6-3", name: "Start EEC asset #1 - create outline", estimatedMinutes: 15, tool: "Google Docs" },
            { id: "d6-4", name: "Review prospect list and prioritize top 10", estimatedMinutes: 10, tool: "Google Docs" }
        ]
    },
    7: {
        dayOfWeek: "Sunday", phase: 1, totalMinutes: 50,
        tasks: [
            { id: "d7-1", name: "Weekly Reflection: What worked? What didn't?", estimatedMinutes: 10, tool: "Notion" },
            { id: "d7-2", name: "Finish EEC asset #1", estimatedMinutes: 30, tool: "Google Docs" },
            { id: "d7-3", name: "Create email template for prospect follow-ups", estimatedMinutes: 10, tool: "Claude" }
        ]
    },

    // ========== PHASE 2: OUTREACH SPRINT 1 (Days 8-21) ==========
    8: {
        dayOfWeek: "Monday", phase: 2, totalMinutes: 43,
        tasks: [
            { id: "d8-1", name: "Find 5 new prospects on LinkedIn", estimatedMinutes: 10, tool: "LinkedIn" },
            { id: "d8-2", name: "Send 3 connection requests", estimatedMinutes: 15, tool: "LinkedIn" },
            { id: "d8-3", name: "Send 2 DMs to accepted connections", estimatedMinutes: 10, tool: "LinkedIn" },
            { id: "d8-4", name: "Check and respond to inbound messages", estimatedMinutes: 5, tool: "LinkedIn" },
            { id: "d8-5", name: "Practice pitch out loud once", estimatedMinutes: 3, tool: "Notes" }
        ]
    },
    9: {
        dayOfWeek: "Tuesday", phase: 2, totalMinutes: 50,
        tasks: [
            { id: "d9-1", name: "Find 5 new prospects", estimatedMinutes: 10, tool: "LinkedIn" },
            { id: "d9-2", name: "Send 3 connection requests", estimatedMinutes: 15, tool: "LinkedIn" },
            { id: "d9-3", name: "Send 3 DMs to warmer prospects", estimatedMinutes: 15, tool: "LinkedIn" },
            { id: "d9-4", name: "Check messages and respond", estimatedMinutes: 5, tool: "LinkedIn" },
            { id: "d9-5", name: "Read sales script - note parts to improve", estimatedMinutes: 5, tool: "Notes" }
        ]
    },
    10: {
        dayOfWeek: "Wednesday", phase: 2, totalMinutes: 50,
        tasks: [
            { id: "d10-1", name: "Find 5 new prospects", estimatedMinutes: 10, tool: "LinkedIn" },
            { id: "d10-2", name: "Send 3 connection requests", estimatedMinutes: 15, tool: "LinkedIn" },
            { id: "d10-3", name: "Send 3 DMs (focus on shared interests)", estimatedMinutes: 15, tool: "LinkedIn" },
            { id: "d10-4", name: "Log all outreach activity in spreadsheet", estimatedMinutes: 5, tool: "Google Sheets" },
            { id: "d10-5", name: "Practice pitch with benefit statement emphasis", estimatedMinutes: 5, tool: "Notes" }
        ]
    },
    11: {
        dayOfWeek: "Thursday", phase: 2, totalMinutes: 55,
        tasks: [
            { id: "d11-1", name: "Find 5 new prospects", estimatedMinutes: 10, tool: "LinkedIn" },
            { id: "d11-2", name: "Send 3 connection requests", estimatedMinutes: 15, tool: "LinkedIn" },
            { id: "d11-3", name: "Send 3 DMs (ask qualifying questions)", estimatedMinutes: 15, tool: "LinkedIn" },
            { id: "d11-4", name: "Write thoughtful replies to messages", estimatedMinutes: 5, tool: "LinkedIn" },
            { id: "d11-5", name: "Record pitch on voice memo - review it", estimatedMinutes: 10, tool: "Phone" }
        ]
    },
    12: {
        dayOfWeek: "Friday", phase: 2, totalMinutes: 50,
        tasks: [
            { id: "d12-1", name: "Find 5 new prospects", estimatedMinutes: 10, tool: "LinkedIn" },
            { id: "d12-2", name: "Send 3 connection requests", estimatedMinutes: 15, tool: "LinkedIn" },
            { id: "d12-3", name: "Send 3 DMs (softer approach for less responsive)", estimatedMinutes: 15, tool: "LinkedIn" },
            { id: "d12-4", name: "Follow up with 2 prospects from this week", estimatedMinutes: 5, tool: "LinkedIn" },
            { id: "d12-5", name: "Update outreach tracking spreadsheet", estimatedMinutes: 5, tool: "Google Sheets" }
        ]
    },
    13: {
        dayOfWeek: "Saturday", phase: 2, totalMinutes: 70,
        tasks: [
            { id: "d13-1", name: "Check all messages - analyze patterns", estimatedMinutes: 15, tool: "LinkedIn" },
            { id: "d13-2", name: "Write and post 1 LinkedIn content piece", estimatedMinutes: 20, tool: "LinkedIn" },
            { id: "d13-3", name: "Create EEC asset #2", estimatedMinutes: 30, tool: "Google Docs" },
            { id: "d13-4", name: "Review week's outreach - count total contacts", estimatedMinutes: 5, tool: "Google Sheets" }
        ]
    },
    14: {
        dayOfWeek: "Sunday", phase: 2, totalMinutes: 55,
        tasks: [
            { id: "d14-1", name: "Weekly Reflection: What's resonating? Adjustments?", estimatedMinutes: 10, tool: "Notion" },
            { id: "d14-2", name: "Finish EEC asset #2", estimatedMinutes: 30, tool: "Google Docs" },
            { id: "d14-3", name: "Refine sales script based on feedback", estimatedMinutes: 15, tool: "Claude" }
        ]
    },
    15: {
        dayOfWeek: "Monday", phase: 2, totalMinutes: 50,
        tasks: [
            { id: "d15-1", name: "Find 5 new prospects (focus on specific niche)", estimatedMinutes: 10, tool: "LinkedIn" },
            { id: "d15-2", name: "Send 3 connection requests", estimatedMinutes: 15, tool: "LinkedIn" },
            { id: "d15-3", name: "Send 3 DMs with specific pain point messaging", estimatedMinutes: 15, tool: "LinkedIn" },
            { id: "d15-4", name: "Check and reply to messages", estimatedMinutes: 5, tool: "LinkedIn" },
            { id: "d15-5", name: "Practice pitch with new refinements", estimatedMinutes: 5, tool: "Notes" }
        ]
    },
    16: {
        dayOfWeek: "Tuesday", phase: 2, totalMinutes: 55,
        tasks: [
            { id: "d16-1", name: "Find 5 new prospects", estimatedMinutes: 10, tool: "LinkedIn" },
            { id: "d16-2", name: "Send 3 connection requests", estimatedMinutes: 15, tool: "LinkedIn" },
            { id: "d16-3", name: "Send 3 DMs with case study reference", estimatedMinutes: 15, tool: "LinkedIn" },
            { id: "d16-4", name: "Follow up with 2 non-responders", estimatedMinutes: 5, tool: "LinkedIn" },
            { id: "d16-5", name: "Review offer stack - make 1 improvement", estimatedMinutes: 10, tool: "Google Docs" }
        ]
    },
    17: {
        dayOfWeek: "Wednesday", phase: 2, totalMinutes: 55,
        tasks: [
            { id: "d17-1", name: "Find 5 new prospects", estimatedMinutes: 10, tool: "LinkedIn" },
            { id: "d17-2", name: "Send 3 connection requests", estimatedMinutes: 15, tool: "LinkedIn" },
            { id: "d17-3", name: "Send 3 DMs - try different angle/hook", estimatedMinutes: 15, tool: "LinkedIn" },
            { id: "d17-4", name: "Respond to all pending messages", estimatedMinutes: 5, tool: "LinkedIn" },
            { id: "d17-5", name: "Practice sales call scenario (record yourself)", estimatedMinutes: 10, tool: "Phone" }
        ]
    },
    18: {
        dayOfWeek: "Thursday", phase: 2, totalMinutes: 55,
        tasks: [
            { id: "d18-1", name: "Find 5 new prospects", estimatedMinutes: 10, tool: "LinkedIn" },
            { id: "d18-2", name: "Send 3 connection requests", estimatedMinutes: 15, tool: "LinkedIn" },
            { id: "d18-3", name: "Send 3 DMs (use social proof angle)", estimatedMinutes: 15, tool: "LinkedIn" },
            { id: "d18-4", name: "Follow up with 3 earlier prospects", estimatedMinutes: 10, tool: "LinkedIn" },
            { id: "d18-5", name: "Update tracking spreadsheet", estimatedMinutes: 5, tool: "Google Sheets" }
        ]
    },
    19: {
        dayOfWeek: "Friday", phase: 2, totalMinutes: 55,
        tasks: [
            { id: "d19-1", name: "Find 5 new prospects", estimatedMinutes: 10, tool: "LinkedIn" },
            { id: "d19-2", name: "Send 3 connection requests", estimatedMinutes: 15, tool: "LinkedIn" },
            { id: "d19-3", name: "Send 3 DMs (ask for brief call/Zoom)", estimatedMinutes: 15, tool: "LinkedIn" },
            { id: "d19-4", name: "Review conversations - identify hottest leads", estimatedMinutes: 10, tool: "LinkedIn" },
            { id: "d19-5", name: "Schedule any discovery calls", estimatedMinutes: 5, tool: "Calendar" }
        ]
    },
    20: {
        dayOfWeek: "Saturday", phase: 2, totalMinutes: 75,
        tasks: [
            { id: "d20-1", name: "Review week's conversations - document insights", estimatedMinutes: 15, tool: "Notion" },
            { id: "d20-2", name: "Write and post 1 LinkedIn content", estimatedMinutes: 20, tool: "LinkedIn" },
            { id: "d20-3", name: "Create EEC asset #3", estimatedMinutes: 30, tool: "Google Docs" },
            { id: "d20-4", name: "Analyze which outreach angle got best response", estimatedMinutes: 10, tool: "Google Sheets" }
        ]
    },
    21: {
        dayOfWeek: "Sunday", phase: 2, totalMinutes: 55,
        tasks: [
            { id: "d21-1", name: "Weekly Reflection: Best responses? Which angles work?", estimatedMinutes: 10, tool: "Notion" },
            { id: "d21-2", name: "Finish EEC asset #3", estimatedMinutes: 30, tool: "Google Docs" },
            { id: "d21-3", name: "Update sales script with best conversation language", estimatedMinutes: 15, tool: "Claude" }
        ]
    },

    // ========== PHASE 3: OUTREACH SPRINT 2 (Days 22-35) ==========
    22: {
        dayOfWeek: "Monday", phase: 3, totalMinutes: 60,
        tasks: [
            { id: "d22-1", name: "Find 6 new prospects (increase volume)", estimatedMinutes: 12, tool: "LinkedIn" },
            { id: "d22-2", name: "Send 4 connection requests", estimatedMinutes: 20, tool: "LinkedIn" },
            { id: "d22-3", name: "Send 4 DMs (use best-performing angle)", estimatedMinutes: 20, tool: "LinkedIn" },
            { id: "d22-4", name: "Move hot leads to follow-up list", estimatedMinutes: 5, tool: "LinkedIn" },
            { id: "d22-5", name: "Practice pitch once", estimatedMinutes: 3, tool: "Notes" }
        ]
    },
    23: {
        dayOfWeek: "Tuesday", phase: 3, totalMinutes: 65,
        tasks: [
            { id: "d23-1", name: "Find 6 new prospects", estimatedMinutes: 12, tool: "LinkedIn" },
            { id: "d23-2", name: "Send 4 connection requests", estimatedMinutes: 20, tool: "LinkedIn" },
            { id: "d23-3", name: "Send 4 DMs (mix angles based on profile)", estimatedMinutes: 20, tool: "LinkedIn" },
            { id: "d23-4", name: "Follow up with 2 prospects (gentle re-engage)", estimatedMinutes: 5, tool: "LinkedIn" },
            { id: "d23-5", name: "Prepare case study to reference", estimatedMinutes: 8, tool: "Google Docs" }
        ]
    },
    24: {
        dayOfWeek: "Wednesday", phase: 3, totalMinutes: 67,
        tasks: [
            { id: "d24-1", name: "Find 6 new prospects", estimatedMinutes: 12, tool: "LinkedIn" },
            { id: "d24-2", name: "Send 4 connection requests", estimatedMinutes: 20, tool: "LinkedIn" },
            { id: "d24-3", name: "Send 4 DMs (reference shared connection)", estimatedMinutes: 20, tool: "LinkedIn" },
            { id: "d24-4", name: "Respond to all new messages", estimatedMinutes: 5, tool: "LinkedIn" },
            { id: "d24-5", name: "Practice pitch - add 1 new story/example", estimatedMinutes: 10, tool: "Notes" }
        ]
    },
    25: {
        dayOfWeek: "Thursday", phase: 3, totalMinutes: 67,
        tasks: [
            { id: "d25-1", name: "Find 6 new prospects", estimatedMinutes: 12, tool: "LinkedIn" },
            { id: "d25-2", name: "Send 4 connection requests", estimatedMinutes: 20, tool: "LinkedIn" },
            { id: "d25-3", name: "Send 4 DMs (use best-performing message)", estimatedMinutes: 20, tool: "LinkedIn" },
            { id: "d25-4", name: "Follow up with 3 prospects - move conversation forward", estimatedMinutes: 10, tool: "LinkedIn" },
            { id: "d25-5", name: "Log all activity", estimatedMinutes: 5, tool: "Google Sheets" }
        ]
    },
    26: {
        dayOfWeek: "Friday", phase: 3, totalMinutes: 72,
        tasks: [
            { id: "d26-1", name: "Find 6 new prospects", estimatedMinutes: 12, tool: "LinkedIn" },
            { id: "d26-2", name: "Send 4 connection requests", estimatedMinutes: 20, tool: "LinkedIn" },
            { id: "d26-3", name: "Send 4 DMs (personalized based on activity)", estimatedMinutes: 20, tool: "LinkedIn" },
            { id: "d26-4", name: "Schedule any discovery calls", estimatedMinutes: 5, tool: "Calendar" },
            { id: "d26-5", name: "Prepare talking points for calls", estimatedMinutes: 15, tool: "Google Docs" }
        ]
    },
    27: {
        dayOfWeek: "Saturday", phase: 3, totalMinutes: 80,
        tasks: [
            { id: "d27-1", name: "Categorize all prospects by warmth (hot/warm/cold)", estimatedMinutes: 20, tool: "Google Sheets" },
            { id: "d27-2", name: "Write and post LinkedIn content about ghostwriting", estimatedMinutes: 20, tool: "LinkedIn" },
            { id: "d27-3", name: "Create EEC asset #4", estimatedMinutes: 30, tool: "Google Docs" },
            { id: "d27-4", name: "Analyze outreach metrics", estimatedMinutes: 10, tool: "Google Sheets" }
        ]
    },
    28: {
        dayOfWeek: "Sunday", phase: 3, totalMinutes: 60,
        tasks: [
            { id: "d28-1", name: "Weekly Reflection: Discovery calls? Next week focus?", estimatedMinutes: 10, tool: "Notion" },
            { id: "d28-2", name: "Finish EEC asset #4", estimatedMinutes: 30, tool: "Google Docs" },
            { id: "d28-3", name: "Prepare for discovery calls this week", estimatedMinutes: 20, tool: "Google Docs" }
        ]
    },
    29: {
        dayOfWeek: "Monday", phase: 3, totalMinutes: 62,
        tasks: [
            { id: "d29-1", name: "Find 6 new prospects", estimatedMinutes: 12, tool: "LinkedIn" },
            { id: "d29-2", name: "Send 4 connection requests", estimatedMinutes: 20, tool: "LinkedIn" },
            { id: "d29-3", name: "Send 4 DMs (focus on converting warm prospects)", estimatedMinutes: 20, tool: "LinkedIn" },
            { id: "d29-4", name: "Check messages - prioritize hot leads", estimatedMinutes: 5, tool: "LinkedIn" },
            { id: "d29-5", name: "Review discovery call script", estimatedMinutes: 5, tool: "Notes" }
        ]
    },
    30: {
        dayOfWeek: "Tuesday", phase: 3, totalMinutes: 90,
        tasks: [
            { id: "d30-1", name: "Find 6 new prospects", estimatedMinutes: 12, tool: "LinkedIn" },
            { id: "d30-2", name: "Send 4 connection requests", estimatedMinutes: 20, tool: "LinkedIn" },
            { id: "d30-3", name: "Send 4 DMs (include project examples)", estimatedMinutes: 20, tool: "LinkedIn" },
            { id: "d30-4", name: "Follow up with 3 non-responders", estimatedMinutes: 8, tool: "LinkedIn" },
            { id: "d30-5", name: "Conduct discovery call #1 if scheduled", estimatedMinutes: 30, tool: "Zoom/Phone" }
        ]
    },
    31: {
        dayOfWeek: "Wednesday", phase: 3, totalMinutes: 67,
        tasks: [
            { id: "d31-1", name: "Find 6 new prospects", estimatedMinutes: 12, tool: "LinkedIn" },
            { id: "d31-2", name: "Send 4 connection requests", estimatedMinutes: 20, tool: "LinkedIn" },
            { id: "d31-3", name: "Send 4 DMs (use learnings from discovery calls)", estimatedMinutes: 20, tool: "LinkedIn" },
            { id: "d31-4", name: "Respond to all messages", estimatedMinutes: 5, tool: "LinkedIn" },
            { id: "d31-5", name: "Document discovery call notes and next steps", estimatedMinutes: 10, tool: "Notion" }
        ]
    },
    32: {
        dayOfWeek: "Thursday", phase: 3, totalMinutes: 70,
        tasks: [
            { id: "d32-1", name: "Find 6 new prospects", estimatedMinutes: 12, tool: "LinkedIn" },
            { id: "d32-2", name: "Send 4 connection requests", estimatedMinutes: 20, tool: "LinkedIn" },
            { id: "d32-3", name: "Send 4 DMs (different angle for non-responders)", estimatedMinutes: 20, tool: "LinkedIn" },
            { id: "d32-4", name: "Follow up with warm prospects about next steps", estimatedMinutes: 8, tool: "LinkedIn" },
            { id: "d32-5", name: "Update sales messaging based on call feedback", estimatedMinutes: 10, tool: "Claude" }
        ]
    },
    33: {
        dayOfWeek: "Friday", phase: 3, totalMinutes: 67,
        tasks: [
            { id: "d33-1", name: "Find 6 new prospects", estimatedMinutes: 12, tool: "LinkedIn" },
            { id: "d33-2", name: "Send 4 connection requests", estimatedMinutes: 20, tool: "LinkedIn" },
            { id: "d33-3", name: "Send 4 DMs (aggressive close on warm leads)", estimatedMinutes: 20, tool: "LinkedIn" },
            { id: "d33-4", name: "Send proposal to ready prospects", estimatedMinutes: 10, tool: "Google Docs" },
            { id: "d33-5", name: "Schedule follow-up calls", estimatedMinutes: 5, tool: "Calendar" }
        ]
    },
    34: {
        dayOfWeek: "Saturday", phase: 3, totalMinutes: 80,
        tasks: [
            { id: "d34-1", name: "Review discovery calls and outcomes", estimatedMinutes: 20, tool: "Notion" },
            { id: "d34-2", name: "Write and post LinkedIn content", estimatedMinutes: 20, tool: "LinkedIn" },
            { id: "d34-3", name: "Create EEC asset #5", estimatedMinutes: 30, tool: "Google Docs" },
            { id: "d34-4", name: "Update prospect tracking - move to negotiation stage", estimatedMinutes: 10, tool: "Google Sheets" }
        ]
    },
    35: {
        dayOfWeek: "Sunday", phase: 3, totalMinutes: 60,
        tasks: [
            { id: "d35-1", name: "Weekly Reflection: Discovery calls? Close to signing?", estimatedMinutes: 10, tool: "Notion" },
            { id: "d35-2", name: "Finish EEC asset #5", estimatedMinutes: 30, tool: "Google Docs" },
            { id: "d35-3", name: "Prepare case studies for hot prospects", estimatedMinutes: 20, tool: "Google Docs" }
        ]
    },

    // ========== PHASE 4: CONVERSION FOCUS (Days 36-50) ==========
    36: {
        dayOfWeek: "Monday", phase: 4, totalMinutes: 77,
        tasks: [
            { id: "d36-1", name: "Find 6 new prospects", estimatedMinutes: 12, tool: "LinkedIn" },
            { id: "d36-2", name: "Send 4 connection requests", estimatedMinutes: 20, tool: "LinkedIn" },
            { id: "d36-3", name: "Send 4 DMs (new + re-engage cold ones)", estimatedMinutes: 20, tool: "LinkedIn" },
            { id: "d36-4", name: "Follow up hard with 'almost ready' prospects", estimatedMinutes: 10, tool: "LinkedIn" },
            { id: "d36-5", name: "Prepare proposal for hot prospects", estimatedMinutes: 15, tool: "Google Docs" }
        ]
    },
    37: {
        dayOfWeek: "Tuesday", phase: 4, totalMinutes: 72,
        tasks: [
            { id: "d37-1", name: "Find 6 new prospects", estimatedMinutes: 12, tool: "LinkedIn" },
            { id: "d37-2", name: "Send 4 connection requests", estimatedMinutes: 20, tool: "LinkedIn" },
            { id: "d37-3", name: "Send 4 DMs", estimatedMinutes: 20, tool: "LinkedIn" },
            { id: "d37-4", name: "Send proposals to 1-2 hot prospects", estimatedMinutes: 15, tool: "Email" },
            { id: "d37-5", name: "Follow up on sent proposals", estimatedMinutes: 5, tool: "LinkedIn" }
        ]
    },
    38: {
        dayOfWeek: "Wednesday", phase: 4, totalMinutes: 87,
        tasks: [
            { id: "d38-1", name: "Find 6 new prospects", estimatedMinutes: 12, tool: "LinkedIn" },
            { id: "d38-2", name: "Send 4 connection requests", estimatedMinutes: 20, tool: "LinkedIn" },
            { id: "d38-3", name: "Send 4 DMs", estimatedMinutes: 20, tool: "LinkedIn" },
            { id: "d38-4", name: "Conduct discovery call #2 if scheduled", estimatedMinutes: 30, tool: "Zoom/Phone" },
            { id: "d38-5", name: "Log call notes", estimatedMinutes: 5, tool: "Notion" }
        ]
    },
    39: {
        dayOfWeek: "Thursday", phase: 4, totalMinutes: 67,
        tasks: [
            { id: "d39-1", name: "Find 6 new prospects", estimatedMinutes: 12, tool: "LinkedIn" },
            { id: "d39-2", name: "Send 4 connection requests", estimatedMinutes: 20, tool: "LinkedIn" },
            { id: "d39-3", name: "Send 4 DMs", estimatedMinutes: 20, tool: "LinkedIn" },
            { id: "d39-4", name: "Send proposal follow-up", estimatedMinutes: 5, tool: "Email" },
            { id: "d39-5", name: "Update sales messaging with new data", estimatedMinutes: 10, tool: "Claude" }
        ]
    },
    40: {
        dayOfWeek: "Friday", phase: 4, totalMinutes: 67,
        tasks: [
            { id: "d40-1", name: "Find 6 new prospects", estimatedMinutes: 12, tool: "LinkedIn" },
            { id: "d40-2", name: "Send 4 connection requests", estimatedMinutes: 20, tool: "LinkedIn" },
            { id: "d40-3", name: "Send 4 DMs (aggressive closing attempts)", estimatedMinutes: 20, tool: "LinkedIn" },
            { id: "d40-4", name: "Send pricing to decision-makers", estimatedMinutes: 10, tool: "Email" },
            { id: "d40-5", name: "Schedule calls with serious prospects", estimatedMinutes: 5, tool: "Calendar" }
        ]
    },
    41: {
        dayOfWeek: "Saturday", phase: 4, totalMinutes: 85,
        tasks: [
            { id: "d41-1", name: "Review conversion funnel - where are you?", estimatedMinutes: 20, tool: "Google Sheets" },
            { id: "d41-2", name: "Write LinkedIn content about client success", estimatedMinutes: 20, tool: "LinkedIn" },
            { id: "d41-3", name: "Create EEC asset #6", estimatedMinutes: 30, tool: "Google Docs" },
            { id: "d41-4", name: "Prepare onboarding/project kickoff plan", estimatedMinutes: 15, tool: "Google Docs" }
        ]
    },
    42: {
        dayOfWeek: "Sunday", phase: 4, totalMinutes: 60,
        tasks: [
            { id: "d42-1", name: "Weekly Reflection: How close to first client?", estimatedMinutes: 10, tool: "Notion" },
            { id: "d42-2", name: "Finish EEC asset #6", estimatedMinutes: 30, tool: "Google Docs" },
            { id: "d42-3", name: "Prepare contract/agreement template", estimatedMinutes: 20, tool: "Google Docs" }
        ]
    },
    43: {
        dayOfWeek: "Monday", phase: 4, totalMinutes: 87,
        tasks: [
            { id: "d43-1", name: "Find 6 new prospects", estimatedMinutes: 12, tool: "LinkedIn" },
            { id: "d43-2", name: "Send 4 connection requests", estimatedMinutes: 20, tool: "LinkedIn" },
            { id: "d43-3", name: "Send 4 DMs (focus on closing)", estimatedMinutes: 20, tool: "LinkedIn" },
            { id: "d43-4", name: "Conduct discovery call #3 if available", estimatedMinutes: 30, tool: "Zoom/Phone" },
            { id: "d43-5", name: "Close follow-up on recent conversations", estimatedMinutes: 5, tool: "LinkedIn" }
        ]
    },
    44: {
        dayOfWeek: "Tuesday", phase: 4, totalMinutes: 77,
        tasks: [
            { id: "d44-1", name: "Find 6 new prospects", estimatedMinutes: 12, tool: "LinkedIn" },
            { id: "d44-2", name: "Send 4 connection requests", estimatedMinutes: 20, tool: "LinkedIn" },
            { id: "d44-3", name: "Send 4 DMs", estimatedMinutes: 20, tool: "LinkedIn" },
            { id: "d44-4", name: "Send 2-3 final proposals to ready prospects", estimatedMinutes: 15, tool: "Email" },
            { id: "d44-5", name: "Prepare for closing calls", estimatedMinutes: 10, tool: "Google Docs" }
        ]
    },
    45: {
        dayOfWeek: "Wednesday", phase: 4, totalMinutes: 87,
        tasks: [
            { id: "d45-1", name: "Find 6 new prospects", estimatedMinutes: 12, tool: "LinkedIn" },
            { id: "d45-2", name: "Send 4 connection requests", estimatedMinutes: 20, tool: "LinkedIn" },
            { id: "d45-3", name: "Send 4 DMs", estimatedMinutes: 20, tool: "LinkedIn" },
            { id: "d45-4", name: "CLOSING CALL if scheduled", estimatedMinutes: 30, tool: "Zoom/Phone" },
            { id: "d45-5", name: "Log outcomes and next steps", estimatedMinutes: 5, tool: "Notion" }
        ]
    },
    46: {
        dayOfWeek: "Thursday", phase: 4, totalMinutes: 72,
        tasks: [
            { id: "d46-1", name: "Find 6 new prospects", estimatedMinutes: 12, tool: "LinkedIn" },
            { id: "d46-2", name: "Send 4 connection requests", estimatedMinutes: 20, tool: "LinkedIn" },
            { id: "d46-3", name: "Send 4 DMs", estimatedMinutes: 20, tool: "LinkedIn" },
            { id: "d46-4", name: "Send final follow-up to undecided prospects", estimatedMinutes: 5, tool: "Email" },
            { id: "d46-5", name: "Prepare contract for signed clients", estimatedMinutes: 15, tool: "Google Docs" }
        ]
    },
    47: {
        dayOfWeek: "Friday", phase: 4, totalMinutes: 77,
        tasks: [
            { id: "d47-1", name: "Find 6 new prospects", estimatedMinutes: 12, tool: "LinkedIn" },
            { id: "d47-2", name: "Send 4 connection requests", estimatedMinutes: 20, tool: "LinkedIn" },
            { id: "d47-3", name: "Send 4 DMs", estimatedMinutes: 20, tool: "LinkedIn" },
            { id: "d47-4", name: "🎉 SIGN FIRST CLIENT - celebrate!", estimatedMinutes: 5, tool: "Notes" },
            { id: "d47-5", name: "Prepare onboarding sequence", estimatedMinutes: 20, tool: "Google Docs" }
        ]
    },
    48: {
        dayOfWeek: "Saturday", phase: 4, totalMinutes: 80,
        tasks: [
            { id: "d48-1", name: "Document first client win and outcomes", estimatedMinutes: 20, tool: "Notion" },
            { id: "d48-2", name: "Write LinkedIn content about your experience", estimatedMinutes: 20, tool: "LinkedIn" },
            { id: "d48-3", name: "Create EEC asset #7", estimatedMinutes: 30, tool: "Google Docs" },
            { id: "d48-4", name: "Analyze what worked in the sale", estimatedMinutes: 10, tool: "Notion" }
        ]
    },
    49: {
        dayOfWeek: "Sunday", phase: 4, totalMinutes: 60,
        tasks: [
            { id: "d49-1", name: "Weekly Reflection: You're on client #1! What worked?", estimatedMinutes: 10, tool: "Notion" },
            { id: "d49-2", name: "Finish EEC asset #7", estimatedMinutes: 30, tool: "Google Docs" },
            { id: "d49-3", name: "Plan rest of month strategy", estimatedMinutes: 20, tool: "Notion" }
        ]
    },
    50: {
        dayOfWeek: "Monday", phase: 4, totalMinutes: 67,
        tasks: [
            { id: "d50-1", name: "Find 6 new prospects (continue momentum)", estimatedMinutes: 12, tool: "LinkedIn" },
            { id: "d50-2", name: "Send 4 connection requests", estimatedMinutes: 20, tool: "LinkedIn" },
            { id: "d50-3", name: "Send 4 DMs", estimatedMinutes: 20, tool: "LinkedIn" },
            { id: "d50-4", name: "Check messages and respond", estimatedMinutes: 5, tool: "LinkedIn" },
            { id: "d50-5", name: "Review current client project", estimatedMinutes: 10, tool: "Google Docs" }
        ]
    },

    // ========== PHASE 5: SCALING (Days 51-60) ==========
    51: {
        dayOfWeek: "Tuesday", phase: 5, totalMinutes: 87,
        tasks: [
            { id: "d51-1", name: "Find 6 new prospects", estimatedMinutes: 12, tool: "LinkedIn" },
            { id: "d51-2", name: "Send 4 connection requests", estimatedMinutes: 20, tool: "LinkedIn" },
            { id: "d51-3", name: "Send 4 DMs", estimatedMinutes: 20, tool: "LinkedIn" },
            { id: "d51-4", name: "Work on current client deliverables", estimatedMinutes: 30, tool: "Google Docs" },
            { id: "d51-5", name: "Follow up with prospects", estimatedMinutes: 5, tool: "LinkedIn" }
        ]
    },
    52: {
        dayOfWeek: "Wednesday", phase: 5, totalMinutes: 87,
        tasks: [
            { id: "d52-1", name: "Find 6 new prospects", estimatedMinutes: 12, tool: "LinkedIn" },
            { id: "d52-2", name: "Send 4 connection requests", estimatedMinutes: 20, tool: "LinkedIn" },
            { id: "d52-3", name: "Send 4 DMs", estimatedMinutes: 20, tool: "LinkedIn" },
            { id: "d52-4", name: "Conduct discovery call #4+", estimatedMinutes: 30, tool: "Zoom/Phone" },
            { id: "d52-5", name: "Document call", estimatedMinutes: 5, tool: "Notion" }
        ]
    },
    53: {
        dayOfWeek: "Thursday", phase: 5, totalMinutes: 87,
        tasks: [
            { id: "d53-1", name: "Find 6 new prospects", estimatedMinutes: 12, tool: "LinkedIn" },
            { id: "d53-2", name: "Send 4 connection requests", estimatedMinutes: 20, tool: "LinkedIn" },
            { id: "d53-3", name: "Send 4 DMs", estimatedMinutes: 20, tool: "LinkedIn" },
            { id: "d53-4", name: "Work on current client deliverables", estimatedMinutes: 30, tool: "Google Docs" },
            { id: "d53-5", name: "Send proposals to hot prospects", estimatedMinutes: 5, tool: "Email" }
        ]
    },
    54: {
        dayOfWeek: "Friday", phase: 5, totalMinutes: 87,
        tasks: [
            { id: "d54-1", name: "Find 6 new prospects", estimatedMinutes: 12, tool: "LinkedIn" },
            { id: "d54-2", name: "Send 4 connection requests", estimatedMinutes: 20, tool: "LinkedIn" },
            { id: "d54-3", name: "Send 4 DMs", estimatedMinutes: 20, tool: "LinkedIn" },
            { id: "d54-4", name: "Work on current client", estimatedMinutes: 30, tool: "Google Docs" },
            { id: "d54-5", name: "Follow up with prospects in pipeline", estimatedMinutes: 5, tool: "LinkedIn" }
        ]
    },
    55: {
        dayOfWeek: "Saturday", phase: 5, totalMinutes: 110,
        tasks: [
            { id: "d55-1", name: "Review all prospects and pipeline status", estimatedMinutes: 20, tool: "Google Sheets" },
            { id: "d55-2", name: "Write LinkedIn content using client work example", estimatedMinutes: 20, tool: "LinkedIn" },
            { id: "d55-3", name: "Create EEC assets #8-9 (finish this weekend)", estimatedMinutes: 60, tool: "Google Docs" },
            { id: "d55-4", name: "Analyze your ghostwriting business metrics", estimatedMinutes: 10, tool: "Google Sheets" }
        ]
    },
    56: {
        dayOfWeek: "Sunday", phase: 5, totalMinutes: 60,
        tasks: [
            { id: "d56-1", name: "Final Weekly Reflection: 1 client down, 2-3 more likely?", estimatedMinutes: 15, tool: "Notion" },
            { id: "d56-2", name: "Work on current client", estimatedMinutes: 30, tool: "Google Docs" },
            { id: "d56-3", name: "Plan final 4 days", estimatedMinutes: 15, tool: "Notion" }
        ]
    },
    57: {
        dayOfWeek: "Monday", phase: 5, totalMinutes: 87,
        tasks: [
            { id: "d57-1", name: "Find 6 new prospects", estimatedMinutes: 12, tool: "LinkedIn" },
            { id: "d57-2", name: "Send 4 connection requests", estimatedMinutes: 20, tool: "LinkedIn" },
            { id: "d57-3", name: "Send 4 DMs (focus on closing hot prospects)", estimatedMinutes: 20, tool: "LinkedIn" },
            { id: "d57-4", name: "Work on current client", estimatedMinutes: 30, tool: "Google Docs" },
            { id: "d57-5", name: "Check all messages and close hard", estimatedMinutes: 5, tool: "LinkedIn" }
        ]
    },
    58: {
        dayOfWeek: "Tuesday", phase: 5, totalMinutes: 92,
        tasks: [
            { id: "d58-1", name: "Find 6 new prospects", estimatedMinutes: 12, tool: "LinkedIn" },
            { id: "d58-2", name: "Send 4 connection requests", estimatedMinutes: 20, tool: "LinkedIn" },
            { id: "d58-3", name: "Send 4 DMs", estimatedMinutes: 20, tool: "LinkedIn" },
            { id: "d58-4", name: "Closing calls for hot prospects", estimatedMinutes: 30, tool: "Zoom/Phone" },
            { id: "d58-5", name: "Work on client", estimatedMinutes: 10, tool: "Google Docs" }
        ]
    },
    59: {
        dayOfWeek: "Wednesday", phase: 5, totalMinutes: 87,
        tasks: [
            { id: "d59-1", name: "Find 6 new prospects", estimatedMinutes: 12, tool: "LinkedIn" },
            { id: "d59-2", name: "Send 4 connection requests", estimatedMinutes: 20, tool: "LinkedIn" },
            { id: "d59-3", name: "Send 4 DMs (final push)", estimatedMinutes: 20, tool: "LinkedIn" },
            { id: "d59-4", name: "🎉 Sign any last-minute clients!", estimatedMinutes: 5, tool: "Notes" },
            { id: "d59-5", name: "Work on current clients", estimatedMinutes: 30, tool: "Google Docs" }
        ]
    },
    60: {
        dayOfWeek: "Thursday", phase: 5, totalMinutes: 97,
        tasks: [
            { id: "d60-1", name: "Find 6 new prospects (keep building!)", estimatedMinutes: 12, tool: "LinkedIn" },
            { id: "d60-2", name: "Send 4 connection requests", estimatedMinutes: 20, tool: "LinkedIn" },
            { id: "d60-3", name: "Send 4 DMs", estimatedMinutes: 20, tool: "LinkedIn" },
            { id: "d60-4", name: "🎉 Celebrate! Document your 60-day journey", estimatedMinutes: 15, tool: "Notion" },
            { id: "d60-5", name: "Plan for the next 60 days", estimatedMinutes: 30, tool: "Notion" }
        ]
    }
};

/**
 * Get tasks for a specific day
 */
export const getTasksForDay = (dayNumber) => {
    return dailyTasks[dayNumber] || null;
};

/**
 * Get total task count for all 60 days
 */
export const getTotalTaskCount = () => {
    return Object.values(dailyTasks).reduce((sum, day) => sum + day.tasks.length, 0);
};
