import { AppShell, Header, Flex, Button, Group, Stack, Footer, Box, Text } from '@mantine/core';
import AppNavbar from './Navbar';
import { Outlet } from 'react-router-dom';

function DashboardWrapper() {
  return (
    <AppShell
      padding="md"
      navbar={<AppNavbar />}
      header={
        <Header height={60} p="xs">
          <Text>Pharmacy Management System</Text>
        </Header>
      }
      // footer={
      //   <Box height={60} p="xs">
      //     <Text align="center">© 2025 Pharmacy Inc.</Text>
      //   </Box>
      // }
      styles={(theme) => ({
        main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
      })}
    >
      {/* Your application here */}
      <Outlet />
    </AppShell>
  );
}

export default DashboardWrapper