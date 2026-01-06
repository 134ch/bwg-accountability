import { useState, useEffect } from 'react';
import { ExternalLink, Star } from 'lucide-react';
import { quickLinks } from '../config';
import { trackToolClick, getMostUsedTool } from '../utils/storage';
import './QuickLinks.css';

function QuickLinks() {
    const [mostUsed, setMostUsed] = useState(null);
    const tools = quickLinks;

    useEffect(() => {
        setMostUsed(getMostUsedTool());
    }, []);

    const handleClick = (toolId) => {
        trackToolClick(toolId);
        setMostUsed(getMostUsedTool());
    };

    return (
        <div className="quick-links-section animate-fadeIn">
            <div className="quick-links-header">
                <ExternalLink size={14} />
                <span>Quick Links</span>
            </div>
            <div className="quick-links-row">
                {tools.map((tool) => (
                    <a
                        key={tool.id}
                        href={tool.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`quick-link-btn ${mostUsed === tool.id ? 'most-used' : ''}`}
                        onClick={() => handleClick(tool.id)}
                    >
                        <span className="tool-icon">{tool.icon}</span>
                        <span className="tool-name">{tool.name}</span>
                        {mostUsed === tool.id && (
                            <Star size={10} className="star-icon" />
                        )}
                    </a>
                ))}
            </div>
        </div>
    );
}

export default QuickLinks;
