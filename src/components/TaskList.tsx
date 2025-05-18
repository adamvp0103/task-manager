import { useEffect, useState } from 'react';
import { Task, useAppContext } from '../AppContext';
import {
  getLaterTasks,
  getOverdueTasks,
  getTodayTasks,
  getTomorrowTasks,
} from '../util/dates';
import TaskListPart from './TaskListPart';

export default function TaskList() {
  const { tasks, formVisible, showForm } = useAppContext();

  // Get tasks with a due date that has passed
  const [overdueTasks, setOverdueTasks] = useState<Task[]>(
    getOverdueTasks(tasks)
  );
  // Get tasks due between now and midnight tonight
  const [todayTasks, setTodayTasks] = useState<Task[]>(getTodayTasks(tasks));
  // Get tasks due tomorrow (including after midnight tonight)
  const [tomorrowTasks, setTomorrowTasks] = useState<Task[]>(
    getTomorrowTasks(tasks)
  );
  // Get tasks due any time after tomorrow
  const [laterTasks, setLaterTasks] = useState<Task[]>(getLaterTasks(tasks));

  // Executed when the tasks are altered in any way
  useEffect(() => {
    setOverdueTasks(getOverdueTasks(tasks));
    setTodayTasks(getTodayTasks(tasks));
    setTomorrowTasks(getTomorrowTasks(tasks));
    setLaterTasks(getLaterTasks(tasks));
  }, [tasks]);

  return (
    <div
      className={`desktop-main fill-width ${
        formVisible ? 'mobile-hidden' : ''
      }`}
    >
      <h2 className="page-heading">Your Tasks</h2>
      {tasks.length ? (
        <div>
          <TaskListPart label="Overdue" tasks={overdueTasks} />
          <TaskListPart label="Today" tasks={todayTasks} />
          <TaskListPart label="Tomorrow" tasks={tomorrowTasks} />
          <TaskListPart label="Later" tasks={laterTasks} />
        </div>
      ) : (
        <p className="translucent horizontally-centered-text italic">
          No tasks
        </p>
      )}
      <button
        className="mobile-only fixed-bottom-right button green-hoverable"
        onClick={showForm}
      >
        Add Task
      </button>
    </div>
  );
}
