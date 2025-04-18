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

  useEffect(() => {
    if (editId) {
      // Get task being edited
      const task = tasks.find((t) => t.id === editId);

      // Populate fields with its values
      setTaskInputValue(task?.task ?? '');
      setDateInputValue(task?.date ?? '');
      setPriorityInputValue(task?.priority ?? Priorities.Medium);
    } else {
      // If edit is canceled
      setTaskInputValue('');
      setDateInputValue('');
      setPriorityInputValue(Priorities.Medium);
    }
  }, [editId]);

  const handleCancel = () => {
    if (editId) {
      setEditId('');
    }
    hideForm();
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (editId) {
      editTask({
        task: taskInputValue,
        date: dateInputValue,
        priority: priorityInputValue,
      });
      setEditId('');
    } else {
      addTask({
        task: taskInputValue,
        date: dateInputValue,
        priority: priorityInputValue,
      });
    }

    setTaskInputValue('');
    setDateInputValue('');
    setPriorityInputValue(Priorities.Medium);

    hideForm();
  };

  return (
    <div className={`fill-width ${formVisible ? '' : 'mobile-hidden'}`}>
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
