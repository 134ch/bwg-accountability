/**
 * Test Date Utility
 * 
 * Toggle USE_TEST_DATE for testing date-dependent features.
 * Set to false before committing/deploying.
 */

// Toggle this for testing only
export const USE_TEST_DATE = false; // Set to TRUE for testing

// Test date - simulate being on Jan 7, 2026 (current real date)
export const TEST_DATE = new Date('2026-01-07T12:00:00');

/**
 * Get current date - uses mock date when testing is enabled
 * @returns {Date} Current date (real or mock)
 */
export function getCurrentDate() {
    if (USE_TEST_DATE) {
        return new Date(TEST_DATE); // Return a copy to avoid mutation
    }
    return new Date();
}

/**
 * Get today's date key in YYYY-MM-DD format
 * @returns {string} Date string
 */
export function getTestTodayKey() {
    const date = getCurrentDate();
    return date.toISOString().split('T')[0];
}
