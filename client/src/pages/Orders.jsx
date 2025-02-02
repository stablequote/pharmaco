import React, { useState } from 'react';
import { Box, Button } from '@mantine/core';
import OrderForm from '../components/OrderForm';
import DataGrid from '../components/DataGrid';

const Orders = () => {
  const orderColumns = [
    { accessorKey: 'orderId', header: 'Order ID', size: 100 },
    { accessorKey: 'supplier', header: 'Supplier', size: 150 },
    { accessorKey: 'orderDate', header: 'Order Date', size: 120 },
    { accessorKey: 'status', header: 'Status', size: 120 },
  ];
  
  const data = [
    { orderId: 'ORD001', supplier: 'Supplier A', orderDate: '2025-02-01', status: 'Pending' },
    { orderId: 'ORD002', supplier: 'Supplier B', orderDate: '2025-01-30', status: 'Shipped' },
  ]
  const [ordersData, setOrdersData] = useState(data);
  const [opened, setOpened] = useState(false);

  const handleAddOrder = (newOrder) => {
    setOrdersData((prevData) => [
      ...prevData,
      { ...newOrder, orderId: `ORD${(prevData.length + 1).toString().padStart(3, '0')}` },
    ]);
  };

  return (
    <Box>
      <DataGrid data={ordersData} columns={orderColumns} />
      <OrderForm opened={opened} setOpened={setOpened} handleAddOrder={handleAddOrder} suppliers={['Supplier A', 'Supplier B']} />
    </Box>
  );
};

export default Orders;