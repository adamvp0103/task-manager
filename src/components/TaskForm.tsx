import { FormEvent, useEffect, useState } from 'react';
import { Priorities, useAppContext } from '../AppContext';

export default function TaskForm() {
  const { tasks, editId, setEditId, addTask, editTask, formVisible, hideForm } =
    useAppContext();

  const [taskInputValue, setTaskInputValue] = useState<string>('');
  const [dateInputValue, setDateInputValue] = useState<string>('');
  const [priorityInputValue, setPriorityInputValue] = useState<Priorities>(
    Priorities.Medium
  );

  // Executed when the user enters or exits edit mode
  useEffect(() => {
    // If entering edit mode
    if (editId) {
      // Find the task to edit
      const task = tasks.find((t) => t.id === editId);

      // Populate the form with its current values
      setTaskInputValue(task?.task ?? '');
      setDateInputValue(task?.date ?? '');
      setPriorityInputValue(task?.priority ?? Priorities.Medium);
    }
    // If exiting edit mode
    else {
      setTaskInputValue('');
      setDateInputValue('');
      setPriorityInputValue(Priorities.Medium);
    }
  }, [editId]);

  // If editing is canceled (no changes applied)
  const handleCancel = () => {
    if (editId) {
      setEditId('');
    }
    hideForm();
  };

  // Handle the addition of a new task or the application of changes to an existing task (via edit)
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    // If applying changes to an existing task
    if (editId) {
      editTask({
        task: taskInputValue,
        date: dateInputValue,
        priority: priorityInputValue,
      });
      setEditId(''); // Exit edit mode
    }
    // If adding a new task
    else {
      addTask({
        task: taskInputValue,
        date: dateInputValue,
        priority: priorityInputValue,
      });
    }

    // Reset form
    setTaskInputValue('');
    setDateInputValue('');
    setPriorityInputValue(Priorities.Medium);

    hideForm();
  };

  return (
    <div
      className={`desktop-aside fill-width ${
        formVisible ? '' : 'mobile-hidden'
      }`}
    >
      <h2 className="page-heading">{editId ? 'Edit' : 'Add'} Task</h2>
      <form onSubmit={(event) => handleSubmit(event)}>
        <div className="card stack-vertically small-gap">
          <label className="block" htmlFor="task-input">
            Task
          </label>
          <input
            id="task-input"
            className="input"
            type="text"
            value={taskInputValue}
            onChange={(event) => setTaskInputValue(event.target.value)}
            required
          />
        </div>

        <div className="card stack-vertically small-gap">
          <label className="block" htmlFor="date-input">
            Date & Time
          </label>
          <input
            id="date-input"
            className="input"
            type="datetime-local"
            value={dateInputValue}
            onChange={(event) => setDateInputValue(event.target.value)}
            required
          />
        </div>

        <div className="card stack-vertically small-gap">
          <p>Priority</p>
          <div className="input stack-vertically small-gap">
            <div className="radio-option">
              <input
                id="high-priority-input"
                className="fully-center"
                type="radio"
                name="priority"
                onChange={() => setPriorityInputValue(Priorities.High)}
                checked={priorityInputValue === Priorities.High}
              />
              <label htmlFor="high-priority-input">High</label>
            </div>
            <div className="radio-option">
              <input
                id="medium-priority-input"
                type="radio"
                name="priority"
                onChange={() => setPriorityInputValue(Priorities.Medium)}
                checked={priorityInputValue === Priorities.Medium}
              />
              <label htmlFor="medium-priority-input">Medium</label>
            </div>
            <div className="radio-option">
              <input
                id="low-priority-input"
                type="radio"
                name="priority"
                onChange={() => setPriorityInputValue(Priorities.Low)}
                checked={priorityInputValue === Priorities.Low}
              />
              <label htmlFor="low-priority-input">Low</label>
            </div>
          </div>
        </div>

        <div className="space-evenly">
          <button className="button red-hoverable" onClick={handleCancel}>
            Cancel
          </button>
          <button className="button green-hoverable" type="submit">
            {editId ? 'Apply' : 'Add'}
          </button>
        </div>
      </form>
    </div>
  );
}
