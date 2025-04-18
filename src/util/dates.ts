import { Task } from '../AppContext';

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

export const getDisplayDate = (dateString: string) => {
  const date = new Date(dateString);

  const datePart = date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const timePart = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  });

  return `${datePart} \u2013 ${timePart}`;
};
