import React, { useContext, useEffect } from 'react'
import AppContext from '../../core/AppContext';
import HTTP from '../../../main-source/MainSource';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Formik, Form } from 'formik';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './editPassword.css'
// import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';


const theme = createTheme();


const SignupSchema = Yup.object().shape({
    oldpassword: Yup.string()
        .min(6, 'Şifreniz çok kısa')
        .max(25, 'Şifreniz çok uzun')
        .required('Şifre boş geçilemez!'),
    newpassword: Yup.string()
        .min(6, 'Şifreniz çok kısa')
        .max(25, 'Şifreniz çok uzun')
        .required('Şifre boş geçilemez!'),

    passwordverification: Yup.string()
        .oneOf([Yup.ref('newpassword'), null], 'Şifre eşleşmiyor.')
});

const EditProfileFields = () => {

    const { appState: { userInfo }, dispatchAppStateAction } = useContext(AppContext)

    useEffect(() => {
        (async () => {
            const userInfo = await HTTP.get("/getme", {
                withCredentials: true,
                headers: { 'Content-Type': 'multipart/form-data' },
            })
            dispatchAppStateAction({ type: "SET_USER_PROFIL_INFO", payload: userInfo.data })
        })()
    }, [])


    // const [passwordType, setPasswordType] = useState("password");
    // const [passView, setpassView] = useState("secret");

    // const togglePassword = () => {
    //     setpassView("unsecret")
    //     if (passwordType === "password") {
    //         setPasswordType("text")
    //         return;
    //     }
    //     setPasswordType("password")
    // }

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
                    oldpassword: '',
                    newpassword: '',
                    passwordverification: '',
                }}
                validationSchema={SignupSchema}
                onSubmit={async (values, { resetForm }) => {
                    try {
                        const editPass = await HTTP.post("/mainpage/editpassword", {
                            id: userInfo.userId,
                            oldpassword: values.oldpassword,
                            newpassword: values.newpassword,
                            passwordverification: values.passwordverification
                        })
                        if (editPass.data.message === "Şifre başarılı bir şekilde değiştirildi.") {
                            toast.success("Şifre başarılı bir şekilde değiştirildi.", {
                                position: toast.POSITION.TOP_RIGHT,
                                autoClose: 2500,
                            })
                            resetForm()
                            logOut()
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
                        <Form className='gokberk'>
                            <div className='editPasswordField'>
                                <div className='editPasswordTextField'>
                                    <li>
                                        <TextField
                                            // type={passwordType}
                                            type="password"
                                            name="oldpassword"
                                            fullWidth
                                            id="oldpassword"
                                            label="Oldpassword"
                                            autoFocus
                                            onChange={handleChange}
                                            value={values.oldpassword}
                                            error={!!errors.oldpassword}
                                        />
                                        {errors.oldpassword ? (
                                            <div style={{ color: 'red' }}>{errors.oldpassword}</div>
                                        ) : null}
                                    </li>

                                    <li>
                                        <TextField
                                            //{isPassword ? "password": "text"}
                                            // type={passwordType}
                                            type="password"
                                            name="newpassword"
                                            fullWidth
                                            id="newpassword"
                                            label="Newpassword"
                                            autoFocus
                                            onChange={handleChange}
                                            value={values.newpassword}
                                            error={!!errors.newpassword}
                                        />
                                        {errors.newpassword ? (
                                            <div style={{ color: 'red' }}>{errors.newpassword}</div>
                                        ) : null}
                                    </li>

                                    <li>
                                        <TextField
                                            // type={passwordType}
                                            type="password"
                                            name="passwordverification"
                                            fullWidth
                                            id="passwordverification"
                                            label="Passwordverification"
                                            autoFocus
                                            onChange={handleChange}
                                            value={values.passwordverification}
                                            error={!!errors.passwordverification}
                                        />
                                        {errors.passwordverification ? (
                                            <div style={{ color: 'red' }}>{errors.passwordverification}</div>
                                        ) : null}
                                    </li>
                                    {/* {passView == "secret" ?
                                        <div className='visiblePassword'>
                                            <li className='secretIcon'>
                                                <svg onClick={togglePassword} className="password-icon" viewBox="0 0 64 64">
                                                    <g><rect></rect></g><g><path class="cls-2" d="M32,50a19.11,19.11,0,0,1-12.65-4.74,1,1,0,0,1-.09-1.41,1,1,0,0,1,1.41-.09A17.25,17.25,0,0,0,44,43.13L54.72,32.67a.94.94,0,0,0,0-1.34L43.86,20.72a1,1,0,0,1,1.39-1.44l.16.16L56.11,29.9a2.92,2.92,0,0,1,0,4.2L45.41,44.56A19.11,19.11,0,0,1,32,50Z"></path><path class="cls-2" d="M16.37,42a1,1,0,0,1-.7-.29L7.89,34.1a2.92,2.92,0,0,1,0-4.2l10.7-10.46a19.29,19.29,0,0,1,22.9-3,1,1,0,1,1-1,1.74A17.28,17.28,0,0,0,20,20.87L9.28,31.33a.94.94,0,0,0,0,1.34l7.79,7.62a1,1,0,0,1,0,1.41A1,1,0,0,1,16.37,42Z"></path><path class="cls-2" d="M32,39a7,7,0,0,1-4.67-1.78,1,1,0,1,1,1.34-1.49,5,5,0,0,0,7.06-7.06,1,1,0,1,1,1.49-1.34A7,7,0,0,1,32,39Z"></path><path class="cls-2" d="M26,33a1,1,0,0,1-1-1,7,7,0,0,1,7-7,1,1,0,0,1,0,2,5,5,0,0,0-5,5A1,1,0,0,1,26,33Z"></path><path class="cls-2" d="M15,50a1,1,0,0,1-.71-.29,1,1,0,0,1,0-1.42l34-34a1,1,0,0,1,1.42,1.42l-34,34A1,1,0,0,1,15,50Z"></path></g>
                                                </svg>
                                                <p>Şifreleri görmek için tıklayınız.</p>
                                            </li>
                                        </div>
                                        :
                                        <div className='visiblePassword'>
                                            <li className='secretIcon'>
                                                <svg onClick={togglePassword} className="password-icon" viewBox="0 0 64 64">
                                                    <g><g><path d="M447.1,256.2C401.8,204,339.2,144,256,144c-33.6,0-64.4,9.5-96.9,29.8C131.7,191,103.6,215.2,65,255l-1,1l6.7,6.9    C125.8,319.3,173.4,368,256,368c36.5,0,71.9-11.9,108.2-36.4c30.9-20.9,57.2-47.4,78.3-68.8l5.5-5.5L447.1,256.2z M256,160    c33.1,0,64.9,9.5,97.2,30.6c23.9,15.6,47.4,36.7,73.7,66.1C388.6,295.4,331.1,352,256,352c-34.2,0-64.2-8.4-94.2-28.2    c-27.5-18.1-52.3-43.3-76.2-67.8C144.7,196.3,194,160,256,160z"></path><path d="M256,336c44.1,0,80-35.9,80-80c0-44.1-35.9-80-80-80c-44.1,0-80,35.9-80,80C176,300.1,211.9,336,256,336z M256,192.3    c35.2,0,64,28.6,64,63.7c0,35.1-28.8,63.7-64,63.7c-35.2,0-63.9-28.6-63.9-63.7C192.1,220.9,220.8,192.3,256,192.3z"></path></g><path d="M288,256L288,256c0,17.5-14.4,32-31.8,32S224,272.8,224,255.3s15.8-31.3,32-31.3l0-16c-26.5,0-47.9,21.6-47.9,48.2   c0,26.6,21.5,48.1,47.9,48.1s48-21.6,48-48.1V256H288z"></path></g>                                                </svg>
                                                <p>Şifreleri görmek için tıklayınız.</p>
                                            </li>
                                        </div>
                                    } */}

                                    {/* <li className='secretIcon'>
                                        <VisibilityOffOutlinedIcon onClick={togglePassword} />
                                    </li> */}
                                </div>
                                <div className='editPasswordButtonField'>
                                    <Stack spacing={2} direction="row">
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            sx={{ mt: 3, mb: 2 }}
                                        >
                                            Şifreyi Değiştir
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