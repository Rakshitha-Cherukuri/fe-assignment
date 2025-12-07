import type { Task } from "../c-types/TaskType";

interface Props {
  task: Task;
  onToggle: (id: string) => void;
}

function TaskItem({ task, onToggle }: Props) {
  return (
    <div className="task-item">
      <div>
        <strong>{task.title}</strong>
        <small>({task.status})</small>
      </div>
      <button onClick={() => onToggle(task.id)}>
        {task.status === "Pending" ? "Mark Completed" : "Mark Pending"}
      </button>
    </div>
  );
}

export default TaskItem;