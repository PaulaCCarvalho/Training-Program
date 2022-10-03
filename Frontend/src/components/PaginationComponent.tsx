
import { createTheme, ThemeProvider } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


export function PaginationComponent({setPage}: {setPage: Function}) {
    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });

    return (
        <ThemeProvider theme={darkTheme} >
            <Stack spacing={2} >
                <Pagination count={10} onChange={(event, page) => setPage(page)} shape="rounded" />
                
            </Stack>
        </ThemeProvider>

    )
}