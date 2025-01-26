import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar } from '@mantine/core';

const AppNavbar = () => {
  const activeStyle = {
    backgroundColor: '#009099', // Light background for the active link
    fontWeight: 'bold',        // Highlight the text
    borderRadius: '4px',       // Rounded edges for better UI
  };

  return (
    <Navbar width={{ base: 250 }} p="xs" sx={{background: '#1D242E'}}>
      <NavLink
        to="/"
        style={({ isActive }) => (isActive ? activeStyle : undefined )}
      >
        Home
      </NavLink>
      <NavLink
        to="/inventory"
        style={({ isActive }) => (isActive ? activeStyle : undefined)}
      >
        Inventory
      </NavLink>
      <NavLink
        to="/sales"
        style={({ isActive }) => (isActive ? activeStyle : undefined)}
      >
        Sales
      </NavLink>
      <NavLink
        to="/verify"
        style={({ isActive }) => (isActive ? activeStyle : undefined)}
      >
        Verify Transaction
      </NavLink>
    </Navbar>
  );
};

export default AppNavbar;
