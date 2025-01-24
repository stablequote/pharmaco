import { Text, Container, Flex, Box, Button } from '@mantine/core';
import React from 'react';

const Home = () => {
  return (
    <Container size="md">
      <Text fw="bold" fz="xl" mb="md">Quick Access</Text>
        <Flex justify="space-between" sx={{width: 320}}>
          <Box>
            <Button>POS</Button>
          </Box>
          <Box>
            <Button>Inventory</Button>
          </Box>
          <Box>
            <Button>Sales</Button>
          </Box>
        </Flex>
    </Container>
  );
};

export default Home;