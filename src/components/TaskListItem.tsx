import { FC } from 'react';
import { Task, useTaskContext } from '../TaskContext';

interface TaskListItemProps {
  task: Task;
}

const TaskListItem: FC<TaskListItemProps> = ({ task }) => {
  const { editId, setEditId, toggleTask, deleteTask } = useTaskContext();

  const handleDelete = (id: string) => {
    if (editId === id) {
      setEditId('');
    }
    deleteTask(id);
  };

  return (
    <li key={task.id}>
      <h4>{task.task}</h4>
      <p>ID: {task.id}</p>
      <p>Date: {task.date}</p>
      <p>Priority: {task.priority}</p>
      <p>Completed: {String(task.completed)}</p>
      <button onClick={() => toggleTask(task.id)}>Toggle Completed</button>
      <button onClick={() => setEditId(task.id)}>Edit</button>
      <button onClick={() => handleDelete(task.id)}>Delete</button>
    </li>
  );
};

export default TaskListItem;
