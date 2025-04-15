import React, { FC, ReactNode, useContext, useEffect, useState } from 'react';

export enum Priorities {
  High = 'high',
  Medium = 'medium',
  Low = 'low',
}

interface TaskContextType {
  tasks: Task[];
  editId: string;
  setEditId: (id: string) => void;
  addTask: (task: SubmittedTask) => void;
  editTask: (task: SubmittedTask) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
}

interface ProviderProps {
  children: ReactNode;
}

export interface Task {
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

export const TaskContext = React.createContext<TaskContextType | undefined>(
  undefined
);

export const TaskProvider: FC<ProviderProps> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>(
    JSON.parse(localStorage.getItem('tasks') ?? '[]')
  );
  const [editId, setEditId] = useState<string>('');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task: SubmittedTask) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      ...task,
      completed: false,
    };

    setTasks([...tasks, newTask]);
  };

  const editTask = (task: SubmittedTask) => {
    setTasks(tasks.map((t) => (t.id === editId ? { ...t, ...task } : t)));
  };

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const providerValue: TaskContextType = {
    tasks,
    editId,
    setEditId,
    addTask,
    editTask,
    toggleTask,
    deleteTask,
  };

  return (
    <TaskContext.Provider value={providerValue}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};
