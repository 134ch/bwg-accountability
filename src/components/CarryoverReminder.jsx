import { useState, useEffect } from 'react';
import { AlertTriangle, X, CheckCircle2, Plus, Clock } from 'lucide-react';
import { getYesterdaysIncompleteTasks, isCarryoverDismissed, dismissCarryover, getCurrentDayNumber } from '../utils/storage';
import './CarryoverReminder.css';

/**
 * CarryoverReminder Component
 * 
 * Shows a banner for incomplete tasks from yesterday with options to:
 * - Dismiss (with confirmation)
 * - Add missed tasks to today's list
 */
function CarryoverReminder({ onAddTasks }) {
    const [incompleteTasks, setIncompleteTasks] = useState([]);
    const [isDismissed, setIsDismissed] = useState(true);
    const [isVisible, setIsVisible] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [confirmAction, setConfirmAction] = useState(null);

    useEffect(() => {
        // Don't show on Day 1
        const dayNumber = getCurrentDayNumber();
        if (dayNumber <= 1) {
            setIsVisible(false);
            return;
        }

        // Check for yesterday's incomplete tasks
        const tasks = getYesterdaysIncompleteTasks();
        const alreadyDismissed = isCarryoverDismissed();

        setIncompleteTasks(tasks);
        setIsDismissed(alreadyDismissed);
        setIsVisible(tasks.length > 0 && !alreadyDismissed);
    }, []);

    // Calculate total time for incomplete tasks
    const totalTimeMinutes = incompleteTasks.reduce((sum, task) =>
        sum + (task.estimatedMinutes || task.bufferedMinutes || 10), 0
    );

    const handleDismissClick = () => {
        setConfirmAction('dismiss');
        setShowConfirmModal(true);
    };

    const handleAddTasksClick = () => {
        setConfirmAction('add');
        setShowConfirmModal(true);
    };

    const handleConfirm = () => {
        if (confirmAction === 'dismiss') {
            dismissCarryover();
            setIsDismissed(true);
            setIsVisible(false);
        } else if (confirmAction === 'add') {
            if (onAddTasks) {
                onAddTasks(incompleteTasks);
            }
            dismissCarryover();
            setIsVisible(false);
        }
        setShowConfirmModal(false);
    };

    const handleCancel = () => {
        setShowConfirmModal(false);
        setConfirmAction(null);
    };

    // Don't render if no incomplete tasks or dismissed
    if (!isVisible || incompleteTasks.length === 0) {
        return null;
    }

    // Show up to 3 task names
    const displayTasks = incompleteTasks.slice(0, 3);
    const remainingCount = incompleteTasks.length - 3;

    return (
        <>
            <div className="carryover-reminder animate-fadeIn">
                <div className="carryover-icon">
                    <AlertTriangle size={20} />
                </div>

                <div className="carryover-content">
                    <div className="carryover-title">
                        You have {incompleteTasks.length} incomplete task{incompleteTasks.length > 1 ? 's' : ''} from yesterday
                    </div>
                    <ul className="carryover-tasks">
                        {displayTasks.map((task, index) => (
                            <li key={task.id || index}>
                                <CheckCircle2 size={12} className="task-bullet" />
                                {task.name}
                            </li>
                        ))}
                        {remainingCount > 0 && (
                            <li className="carryover-more">
                                ...and {remainingCount} more
                            </li>
                        )}
                    </ul>

                    {/* Action Buttons */}
                    <div className="carryover-actions">
                        <button
                            className="carryover-btn carryover-btn-add"
                            onClick={handleAddTasksClick}
                        >
                            <Plus size={14} />
                            Add to Today (+{totalTimeMinutes}min)
                        </button>
                        <button
                            className="carryover-btn carryover-btn-skip"
                            onClick={handleDismissClick}
                        >
                            Skip for Today
                        </button>
                    </div>
                </div>

                <button
                    className="carryover-dismiss"
                    onClick={handleDismissClick}
                    title="Dismiss reminder"
                >
                    <X size={18} />
                </button>
            </div>

            {/* Confirmation Modal */}
            {showConfirmModal && (
                <div className="carryover-modal-overlay" onClick={handleCancel}>
                    <div className="carryover-modal" onClick={(e) => e.stopPropagation()}>
                        {confirmAction === 'dismiss' ? (
                            <>
                                <h3>Skip Yesterday's Tasks?</h3>
                                <p>These {incompleteTasks.length} tasks will be skipped. You can still focus on today's tasks without them.</p>
                                <p className="modal-note">This won't affect your streak if you complete today's tasks.</p>
                            </>
                        ) : (
                            <>
                                <h3>Add Tasks to Today?</h3>
                                <div className="time-warning">
                                    <Clock size={18} />
                                    <span>This will add ~{totalTimeMinutes} minutes to your day</span>
                                </div>
                                <p className="modal-note">Focus on today's core tasks first. Only add these if you have extra time!</p>
                            </>
                        )}

                        <div className="modal-actions">
                            <button className="modal-btn modal-btn-cancel" onClick={handleCancel}>
                                Cancel
                            </button>
                            <button className="modal-btn modal-btn-confirm" onClick={handleConfirm}>
                                {confirmAction === 'dismiss' ? 'Yes, Skip Them' : 'Yes, Add Them'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default CarryoverReminder;
