import { Task } from '../TaskContext';

// Method for retrieving tasks with deadlines that have passed
export const getOverdueTasks = (tasks: Task[]) => {
  const now = new Date().getTime();
  return tasks.filter((task) => new Date(task.date).getTime() < now);
};

// Method for retrieving tasks with deadlines that are today but haven't passed yet
export const getTodayTasks = (tasks: Task[]) => {
  const now = new Date();
  const midnightTonight = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1
  ).getTime();

  return tasks.filter((task) => {
    const deadline = new Date(task.date).getTime();
    return deadline >= now.getTime() && deadline < midnightTonight;
  });
};

// Method for retrieving tasks with deadlines that are tomorrow
export const getTomorrowTasks = (tasks: Task[]) => {
  const now = new Date();

  const midnightTonight = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1
  ).getTime();

  const midnightTomorrow = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 2
  ).getTime();

  return tasks.filter((task) => {
    const deadline = new Date(task.date).getTime();
    return deadline >= midnightTonight && deadline < midnightTomorrow;
  });
};

// Method for retrieving tasks with deadlines that are after tomorrow
export const getLaterTasks = (tasks: Task[]) => {
  const now = new Date();
  const midnightTomorrow = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 2
  ).getTime();

  return tasks.filter((task) => {
    return new Date(task.date).getTime() >= midnightTomorrow;
  });
};
