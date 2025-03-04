import React, { useEffect, useState, useMemo } from 'react';
import { Box, Button, Flex } from '@mantine/core';
import SupplierForm from '../components/SupplierForm';
import DataGrid from '../components/DataGrid';
import { IconAccessible } from '@tabler/icons-react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const Suppliers = () => {
  const { t } = useTranslation();

  const supplierColumns = useMemo(
    () => [
      { accessorKey: "name", header: t("Supplier-Name"), size: 150 },
      { accessorKey: "supplierID", header: t("Supplier-ID"), size: 150 },
      { accessorKey: "orders.length", header: t("Products-Supplied"), size: 120 },
      {
        header: t("Ordered-Products"),
        accessorFn: (row) =>
          row.orders?.length
            ? row.orders.flatMap((order) =>
                order.products.map((p) => p.product.product)
              ).join(", ")
            : t("No-Orders"),
      },
    ],
    [t]
  );

  const [suppliersData, setSuppliersData] = useState([]);
  const [opened, setOpened] = useState(false);

  const handleAddSupplier = (newSupplier) => {
    setSuppliersData((prevData) => [
      ...prevData,
      { ...newSupplier, productCount: 130, orderCount: 23 },
    ]);
  };

  const fetchSuppliers = async () => {
    const url = 'http://localhost:5005/supplier/list';

    try {
      const response = await axios.get(url);
      console.log(response.data)
      setSuppliersData(response.data.supplier);
      console.log(suppliersData)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchSuppliers();
  }, [])

  return (
    <Box>
      <Flex mb="xs" justify="flex-end">
        <Button variant='filled' color="yellow" leftIcon={<IconAccessible />} onClick={() => setOpened(!opened)}>{t("ADD-SUPPLIER")}</Button>
      </Flex>
      <DataGrid data={suppliersData} columns={supplierColumns} />
      <SupplierForm opened={opened} setOpened={setOpened} handleAddSupplier={handleAddSupplier} />
    </Box>
  );
};

export default Suppliers;