import { FC } from 'react';
import { Task } from '../AppContext';
import TaskListItem from './TaskListItem';
import { sortByDate } from '../util/sort';

interface TaskListPartProps {
  label: string;
  tasks: Task[];
}

const TaskListPart: FC<TaskListPartProps> = ({ label, tasks }) => {
  if (tasks.length) {
    return (
      <div>
        <h3 className="section-heading">{label}</h3>
        <ol>
          {sortByDate(tasks).map((task) => (
            <TaskListItem key={task.id} task={task} />
          ))}
        </ol>
      </div>
    );
  }
};

export default TaskListPart;
