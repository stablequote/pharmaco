import { AppShell, Header, Flex, Button, Group, Stack, Footer, Box, Text, Drawer, Burger } from '@mantine/core';
import AppNavbar from './Navbar';
import { Outlet } from 'react-router-dom';
import { useDisclosure } from '@mantine/hooks';

function DashboardWrapper() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <AppShell
      padding="md"
      navbar={<AppNavbar />}
      header={
        <Header height={60} p="xs" sx={{backgroundColor: '#1D242E'}}>
          <Flex>
            <Burger color='white' mr="lg" onClick={open} />
          <Text color='white' fw="bold" fz="lg">Pharmacia</Text>
          </Flex>
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
        {/* <AppNavbar /> */}
    </AppShell>
  );
}

export default DashboardWrapper