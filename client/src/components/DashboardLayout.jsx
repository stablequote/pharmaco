import { AppShell, Header, Flex, Button, Group, Stack, Footer, Box, Text, Drawer, Burger } from '@mantine/core';
import AppNavbar from './Navbar';
import { Outlet } from 'react-router-dom';
import { useDisclosure } from '@mantine/hooks';
import DashboardHeader from './DashboardHeader';

function DashboardWrapper() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <AppShell
      padding="md"
      navbar={<AppNavbar />}
      header={<DashboardHeader />}
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
        {/* <AppNavbar /> */}
    </AppShell>
  );
}

export default DashboardWrapper