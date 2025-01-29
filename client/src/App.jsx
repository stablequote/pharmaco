import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayout from './components/DashboardLayout';
import Inventory from './pages/Inventory';
import Sales from './pages/Sales';
import Home from './pages/Home';
import './App.css'
import VerifiyTransaction from './pages/VerifyTransaction';
import PosPage from './pages/PosPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Home />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="pos" element={<PosPage />} />
          <Route path="verify" element={<VerifiyTransaction />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;