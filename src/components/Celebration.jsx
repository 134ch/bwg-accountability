import { useState, useEffect, useRef } from 'react';
import { PartyPopper, Trophy, Sparkles, X } from 'lucide-react';
import * as Tone from 'tone';
import './Celebration.css';

/**
 * Celebration Component
 * Shows confetti, plays sound, and displays motivational message
 * when all daily tasks are completed
 */
function Celebration({ show, streakDays, daysRemaining, onClose }) {
    const [isVisible, setIsVisible] = useState(false);
    const [confettiParticles, setConfettiParticles] = useState([]);
    const [isFading, setIsFading] = useState(false);
    const hasPlayedSound = useRef(false);

    // Generate confetti particles
    useEffect(() => {
        if (show && !isVisible) {
            setIsVisible(true);
            setIsFading(false);
            hasPlayedSound.current = false;

            // Create confetti particles
            const particles = [];
            for (let i = 0; i < 100; i++) {
                particles.push({
                    id: i,
                    left: Math.random() * 100,
                    delay: Math.random() * 2,
                    duration: 3 + Math.random() * 2,
                    size: 8 + Math.random() * 8,
                    color: ['#f97316', '#22c55e', '#eab308', '#8b5cf6', '#06b6d4', '#ec4899', '#f43f5e'][
                        Math.floor(Math.random() * 7)
                    ],
                    rotation: Math.random() * 360,
                    shape: ['square', 'circle', 'triangle'][Math.floor(Math.random() * 3)]
                });
            }
            setConfettiParticles(particles);

            // Play celebration sound
            playCelebrationSound();

            // Auto-close after 5 seconds
            const timer = setTimeout(() => {
                setIsFading(true);
                setTimeout(() => {
                    setIsVisible(false);
                    if (onClose) onClose();
                }, 500);
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [show]);

    // Celebration sound using Tone.js
    const playCelebrationSound = async () => {
        if (hasPlayedSound.current) return;
        hasPlayedSound.current = true;

        try {
            await Tone.start();

            const synth = new Tone.PolySynth(Tone.Synth).toDestination();
            synth.volume.value = -6;

            // Upbeat celebratory arpeggio
            const now = Tone.now();
            synth.triggerAttackRelease('C5', '8n', now);
            synth.triggerAttackRelease('E5', '8n', now + 0.1);
            synth.triggerAttackRelease('G5', '8n', now + 0.2);
            synth.triggerAttackRelease('C6', '4n', now + 0.3);

            // Cleanup after sound
            setTimeout(() => {
                synth.dispose();
            }, 2000);
        } catch (error) {
            console.log('Could not play celebration sound:', error);
        }
    };

    const handleClose = () => {
        setIsFading(true);
        setTimeout(() => {
            setIsVisible(false);
            if (onClose) onClose();
        }, 300);
    };

    if (!isVisible) return null;

    return (
        <div className={`celebration-overlay ${isFading ? 'fading' : ''}`}>
            {/* Confetti Container */}
            <div className="confetti-layer">
                {confettiParticles.map(particle => (
                    <div
                        key={particle.id}
                        className={`confetti-piece ${particle.shape}`}
                        style={{
                            left: `${particle.left}%`,
                            animationDelay: `${particle.delay}s`,
                            animationDuration: `${particle.duration}s`,
                            width: `${particle.size}px`,
                            height: `${particle.size}px`,
                            backgroundColor: particle.color,
                            transform: `rotate(${particle.rotation}deg)`
                        }}
                    />
                ))}
            </div>

            {/* Message Modal */}
            <div className="celebration-modal">
                <button className="celebration-close" onClick={handleClose}>
                    <X size={20} />
                </button>

                <div className="celebration-icon-wrapper">
                    <PartyPopper className="celebration-icon" />
                    <Sparkles className="sparkle-icon sparkle-1" />
                    <Sparkles className="sparkle-icon sparkle-2" />
                </div>

                <h2 className="celebration-title">
                    🎉 All Tasks Completed!
                </h2>

                <div className="celebration-stats">
                    <div className="stat-item streak">
                        <Trophy size={24} />
                        <div className="stat-content">
                            <span className="stat-value">{streakDays}</span>
                            <span className="stat-label">day streak</span>
                        </div>
                    </div>

                    <div className="stat-item days-left">
                        <Sparkles size={24} />
                        <div className="stat-content">
                            <span className="stat-value">{daysRemaining}</span>
                            <span className="stat-label">days to first client</span>
                        </div>
                    </div>
                </div>

                <p className="celebration-message">
                    You're building something amazing! Keep pushing forward! 💪
                </p>
            </div>
        </div>
    );
}

export default Celebration;
