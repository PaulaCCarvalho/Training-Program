import { Box, CircularProgress } from "@mui/material";


export default function LoadingScreen() {
    return (
        <Box sx={{ display: 'flex' }} className="w-[100vw] h-[100vh] justify-center items-center bg-[rgba(0,0,0,0.2)]">
            <CircularProgress />
        </Box>
    )
}