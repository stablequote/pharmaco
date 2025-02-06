import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Divider, Navbar } from '@mantine/core';
import { IconHome } from '@tabler/icons-react';
import { useMediaQuery } from '@mantine/hooks';
import { useAuth } from '../context/AuthContext'

const AppNavbar = () => {

  const activeStyle = {
    backgroundColor: '#009099', // Light background for the active link
    fontWeight: 'bold',        // Highlight the text
    borderRadius: '4px',       // Rounded edges for better UI
  };

  const isMobile = useMediaQuery('(max-width: 375px)');

  const { logout } = useAuth()

  return (
    <Navbar width={ !isMobile ? { base: 250 } : 100} p="xs" sx={{background: '#1D242E'}}>
      <NavLink
        to="/home"
        style={({ isActive }) => (isActive ? activeStyle : undefined)}
      >
        <IconHome />
        Home
      </NavLink>
      <NavLink
        to="/pos"
        style={({ isActive }) => (isActive ? activeStyle : undefined)}
      >
        POS
      </NavLink>
      <NavLink
        to="/inventory"
        style={({ isActive }) => (isActive ? activeStyle : undefined)}
      >
        Inventory
      </NavLink>
      <NavLink
        to="/verify"
        style={({ isActive }) => (isActive ? activeStyle : undefined)}
      >
        Verify Transaction
      </NavLink>
      <Divider size={1} my={10} />
      <NavLink
        to="/orders"
        style={({ isActive }) => (isActive ? activeStyle : undefined)}
      >
        Orders
      </NavLink>
      <NavLink
        to="/suppliers"
        style={({ isActive }) => (isActive ? activeStyle : undefined)}
      >
        Suppliers
      </NavLink>
      {/* <Divider size={1} my={10} /> */}
      <NavLink
        to="/sales"
        style={({ isActive }) => (isActive ? activeStyle : undefined)}
      >
        Sales
      </NavLink>
      <NavLink
        to="/analytics"
        style={({ isActive }) => (isActive ? activeStyle : undefined)}
      >
        Analytics
      </NavLink>
      <Divider size={1} my={10} />
      <NavLink
        to="/profile"
        style={({ isActive }) => (isActive ? activeStyle : undefined)}
      >
        Profile
      </NavLink>
      <Button color='red' mt="lg" onClick={logout}>Logout</Button>
    </Navbar>
  );
};

export default AppNavbar;
