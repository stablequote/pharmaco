import React, { useState } from 'react';
import { Box, Button, Title } from '@mantine/core';
import moment from 'moment'
import DataGrid from '../components/DataGrid';

const ProductSales = () => {

  const salesColumns = [
    {
      accessorKey: 'barcodeID',
      header: 'Barcode',
      size: 40,
    },
    {
      accessorKey: 'product',
      header: 'Product',
      size: 120,
    },
    {
      accessorKey: 'shelf',
      header: 'Shelf',
      size: 40,
    },
    {
      accessorKey: 'quantity',
      header: 'Quantity',
      size: 120,
      Cell: ({ cell }) => (
        <Box
          sx={(theme) => ({
            backgroundColor:
              cell.getValue() < 100 ? theme.colors.red[9] : theme.colors.white,
            borderRadius: '4px',
            color: cell.getValue() < 100 ? 'white' : theme.colors.blue,
            maxWidth: '9ch',
            padding: '4px',
          })}
        >
          {cell.getValue()?.toLocaleString?.('en-US', {
            currency: 'SDG',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          })}
        </Box>
      ),
    },
    {
      accessorKey: 'unit',
      header: 'Unit',
      size: 120,
    },
    {
      accessorKey: 'expiryDate',
      header: 'Expiry Date',
      size: 100,
      mantineEditTextInputProps: ({ cell }) => ({
        ...getCommonEditTextInputProps(cell),
      }),
      Cell: ({ cell }) => (
        // onclick( () => console.log(cell))
        <Box>
          {moment(cell.getValue()).format("DD-MMMM-YYYY")}
  
        </Box>
      ),
    },
    {
      accessorKey: 'unitPurchasePrice',
      header: 'Purchase Price',
      size: 100,
      Cell: ({ cell }) => (
        <Box
          sx={(theme) => ({
            borderRadius: '4px',
            maxWidth: '9ch',
            padding: '4px',
          })}
        >
          {cell.getValue()?.toLocaleString?.('en-US', {
            style: 'currency',
            currency: 'SDG',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          })}
        </Box>
      ),
    },
    {
      accessorKey: 'unitSalePrice',
      header: 'Sale Price',
      size: 100,
      Cell: ({ cell }) => (
        <Box
          sx={(theme) => ({
            borderRadius: '4px',
            maxWidth: '9ch',
            padding: '4px',
          })}
        >
          {cell.getValue()?.toLocaleString?.('en-US', {
            style: 'currency',
            currency: 'SDG',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          })}
        </Box>
      ),
    },
  ];
  const data = [];

  const [salesData, setSalesData] = useState(data);

  return (
    <Box pt={46}>
      {/* <Title  mb="xs" color='blue' fz={30}>All sales</Title> */}
      <DataGrid data={salesData} columns={salesColumns} />
    </Box>
  );
};

export default ProductSales;