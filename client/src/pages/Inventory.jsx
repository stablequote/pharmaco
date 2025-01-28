import React, { useRef } from 'react';
import {Box, Button, Container, FileInput, Flex, StarIcon, Text, TextInput} from "@mantine/core"
import DataGrid from '../components/DataGrid';
import { IconFileImport, IconFileSearch, IconInputSearch } from '@tabler/icons-react';

const Inventory = () => {
  const openRef = useRef(null);

  return (
    <>
      <Container size="lg">
        {/* <Text fz="lg" fw="bold" align="center">Inventory Page</Text> */}
        <Box>
          <Text>Search Medication/Product</Text>
          <Flex justify="space-between"  height={415}>
            <Flex >
              <TextInput placeholder='enter product name/ID' sx={{width: 320}} height={415} mb={4} />
              <Button variant="filled" color='blue' sx={{borderRadius: 50}} ml={15}>
                <IconInputSearch color='white' size={25} />
              </Button>
            </Flex>
            {/* <Button variant="filled" color="green" onClick={() => openRef.current()}>Import from Excel</Button> */}
            <FileInput
              styles={(theme) => ({
                input: {
                  backgroundColor: "green", // Green background
                  "&:hover": {
                    backgroundColor: "#026602", // Slightly darker green on hover
                  },
                },
                placeholder: {

                  color: "white !important"
                },
                label: {
                  color: "white", // White label color
                },
                icon: {
                  color: "white"
                }
              })}
              placeholder="Import from Excel" 
              accept="xls, xlsx, csv" 
              color='blue' 
              variant="filled" 
              icon={<IconFileImport />}  
            />
          </Flex>
        </Box>
        <DataGrid />
      </Container>
    </>
  );
};

export default Inventory;