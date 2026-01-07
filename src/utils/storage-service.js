/**
 * Storage Service - IndexedDB + localStorage Hybrid
 * 
 * Primary storage: IndexedDB (persistent, survives cache clears)
 * Cache layer: localStorage (fast reads)
 * 
 * On app load: Sync IndexedDB data to localStorage
 * On save: Write to BOTH IndexedDB and localStorage
 * On read: Read from localStorage first (fast), fallback to IndexedDB
 */

const DB_NAME = 'AccountabilityAppDB';
const DB_VERSION = 1;

// Object store names
const STORES = {
    APP_STATE: 'appState',
    TASKS: 'tasks',
    REFLECTIONS: 'reflections',
    TIME_TRACKING: 'timeTracking'
};

// localStorage key prefix to avoid collisions
const LS_PREFIX = 'bwg_idb_';

// Database connection (cached after first open)
let dbConnection = null;

/**
 * Open IndexedDB connection
 * Creates database and object stores if they don't exist
 */
const openDatabase = () => {
    return new Promise((resolve, reject) => {
        // Return cached connection if available
        if (dbConnection) {
            resolve(dbConnection);
            return;
        }

        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onerror = () => {
            console.error('IndexedDB open failed:', request.error);
            reject(request.error);
        };

        request.onsuccess = () => {
            dbConnection = request.result;
            resolve(dbConnection);
        };

        request.onupgradeneeded = (event) => {
            const db = event.target.result;

            // Create object stores if they don't exist
            if (!db.objectStoreNames.contains(STORES.APP_STATE)) {
                db.createObjectStore(STORES.APP_STATE);
            }
            if (!db.objectStoreNames.contains(STORES.TASKS)) {
                db.createObjectStore(STORES.TASKS);
            }
            if (!db.objectStoreNames.contains(STORES.REFLECTIONS)) {
                db.createObjectStore(STORES.REFLECTIONS);
            }
            if (!db.objectStoreNames.contains(STORES.TIME_TRACKING)) {
                db.createObjectStore(STORES.TIME_TRACKING);
            }
        };
    });
};

/**
 * Get localStorage key for a store/key combination
 */
const getLSKey = (storeName, key) => `${LS_PREFIX}${storeName}_${key}`;

/**
 * Initialize storage on app startup
 * Opens IndexedDB and syncs data to localStorage for fast access
 */
export const initializeStorage = async () => {
    try {
        console.log('[Storage] Initializing storage...');
        const db = await openDatabase();
        console.log('[Storage] IndexedDB opened successfully');

        let totalItemsSynced = 0;

        // Sync IndexedDB data to localStorage for each store
        for (const storeName of Object.values(STORES)) {
            try {
                const transaction = db.transaction(storeName, 'readonly');
                const store = transaction.objectStore(storeName);

                // Use getAll for more reliable data retrieval
                const getAllRequest = store.getAll();
                const getAllKeysRequest = store.getAllKeys();

                const items = await new Promise((resolve, reject) => {
                    getAllRequest.onsuccess = () => resolve(getAllRequest.result);
                    getAllRequest.onerror = () => reject(getAllRequest.error);
                });

                const keys = await new Promise((resolve, reject) => {
                    getAllKeysRequest.onsuccess = () => resolve(getAllKeysRequest.result);
                    getAllKeysRequest.onerror = () => reject(getAllKeysRequest.error);
                });

                console.log(`[Storage] Found ${items.length} items in "${storeName}" store`);

                // Sync each item to localStorage
                for (let i = 0; i < keys.length; i++) {
                    const key = keys[i];
                    const value = items[i];
                    const lsKey = getLSKey(storeName, key);
                    try {
                        localStorage.setItem(lsKey, JSON.stringify(value));
                        totalItemsSynced++;
                        console.log(`[Storage] Synced: ${lsKey}`);
                    } catch (e) {
                        console.warn('[Storage] localStorage sync failed for:', lsKey, e);
                    }
                }
            } catch (e) {
                console.warn('[Storage] Failed to sync store:', storeName, e);
            }
        }

        console.log(`[Storage] Initialized successfully. Synced ${totalItemsSynced} items from IndexedDB to localStorage.`);
        return true;
    } catch (error) {
        console.error('[Storage] Initialization failed, falling back to localStorage only:', error);
        return false;
    }
};

