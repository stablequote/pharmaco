import React, { useEffect, useState, useMemo } from 'react';
import { Box, Button, Flex, Modal } from '@mantine/core';
import SupplierForm from '../components/SupplierForm';
import DataGrid from '../components/DataGrid';
import { IconAccessible, IconArrowBack, IconArrowLeft } from '@tabler/icons-react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';
import InvoiceTemplate from '../components/InvoiceTemplate';

const Suppliers = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const supplierId = searchParams.get("supplierId");
  const supplierColumns = useMemo(
    () => [
      { accessorKey: "orderID", header: t("Order-ID"), size: 150 },
      { accessorKey: "supplierName", header: t("Supplier-Name"), size: 150 },
      {
        header: t("Ordered-Products"),
        accessorFn: (row) => {
          if (!row.products || row.products.length === 0) return t("No Products");
      
          // Get the first 3 products
          const displayedProducts = row.products.slice(0, 3);
      
          // Format the displayed products
          let productList = displayedProducts
            .map((p) => `${p.product} - ${p.quantity} ${p.unit}`)
            .join(", ");
      
          // If there are more products, add a "..." indicator
          if (row.products.length > 3) {
            productList += `, ... (${t("click for more")})`;
          }
      
          return productList;
        },
      },
      { accessorKey: "totalOrderPrice", header: t("Total-Price"), size: 120 },
      { accessorKey: "paymentMethod", header: t("Payment-Method"), size: 120 },
      {
        accessorKey: "isOrderPaid",
        header: t("Payment-Status"),
        Cell: ({ cell }) => (cell.getValue()  ? `✅ ${t("Paid")}` : `❌ ${t("Not-Paid")}`),
      },
      {
        accessorKey: "orderDate",
        header: t("Order-Date"),
        Cell: ({ cell }) =>
          new Date(cell.getValue()).toLocaleDateString("en-US"),
      },
      {
        accessorKey: "deliveryDate",
        header: t("DELIVERY-DATE"),
        Cell: ({ cell }) =>
          new Date(cell.getValue()).toLocaleDateString("en-US"),
      },
    ],
    [t]
  );
  const BASE_URL = import.meta.env.VITE_URL
  
  const [suppliersData, setSuppliersData] = useState([]);
  const [opened, setOpened] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [invoiceData, setInvoiceData] = useState([]);

  const handleAddSupplier = (newSupplier) => {
    setSuppliersData((prevData) => [
      ...prevData,
      { ...newSupplier, productCount: 130, orderCount: 23 },
    ]);
  };

  const fetchSuppliers = async () => {
    const url = `${BASE_URL}/supplier/list`;

    try {
      const response = await axios.get(url);
      console.log(response.data)
      setSuppliersData(response.data.supplier);
      console.log(suppliersData)
    } catch (error) {
      console.log(error)
    }
  }

  // useEffect(() => {
  //   fetchSuppliers();
  // }, [])

  useEffect(() => {
    async function fetchSupplierOrders() {
      if (!supplierId) return;
  
      try {
        const response = await axios.get(
          `${BASE_URL}/supplier/orders?supplierId=${supplierId}`
        );
        console.log("API Response:", response.data);
  
        if (response.data && response.data.supplier) {
          // Extract orders and add supplier name for reference
          const formattedOrders = response.data.supplier.orders.map((order) => ({
            ...order,
            supplierName: response.data.supplier.name, // Include supplier name
          }));
  
          setSuppliersData(formattedOrders);
          console.log("formatted order:", formattedOrders)
        } else {
          console.error("Unexpected API response structure:", response.data);
          setSuppliersData([]);
        }
      } catch (error) {
        console.error("Error fetching supplier orders:", error);
        setSuppliersData([]);
      }
    }
  
    fetchSupplierOrders();
  }, [supplierId]);
  
  const returnBack = () => {
    navigate(-1);
  }

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
      <Flex mb="xs" justify="space-between">
        <Button variant="outline" color="blue" leftIcon={<IconArrowLeft />} onClick={() => returnBack()} >{t("RETURN")}</Button>
        <Button variant='filled' color="yellow" leftIcon={<IconAccessible />} onClick={() => setOpened(!opened)}>{t("ADD-SUPPLIER")}</Button>
      </Flex>
      <DataGrid data={suppliersData} columns={supplierColumns} displayInvoice={displayInvoice} />
      <SupplierForm opened={opened} setOpened={setOpened} handleAddSupplier={handleAddSupplier} />
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

export default Suppliers;