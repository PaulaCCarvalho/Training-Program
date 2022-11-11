
import { createTheme, ThemeProvider } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import React from 'react';


export function PaginationComponent({page,setPage, count}: {page: number,setPage: Function, count: number}) {
    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });

    return (
        <ThemeProvider theme={darkTheme} >
            <Stack spacing={2} >
                <Pagination defaultPage={page} count={count} onChange={(event, pageChange) => setPage(pageChange)} shape="rounded" />
                
            </Stack>
        </ThemeProvider>

    )
}