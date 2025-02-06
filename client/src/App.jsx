import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayout from './components/DashboardLayout';
import Inventory from './pages/Inventory';
import Sales from './pages/Sales';
import Home from './pages/Home';
import './App.css'
import VerifiyTransaction from './pages/VerifyTransaction';
import PosPage from './pages/PosPage';
import Analytics from './pages/Analytics';
import Orders from './pages/Orders';
import Suppliers from './pages/Suppliers';
import ProductSales from './pages/ProductSales';
import Login from './pages/Login';
import PrivateRoute from './pages/ProtectedRoute';

const App = () => {
  return (
    <Router>
      <Routes>
          {/* <Route index  element={<Login />} /> */}
          <Route element={<PrivateRoute allowedRoles={['owner', 'manager']} />}>
            <Route path="/" element={<DashboardLayout />}>
              <Route path="home" element={<Home />} />
              <Route path="inventory" element={<Inventory />} />
              <Route path="pos" element={<PosPage />} />
              <Route path="verify" element={<VerifiyTransaction />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="orders" element={<Orders />} />
              <Route path="suppliers" element={<Suppliers />} />
              <Route path="sales" element={<ProductSales />} />
            </Route>
          </Route>
        {/* Default Route */}
        <Route path='/login' element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;