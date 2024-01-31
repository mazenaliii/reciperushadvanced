'use client'
import React, { useState, useEffect, useContext } from 'react';
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
import { useFormik } from 'formik'
import { stringify } from 'postcss';
import { LoginContext }  from '../../components/loginProvider/loginProvider'


function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props} style={{ marginBottom: '200px' }}>
            {'Copyright © '}
            <Link color="inherit" href="/">
                RecipeRush
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}


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


export default function LoginForm() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [success, setSuccess] = useState(false);
    const [fail, setFail] = useState(false);
    const [open, setOpen] = useState(true);
    const router = useRouter();
    const { token } = useContext(LoginContext)

    useEffect(() => {
        if (success) {
            router.push('/')
        }
    }, [success])
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: async (values) => {
            setLoading(true);
            setError(null);
            setSuccessMessage(null);

            try {

                const response = await axios.post(`http://localhost:8080/api/login`, formik.values, {
                    headers: {
                        authorization: `${localStorage.getItem('Token') || token || 'Token not found' }`
                      }
                })

                if (response.data.loggedIn) {
                    setSuccessMessage(response.data.successMessage);
                    localStorage.setItem('Token', response.data.token)
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

            <Container component="main" maxWidth="xs" >
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
                        Welcome Back!
                    </Typography>
                    <form onSubmit={formik.handleSubmit} style={{ marginTop: '30px' }}>
                        <Grid container spacing={2}>
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
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                                    label="Recieve emails of new trending recipes and more."
                                    style={{ color: 'white !important' }}
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
                                <Link href="/register" variant="body2" style={{ color: 'white !important' }}>
                                    Don't have an account? Register now.
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </Container>
        </ThemeProvider>
    );
}