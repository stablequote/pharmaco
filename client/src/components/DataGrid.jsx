import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';
import { Box, Button } from '@mantine/core';
import { IconDownload } from '@tabler/icons-react';
import { mkConfig, generateCsv, download } from 'export-to-csv';
import moment from 'moment'

const columns = [
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

const csvConfig = mkConfig({
  fieldSeparator: ',',
  decimalSeparator: '.',
  useKeysAsHeaders: true,
});

const DataGrid = ({ inventoryData = [] }) => {
  
  const handleExportRows = (rows) => {
    const rowData = rows.map((row) => row.original);
    const csv = generateCsv(csvConfig)(rowData);
    download(csvConfig)(csv);
  };

  const handleExportData = () => {
    const csv = generateCsv(csvConfig)(inventoryData);
    download(csvConfig)(csv);
  };

  const table = useMantineReactTable({
    columns,
    data: inventoryData, // Use the correct prop name
    enableRowSelection: true,
    columnFilterDisplayMode: 'popover',
    paginationDisplayMode: 'pages',
    positionToolbarAlertBanner: 'bottom',
    initialState: {
      pagination: { pageSize: 5 },
      density: 'xs',
    },
    renderTopToolbarCustomActions: ({ table }) => (
      <Box
        sx={{
          display: 'flex',
          gap: '16px',
          padding: '8px',
          flexWrap: 'wrap',
        }}
      >
        <Button
          color="lightblue"
          //export all data that is currently in the table (ignore pagination, sorting, filtering, etc.)
          onClick={handleExportData}
          leftIcon={<IconDownload />}
          variant="filled"
        >
          Export All Data
        </Button>
        <Button
          disabled={table.getPrePaginationRowModel().rows.length === 0}
          //export all rows, including from the next page, (still respects filtering and sorting)
          onClick={() =>
            handleExportRows(table.getPrePaginationRowModel().rows)
          }
          leftIcon={<IconDownload />}
          variant="filled"
        >
          Export All Rows
        </Button>
        <Button
          disabled={table.getRowModel().rows.length === 0}
          //export all rows as seen on the screen (respects pagination, sorting, filtering, etc.)
          onClick={() => handleExportRows(table.getRowModel().rows)}
          leftIcon={<IconDownload />}
          variant="filled"
        >
          Export Page Rows
        </Button>
        <Button
          disabled={
            !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
          }
          //only export selected rows
          onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
          leftIcon={<IconDownload />}
          variant="filled"
        >
          Export Selected Rows
        </Button>
      </Box>
    ),
  });

  return (
    <MantineReactTable
      table={table}
      positionGlobalFilter="right"
      mantineSearchTextInputProps={{
        placeholder: `Search ${inventoryData.length} rows`,
        sx: { minWidth: '300px' },
        variant: 'filled',
      }}
    />
  );
};

export default DataGrid;