import React from 'react';
import { DataTableProvider } from '../../contexts/DataTableContext'
import SearchTable from './SearchTable';
import DataTable from './DataTable';
import { Box } from '@mui/material';

export default function DataTableFilter() {
    return (
        <DataTableProvider >
            <Box sx={{border: 1, p:4, borderRadius: '8px', borderColor: 'grey.200'}}>
                <SearchTable />
                <DataTable />
            </Box>
        </DataTableProvider>
    );
}