/**
 * Save data to BOTH IndexedDB and localStorage
 * 
 * @param {string} storeName - One of: 'appState', 'tasks', 'reflections', 'timeTracking'
 * @param {string} key - Unique identifier for the data
 * @param {any} value - Data to save (object, string, number, etc.)
 * @returns {Promise<boolean>} - true if successful
 */
export const saveData = async (storeName, key, value) => {
    // Always save to localStorage first (synchronous, fast)
    const lsKey = getLSKey(storeName, key);
    try {
        localStorage.setItem(lsKey, JSON.stringify(value));
        console.log(`[Storage] Saved to localStorage: ${lsKey}`);
    } catch (e) {
        console.error('[Storage] localStorage save failed:', e);
    }

    // Then save to IndexedDB (async, persistent)
    try {
        const db = await openDatabase();
        const transaction = db.transaction(storeName, 'readwrite');
        const store = transaction.objectStore(storeName);

        await new Promise((resolve, reject) => {
            const request = store.put(value, key);
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });

        console.log(`[Storage] Saved to IndexedDB: ${storeName}/${key}`);
        return true;
    } catch (error) {
        // IndexedDB failed, but localStorage saved successfully
        console.error('[Storage] IndexedDB save failed (localStorage still has data):', error);
        return true; // Still return true since localStorage worked
    }
};

/**
 * Load data - reads from localStorage first (fast), falls back to IndexedDB
 * 
 * @param {string} storeName - Object store name
 * @param {string} key - Key to retrieve
 * @returns {Promise<any>} - Data or null if not found
 */
export const loadData = async (storeName, key) => {
    // Try localStorage first (fast, synchronous)
    const lsKey = getLSKey(storeName, key);
    try {
        const lsData = localStorage.getItem(lsKey);
        if (lsData !== null) {
            return JSON.parse(lsData);
        }
    } catch (e) {
        console.warn('localStorage read failed:', e);
    }

    // Fallback to IndexedDB
    try {
        const db = await openDatabase();
        const transaction = db.transaction(storeName, 'readonly');
        const store = transaction.objectStore(storeName);

        const result = await new Promise((resolve, reject) => {
            const request = store.get(key);
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });

        // If found in IndexedDB, sync back to localStorage
        if (result !== undefined) {
            try {
                localStorage.setItem(lsKey, JSON.stringify(result));
            } catch (e) {
                console.warn('Failed to sync to localStorage:', e);
            }
        }

        return result !== undefined ? result : null;
    } catch (error) {
        console.error('IndexedDB load failed:', error);
        return null;
    }
};

/**
 * Load data synchronously from localStorage only
 * Use when you need immediate access without async/await
 * 
 * @param {string} storeName - Object store name
 * @param {string} key - Key to retrieve
 * @returns {any} - Data or null if not found
 */
export const loadDataSync = (storeName, key) => {
    const lsKey = getLSKey(storeName, key);
    try {
        const data = localStorage.getItem(lsKey);
        return data ? JSON.parse(data) : null;
    } catch (e) {
        console.error('localStorage sync read failed:', e);
        return null;
    }
};

/**
 * Get all data from a specific store
 * 
 * @param {string} storeName - Object store name
 * @returns {Promise<Object>} - Object with all key-value pairs
 */
