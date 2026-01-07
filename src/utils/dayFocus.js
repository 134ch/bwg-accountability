/**
 * Day Focus Naming System
 * 
 * Provides descriptive names for each day based on the main focus/purpose.
 * Format: "[Focus Name] - Day X"
 */

/**
 * Day focus map - maps day numbers to focus names
 * 
 * Reflection days: 7, 14, 21, 28, 35, 42, 49, 56, 60
 */
const dayFocusMap = {
    // PHASE 1: FOUNDATION (Days 1-7)
    1: "Foundation Setup",
    2: "Foundation Setup",
    3: "Prospecting",
    4: "Prospecting",
    5: "Prospecting",
    6: "Content Creation",
    7: "Weekly Reflection",

    // PHASE 2: OUTREACH SPRINT 1 (Days 8-21)
    8: "Outreach Sprint",
    9: "Outreach Sprint",
    10: "Outreach Sprint",
    11: "Outreach Sprint",
    12: "Outreach Sprint",
    13: "Content Creation",
    14: "Weekly Reflection",
    15: "Outreach Sprint",
    16: "Outreach Sprint",
    17: "Outreach Sprint",
    18: "Outreach Sprint",
    19: "Outreach Sprint",
    20: "Content Creation",
    21: "Weekly Reflection",

    // PHASE 3: OUTREACH SPRINT 2 (Days 22-35)
    22: "Outreach Sprint",
    23: "Outreach Sprint",
    24: "Outreach Sprint",
    25: "Outreach Sprint",
    26: "Outreach Sprint",
    27: "Analysis & Assets",
    28: "Weekly Reflection",
    29: "Outreach Sprint",
    30: "Discovery Calls",
    31: "Outreach Sprint",
    32: "Outreach Sprint",
    33: "Outreach Sprint",
    34: "Analysis & Assets",
    35: "Weekly Reflection",

    // PHASE 4: CONVERSION FOCUS (Days 36-50)
    36: "Lead Conversion",
    37: "Lead Conversion",
    38: "Discovery Calls",
    39: "Lead Conversion",
    40: "Lead Conversion",
    41: "Analysis & Assets",
    42: "Weekly Reflection",
    43: "Discovery Calls",
    44: "Lead Conversion",
    45: "Sales Closing",
    46: "Sales Closing",
    47: "First Client Signed",
    48: "Content Creation",
    49: "Weekly Reflection",
    50: "Client Delivery",

    // PHASE 5: SCALING (Days 51-60)
    51: "Client Delivery",
    52: "Discovery Calls",
    53: "Client Delivery",
    54: "Client Delivery",
    55: "Asset Building",
    56: "Weekly Reflection",
    57: "Final Push",
    58: "Final Push",
    59: "Final Push",
    60: "Celebration"
};

/**
 * Reflection days - every 7 days plus final day
 * Days 7, 14, 21, 28, 35, 42, 49, 56 = weekly reflections
 * Day 60 = final celebration/reflection
 */
const reflectionDays = [7, 14, 21, 28, 35, 42, 49, 56, 60];

/**
 * Get the focus name for a specific day
 * @param {number} dayNumber - Day number (1-60)
 * @returns {string} Focus name (1-3 words)
 */
export const getDayFocusName = (dayNumber) => {
    return dayFocusMap[dayNumber] || "Daily Tasks";
};

/**
 * Get the full formatted day title
 * @param {number} dayNumber - Day number (1-60)
 * @returns {string} Formatted title like "Foundation Setup - Day 1"
 */
export const getDayFocus = (dayNumber) => {
    const focus = getDayFocusName(dayNumber);
    return `${focus} - Day ${dayNumber}`;
};

/**
 * Check if a day is a reflection day
 * @param {number} dayNumber - Day number (1-60)
 * @returns {boolean} True if it's a reflection day
 */
export const isReflectionDay = (dayNumber) => {
    return reflectionDays.includes(dayNumber);
};

export { dayFocusMap, reflectionDays };
