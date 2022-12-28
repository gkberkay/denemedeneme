import React, { useContext, useEffect } from 'react'
import AppContext from '../../core/AppContext';
import HTTP from '../../../main-source/MainSource';
import './editProfileField.css'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Formik, Form } from 'formik';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';


const theme = createTheme();


const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(3, 'İsminiz çok kısa')
    .max(50, 'İsim çok uzun'),
  lastName: Yup.string()
    .min(2, 'Soyisim çok kısa')
    .max(50, 'Soyisim çok uzun'),
  email: Yup.string()
    .email('Bu email kullanılıyor'),
  // password: Yup.string()
  //   .min(6, 'Şifreniz çok kısa')
  //   .max(25, 'Şifreniz çok uzun')
  //   .required('Şifre boş geçilemez!'),
  domain: Yup.string()
    .matches(
      /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      'Geçerli domain giriniz!'
    )
});




const EditProfileFields = () => {

  const { appState: { userInfo }, dispatchAppStateAction } = useContext(AppContext)

  // const [profile, setProfile] = useState("");

  useEffect(() => {
    (async () => {
      const userInfo = await HTTP.get("/getme", {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      dispatchAppStateAction({ type: "SET_USER_PROFIL_INFO", payload: userInfo.data })
    })()
  }, [])

  const navigate = useNavigate()
  const cookies = new Cookies();

  const logOut = async () => {
    cookies.remove('token');
    navigate('/signin')
  }

  return (
    <div className='editProfileContainer'>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          domain: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={async (values, { resetForm }) => {
          try {
            const editData = await HTTP.post('/mainpage/editprofile', {
              id: userInfo.userId,
              firstName: values.firstName,
              lastName: values.lastName,
              email: values.email,
              domain: values.domain,
            })
            if (editData.data.message === "Yeni Bilgi Girilmediği için Değiştirilemedi.") {
              toast.success('Bilgi Girmediniz, Bilgileriniz Aynı Kalacak', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2500,
              })
              resetForm()
            } else {
              if (editData.data.message) {
                toast.success(editData.data.message, {
                  position: toast.POSITION.TOP_RIGHT,
                  autoClose: 6500,
                })
                resetForm()
                logOut()
              }
            }
            if (editData.data.success === false) {
              toast.success(editData.data.message, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2500,
              })
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
            <div>
              Fotoğraf gelecek
            </div>
            <Form>
              <div className='editProfileField'>
                <div className='editProfileTextField'>
                  <div className='nameSurnameField'>
                    <li>
                      <TextField
                        name="firstName"
                        fullWidth
                        id="firstName"
                        label="Ad"
                        autoFocus
                        placeholder={`${userInfo.userName}`}
                        onChange={handleChange}
                        value={values.firstName}
                        error={!!errors.firstName}

                      />
                      {errors.firstName ? (
                        <div style={{ color: 'red' }}>{errors.firstName}</div>
                      ) : null}
                    </li>
                    <li>
                      <TextField
                        name="lastName"
                        fullWidth
                        id="lastName"
                        label="Soyad"
                        autoFocus
                        placeholder={`${userInfo.userLastName}`}
                        onChange={handleChange}
                        value={values.lastName}
                        error={!!errors.lastName}

                      />
                      {errors.firstName ? (
                        <div style={{ color: 'red' }}>{errors.lastName}</div>
                      ) : null}
                    </li>
                  </div>
                  <li>
                    <TextField
                      name="email"
                      fullWidth
                      id="email"
                      label="Email"
                      autoFocus
                      placeholder={`${userInfo.userEmail}`}
                      onChange={handleChange}
                      value={values.email}
                      error={!!errors.email}

                    />
                    {errors.firstName ? (
                      <div style={{ color: 'red' }}>{errors.email}</div>
                    ) : null}
                  </li>
                  <li>
                    <TextField
                      name="domain"
                      fullWidth
                      id="domain"
                      label="Domain"
                      autoFocus
                      placeholder={`${userInfo.domain}`}
                      onChange={handleChange}
                      value={values.domain}
                      error={!!errors.domain}

                    />
                    {errors.firstName ? (
                      <div style={{ color: 'red' }}>{errors.domain}</div>
                    ) : null}
                  </li>
                </div>
                <div className='editProfileButtonField'>
                  <Stack spacing={2} direction="row">
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Bilgileri Değiştir
                    </Button>
                  </Stack>
                </div>
              </div>
            </Form>
          </ThemeProvider>
        )}
      </Formik>
    </div >
  )
}

export default EditProfileFields