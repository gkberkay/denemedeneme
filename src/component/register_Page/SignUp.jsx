import React from 'react';
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
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import HTTP from '../../main-source/MainSource';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(3, 'İsminiz çok kısa')
    .max(50, 'İsim çok uzun')
    .required('İsim boş geçilemez!'),
  lastName: Yup.string()
    .min(2, 'Soyisim çok kısa')
    .max(50, 'Soyisim çok uzun')
    .required('Soyisim boş geçilemez!'),
  email: Yup.string()
    .email('Invalid email')
    .required('E-posta boş geçilemez!'),
  password: Yup.string()
    .min(6, 'Şifreniz çok kısa')
    .max(25, 'Şifreniz çok uzun')
    .required('Şifre boş geçilemez!'),
  domain: Yup.string()
    .matches(
      /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      'Enter correct url!'
    )
    .required('Lütfen web sitenizi giriniz.'),
});

const theme = createTheme();

export default function SignUp() {

  return (
    <div>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          domain: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={async (values, { resetForm }) => {
          try {
            const { data } = await HTTP.post('/signup', {
              firstName: values.firstName,
              lastName: values.lastName,
              email: values.email,
              password: values.password,
              domain: values.domain,
            })
            if (data.success === true) {
              toast.success('Başarılı bir şekilde kayıt olundu.', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 1500,
              })
              resetForm()
            }
          } catch (err) {
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
                  Kayıt Ol
                </Typography>

                <Form>
                  <Box sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          // autoComplete="on"
                          name="firstName"
                          required
                          fullWidth
                          id="firstName"
                          label="Ad"
                          autoFocus
                          onChange={handleChange}
                          value={values.firstName}
                          error={!!errors.firstName}
                        />
                        {errors.firstName ? (
                          <div style={{ color: 'red' }}>{errors.firstName}</div>
                        ) : null}
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          fullWidth
                          id="lastName"
                          label="Soyad"
                          name="lastName"
                          autoComplete="family-name"
                          onChange={handleChange}
                          value={values.lastName}
                          error={!!errors.lastName}
                        />
                        {errors.lastName ? (
                          <div style={{ color: 'red' }}>{errors.lastName}</div>
                        ) : null}
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          id="email"
                          label="E-posta"
                          name="email"
                          autoComplete="email"
                          onChange={handleChange}
                          value={values.email}
                          error={!!errors.email}

                        />
                        {errors.email ? (
                          <div style={{ color: 'red' }}>{errors.email}</div>
                        ) : null}
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          name="password"
                          label="Şifre"
                          type="password"
                          id="password"
                          // autoComplete="on"
                          onChange={handleChange}
                          value={values.password}
                          error={!!errors.password}
                        />
                        {errors.password ? (
                          <div style={{ color: 'red' }}>{errors.password}</div>
                        ) : null}
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          id="domain"
                          label="Domain"
                          name="domain"
                          autoComplete="domain"
                          onChange={handleChange}
                          value={values.domain}
                          error={!!errors.domain}
                        />
                        {/* <ErrorMessage name="domain" /> */}
                        {errors.domain ? (
                          <div style={{ color: 'red' }}>{errors.domain}</div>
                        ) : null}
                      </Grid>
                      <Grid item xs={12}>
                        <FormControlLabel
                          control={<Checkbox value="allowExtraEmails" color="primary" />}
                          label="Bütün koşulları kabul et"
                        />
                      </Grid>
                    </Grid>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Kayıt Ol
                    </Button>
                    <Grid container justifyContent="flex-end">
                      <Grid item>
                        <Link to="/signin" relative="path" variant="body2">
                          Hesabınız var mı? Giriş Yapın
                        </Link>
                      </Grid>
                    </Grid>
                  </Box>
                </Form>
              </Box>
              <Copyright sx={{ mt: 5 }} />
            </Container>
          </ThemeProvider>
        )}
      </Formik >
    </div >

  );
}