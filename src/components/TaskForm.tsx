import { FormEvent, useContext, useState } from 'react';
import { Priorities, TaskContext, useTaskContext } from '../TaskContext';

export default function TaskForm() {
  const [taskInputValue, setTaskInputValue] = useState<string>('');
  const [dateInputValue, setDateInputValue] = useState<string>('');
  const [priorityInputValue, setPriorityInputValue] = useState<Priorities>(
    Priorities.Medium
  );

  const { addTask } = useTaskContext();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    addTask({
      task: taskInputValue,
      date: dateInputValue,
      priority: priorityInputValue,
    });

    setTaskInputValue('');
    setDateInputValue('');
    setPriorityInputValue(Priorities.Medium);
  };

  return (
    <div>
      <h2>Add Task</h2>
      <form onSubmit={(event) => handleSubmit(event)}>
        <label htmlFor="task-input">Task</label>
        <input
          id="task-input"
          type="text"
          value={taskInputValue}
          onChange={(event) => setTaskInputValue(event.target.value)}
          required
        />

        <label htmlFor="date-input">Date & Time</label>
        <input
          id="date-input"
          type="datetime-local"
          value={dateInputValue}
          onChange={(event) => setDateInputValue(event.target.value)}
          required
        />

        <p>Priority</p>
        <input
          id="high-priority-input"
          type="radio"
          name="priority"
          onChange={() => setPriorityInputValue(Priorities.High)}
          checked={priorityInputValue === Priorities.High}
        />
        <label htmlFor="high-priority-input">High</label>
        <input
          id="medium-priority-input"
          type="radio"
          name="priority"
          onChange={() => setPriorityInputValue(Priorities.Medium)}
          checked={priorityInputValue === Priorities.Medium}
        />
        <label htmlFor="medium-priority-input">Medium</label>
        <input
          id="low-priority-input"
          type="radio"
          name="priority"
          onChange={() => setPriorityInputValue(Priorities.Low)}
          checked={priorityInputValue === Priorities.Low}
        />
        <label htmlFor="low-priority-input">Low</label>

        <button type="submit">Add</button>
      </form>
    </div>
  );
}
