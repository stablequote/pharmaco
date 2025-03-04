import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Divider, Navbar } from '@mantine/core';
import { IconHome } from '@tabler/icons-react';
import { useMediaQuery } from '@mantine/hooks';
import { useAuth } from '../context/AuthContext'
import { useTranslation } from 'react-i18next';

const AppNavbar = () => {

  const activeStyle = {
    backgroundColor: '#009099', // Light background for the active link
    fontWeight: 'bold',        // Highlight the text
    borderRadius: '4px',       // Rounded edges for better UI
  };

  const isMobile = useMediaQuery('(max-width: 375px)');

  const { logout } = useAuth()
  const { t } = useTranslation()

  return (
    <Navbar width={ !isMobile ? { base: 250 } : 100} p="xs" sx={{background: '#1D242E'}}>
      <NavLink
        to="/home"
        style={({ isActive }) => (isActive ? activeStyle : undefined)}
      >
        {/* <IconHome /> */}
        {t("Home")}
      </NavLink>
      <NavLink
        to="/pos"
        style={({ isActive }) => (isActive ? activeStyle : undefined)}
      >
        {t("POS")}
      </NavLink>
      <NavLink
        to="/inventory"
        style={({ isActive }) => (isActive ? activeStyle : undefined)}
      >
        {t("INVENTORY")}
      </NavLink>
      {/* <NavLink
        to="/verify"
        style={({ isActive }) => (isActive ? activeStyle : undefined)}
      >
        Verify Transaction
      </NavLink> */}
      <Divider size={1} my={10} />
      <NavLink
        to="/orders"
        style={({ isActive }) => (isActive ? activeStyle : undefined)}
      >
        {t("ORDERS")}
      </NavLink>
      <NavLink
        to="/suppliers"
        style={({ isActive }) => (isActive ? activeStyle : undefined)}
      >
        {t("SUPPLIERS")}
      </NavLink>
      {/* <Divider size={1} my={10} /> */}
      <NavLink
        to="/sales"
        style={({ isActive }) => (isActive ? activeStyle : undefined)}
      >
        {t("SALES")}
      </NavLink>
      <NavLink
        to="/analytics"
        style={({ isActive }) => (isActive ? activeStyle : undefined)}
      >
        {t("ANALYTICS")}
      </NavLink>
      <Divider size={1} my={10} />
      <NavLink
        to="/profile"
        style={({ isActive }) => (isActive ? activeStyle : undefined)}
      >
        {t("PROFILE")}
      </NavLink>
      <Button color='red' mt="lg" onClick={logout} sx={{position: "absolute", bottom: 22, left: 10, width: "90%"}}>{t("LOGOUT")}</Button>
    </Navbar>
  );
};

export default AppNavbar;
