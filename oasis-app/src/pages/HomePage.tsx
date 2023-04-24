import React from 'react'
import { Container, Box, Button, Grid, Typography } from '@mui/material'
import {Link} from 'react-router-dom';
import macbook from '../assets/macbook-front.jpg';

const HomePage = () => {
    return (
        <Box
        sx={{
          bgcolor: '#ffffff',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-start',
                height: '100%',
                p: 3,
              }}
            >
              <Typography variant="h3" component="h1" gutterBottom>
                Welcome to OASIS!
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                The ultimate shopping experience.
              </Typography>
              <Typography variant="body1" gutterBottom>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec aliquet eleifend nisl eget vehicula. Maecenas eget ultrices quam. Praesent semper auctor diam.
              </Typography>
              <Link to="/products" style={{ textDecoration: 'none' }}>
                <Button variant="contained" color="primary" sx={{ mt: 3 }}>
                  Explore Products
                </Button>
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
              }}
            >
              <img
                src={macbook}
                alt="Product"
                style={{ width: '100%', height: 'auto' }}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    );
  };
  

export default HomePage