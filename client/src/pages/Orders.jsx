import React, { useEffect, useState, useMemo } from 'react';
import { Box, Button, Flex } from '@mantine/core';
import OrderForm from '../components/OrderForm';
import DataGrid from '../components/DataGrid';
import { IconMedicalCrossCircle } from '@tabler/icons-react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import moment from 'moment';

const Orders = () => {
  const { t } = useTranslation();
  
  const orderColumns = useMemo(
    () => [
      { accessorKey: "orderID", header: t("Order-ID"), size: 100 },
      { accessorKey: "supplier.name", header: t("Supplier"), size: 150 },
      { accessorKey: "supplier.supplierID", header: t("Supplier-ID"), size: 150 },
      { accessorKey: "orderDate", header: t("Order-Date"), size: 120, Cell: ({ cell }) => ( <Box>{moment(cell.getValue()).format("DD-MMMM-YYYY")}</Box>)},
      { accessorKey: "paymentMethod", header: t("Payment-Method"), size: 120 },
      { accessorKey: "totalOrderPrice", header: t("Total-Order-Cost"), size: 120 },
      {
        accessorKey: "isOrderPaid",
        header: t("Is-Order-Paid"),
        accessorFn: (row) => (row.isOrderPaid ? t("Yes") : t("No")),
      },
      { accessorKey: "status", header: t("Status"), size: 120 },
      {
        accessorKey: "products",
        header: t("Ordered-Products"),
        accessorFn: (row) =>
          row.products?.length
            ? row.products.map((p) => p.product.product).join(", ")
            : t("No-Products"),
      },
    ],
    [t]
  );

  // const data = [
  //   { orderId: 'ORD001', supplier: 'Supplier A', orderDate: '2025-02-01', status: 'Pending' },
  //   { orderId: 'ORD002', supplier: 'Supplier B', orderDate: '2025-01-30', status: 'Shipped' },
  // ];

  const [ordersData, setOrdersData] = useState([]);
  const [opened, setOpened] = useState(false);
  const [inventoryData, setInventoryData] = useState([]);
  const [suppliersData, setSuppliersData] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState('');
  const [selectedSupplierId, setSelectedSupplierId] = useState('');

  const handleAddOrder = (newOrder) => {
    setOrdersData((prevData) => [
      ...prevData,
      { ...newOrder, orderId: `ORD${(prevData.length + 1).toString().padStart(3, '0')}` },
    ]);
  };

  const fetchInventory = async () => {
    const inventoryUrl = 'http://localhost:5005/inventory/list-all';
    const supplierUrl = 'http://localhost:5005/supplier/list';

    try {
      const inventoryResponse = await axios.get(inventoryUrl);
      setInventoryData(inventoryResponse.data);

      const supplierResponse = await axios.get(supplierUrl);
      setSuppliersData(supplierResponse.data.supplier);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchOrders = async () => {
    const url = 'http://localhost:5005/orders/list';

    try {
      const response = await axios.get(url);
      console.log(response.data)
      setOrdersData(response.data.orders);
      console.log(ordersData)
    } catch (error) {
      console.log(error)
    }
  }

  // useEffect(() => {
  //   fetchSuppliers();
  // }, [])

  useEffect(() => {
    fetchOrders();
    fetchInventory();
  }, []);

  // Transform suppliers data for the Select component
  const suppliersList = suppliersData.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  // Transform products data for the Select component
  const productsList = inventoryData.map((item) => ({
    value: item._id,
    label: item.product,
  }));

  const handleProductSelection = (selectedProductId) => {
    setSelectedProductId(selectedProductId); // Update the selected product ID
    console.log('Selected Product ID:', selectedProductId); // For debugging
  };

  const handleSupplierSelection = (selectedSupplierId) => {
    setSelectedSupplierId(selectedSupplierId); // Update the selected supplier ID
    console.log('Selected Supplier ID:', selectedSupplierId); // For debugging
  };

  return (
    <Box>
      <Flex mb="xs" justify="flex-end">
        <Button variant="filled" color="green" onClick={() => setOpened(!opened)} leftIcon={<IconMedicalCrossCircle />}>
          {t("CREATE-ORDER")}
        </Button>
      </Flex>
      <DataGrid data={ordersData} columns={orderColumns} />
      <OrderForm
        opened={opened}
        setOpened={setOpened}
        handleAddOrder={handleAddOrder}
        suppliers={suppliersList}
        productsList={productsList}
        handleProductSelection={handleProductSelection}
        selectedProductId={selectedProductId}
        handleSupplierSelection={handleSupplierSelection}
        selectedSupplierId={selectedSupplierId}
      />
    </Box>
  );
};

export default Orders;