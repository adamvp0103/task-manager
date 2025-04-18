import './App.scss';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { AppProvider } from './AppContext';

function App() {
  return (
    <AppProvider>
      <div className="container">
        <TaskList />
        <TaskForm />
      </div>
    </AppProvider>
  );
}

export default App;
