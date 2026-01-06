import { Check, Clock } from 'lucide-react'
import * as Icons from 'lucide-react'
import { categories } from '../utils/tasks'

function TaskList({ tasks, onToggle }) {
    return (
        <div className="task-list">
            {tasks.map((task, index) => {
                const IconComponent = Icons[task.icon] || Icons.Circle
                const category = categories[task.category] || { color: '#6366f1', bgColor: 'rgba(99, 102, 241, 0.1)' }

                return (
                    <div
                        key={task.id}
                        className={`task-item glassmorphism ${task.completed ? 'completed' : ''}`}
                        onClick={() => onToggle(task.id)}
                        style={{ animationDelay: `${index * 0.05}s` }}
                    >
                        <div className="task-checkbox">
                            {task.completed && <Check size={14} color="white" />}
                        </div>

                        <div
                            className="task-icon"
                            style={{
                                backgroundColor: category.bgColor,
                                color: category.color
                            }}
                        >
                            <IconComponent size={20} />
                        </div>

                        <div className="task-content">
                            <div className="task-name">{task.name}</div>
                            <div className="task-description">{task.description}</div>
                        </div>

                        {task.duration && (
                            <div className="task-meta">
                                <div className="task-duration">
                                    <Clock size={12} />
                                    <span>{task.duration}m</span>
                                </div>
                            </div>
                        )}
                    </div>
                )
            })}
        </div>
    )
}

export default TaskList
