'use client'
import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Image from 'next/image'
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import { useRouter } from 'next/navigation';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios'
import * as Yup from 'yup';
import { useFormik } from 'formik'
import { redirect } from 'next/navigation';





const whiteTheme = createTheme({
  palette: {
    primary: {
      main: '#ffffff',
    },
    secondary: {
      main: '#000000',
    },
    text: {
      primary: '#ffffff',
      secondary: '#ffffff',
    },
  },
});

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .test(
      'has-non-space-characters',
      'Name cannot consist of only spaces',
      (value) => value.trim().length > 0
    )
    .matches(/^[a-zA-Z ]+$/, 'Name must only contain letters and spaces (English only)')
    .min(5, 'Name must be at least 5 characters')
    .max(20, 'Name can\'t contain more than 20 characters'),
  username: Yup.string().matches(/^[a-z0-9_]+$/, 'Username must only contain alphanumeric characters, numbers and underscores (English only)').required('Username is required').min(3, 'Username must be atleast 3 characters').max(20, 'Username can\'t contain more than 20 characters'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
});



export default function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [success, setSuccess] = useState(false)
  const [fail, setFail] = useState(false)
  const [open, setOpen] = useState(true)
  const router = useRouter()
  useEffect(() => {
    if (success) {
      redirect('/login')
    }
  }, [success])


  

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      name: '',
      username: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (e) => {
      setLoading(true);
      setError(null);
      setSuccessMessage(null);

      try {


        const response = await axios.post(`https://reciperush-api.onrender.com/api/create-acc`, formik.values)

        if (response.data.successMessage) {
          setSuccessMessage(response.data.successMessage);
          setSuccess(true)
          setFail(false)
          setOpen(true)
        } else {
          setError(response.data.errMessage);
          setSuccess(false)
          setFail(true)
          setOpen(true)
        }
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false);

      }
    },
  });


  return (
    <ThemeProvider theme={whiteTheme} >
      <Container>
        {success && (
          <Collapse in={open}>
            <Alert
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => setOpen(false)}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              {successMessage}
            </Alert>
          </Collapse>
        )}
        {fail && (
           <Collapse in={open}>
           <Alert
               severity="error"
               action={
                   <IconButton
                       aria-label="close"
                       color="inherit"
                       size="small"
                       onClick={() => setOpen(false)}
                   >
                       <CloseIcon fontSize="inherit" />
                   </IconButton>
               }
               sx={{ mb: 2 }}
           >
               {error}
           </Alert>
       </Collapse>
        )}
      </Container>
      <Container component="main" maxWidth="xs" sx={{ mt: '-50px' }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5" style={{ color: 'white !important' }}>
            Welcome to RecipeRush!
          </Typography>
          <form onSubmit={formik.handleSubmit} style={{ marginTop: '30px' }}>
            <Grid container spacing={2}>
              <Grid item xs={6} md={12}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                  required
                  fullWidth
                  id="fullName"
                  label="Full Name"
                  autoFocus
                  InputProps={{
                    startAdornment: (
                      <PersonIcon sx={{ color: 'text.primary', marginRight: '10px' }} />
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={6} md={12}>
                <TextField
                  autoComplete="given-username"
                  name="username"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.username && Boolean(formik.errors.username)}
                  helperText={formik.touched.username && formik.errors.username}
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  autoFocus
                  InputProps={{
                    startAdornment: (
                      <PersonIcon sx={{ color: 'text.primary', marginRight: '10px' }} />
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  autoComplete="email"
                  InputProps={{
                    startAdornment: (
                      <EmailIcon sx={{ color: 'text.primary', marginRight: '10px' }} />
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  InputProps={{
                    startAdornment: (
                      <LockIcon sx={{ color: 'text.primary', marginRight: '10px' }} />
                    ),
                  }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: 'white !important', color: 'black' }}
            >
              {loading ? <Image src={'https://media.giphy.com/media/fphXG8dDcRHVavls9o/giphy.gif'} alt={"Loading..."} width={25} height={25} /> : "Sign Up"}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2" style={{ color: 'white !important' }}>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    </ThemeProvider>
  );
}