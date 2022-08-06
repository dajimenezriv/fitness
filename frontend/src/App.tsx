// logic

// gui
import { ToastContainer } from 'react-toastify';

// components
import Navbar from './components/general/Navbar';
import Table from './components/foods/table/Table';

// styles
import './App.css';

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Navbar />
      <Table />
    </div>
  );
}

export default App;
