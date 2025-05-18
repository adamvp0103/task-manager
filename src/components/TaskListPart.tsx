import { FC } from 'react';
import { Task } from '../AppContext';
import TaskListItem from './TaskListItem';
import { sortByDate } from '../util/sort';

interface TaskListPartProps {
  label: string;
  tasks: Task[];
}

const TaskListPart: FC<TaskListPartProps> = ({ label, tasks }) => {
  // For organizing the tasks by due date category (overdue, today, tomorrow, or later)
  if (tasks.length) {
    return (
      <div>
        <h3 className="section-heading">{label}</h3>
        <ol className="desktop-2-column">
          {sortByDate(tasks).map((task) => (
            <TaskListItem key={task.id} task={task} />
          ))}
        </ol>
      </div>
    );
  }
};

export default TaskListPart;
