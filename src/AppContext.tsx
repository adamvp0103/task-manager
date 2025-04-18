import React, { FC, ReactNode, useContext, useEffect, useState } from 'react';

export enum Priorities {
  High = 'high',
  Medium = 'medium',
  Low = 'low',
}

interface ContextType {
  tasks: Task[];
  editId: string;
  setEditId: (id: string) => void;
  addTask: (task: SubmittedTask) => void;
  editTask: (task: SubmittedTask) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  formVisible: boolean;
  showForm: () => void;
  hideForm: () => void;
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

export const AppContext = React.createContext<ContextType | undefined>(
  undefined
);

export const AppProvider: FC<ProviderProps> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>(
    JSON.parse(localStorage.getItem('tasks') ?? '[]')
  );
  const [editId, setEditId] = useState<string>('');
  const [formVisible, setFormVisible] = useState<boolean>(false);

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

  const showForm = () => {
    setFormVisible(true);
  };

  const hideForm = () => {
    setFormVisible(false);
  };

  const providerValue: ContextType = {
    tasks,
    editId,
    setEditId,
    addTask,
    editTask,
    toggleTask,
    deleteTask,
    formVisible,
    showForm,
    hideForm,
  };

  return (
    <AppContext.Provider value={providerValue}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within a AppProvider');
  }
  return context;
};
