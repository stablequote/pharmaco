import React, { useRef } from 'react';
import {Box, Button, Container, FileInput, Flex, Modal, StarIcon, Text, TextInput} from "@mantine/core"
import DataGrid from '../components/DataGrid';
import { IconFileImport, IconFileSearch, IconInputSearch, IconPlus } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import ProductForm from '../components/ProductForm';

const Inventory = () => {
  const openRef = useRef(null);
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Container size="lg">
        {/* <Text fz="lg" fw="bold" align="center">Inventory Page</Text> */}
        <Box>
          <Text>Search Medication/Product</Text>
          <Flex justify="space-between"  height={415}>
            <Flex >
              <TextInput placeholder='enter product name/ID' sx={{width: 320}} height={415} mb={4} />
              <Button 
                variant="filled" 
                color='blue' 
                leftIcon={<IconPlus size={18} />} 
                ml={15}
                onClick={open}
              >
                Add
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
              accept="text/csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" 
              color='blue' 
              variant="filled" 
              icon={<IconFileImport />}  
            />
          </Flex>
        </Box>
        <Modal size={800} opened={opened} centered withCloseButton={false}>
          <ProductForm close={close} />
        </Modal>
        <DataGrid />
      </Container>
    </>
  );
};

export default Inventory;