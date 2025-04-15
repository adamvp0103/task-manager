import { FC } from 'react';
import { Task } from '../TaskContext';
import TaskListItem from './TaskListItem';

interface TaskListPartProps {
  label: string;
  tasks: Task[];
}

const TaskListPart: FC<TaskListPartProps> = ({ label, tasks }) => {
  if (tasks.length) {
    return (
      <div>
        <h3>{label}</h3>
        <ol>
          {tasks.map((task) => (
            <TaskListItem task={task} />
          ))}
        </ol>
      </div>
    );
  }
};

export default TaskListPart;
