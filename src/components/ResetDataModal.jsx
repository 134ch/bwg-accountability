import { useState, useEffect, useCallback } from 'react';
import { AlertTriangle, RefreshCw, Trash2, X } from 'lucide-react';
import { resetLocalStorageOnly, resetAllData } from '../utils/storage-service';
import './ResetDataModal.css';

/**
 * ResetDataModal - Modal with soft/hard reset options
 * 
 * Soft Reset: Clears localStorage only, IndexedDB data preserved
 * Hard Reset: Deletes ALL data permanently with countdown confirmation
 */
const ResetDataModal = ({ show, onClose }) => {
    const [selectedOption, setSelectedOption] = useState(null); // 'soft' | 'hard' | null
    const [countdown, setCountdown] = useState(3);
    const [showConfirmButton, setShowConfirmButton] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    // Reset state when modal closes
    useEffect(() => {
        if (!show) {
            setSelectedOption(null);
            setCountdown(3);
            setShowConfirmButton(false);
            setIsProcessing(false);
        }
    }, [show]);

    // Countdown timer for hard reset
    useEffect(() => {
        if (selectedOption === 'hard' && countdown > 0) {
            const timer = setTimeout(() => {
                setCountdown(prev => prev - 1);
            }, 1000);
            return () => clearTimeout(timer);
        }

        if (selectedOption === 'hard' && countdown === 0) {
            setShowConfirmButton(true);
        }
    }, [selectedOption, countdown]);

    const handleSoftReset = useCallback(async () => {
        setIsProcessing(true);
        try {
            resetLocalStorageOnly();
            // Reload the page to restore data from IndexedDB
            window.location.reload();
        } catch (error) {
            console.error('Soft reset failed:', error);
            setIsProcessing(false);
        }
    }, []);

    const handleHardReset = useCallback(async () => {
        setIsProcessing(true);
        try {
            await resetAllData();
            // Reload the page for fresh start
            window.location.reload();
        } catch (error) {
            console.error('Hard reset failed:', error);
            setIsProcessing(false);
        }
    }, []);

    const handleClose = useCallback(() => {
        if (!isProcessing) {
            onClose();
        }
    }, [isProcessing, onClose]);

    if (!show) return null;

    return (
        <div className="reset-modal-overlay" onClick={handleClose}>
            <div className="reset-modal glassmorphism animate-fadeIn" onClick={e => e.stopPropagation()}>
                <button className="reset-modal-close" onClick={handleClose} disabled={isProcessing}>
                    <X size={20} />
                </button>

                <h2 className="reset-modal-title">
                    <AlertTriangle className="reset-modal-icon" />
                    Reset Data
                </h2>

                {/* Option Selection */}
                {!selectedOption && (
                    <div className="reset-options">
                        <button
                            className="reset-option soft"
                            onClick={() => setSelectedOption('soft')}
                        >
                            <RefreshCw size={24} />
                            <span className="option-title">Clear Cache</span>
                            <span className="option-desc">
                                Clear localStorage only. Your permanent data is safe in IndexedDB.
                                On next reload, data restores.
                            </span>
                        </button>

                        <button
                            className="reset-option hard"
                            onClick={() => setSelectedOption('hard')}
                        >
                            <Trash2 size={24} />
                            <span className="option-title">Complete Restart</span>
                            <span className="option-desc">
                                Delete ALL data permanently. This cannot be undone.
                                Your entire progress will be lost.
                            </span>
                        </button>
                    </div>
                )}

                {/* Soft Reset Confirmation */}
                {selectedOption === 'soft' && (
                    <div className="reset-confirm soft">
                        <p>Are you sure you want to clear the cache?</p>
                        <p className="reset-note">
                            Your permanent data is safe. On reload, everything will restore from IndexedDB.
                        </p>
                        <div className="reset-actions">
                            <button
                                className="btn btn-secondary"
                                onClick={() => setSelectedOption(null)}
                                disabled={isProcessing}
                            >
                                Cancel
                            </button>
                            <button
                                className="btn btn-primary"
                                onClick={handleSoftReset}
                                disabled={isProcessing}
                            >
                                {isProcessing ? 'Clearing...' : 'Clear Cache'}
                            </button>
                        </div>
                    </div>
                )}

                {/* Hard Reset Countdown */}
                {selectedOption === 'hard' && (
                    <div className="reset-confirm hard">
                        <div className="warning-banner">
                            <AlertTriangle size={24} />
                            <span>You are about to permanently delete all data</span>
                        </div>

                        {!showConfirmButton ? (
                            <div className="countdown-container">
                                <div className="countdown-number">{countdown}</div>
                                <p className="countdown-text">seconds until confirmation available</p>
                            </div>
                        ) : (
                            <div className="hard-reset-final">
                                <p className="hard-reset-warning">
                                    This action is permanent. All your progress, streaks,
                                    reflections, and data will be deleted forever.
                                </p>
                                <div className="reset-actions">
                                    <button
                                        className="btn btn-secondary"
                                        onClick={() => setSelectedOption(null)}
                                        disabled={isProcessing}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="btn btn-danger"
                                        onClick={handleHardReset}
                                        disabled={isProcessing}
                                    >
                                        {isProcessing ? 'Deleting...' : 'Confirm Hard Reset'}
                                    </button>
                                </div>
                            </div>
                        )}

                        {!showConfirmButton && (
                            <button
                                className="btn btn-link"
                                onClick={() => setSelectedOption(null)}
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ResetDataModal;
