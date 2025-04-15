import { useEffect, useState } from 'react';
import { Task, useTaskContext } from '../TaskContext';
import {
  getLaterTasks,
  getOverdueTasks,
  getTodayTasks,
  getTomorrowTasks,
} from '../util/dates';
import TaskListPart from './TaskListPart';

export default function TaskList() {
  const { tasks } = useTaskContext();

  const [overdueTasks, setOverdueTasks] = useState<Task[]>(
    getOverdueTasks(tasks)
  );

  const [todayTasks, setTodayTasks] = useState<Task[]>(getTodayTasks(tasks));
  const [tomorrowTasks, setTomorrowTasks] = useState<Task[]>(
    getTomorrowTasks(tasks)
  );
  const [laterTasks, setLaterTasks] = useState<Task[]>(getLaterTasks(tasks));

  useEffect(() => {
    setOverdueTasks(getOverdueTasks(tasks));
    setTodayTasks(getTodayTasks(tasks));
    setTomorrowTasks(getTomorrowTasks(tasks));
    setLaterTasks(getLaterTasks(tasks));
  }, [tasks]);

  return (
    <div>
      <h2>Your Tasks</h2>
      {tasks.length ? (
        // <ul>
        //   {tasks.map((task) => (
        //     <TaskListItem task={task} />
        //   ))}
        // </ul>
        <div>
          <TaskListPart label="Overdue" tasks={overdueTasks} />
          <TaskListPart label="Today" tasks={todayTasks} />
          <TaskListPart label="Tomorrow" tasks={tomorrowTasks} />
          <TaskListPart label="Later" tasks={laterTasks} />
        </div>
      ) : (
        <p>No tasks</p>
      )}
    </div>
  );
}
