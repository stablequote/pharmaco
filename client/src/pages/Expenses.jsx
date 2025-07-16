import React, { useEffect, useMemo, useState } from 'react'
import {Button, Container, Text} from '@mantine/core'
import DataGrid from '../components/DataGrid'
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import moment from 'moment';

function Expenses() {
  const { t } = useTranslation();
  const expensesColumns = useMemo(
      () => [
        { accessorKey: "description", header: t("Description"), size: 120},
        { accessorKey: "amount", header: t("Amount"), size: 120},
        { accessorKey: "paymentMethod", header: t("Payment-Method"), size: 30 },
        { accessorKey: "createdBy", header: t("Created-By"), size: 30 },
        {
          accessorFn: (data) => moment(data.createdAt).format("DD-MM-YYYY h:mm a"),
          id: "createdAt",
          header: t("Date"),
          size: 120,
        },
      ],
      [t]
  );

  const [expenses, setExpenses] = useState([]);

   const BASE_URL = import.meta.env.VITE_URL
  
    const fetchInventoryData = async (url) => {
      try {
        const res = await axios.get(url);
        console.log(res);
        setExpenses(res.data);
        console.log(res.data)
      } catch (error) {
        console.error('Error fetching inventory data:', error);
        setSalesData([]); // Set to empty array in case of error
      }
    };
  
    useEffect(() => {
      const url = `${BASE_URL}/expenses/list`;
      const res = axios.get(url);
      console.log(res)
  
      fetchInventoryData(url)
    }, [])

  const data = [];

  return (
    <>
    <Container size="xl">
      <Button color='yellow' mb="xs" onClick={() => alert("Coming soon!")}>Add expense</Button>
      <DataGrid columns={expensesColumns} data={expenses}  />
    </Container>
    </>
  )
}

export default Expenses