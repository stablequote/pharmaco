import React, { useState } from 'react';
import { TextInput, Group, Button, Modal, Select, Flex } from '@mantine/core';

const SupplierForm = ({ opened, setOpened, handleAddSupplier }) => {
  const [newSupplier, setNewSupplier] = useState({
    supplierName: '',
    contact: '',
    address: '',
    email: '',
    phoneNumber: '',
  });

  const handleSubmit = () => {
    handleAddSupplier(newSupplier);
    setOpened(false); // Close the modal after adding
  };

  return (
    <Modal opened={opened} onClose={() => setOpened(false)} title="Add New Supplier">
      <TextInput
        label="Supplier Name"
        value={newSupplier.supplierName}
        onChange={(e) => setNewSupplier({ ...newSupplier, supplierName: e.target.value })}
        required
      />
      <TextInput
        label="Contact Number"
        value={newSupplier.contact}
        onChange={(e) => setNewSupplier({ ...newSupplier, contact: e.target.value })}
        required
      />
      <TextInput
        label="Address"
        value={newSupplier.address}
        onChange={(e) => setNewSupplier({ ...newSupplier, address: e.target.value })}
        required
      />
      <TextInput
        label="Email"
        type="email"
        value={newSupplier.email}
        onChange={(e) => setNewSupplier({ ...newSupplier, email: e.target.value })}
        required
      />
      <TextInput
        label="Phone Number"
        value={newSupplier.phoneNumber}
        onChange={(e) => setNewSupplier({ ...newSupplier, phoneNumber: e.target.value })}
        required
      />
      <Flex justify="space-between" mt="md">
        <Button variant="light" onClick={() => setOpened(false)}>
          Cancel
        </Button>
        <Button onClick={handleSubmit}>Add Supplier</Button>
      </Flex>
    </Modal>
  );
};

export default SupplierForm;