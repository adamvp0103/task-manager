import React, { FC, ReactNode, useState } from 'react';

enum Priorities {
  High = 'high',
  Medium = 'medium',
  Low = 'low',
}

interface ProviderProps {
  children: ReactNode;
}

interface Task {
  id: string;
  task: string;
  date: string;
  priority: Priorities;
  completed: boolean;
}

interface SubmittedTask {
  task: string;
  date: string;
  priority: Priorities;
}

export const TaskContext = React.createContext({});

export const TaskProvider: FC<ProviderProps> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (task: SubmittedTask) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      ...task,
      completed: false,
    };

    setTasks([...tasks, newTask]);
  };

  const editTask = (id: string, task: SubmittedTask) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, ...task } : t)));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const providerValue = { tasks, addTask, editTask, deleteTask };

  return (
    <TaskContext.Provider value={providerValue}>
      {children}
    </TaskContext.Provider>
  );
};
