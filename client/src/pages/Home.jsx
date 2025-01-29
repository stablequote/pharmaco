import { Text, Container, Flex, Box, Button, Anchor,  } from '@mantine/core';
import React from 'react';
import { NavLink } from 'react-router-dom';
import Sales from './Sales';

const Home = () => {
  return (
    <Container size="md">
      <Text fw="bold" fz="xl" mb="md">Quick Access</Text>
        <Flex justify="space-between" sx={{width: 320}}>
          <Box>
            <Button component={NavLink} to="/pos">POS</Button>
          </Box>
          <Box>
            <Button component={NavLink} to="/inventory">Inventory</Button>
          </Box>
          <Box>
            <Button component={NavLink} to="/verify">Verify</Button>
          </Box>
        </Flex>
    </Container>
  );
};

export default Home;