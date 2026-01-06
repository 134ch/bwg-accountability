function StatsCard({ icon: Icon, label, value, subtitle, color }) {
    return (
        <div className="stats-card glassmorphism">
            <div
                className="stats-card-icon"
                style={{
                    backgroundColor: `${color}15`,
                    color: color
                }}
            >
                <Icon size={24} />
            </div>
            <div className="stats-card-content">
                <span className="stats-card-label">{label}</span>
                <span className="stats-card-value">{value}</span>
                <span className="stats-card-subtitle">{subtitle}</span>
            </div>
        </div>
    )
}

export default StatsCard
