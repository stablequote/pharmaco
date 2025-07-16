import React, { useEffect, useState, useMemo } from 'react';
import { Box, Button, Title, Group, ActionIcon, TextInput, Modal } from '@mantine/core';
import moment from 'moment'
import DataGrid from '../components/DataGrid';
import axios from 'axios';
import { IconArrowBack, IconEdit, IconTrash } from '@tabler/icons-react';
import { showNotification } from '@mantine/notifications';
import { useTranslation } from 'react-i18next';

const ProductSales = () => {
  const { t } = useTranslation();
  const salesColumns = useMemo(
    () => [
      {
        accessorFn: (data) =>
          data.items.map((itm) => itm.product || itm.name).join(", "),
        id: "product",
        header: t("Product"),
        size: 120,
      },
      {
        accessorFn: (data) => data.items.map((itm) => itm.quantity).join(", "),
        id: "quantity",
        header: t("Quantity"),
        size: 120,
      },
      {
        accessorFn: (data) => data.items.map((itm) => itm.unit).join(", "),
        id: "unit",
        header: t("Unit"),
        size: 120,
      },
      {
        accessorFn: (data) =>
          data.items.map((itm) => itm.unitPurchasePrice).join(", "),
        id: "unitPurchasePrice",
        header: t("Purchase-Price"),
        size: 100,
      },
      {
        accessorFn: (data) =>
          data.items.map((itm) => itm.unitSalePrice).join(", "),
        id: "unitSalePrice",
        header: t("Sale-Price"),
        size: 100,
      },
      {
        accessorKey: "totalCartAmount",
        header: t("Total-Amount"),
        size: 100,
      },
      {
        accessorKey: "totalPaidAmount",
        header: t("Total-Paid-Amount"),
        size: 100,
      },
      { accessorKey: "modeOfPayment", header: t("Payment-Method"), size: 30 },
      { accessorKey: "soldBy", header: t("Sold-By"), size: 30 },
      { accessorKey: "receiptNumber", header: t("Receipt-Number"), size: 120 },
      {
        accessorFn: (data) => moment(data.createdAt).format("DD-MM-YYYY h:mm a"),
        id: "createdAt",
        header: t("Date"),
        size: 120,
      },
    ],
    [t]
  );

  const data = [];

  const [salesData, setSalesData] = useState([]);
  const [editRow, setEditRow] = useState(null);
  const [returnRow, setReturnRow] = useState(null);
  const [deleteRow, setDeleteRow] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [returnModalOpen, setReturnModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [loader, setLoader] = useState(false);


  const BASE_URL = import.meta.env.VITE_URL

  const fetchInventoryData = async (url) => {
    try {
      const res = await axios.get(url);
      console.log(res);
      setSalesData(res.data.sales);
      console.log(res.data.sales)
    } catch (error) {
      console.error('Error fetching inventory data:', error);
      setSalesData([]); // Set to empty array in case of error
    }
  };

  useEffect(() => {
    const url = `${BASE_URL}/sales/list-sales`;
    const res = axios.get(url);
    console.log(res)

    fetchInventoryData(url)
  }, [])

   // Edit Modal Handlers
   const handleEdit = (row) => {
    console.log(row)
    setEditRow(row);
    setEditModalOpen(true);
  };
  const handleSaveEdit = () => {
    setData((prev) =>
      prev.map((item) => (item.id === editRow.id ? editRow : item))
    );
    setEditModalOpen(false);
  };

  // Delete Modal Handlers
  const handleDelete = (row) => {
    setDeleteRow(row);
    setDeleteModalOpen(true);
  };
  const confirmDelete = () => {
    setData((prev) => prev.filter((item) => item.id !== deleteRow.id));
    setDeleteModalOpen(false);
  };

  // return product functionality
  const handleReturn = (row) => {
    setReturnRow(row)
    setReturnModalOpen(true)
  }

  const confirmReturn = async () => {
    // set loader to true
    setLoader(true);
  
    try {
      // send http request to api
      const url = `${BASE_URL}/inventory/return`;
      console.log(returnRow)
  
      const res = await axios.put(url, returnRow);
      console.log(res);
  
      // show success message upon 200 status code from server
      if (res.status === 200) {
        showNotification({
          title: "Success",
          message: "You have successfully returned item to inventory",
          color: "green"
        });
  
        setSalesData(res.data.sales);
        setReturnModalOpen(false);
      } else {
        showNotification({
          title: "Error",
          message: "An error occurred while returning item to inventory",
          color: "red"
        });
      }
    } catch (error) {
      showNotification({
        title: "Error",
        message: error.message || "Something went wrong",
        color: "red",
      });
    }
  
    setLoader(false);
  };
  

  return (
    <Box pt={46}>
      {/* <Title  mb="xs" color='blue' fz={30}>All sales</Title> */}
      <DataGrid data={salesData} columns={salesColumns} handleReturn={handleReturn} />

      {/* Edit Modal */}
      <Modal opened={editModalOpen} onClose={() => setEditModalOpen(false)} title="Edit Medicine">
        <TextInput
          label="Medicine Name"
          value={editRow?.name || ''}
          onChange={(e) => setEditRow({ ...editRow, name: e.target.value })}
        />
        <TextInput
          label="Category"
          value={editRow?.category || ''}
          onChange={(e) => setEditRow({ ...editRow, category: e.target.value })}
        />
        <Group position="right" mt="md">
          <Button onClick={handleSaveEdit}>Save</Button>
        </Group>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal opened={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} title="Confirm Deletion">
        <p>Are you sure you want to delete <strong>{deleteRow?.name}</strong>?</p>
        <Group position="right" mt="md">
          <Button color="red" onClick={confirmDelete}>Delete</Button>
          <Button variant="outline" onClick={() => setDeleteModalOpen(false)}>Cancel</Button>
        </Group>
      </Modal>

      {/* Return Confirmation Modal */}
      <Modal opened={returnModalOpen} onClose={() => setReturnModalOpen(false)} title="Confirm Return">
        <p>Are you sure you want to return this sale?</p>
        <Group position="right" mt="md">
          <Button color="yellow" onClick={confirmReturn}>Return</Button>
          <Button variant="outline" onClick={() => setReturnModalOpen(false)}>Cancel</Button>
        </Group>
      </Modal>

    </Box>

    
  );
};

export default ProductSales;