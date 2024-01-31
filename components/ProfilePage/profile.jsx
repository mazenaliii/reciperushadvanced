import React from 'react'
import { InputText } from "primereact/inputtext";
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Button } from 'react-bootstrap';
import { Avatar } from '@mui/material';

const ProfilePage = () => {
  const whiteTheme = createTheme({
    palette: {
      primary: {
        main: '#ffffff',
      },
      secondary: {
        main: '#000000', // Adjust background color if needed
      },
      text: {
        primary: '#ffffff',
        secondary: '#ffffff',
      },
    },
  });

  return (
    <ThemeProvider theme={whiteTheme} >
      <div className="container">
        <div className="wrapper w-full bg-danger rounded mt-5 p-5 d-flex flex-column justify-content-center align-items-center">
          <h3 className='title fw-bold text-light mb-5'>Your profile</h3>
          <div className="avatars mb-5 d-flex flex-column">
            <Avatar sx={{ width: 96, height: 96 }} />
          </div>
          <div className="flex flex-column gap-2 align-items-center">
            <Grid container spacing={4}>
              <Grid item xs={12} md={6} >
                <TextField
                  disabled
                  fullWidth
                  id="Full name"
                  label="Full name"
                  name="Full name"
                  autoComplete="Full name"
                  InputProps={{
                    startAdornment: (
                      <EmailIcon sx={{ color: 'text.primary', marginRight: '10px' }} />
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  disabled
                  fullWidth
                  name="username"
                  label="Username"
                  type="Username"
                  id="username"
                  autoComplete="username"
                  InputProps={{
                    startAdornment: (
                      <LockIcon sx={{ color: 'text.primary', marginRight: '10px' }} />
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6} color={"white"}>
                <TextField
                  disabled
                  fullWidth
                  name="Email"
                  label="Email"
                  type="Email"
                  id="email"
                  className='white-disabled-text'
                  autoComplete="email"
                  InputProps={{
                    startAdornment: (
                      <LockIcon sx={{ color: 'text.primary', marginRight: '10px' }} />
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
              <Button variant="outline-light w-full h-full fw-bold align-self-center justify-self-center ">Update informations</Button>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default ProfilePage