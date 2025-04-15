import './App.css';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { TaskProvider } from './TaskContext';

function App() {
  return (
    <TaskProvider>
      <div className="container">
        <TaskList />
        <TaskForm />
      </div>
    </TaskProvider>
  );
}

export default App;
