import React from "react";
import {
  Container,
  TextInput,
  NumberInput,
  Select,
  Button,
  Group,
  Textarea,
  Paper,
  Title,
  Text,
  Flex
} from "@mantine/core";
import { useForm } from "@mantine/form";

const ProductForm = ({close}) => {
  const form = useForm({
    initialValues: {
      name: "",
      sku: "",
      description: "",
      price: 0,
      quantity: 0,
      category: "",
    },

    validate: {
      name: (value) =>
        value.length < 3 ? "Product name must have at least 3 characters" : null,
      sku: (value) =>
        value.trim().length === 0 ? "SKU is required" : null,
      price: (value) =>
        value <= 0 ? "Price must be greater than 0" : null,
      quantity: (value) =>
        value < 0 ? "Quantity cannot be negative" : null,
      category: (value) =>
        value.trim().length === 0 ? "Category is required" : null,
    },
  });

  const handleSubmit = async (values) => {
    console.log("Submitting product details:", values);

    // Add API call here to send form data to the server
    // Example:
    // const response = await fetch('/api/products', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(values),
    // });
    // const result = await response.json();
    // console.log(result);
  };

  return (
    <Container size="xl" >
        <Text align="center" order={3} mb="md">
          Add Product to Inventory
        </Text>
      <Paper shadow="xl" p="sm" radius="md" withBorder>
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <Flex justify="space-between">

          <TextInput
            label="Product Name"
            placeholder="Enter product name"
            {...form.getInputProps("name")}
            required
            mb="sm"
            mr="md"
          />
          <TextInput
            label="Barcode number"
            placeholder="Enter unique barcode"
            {...form.getInputProps("sku")}
            required
            mb="sm"
            mr="md"
          />
          <NumberInput
            label="Price"
            placeholder="Enter product price"
            {...form.getInputProps("price")}
            required
            min={0.01}
            precision={2}
            mb="sm"
            mr="md"
          />
          <NumberInput
            label="Quantity"
            placeholder="Enter product quantity"
            {...form.getInputProps("quantity")}
            required
            min={0}
            mb="sm"
          />
          </Flex>
          <Textarea
            label="Description"
            placeholder="Enter product description"
            {...form.getInputProps("description")}
            minRows={3}
            mb="sm"
          />
          <Select
            label="Category"
            placeholder="Select product category"
            data={[
              { value: "medicine", label: "Medicine" },
              { value: "supplements", label: "Supplements" },
              { value: "equipment", label: "Equipment" },
              { value: "other", label: "Other" },
            ]}
            {...form.getInputProps("category")}
            required
            mb="sm"
          />
        </form>
      </Paper>
      <Flex justify="space-between" mt="md">
        <Button type="submit" variant="filled" color="blue" onClick={() => handleSubmit()}>
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