import React, { useState } from "react";
import {
  Container,
  TextInput,
  NumberInput,
  Select,
  Button,
  Paper,
  Text,
  Flex,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { DateInput, DatePickerInput } from "@mantine/dates";
import axios from "axios";
import { showNotification } from "@mantine/notifications";

const ProductForm = ({ close }) => {
  const [expiryDate, setExpiryDate] = useState(null);
  const BASE_URL = import.meta.env.VITE_URL

  const form = useForm({
    initialValues: {
      product: "",
      quantity: 0,
      unit: "",
      expiryDate: null,
      unitPurchasePrice: 0,
      unitSalePrice: 0,
      shelf: "",
      barcodeID: "",
    },

    validate: {
      product: (value) =>
        value.trim().length < 3 ? "Product name must have at least 3 characters" : null,
      quantity: (value) => (value <= 0 ? "Quantity must be greater than 0" : null),
      unit: (value) => (value.trim().length === 0 ? "Unit is required" : null),
      expiryDate: (value) => (!value ? "Expiry date is required" : null),
      unitPurchasePrice: (value) =>
        value <= 0 ? "Purchase price must be greater than 0" : null,
      unitSalePrice: (value) =>
        value <= 0 ? "Sale price must be greater than 0" : null,
      shelf: (value) => (value.trim().length === 0 ? "Shelf is required" : null),
      barcodeID: (value) => (value.trim().length === 0 ? "Barcode ID is required" : null),
    },
  });

  const handleSubmit = async (values) => {
    try {
      console.log("Submitting product details:", values);

      const formattedValues = {
        ...values,
        expiryDate: values.expiryDate ? new Date(values.expiryDate).toISOString() : null,
      };
      
      const url = `${BASE_URL}/inventory/add`
      const res = await axios.post(url, formattedValues);
      console.log(res)
      
      if(res.status === 201) {
        showNotification({
          title: "Successfully added!",
          message: "Congrats! You have successfully added a new products",
          color: "green",
        })
      }

      close();
    } catch (error) {
      console.error("Error submitting product:", error);
    }
  };

  return (
    <Container size="xl">
      <Text align="center" size="lg" weight={600} mb="md">
        Add Product to Inventory
      </Text>
      <Paper shadow="xl" p="lg" radius="md" withBorder>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Flex justify="space-between" mb="md" gap="md">
            <TextInput
              label="Product Name"
              placeholder="Enter product name"
              {...form.getInputProps("product")}
              required
              sx={{ flex: 1 }}
            />
            <TextInput
              label="Barcode ID"
              placeholder="Enter unique barcode"
              {...form.getInputProps("barcodeID")}
              required
              sx={{ flex: 1 }}
            />
            <TextInput
              label="Shelf"
              placeholder="Enter shelf location"
              {...form.getInputProps("shelf")}
              required
              sx={{ flex: 1 }}
            />
          </Flex>

          <Flex justify="space-between" mb="md" gap="md">
            <NumberInput
              label="Quantity"
              placeholder="Enter product quantity"
              {...form.getInputProps("quantity")}
              required
              min={1}
              sx={{ flex: 1 }}
            />
            <Select
              label="Unit"
              placeholder="Select product unit"
              data={[
                { value: "tablet", label: "Tablet" },
                { value: "ml", label: "Milliliter (ml)" },
                { value: "piece", label: "Piece" },
                { value: "box", label: "Box" },
              ]}
              {...form.getInputProps("unit")}
              required
              sx={{ flex: 1 }}
            />
            {/* <DatePickerInput
              label="Expiry Date"
              placeholder="Pick expiry date"
              value={expiryDate}
              onChange={(date) => {
                setExpiryDate(date);
                form.setFieldValue("expiryDate", date);
              }}
              size="md"
              sx={{ flex: 1 }}
              popoverProps={{ withinPortal: true }}
            /> */}
            
            <DateInput
              label="Expiry Date"
              placeholder="Pick expiry date"
              value={expiryDate}
              onChange={(date) => {
                setExpiryDate(date);
                form.setFieldValue("expiryDate", date);
              }}
              size="sm" // Matches other inputs
              allowDeselect // Allows clearing date
              allowFreeInput // Enables manual date entry
              valueFormat="DD-MM-YYYY" // Ensures correct format when typing
              styles={{
                input: { height: "38px" }, // Forces same height as other inputs
              }}
              sx={{ flex: 1 }}
              popoverProps={{ withinPortal: true }}
            />


          </Flex>

          <Flex justify="space-between" mb="md" gap="md">
            <NumberInput
              label="Purchase Price"
              placeholder="Enter purchase price"
              {...form.getInputProps("unitPurchasePrice")}
              required
              min={0.01}
              precision={2}
              sx={{ flex: 1 }}
            />
            <NumberInput
              label="Sale Price"
              placeholder="Enter sale price"
              {...form.getInputProps("unitSalePrice")}
              required
              min={0.01}
              precision={2}
              sx={{ flex: 1 }}
            />
          </Flex>
        </form>
      </Paper>

      {/* Buttons Outside Paper, Separated on Left & Right */}
      <Flex justify="space-between" mt="lg">
        <Button type="submit" variant="filled" color="blue" onClick={form.onSubmit(handleSubmit)}>
          Add Product
        </Button>
        <Button variant="filled" color="gray" onClick={close}>
          Cancel
        </Button>
      </Flex>
    </Container>
  );
};

export default ProductForm;
