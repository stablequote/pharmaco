import React, { useEffect, useState, useMemo } from 'react';
import { Box, Button, Flex, Modal } from '@mantine/core';
import OrderForm from '../components/OrderForm';
import DataGrid from '../components/DataGrid';
import { IconMedicalCrossCircle } from '@tabler/icons-react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import InvoiceTemplate from '../components/InvoiceTemplate';

const Orders = () => {
  const { t } = useTranslation();
  
  const orderColumns = useMemo(
    () => [
      { accessorKey: "orderID", header: t("Order-ID"), size: 100 },
      { accessorKey: "supplier.name", header: t("Supplier"), size: 150 },
      { accessorKey: "supplier.supplierID", header: t("Supplier-ID"), size: 150 },
      { accessorKey: "orderDate", header: t("Order-Date"), sortingFn: 'datetime',size: 120, Cell: ({ cell }) => ( <Box>{moment(cell.getValue()).format("DD-MMMM-YYYY")}</Box>)},
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

  const BASE_URL = import.meta.env.VITE_URL

  const [ordersData, setOrdersData] = useState([]);
  const [opened, setOpened] = useState(false);
  const [inventoryData, setInventoryData] = useState([]);
  const [suppliersData, setSuppliersData] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState('');
  const [selectedSupplierId, setSelectedSupplierId] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [invoiceData, setInvoiceData] = useState([]);

  const handleAddOrder = (newOrder) => {
    setOrdersData((prevData) => [
      ...prevData,
      { ...newOrder, orderId: `ORD${(prevData.length + 1).toString().padStart(3, '0')}` },
    ]);
  };

  const fetchInventory = async () => {
    const inventoryUrl = `${BASE_URL}/inventory/list-all`;
    const supplierUrl = `${BASE_URL}/supplier/list`;

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
    const url = `${BASE_URL}/orders/list`;

    try {
      const response = await axios.get(url);
      console.log(response.data)
      setOrdersData(response.data.orders);
      console.log(ordersData)
      console.log(response.data.orders.supplier.supplierID)
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

   const displayInvoice = async (row) => {
  
      setSelectedRow(row.original); // Store the clicked row's data
      setIsModalOpen(true); // Open the modal
      console.log(selectedRow)
      
      const url = `${BASE_URL}/orders/${selectedRow._id}`
      console.log(url)
  
      try {
        const response = await axios.get(url);
        if(response.status === 200) {
          setInvoiceData(response.data)
          console.log(invoiceData)
        }
      } catch (error) {
        console.log(error)
      }
    }

  return (
    <Box>
      {/* <InvoiceTemplate order={invoiceData} /> */}
      <Flex mb="xs" justify="flex-end">
        <Button variant="filled" color="green" onClick={() => setOpened(!opened)} leftIcon={<IconMedicalCrossCircle />}>
          {t("CREATE-ORDER")}
        </Button>
      </Flex>
      <DataGrid data={ordersData} columns={orderColumns} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} displayInvoice={displayInvoice} />
      <OrderForm
        opened={opened}
        setOpened={setOpened}
        handleAddOrder={handleAddOrder}
        suppliers={suppliersList}
        // productsList={productsList}
        inventoryData={inventoryData}
        setInventoryData={setInventoryData}
        handleProductSelection={handleProductSelection}
        selectedProductId={selectedProductId}
        handleSupplierSelection={handleSupplierSelection}
        selectedSupplierId={selectedSupplierId}
        setInvoiceData={setInvoiceData}
        invoiceData={invoiceData}
      />
      {/* <InvoiceTemplate order={ordersData} /> */}
      {/* Modal for Invoice */}
      <Modal
        opened={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        size={"70rem"}
        // title="Invoice Details"
        fullScreen        
      >
        {selectedRow && <InvoiceTemplate order={selectedRow} />}
      </Modal>
    </Box>
  );
};

export default Orders;