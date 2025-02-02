import React, { useState } from 'react';
import { TextInput, Group, Button, Modal, Select } from '@mantine/core';

const SupplierForm = ({ opened, setOpened, handleAddSupplier }) => {
  const [newSupplier, setNewSupplier] = useState({
    name: '',
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
        value={newSupplier.name}
        onChange={(e) => setNewSupplier({ ...newSupplier, name: e.target.value })}
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
      <Group position="right" mt="md">
        <Button variant="light" onClick={() => setOpened(false)}>
          Cancel
        </Button>
        <Button onClick={handleSubmit}>Add Supplier</Button>
      </Group>
    </Modal>
  );
};

export default SupplierForm;