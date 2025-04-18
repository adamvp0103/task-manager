import { FC } from 'react';
import { Priorities, Task, useAppContext } from '../AppContext';
import { getDisplayDate } from '../util/dates';

interface TaskListItemProps {
  task: Task;
}

const TaskListItem: FC<TaskListItemProps> = ({ task }) => {
  const { editId, setEditId, toggleTask, deleteTask, showForm } =
    useAppContext();

  const handleEdit = (id: string) => {
    setEditId(id);
    showForm();
  };

  const handleDelete = (id: string) => {
    if (editId === id) {
      setEditId('');
    }
    deleteTask(id);
  };

  return (
    <li className={`card ${task.completed ? 'translucent' : ''}`} key={task.id}>
      {task.priority !== Priorities.Medium && (
        <p
          className={`priority-label small-text ${
            task.priority === Priorities.High ? 'red' : 'blue'
          }`}
        >
          {task.priority.toUpperCase()} PRIORITY
        </p>
      )}
      <div className="stack-vertically small-gap">
        <div>
          <h4 className="task-heading">{task.task}</h4>
          <p>{getDisplayDate(task.date)}</p>
        </div>
        <button
          className="button compact green-hoverable"
          onClick={() => toggleTask(task.id)}
        >
          {task.completed ? 'Undo' : 'Complete'}
        </button>
        <div className="space-evenly compact">
          <button
            className="button compact yellow-hoverable"
            onClick={() => handleEdit(task.id)}
          >
            Edit
          </button>
          <button
            className="button compact red-hoverable"
            onClick={() => handleDelete(task.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </li>
  );
};

export default TaskListItem;
