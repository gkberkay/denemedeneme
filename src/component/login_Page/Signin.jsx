
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import MaterialLink from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from "react-router-dom";
import * as Yup from 'yup';
import { Formik } from 'formik';
import HTTP from '../../main-source/MainSource';
import { toast } from 'react-toastify';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
import AppContext from '../core/AppContext';


function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <MaterialLink color="inherit" href="https://www.turkuvazmedyagrubu.com.tr/">
                Turkuvaz Medya
            </MaterialLink>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

const SignupSchema = Yup.object().shape({
    email: Yup.string()
        .email('Geçersiz email')
        .required('E-posta boş geçilemez!'),
    password: Yup.string()
        .required('Lütfen şifrenizi giriniz.')
});

export default function Signin() {

    const navigate = useNavigate()
    const { dispatchAppStateAction } = React.useContext(AppContext)

    return (
        <div>
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                }}
                validationSchema={SignupSchema}
                onSubmit={async (values) => {
                    try {
                        const userInfo = await HTTP.post('/signin', {
                            email: values.email,
                            password: values.password,

                        })
                        if (userInfo.data.message === "Giriş Başarılı") {
                            toast.success('Başarılı bir şekilde giriş yapıldı.', {
                                position: toast.POSITION.TOP_RIGHT,
                                autoClose: 1500,
                            })
                            const cookies = new Cookies();
                            cookies.set('token', userInfo.data.token, { secure: true, path: '/' });
                            dispatchAppStateAction({ type: "SET_USERINFO", payload: userInfo.data })
                            navigate('/mainpage')

                        }
                    } catch (err) {
                        console.log(err)
                        toast.error(err.response.data.message, { timeOut: 4000000000, progressBar: true, allowHtml: true })
                    }
                }
                }
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                }) => (
                    <ThemeProvider theme={theme}>
                        <Container component="main" maxWidth="xs">
                            <CssBaseline />
                            <Box
                                sx={{
                                    marginTop: 8,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                                    <LockOutlinedIcon />
                                </Avatar>
                                <Typography component="h1" variant="h5">
                                    Giriş Yap
                                </Typography>
                                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="email"
                                        label="E-posta"
                                        name="email"
                                        autoComplete="email"
                                        autoFocus
                                        onChange={handleChange}
                                        error={!!errors.email}
                                        value={values.email}
                                    />
                                    {errors.email ? (
                                        <div style={{ color: 'red' }}>{errors.email}</div>
                                    ) : null}
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Şifre"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                        onChange={handleChange}
                                        error={!!errors.password}
                                        value={values.password}

                                    />
                                    {errors.password ? (
                                        <div style={{ color: 'red' }}>{errors.password}</div>
                                    ) : null}
                                    <FormControlLabel
                                        control={<Checkbox value="remember" color="primary" />}
                                        label="Beni Hatırla"
                                    />
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                    >
                                        Giriş Yap
                                    </Button>
                                    <Grid container>
                                        <Grid item xs>
                                            <Link to="/resetpassword" variant="body2">
                                                Şifrenizi mi unuttunuz?
                                            </Link>
                                        </Grid>
                                        <Grid item>
                                            <Link to="/signup" relative="path" variant="body2">
                                                {"Hesabınız yok mu? Kayıt Olun"}
                                            </Link>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Box>
                            <Copyright sx={{ mt: 8, mb: 4 }} />
                        </Container>
                    </ThemeProvider>
                )}
            </Formik >
        </div>
    );
}
