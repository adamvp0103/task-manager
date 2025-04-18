import { Priorities, Task } from '../AppContext';

const priorityToValue = (priority: Priorities) => {
  switch (priority) {
    case Priorities.High:
      return 1;
    case Priorities.Medium:
      return 0;
    case Priorities.Low:
      return -1;
    default:
      return 0;
  }
};

export const sortByDate = (tasks: Task[]) => {
  return tasks.sort((task1, task2) => {
    if (task1.date === task2.date && task1.priority !== task2.priority) {
      return priorityToValue(task2.priority) - priorityToValue(task1.priority);
    } else {
      return new Date(task1.date).getTime() - new Date(task2.date).getTime();
    }
  });
};
