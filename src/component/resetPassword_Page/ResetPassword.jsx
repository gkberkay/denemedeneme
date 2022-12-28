import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockResetIcon from '@mui/icons-material/LockReset'; import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Link } from "react-router-dom";

const theme = createTheme();

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('E-posta boş geçilemez!'),
});

export default function SignIn() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

  };
  return (
    <div>
      <Formik
        initialValues={{
          email: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={async (values) => {
        }}
      >
        {({ errors, touched, values, handleChange, handleBlur }) => (
          <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box
                sx={{
                  marginTop: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: 1
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                  <LockResetIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Şifre Sıfırlama
                </Typography>
                <Form>
                  <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <Grid item xs={12}>
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.firstName}
                      />
                      {errors.email && touched.email ? (
                        <div style={{ color: 'red' }}>{errors.email}</div>
                      ) : null}
                    </Grid>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Şifreyi Sıfırla
                    </Button>
                    <Grid container>
                      <Grid item>
                        <Link to="/signin" variant="body2">
                          {"Giriş Ekranına Dön"}
                        </Link>
                      </Grid>
                    </Grid>
                  </Box>
                </Form>
              </Box>
            </Container>
          </ThemeProvider>
        )}
      </Formik>
    </div>
  )
};