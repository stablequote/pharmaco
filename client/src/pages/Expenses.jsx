import React, { useEffect, useMemo, useState } from 'react'
import {Button, Container, Text} from '@mantine/core'
import DataGrid from '../components/DataGrid'
import { useTranslation } from 'react-i18next';
import axios, { Axios } from 'axios';
import moment from 'moment';
import ExpenseModal from '../components/ExpenseModal';
import { showNotification } from '@mantine/notifications';

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
  const [open, setOpen] = useState(false)
  const [expenseForm, setExpenseForm] = useState({
    amount: 0,
    description: '',
  })

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
  
  const handleExpenseInput = (e) => {
      const { name, value } = e.target;

      setExpenseForm((prev) => ({
      ...prev,
      [name]: value,
    }));
      console.log(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const url = `${BASE_URL}/expenses/add`;

    try {
      const res = await axios.post(url, {
        amount: expenseForm.amount,
        description: expenseForm.description
      })
      if(res.status === 201) {
        showNotification({
          title: "Success",
          message: "Expense created successfully!",
          color: "green"
        })
      } else {
        showNotification({
          title: "error",
          message: "Error occured while creating expense!",
          color: "red"
        })
      }
    } catch (error) {
      showNotification({
          title: "Error",
          message: error,
          color: "red"
        })
    }
    setOpen(!open)
    setExpenseForm({amount: 0, description: ''})
  }

  const isToday = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
  const end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
  return date >= start && date <= end;
};

  const todayExpenses = expenses.filter(exp => isToday(exp.createdAt));
  const totalTodayExpenses = todayExpenses.reduce((sum, exp) => sum + exp.amount, 0);

  // console.log("💸 Total Expenses for Today:", totalTodayExpenses);


  return (
    <>
    <Container size="xl">
      <Text>Total expenses today: <strong>{totalTodayExpenses}</strong></Text>
      <Button color='yellow' mb="xs" onClick={() => setOpen(!open)}>Add expense</Button>
      <DataGrid columns={expensesColumns} data={expenses} />
      <ExpenseModal open={open} setOpen={setOpen} amount={expenseForm.amount} description={expenseForm.description} handleExpenseInput={handleExpenseInput} handleSubmit={handleSubmit}/>
    </Container>
    </>
  )
}

export default Expenses