import { useState } from 'react';
import { X, Sparkles, Save } from 'lucide-react';
import { getCurrentWeekKey, saveReflection, loadReflections } from '../utils/storage';
import './ReflectionModal.css';

function ReflectionModal({ onClose }) {
    const weekKey = getCurrentWeekKey();
    const existingReflections = loadReflections();
    const existing = existingReflections[weekKey] || {};

    const [worked, setWorked] = useState(existing.worked || '');
    const [derailed, setDerailed] = useState(existing.derailed || '');
    const [change, setChange] = useState(existing.change || '');

    const handleSave = () => {
        saveReflection(weekKey, { worked, derailed, change });
        onClose();
    };

    return (
        <div className="reflection-modal-overlay">
            <div className="reflection-modal glassmorphism animate-fadeIn">
                <button className="modal-close" onClick={onClose}>
                    <X size={20} />
                </button>

                <div className="modal-header">
                    <Sparkles className="modal-icon" size={24} />
                    <h2>Weekly Reflection</h2>
                    <span className="week-badge">{weekKey}</span>
                </div>

                <p className="modal-subtitle">
                    Take a moment to reflect on your week 🧠
                </p>

                <div className="reflection-form">
                    <div className="form-group">
                        <label>What worked this week?</label>
                        <textarea
                            value={worked}
                            onChange={(e) => setWorked(e.target.value)}
                            placeholder="Wins, accomplishments, things that went well..."
                            rows={3}
                        />
                    </div>

                    <div className="form-group">
                        <label>What derailed you?</label>
                        <textarea
                            value={derailed}
                            onChange={(e) => setDerailed(e.target.value)}
                            placeholder="Distractions, obstacles, things that didn't work..."
                            rows={3}
                        />
                    </div>

                    <div className="form-group">
                        <label>What will you change next week? <span className="optional">(optional)</span></label>
                        <textarea
                            value={change}
                            onChange={(e) => setChange(e.target.value)}
                            placeholder="Adjustments, new approaches, experiments..."
                            rows={3}
                        />
                    </div>
                </div>

                <button className="btn btn-primary save-btn" onClick={handleSave}>
                    <Save size={16} />
                    Save Reflection
                </button>
            </div>
        </div>
    );
}

export default ReflectionModal;
