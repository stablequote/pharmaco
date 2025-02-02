import React, { useState } from 'react';
import { TextInput, Group, Button, Modal, Select, } from '@mantine/core';
import { DateInput } from '@mantine/dates'
import moment from 'moment';

const OrderForm = ({ opened, setOpened, handleAddOrder, suppliers }) => {
  const [newOrder, setNewOrder] = useState({
    supplier: '',
    orderDate: '',
    deliveryDate: '',
    status: 'Pending',
    quantity: 0,
    product: '',
    orderAmount: 0,
    paymentStatus: 'Pending',
  });

  const handleSubmit = () => {
    handleAddOrder(newOrder);
    setOpened(false); // Close the modal after adding
  };

  return (
    <Modal opened={opened} onClose={() => setOpened(false)} title="Create New Order">
      <Select
        label="Select Supplier"
        value={newOrder.supplier}
        onChange={(value) => setNewOrder({ ...newOrder, supplier: value })}
        data={suppliers}
        required
      />
      <TextInput
        label="Product"
        value={newOrder.product}
        onChange={(e) => setNewOrder({ ...newOrder, product: e.target.value })}
        required
      />
      <TextInput
        label="Quantity"
        type="number"
        value={newOrder.quantity}
        onChange={(e) => setNewOrder({ ...newOrder, quantity: e.target.value })}
        required
      />
      <TextInput
        label="Order Amount"
        type="number"
        value={newOrder.orderAmount}
        onChange={(e) => setNewOrder({ ...newOrder, orderAmount: e.target.value })}
        required
      />
      <DateInput
        label="Delivery Date"
        value={newOrder.deliveryDate}
        onChange={(date) => setNewOrder({ ...newOrder, deliveryDate: date })}
        // required
        size="sm" // Matches other inputs
        allowDeselect // Allows clearing date
        allowFreeInput // Enables manual date entry
      />
      <Select
        label="Order Status"
        value={moment(newOrder.status).format("DD-MMMM-YYYY")}
        onChange={(value) => setNewOrder({ ...newOrder, status: value })}
        data={['Pending', 'Shipped', 'Delivered']}
        // required
        defaultValue="Pending"
      />
      <Select
        label="Payment Status"
        value={newOrder.paymentStatus}
        onChange={(value) => setNewOrder({ ...newOrder, paymentStatus: value })}
        data={['Pending', 'Paid']}
        required
        defaultValue="Pending"
      />
      <Group position="right" mt="md">
        <Button variant="light" onClick={() => setOpened(false)}>
          Cancel
        </Button>
        <Button onClick={handleSubmit}>Create Order</Button>
      </Group>
    </Modal>
  );
};

export default OrderForm;