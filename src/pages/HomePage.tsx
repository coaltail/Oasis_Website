import { useEffect } from 'react'
import { Box, Button, Grid, Typography } from '@mui/material'
import { Link } from 'react-router-dom';
import macbook from '../assets/macbook-front.jpg';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import api from '../utils/axios'

const HomePage = () => {
  const user = useSelector((state: any) => state.user.user);
  console.log(user);
  useEffect(() => {
    const refreshToken = async () => {
      if (user) {
        await api.get(`users/${user._id}`)
          .then((data) => console.log(data));
      }
    }
    refreshToken();
  })
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
            <Typography
              variant="h3"
              component="h1"
              gutterBottom
              sx={{
                display: 'flex'
              }}
            >
              Welcome to<Typography variant="h3"
                component="h1" sx={{
                  backgroundImage: 'linear-gradient(45deg, #1db954, #3E8C6F)',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                }}>&nbsp;OASIS!</Typography>
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              The ultimate shopping experience.
            </Typography>
            <Typography variant="body1" gutterBottom>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec aliquet eleifend nisl eget vehicula. Maecenas eget ultrices quam. Praesent semper auctor diam.
            </Typography>
            <Link to="/products" style={{ textDecoration: 'none' }}>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#3E8C6F",
                    color: "#fff",
                    "&:hover": {
                      backgroundColor: "#295665",
                    },
                  }}
                >
                  Click me!
                </Button>
              </motion.div>

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