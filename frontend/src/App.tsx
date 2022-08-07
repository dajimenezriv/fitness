// logic
import {
  BrowserRouter as Router, Navigate, Route, Routes,
} from 'react-router-dom';

// gui
import { ToastContainer } from 'react-toastify';

// components
import Navbar from 'components/general/Navbar';
import Foods from 'components/foods/Foods';
import Menus from 'components/menus/Menus';
import MenuDetail from 'components/menu_details/MenuDetails';

// styles
import './App.css';

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/foods" element={<Foods />} />
          <Route path="/menus" element={<Menus />} />
          <Route path="/menus/:id" element={<MenuDetail />} />
          <Route path="*" element={<Navigate to="/foods" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
