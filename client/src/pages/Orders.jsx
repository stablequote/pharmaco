import React, { useState } from 'react';
import { Box, Button } from '@mantine/core';
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';
import { IconDownload } from '@tabler/icons-react';
import { mkConfig, generateCsv, download } from 'export-to-csv';
import OrderForm from '../components/OrderForm';

const orderColumns = [
  { accessorKey: 'orderId', header: 'Order ID', size: 100 },
  { accessorKey: 'supplier', header: 'Supplier', size: 150 },
  { accessorKey: 'orderDate', header: 'Order Date', size: 120 },
  { accessorKey: 'status', header: 'Status', size: 120 },
];

const csvConfig = mkConfig({
  fieldSeparator: ',',
  decimalSeparator: '.',
  useKeysAsHeaders: true,
});

const Orders = () => {
  const [ordersData, setOrdersData] = useState([
    { orderId: 'ORD001', supplier: 'Supplier A', orderDate: '2025-02-01', status: 'Pending' },
    { orderId: 'ORD002', supplier: 'Supplier B', orderDate: '2025-01-30', status: 'Shipped' },
  ]);
  const [opened, setOpened] = useState(false);

  const handleExportData = () => {
    const csv = generateCsv(csvConfig)(ordersData);
    download(csvConfig)(csv);
  };

  const handleAddOrder = (newOrder) => {
    setOrdersData((prevData) => [
      ...prevData,
      { ...newOrder, orderId: `ORD${(prevData.length + 1).toString().padStart(3, '0')}` },
    ]);
  };

  const table = useMantineReactTable({
    columns: orderColumns,
    data: ordersData,
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
          Create New Order
        </Button>
      </Box>
    ),
  });

  return (
    <Box>
      <MantineReactTable table={table} />
      <OrderForm opened={opened} setOpened={setOpened} handleAddOrder={handleAddOrder} suppliers={['Supplier A', 'Supplier B']} />
    </Box>
  );
};

export default Orders;