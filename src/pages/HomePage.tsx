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
    /*
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

    */
    <div className='bg-gradient-to-b from-bg1 via-bg2 to-bg3'>
      <Box
        className='bg-[linear-gradient(to right, #a8ff78, #78ffd6)]'
        sx={{
          bgcolor: '#ffffff',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'linear-gradient(to right, #a8ff78, #78ffd6)',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -250 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className='flex justify-center flex-col items-center'
        >
          <Typography
            variant="h3"
            gutterBottom
            sx={{
              color: 'white'
            }}
          >
            Welcome to OASIS!
          </Typography>

          <Typography variant='h4' sx={{ color: 'white', textAlign: 'center' }}>The ultimate shopping experience</Typography>
        </motion.div>
        <Box>


        </Box>

      </Box>
    </div>
  );
};


export default HomePage