export const getAllData = async (storeName) => {
    const result = {};

    try {
        const db = await openDatabase();
        const transaction = db.transaction(storeName, 'readonly');
        const store = transaction.objectStore(storeName);

        await new Promise((resolve, reject) => {
            const request = store.openCursor();
            request.onsuccess = (event) => {
                const cursor = event.target.result;
                if (cursor) {
                    result[cursor.key] = cursor.value;
                    cursor.continue();
                } else {
                    resolve();
                }
            };
            request.onerror = () => reject(request.error);
        });

        return result;
    } catch (error) {
        console.error('IndexedDB getAllData failed, trying localStorage:', error);

        // Fallback: try to reconstruct from localStorage
        const prefix = `${LS_PREFIX}${storeName}_`;
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith(prefix)) {
                const dataKey = key.slice(prefix.length);
                try {
                    result[dataKey] = JSON.parse(localStorage.getItem(key));
                } catch (e) {
                    console.warn('Failed to parse localStorage item:', key);
                }
            }
        }
        return result;
    }
};

/**
 * Delete data from BOTH IndexedDB and localStorage
 * 
 * @param {string} storeName - Object store name
 * @param {string} key - Key to delete
 * @returns {Promise<boolean>} - true if successful
 */
export const deleteData = async (storeName, key) => {
    // Delete from localStorage
    const lsKey = getLSKey(storeName, key);
    try {
        localStorage.removeItem(lsKey);
    } catch (e) {
        console.warn('localStorage delete failed:', e);
    }

    // Delete from IndexedDB
    try {
        const db = await openDatabase();
        const transaction = db.transaction(storeName, 'readwrite');
        const store = transaction.objectStore(storeName);

        await new Promise((resolve, reject) => {
            const request = store.delete(key);
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });

        return true;
    } catch (error) {
        console.error('IndexedDB delete failed:', error);
        return true; // localStorage was still cleared
    }
};

/**
 * SOFT RESET: Clear only localStorage
 * IndexedDB data remains untouched
 * On next app load, IndexedDB data syncs back to localStorage
 * 
 * @returns {boolean} - true if successful
 */
export const resetLocalStorageOnly = () => {
    try {
        // Clear all storage-service localStorage keys
        const keysToRemove = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith(LS_PREFIX)) {
                keysToRemove.push(key);
            }
        }

        // Also clear legacy keys from old storage system
        const legacyKeys = [
            'bwg_accountability_data',
            'bwg_streak_data',
            'bwg_reflections',
            'bwg_start_date',
            'bwg_time_tracking',
            'bwg_carryover_dismissed',
            'bwg_tool_clicks',
            'bwg_active_timers'
        ];

        keysToRemove.push(...legacyKeys);

        keysToRemove.forEach(key => {
            try {
                localStorage.removeItem(key);
            } catch (e) {
                console.warn('Failed to remove:', key);
            }
        });

        console.log('Soft reset complete: localStorage cleared');
        return true;
    } catch (error) {
        console.error('Soft reset failed:', error);
        return false;
    }
};

/**
 * HARD RESET: Delete everything permanently
 * Clears BOTH IndexedDB and localStorage
 * Data is GONE forever (cannot be recovered)
 * 
 * @returns {Promise<boolean>} - true if successful
 */
export const resetAllData = async () => {
    try {
        // Clear localStorage first
        resetLocalStorageOnly();

        // Close existing connection before deleting database
        if (dbConnection) {
            dbConnection.close();
            dbConnection = null;
        }

        // Delete the entire IndexedDB database
        await new Promise((resolve, reject) => {
            const request = indexedDB.deleteDatabase(DB_NAME);
            request.onsuccess = () => {
                console.log('IndexedDB database deleted');
                resolve();
            };
            request.onerror = () => {
                console.error('Failed to delete IndexedDB:', request.error);
                reject(request.error);
            };
            request.onblocked = () => {
                console.warn('IndexedDB delete blocked, closing connections...');
                resolve(); // Continue anyway
            };
        });

        console.log('Hard reset complete: All data deleted permanently');
        return true;
    } catch (error) {
        console.error('Hard reset failed:', error);
        return false;
    }
};

// Export store names for use in other modules
export { STORES };
