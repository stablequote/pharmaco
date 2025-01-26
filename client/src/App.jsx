import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayout from './components/DashboardLayout';
import Inventory from './pages/Inventory';
import Sales from './pages/Sales';
import Home from './pages/Home';
import './App.css'
import VerifiyTransaction from './pages/VerifyTransaction';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Home />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="sales" element={<Sales />} />
          <Route path="verify" element={<VerifiyTransaction />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;