import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';
import { Box, Button } from '@mantine/core';
import { IconDownload } from '@tabler/icons-react';
import { mkConfig, generateCsv, download } from 'export-to-csv'; //or use your library of choice here
import { data } from '../utils/data';

//defining columns outside of the component is fine, is stable
const columns = [
  {
    accessorKey: 'id',
    header: 'ID',
    size: 40,
  },
  {
    accessorKey: 'shelf',
    header: 'Shelf',
    size: 40,
  },
  {
    accessorKey: 'product',
    header: 'Product',
    size: 120,
  },
  {
    accessorKey: 'quantity',
    header: 'Quantity',
    size: 120,
    mantineEditTextInputProps: ({ cell }) => ({
      ...getCommonEditTextInputProps(cell),
    }),
     //custom conditional format and styling
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
          // style: 'currency',
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
  },
  {
    accessorKey: 'price',
    header: 'Price',
    size: 100,
    mantineEditTextInputProps: ({ cell }) => ({
      ...getCommonEditTextInputProps(cell),
    }),
     //custom conditional format and styling
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
    accessorKey: 'salePrice',
    header: 'Sale Price',
    size: 100,
    mantineEditTextInputProps: ({ cell }) => ({
      ...getCommonEditTextInputProps(cell),
    }),
     //custom conditional format and styling
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

const DataGrid = () => {
  const handleExportRows = (rows) => {
    const rowData = rows.map((row) => row.original);
    const csv = generateCsv(csvConfig)(rowData);
    download(csvConfig)(csv);
  };

  const handleExportData = () => {
    const csv = generateCsv(csvConfig)(data);
    download(csvConfig)(csv);
  };

  const table = useMantineReactTable({
    columns,
    data,
    enableRowSelection: true,
    columnFilterDisplayMode: 'popover',
    paginationDisplayMode: 'pages',
    positionToolbarAlertBanner: 'bottom',
    initialState: {
      pagination: {pageSize: 5},
      density: "xs"
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

  return <MantineReactTable table={table} />;
};

export default DataGrid;