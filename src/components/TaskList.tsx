import { useTaskContext } from '../TaskContext';

export default function TaskList() {
  const { tasks, editId, setEditId, toggleTask, deleteTask } = useTaskContext();

  const handleDelete = (id: string) => {
    if (editId === id) {
      setEditId('');
    }
    deleteTask(id);
  };

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <h3>{task.task}</h3>
          <p>ID: {task.id}</p>
          <p>Date: {task.date}</p>
          <p>Priority: {task.priority}</p>
          <p>Completed: {String(task.completed)}</p>
          <button onClick={() => toggleTask(task.id)}>Toggle Completed</button>
          <button onClick={() => setEditId(task.id)}>Edit</button>
          <button onClick={() => handleDelete(task.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}
