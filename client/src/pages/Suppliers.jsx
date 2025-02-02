import React, { useState } from 'react';
import { Box, Button, Flex } from '@mantine/core';
import SupplierForm from '../components/SupplierForm';
import DataGrid from '../components/DataGrid';
import { IconAccessible } from '@tabler/icons-react';

const Suppliers = () => {
  const supplierColumns = [
    { accessorKey: 'supplierName', header: 'Supplier Name', size: 150 },
    { accessorKey: 'contact', header: 'Contact', size: 120 },
    { accessorKey: 'productCount', header: 'Products Supplied', size: 120 },
    { accessorKey: 'orderCount', header: 'Orders Placed', size: 120 },
  ];
  const data = [
    { supplierName: 'Supplier A', contact: '123-456-7890', productCount: 20, orderCount: 5 },
    { supplierName: 'Supplier B', contact: '987-654-3210', productCount: 15, orderCount: 3 },
  ]

  const [suppliersData, setSuppliersData] = useState(data);
  const [opened, setOpened] = useState(false);

  const handleAddSupplier = (newSupplier) => {
    setSuppliersData((prevData) => [
      ...prevData,
      { ...newSupplier, productCount: 130, orderCount: 23 },
    ]);
  };

  return (
    <Box>
      <Flex mb="xs" justify="flex-end">
        <Button variant='filled' color="yellow" leftIcon={<IconAccessible />} onClick={() => setOpened(!opened)} >Add Supplier</Button>
      </Flex>
      <DataGrid data={suppliersData} columns={supplierColumns} />
      <SupplierForm opened={opened} setOpened={setOpened} handleAddSupplier={handleAddSupplier} />
    </Box>
  );
};

export default Suppliers;