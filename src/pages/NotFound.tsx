import React from 'react';
import { Grid, Box, Typography } from '@mui/material';

function NotFound() {
    return (
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            sx={{ height: '100vh' }}
        >
            <Typography
                variant="h1"
                fontWeight="bold"
                sx={{
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    marginBottom: '20px',
                }}
            >
                404
            </Typography>
            <Typography variant='h3'
                sx={
                    {
                        color: 'gray',
                    }
                }>
                Oops, page not found
            </Typography>
        </Grid>
    );
}

export default NotFound;