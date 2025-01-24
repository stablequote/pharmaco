import React from 'react';
import {Box, Container, Flex, StarIcon, Text, TextInput} from "@mantine/core"
import DataGrid from '../components/DataGrid';

const Inventory = () => {
  return (
    <>
      <Container size="lg">
        <Text fz="lg" fw="bold" align="center">Inventory Page</Text>
        <Box>
          <Text>Search</Text>
          <Flex justify="flex-start" width={40} height={415}>
            <TextInput placeholder='search here' width={40} height={415} />
            <Box sx={{borderRadius: 50}}>
              <Text>Q</Text>
            </Box>
          </Flex>
        </Box>
        <DataGrid />
      </Container>
    </>
  );
};

export default Inventory;