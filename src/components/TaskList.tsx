import { useTaskContext } from '../TaskContext';

export default function TaskList() {
  const { tasks } = useTaskContext();

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <h3>{task.task}</h3>
          <p>ID: {task.id}</p>
          <p>Date: {task.date}</p>
          <p>Priority: {task.priority}</p>
          <p>Completed: {String(task.completed)}</p>
        </li>
      ))}
    </ul>
  );
}
