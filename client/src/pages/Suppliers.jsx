import React, { useState } from 'react';
import { Box, Button } from '@mantine/core';
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';
import { IconDownload } from '@tabler/icons-react';
import { mkConfig, generateCsv, download } from 'export-to-csv';
import SupplierForm from '../components/SupplierForm';

const columns = [
  { accessorKey: 'supplierName', header: 'Supplier Name', size: 150 },
  { accessorKey: 'contact', header: 'Contact', size: 120 },
  { accessorKey: 'productCount', header: 'Products Supplied', size: 120 },
  { accessorKey: 'orderCount', header: 'Orders Placed', size: 120 },
];

const csvConfig = mkConfig({
  fieldSeparator: ',',
  decimalSeparator: '.',
  useKeysAsHeaders: true,
});

const Suppliers = () => {
  const [inventoryData, setInventoryData] = useState([
    { supplierName: 'Supplier A', contact: '123-456-7890', productCount: 20, orderCount: 5 },
    { supplierName: 'Supplier B', contact: '987-654-3210', productCount: 15, orderCount: 3 },
  ]);
  const [opened, setOpened] = useState(false);

  const handleExportData = () => {
    const csv = generateCsv(csvConfig)(inventoryData);
    download(csvConfig)(csv);
  };

  const handleAddSupplier = (newSupplier) => {
    setInventoryData((prevData) => [
      ...prevData,
      { ...newSupplier, productCount: 0, orderCount: 0 },
    ]);
  };

  const table = useMantineReactTable({
    columns,
    data: inventoryData,
    enableRowSelection: true,
    columnFilterDisplayMode: 'popover',
    paginationDisplayMode: 'pages',
    initialState: { pagination: { pageSize: 5 }, density: 'xs' },
    renderTopToolbarCustomActions: () => (
      <Box sx={{ display: 'flex', gap: '16px', padding: '8px' }}>
        <Button color="lightblue" onClick={handleExportData} leftIcon={<IconDownload />} variant="filled">
          Export All Data
        </Button>
        <Button onClick={() => setOpened(true)} variant="filled">
          Add New Supplier
        </Button>
      </Box>
    ),
  });

  return (
    <Box>
      <MantineReactTable table={table} />
      <SupplierForm opened={opened} setOpened={setOpened} handleAddSupplier={handleAddSupplier} />
    </Box>
  );
};

export default Suppliers;