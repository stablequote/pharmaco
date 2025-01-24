import React from 'react';
import {Box, Button, Container, Flex, StarIcon, Text, TextInput} from "@mantine/core"
import DataGrid from '../components/DataGrid';
import { IconFileSearch, IconInputSearch } from '@tabler/icons-react';

const Inventory = () => {
  return (
    <>
      <Container size="lg">
        {/* <Text fz="lg" fw="bold" align="center">Inventory Page</Text> */}
        <Box>
          <Text>Search Medication/Product</Text>
          <Flex justify="flex-start" sx={{width: 350}} height={415}>
            <TextInput placeholder='enter product name/ID' sx={{width: 320}} height={415} mb={4} />
            <Button variant="filled" color='blue' sx={{borderRadius: 50}} ml={15}>
              <IconInputSearch color='white' size={25} />
            </Button>
          </Flex>
        </Box>
        <DataGrid />
      </Container>
    </>
  );
};

export default Inventory;