import { useState } from 'react';
import { BookOpen, Copy, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { getAllReflectionsSorted, exportReflectionsAsText } from '../utils/storage';
import './ReflectionsTab.css';

function ReflectionsTab() {
    const [reflections] = useState(() => getAllReflectionsSorted());
    const [expandedWeek, setExpandedWeek] = useState(null);
    const [copied, setCopied] = useState(false);

    const handleExport = async () => {
        const text = exportReflectionsAsText();
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const toggleExpand = (weekKey) => {
        setExpandedWeek(prev => prev === weekKey ? null : weekKey);
    };

    const formatWeekLabel = (weekKey) => {
        // Convert "2026-W02" to "Week 2, 2026"
        const [year, week] = weekKey.split('-W');
        return `Week ${parseInt(week)}, ${year}`;
    };

    return (
        <div className="reflections-tab animate-fadeIn">
            <div className="reflections-header">
                <div className="header-left">
                    <BookOpen size={20} />
                    <h2>Past Reflections</h2>
                    <span className="count-badge">{reflections.length}</span>
                </div>
                <button
                    className={`export-btn ${copied ? 'copied' : ''}`}
                    onClick={handleExport}
                    disabled={reflections.length === 0}
                >
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                    {copied ? 'Copied!' : 'Export All'}
                </button>
            </div>

            {reflections.length === 0 ? (
                <div className="empty-state glassmorphism">
                    <p>No reflections yet.</p>
                    <span>Your Sunday reflections will appear here.</span>
                </div>
            ) : (
                <div className="reflections-list">
                    {reflections.map((r) => (
                        <div
                            key={r.weekKey}
                            className={`reflection-card glassmorphism ${expandedWeek === r.weekKey ? 'expanded' : ''}`}
                        >
                            <div
                                className="card-header"
                                onClick={() => toggleExpand(r.weekKey)}
                            >
                                <span className="week-label">{formatWeekLabel(r.weekKey)}</span>
                                <span className="saved-date">
                                    {new Date(r.savedAt).toLocaleDateString()}
                                </span>
                                {expandedWeek === r.weekKey ? (
                                    <ChevronUp size={16} />
                                ) : (
                                    <ChevronDown size={16} />
                                )}
                            </div>

                            {expandedWeek === r.weekKey && (
                                <div className="card-content">
                                    {r.worked && (
                                        <div className="content-section">
                                            <label>What worked:</label>
                                            <p>{r.worked}</p>
                                        </div>
                                    )}
                                    {r.derailed && (
                                        <div className="content-section">
                                            <label>What derailed:</label>
                                            <p>{r.derailed}</p>
                                        </div>
                                    )}
                                    {r.change && (
                                        <div className="content-section">
                                            <label>What to change:</label>
                                            <p>{r.change}</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ReflectionsTab;
