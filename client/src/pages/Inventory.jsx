import React, { useEffect, useRef, useState } from 'react';
import {Box, Button, Container, FileInput, Flex, Group, Modal, StarIcon, Text, TextInput, useMantineTheme} from "@mantine/core"
import DataGrid from '../components/DataGrid';
import { IconFileImport, IconFileSearch, IconInputSearch, IconPlus } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import ProductForm from '../components/ProductForm';
import axios from 'axios';
import * as XLSX from "xlsx";
import { showNotification } from '@mantine/notifications';
import moment from 'moment';

const Inventory = () => {

  const openRef = useRef(null);
  const [opened, { open, close }] = useDisclosure(false);
  const [inventoryData, setInventoryData] = useState([])
  const [excelData, setExcelData] = useState([]); // State to store the parsed data
  const theme = useMantineTheme();

  const columns = [
    {
      accessorKey: 'barcodeID',
      header: 'Barcode',
      size: 40,
    },
    {
      accessorKey: 'product',
      header: 'Product',
      size: 120,
    },
    {
      accessorKey: 'shelf',
      header: 'Shelf',
      size: 40,
    },
    {
      accessorKey: 'quantity',
      header: 'Quantity',
      size: 120,
      Cell: ({ cell }) => (
        <Box
          sx={(theme) => ({
            backgroundColor:
              cell.getValue() < 100 ? theme.colors.red[9] : theme.colors.white,
            borderRadius: '4px',
            color: cell.getValue() < 100 ? 'white' : theme.colors.blue,
            maxWidth: '9ch',
            padding: '4px',
          })}
        >
          {cell.getValue()?.toLocaleString?.('en-US', {
            currency: 'SDG',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          })}
        </Box>
      ),
    },
    {
      accessorKey: 'unit',
      header: 'Unit',
      size: 120,
    },
    {
      accessorKey: 'expiryDate',
      header: 'Expiry Date',
      size: 100,
      mantineEditTextInputProps: ({ cell }) => ({
        ...getCommonEditTextInputProps(cell),
      }),
      Cell: ({ cell }) => (
        // onclick( () => console.log(cell))
        <Box>
          {moment(cell.getValue()).format("DD-MMMM-YYYY")}
  
        </Box>
      ),
    },
    {
      accessorKey: 'unitPurchasePrice',
      header: 'Purchase Price',
      size: 100,
      Cell: ({ cell }) => (
        <Box
          sx={(theme) => ({
            borderRadius: '4px',
            maxWidth: '9ch',
            padding: '4px',
          })}
        >
          {cell.getValue()?.toLocaleString?.('en-US', {
            style: 'currency',
            currency: 'SDG',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          })}
        </Box>
      ),
    },
    {
      accessorKey: 'unitSalePrice',
      header: 'Sale Price',
      size: 100,
      Cell: ({ cell }) => (
        <Box
          sx={(theme) => ({
            borderRadius: '4px',
            maxWidth: '9ch',
            padding: '4px',
          })}
        >
          {cell.getValue()?.toLocaleString?.('en-US', {
            style: 'currency',
            currency: 'SDG',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          })}
        </Box>
      ),
    },
  ];

  const BASE_URL = import.meta.env.VITE_BASE_URL


  // const fetchInventoryData = async (url) => {
  //   const res = await axios.get(url)
  //   console.log(res)
  //   setInventoryData(res.data)
  // }

  const fetchInventoryData = async (url) => {
    try {
      const res = await axios.get(url);
      console.log(res);
      setInventoryData(res.data);
    } catch (error) {
      console.error('Error fetching inventory data:', error);
      setInventoryData([]); // Set to empty array in case of error
    }
  };

  // Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0]; // Get the uploaded file
    if (!file) return;

    const reader = new FileReader(); // Create a file reader

    // Read the file as a binary string
    reader.onload = (e) => {
      const binaryString = e.target.result;
      const workbook = XLSX.read(binaryString, { type: "binary" }); // Parse the Excel file
      const sheetName = workbook.SheetNames[0]; // Get the first sheet
      const sheet = workbook.Sheets[sheetName]; // Get the sheet data

      // Convert the sheet data to JSON
      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      // Extract headers (first row) and map them to the data
      const headers = jsonData[0]; // First row is the headers
      const rows = jsonData.slice(1); // Remaining rows are the data

      // Transform the data into an array of objects
      const mappedData = rows.map((row) => {
        const obj = {};
        headers.forEach((header, index) => {
          obj[header] = row[index]; // Map each header to its corresponding cell value
        });
        return obj;
      });

      console.log(mappedData)

      setExcelData(mappedData); // Update the state with the mapped data
      sendDataToBackend(mappedData)
    };

    reader.readAsBinaryString(file); // Read the file
  };

  // Function to send data to backend server
  const sendDataToBackend = async (data) => {
    // const url = "http://localhost:5005/inventory/import-from-excel";
    const url = `${process.env.BASE_URL}/inventory/import-from-excel`

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to send data to the server');
      }

      const result = await response.json();
      console.log('Server response:', result);
      showNotification({
        title: "Successful import!",
        message: "Congrats! You have successfully imported all products",
        color: "green",
      })
    } catch (err) {
      console.error('Error:', err);
      showNotification({
        title: "Error importing products",
        message: "An error occured while importing product. Please Try again",
        color: "red",
      })
    }
  };

  useEffect(() => {
    // const url = "http://localhost:5005/inventory/list-all";
    const url = `${BASE_URL}/inventory/list-all`
    fetchInventoryData(url)
    console.log(url) // "123"

  }, [])

  return (
    <>
      <Container size="lg">
        {/* <Text fz="lg" fw="bold" align="center">Inventory Page</Text> */}
        <Box>
          {/* <Text mb="md" fz="lg" fw="bold">Search Medication/Product</Text> */}
          <Flex justify="space-between" pt="lg" height={415} mb="xs" >
              <Button 
                variant="filled" 
                color='blue' 
                leftIcon={<IconPlus size={18} />} 
                // ml={15}
                onClick={open}
              >
                Add
              </Button>
            {/* <Flex >
              <TextInput placeholder='enter product name/ID' sx={{width: 320}} height={415} mb={4} />
            </Flex> */}
            
            
            {/* File input for Excel upload */}
            <Group position="center" >
              <input
                type="file"
                accept="text/csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                onChange={handleFileUpload}
                style={{ display: "none" }}
                id="file-upload"
              />
              <label htmlFor="file-upload">
                <Button
                  component="span" 
                  sx={{
                    backgroundColor: theme.colors.green[9], // Default green color
                    "&:hover": {
                      backgroundColor: theme.colors.green[7], // Slightly lighter green on hover
                    },
                    }} 
                    leftIcon={<IconFileImport />}
                    >Upload Excel File
                </Button>
              </label>
            </Group>
          </Flex>
        </Box>
        <Modal size={800} opened={opened} centered withCloseButton={false}>
          <ProductForm close={close} />
        </Modal>
        {/* <DataGrid inventoryData={inventoryData} /> */}
        {/* {inventoryData.length > 0 ? <DataGrid inventoryData={inventoryData} /> : <p>Loading inventory data...</p>} */}
        <DataGrid data={inventoryData} columns={columns} />
      </Container>
    </>
  );
};

export default Inventory;