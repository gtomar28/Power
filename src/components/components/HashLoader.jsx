import React from 'react';
import { Box, CircularProgress, Backdrop } from '@mui/material';

// Hash Loader component
const HashLoader = () => {
    return (
        <Backdrop
            open={true}
            sx={{
                color: '#2C6DB5',
                zIndex: (theme) => theme.zIndex.drawer + 1,
                zIndex: 1302,
                backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent black background
            }}
        >
            <Box display="flex" justifyContent="center" alignItems="center">
                <CircularProgress size={96} thickness={5} sx={{ color: '#2C6DB5' }} />
            </Box>
        </Backdrop>
    );
};

export default HashLoader;
