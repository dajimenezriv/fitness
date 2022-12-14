// logic
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';

// gui
import { ToastContainer } from 'react-toastify';

// components
import Navbar from 'components/general/Navbar';
import Login from 'components/user/Login';
import Register from 'components/user/Register';
import Profile from 'components/user/Profile';
import Foods from 'components/foods/Foods';
import Menus from 'components/menus/Menus';
import MenuDetails from 'components/menu_details/MenuDetails';

// styles
import './App.css';

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/foods" element={<Foods />} />
          <Route path="/menus" element={<Menus />} />
          <Route path="/menus/:id" element={<MenuDetails />} />
          <Route path="*" element={<Navigate to="/foods" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
