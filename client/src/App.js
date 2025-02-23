import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import Register from './pages/register';
import Login from './pages/login';
import Token from './components/token';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Token element={<Dashboard />} allowedRoles={['user', 'admin']} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/unauthorized" element={<h1>Unauthorized - Access Denied</h1>} />
      </Routes>
    </Router>
  );
};

export default App;
