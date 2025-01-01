import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

// material-ui
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import AnimateButton from 'components/@extended/AnimateButton';

// assets
import EyeOutlined from '@ant-design/icons/EyeOutlined';
import EyeInvisibleOutlined from '@ant-design/icons/EyeInvisibleOutlined';
import { LoginSuccess, Loginuse } from 'api/api';
import { encryptData } from 'api/Encrypt_data';
import toast from 'react-hot-toast';

// ============================|| JWT - LOGIN ||============================ //

export default function AuthLogin({ isDemo = false }) {
  const navigate = useNavigate();

  const [tokenData, settokenData] = useState("");
  const [SuccessLogin, setSuccessLogin] = useState("")
  const [checked, setChecked] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  useEffect(() => {
    if (localStorage.getItem('power_token')) {
      const loginTime = localStorage.getItem('login_time');
      const currentTime = new Date().getTime();

      // Check if the login time is older than 1 hour
      if (loginTime && currentTime - loginTime > 3600000) { // 1 hour in milliseconds
        handleLogout();
      }
    }
  }, []);

  useEffect(() => {
    userSuccess(tokenData);
  }, [tokenData])
  
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLogin = async (values, { setSubmitting }) => {
    try {
      const formData = new FormData();
      formData.append('username', values.username);
      formData.append('password', values.password);
      const response = await Loginuse(formData);

      if (response?.status === 200) {
        settokenData(response?.data?.token);
        localStorage.setItem(`power_token`, response?.data?.token);
        localStorage.setItem('login_time', new Date().getTime()); // Store login time
      }
      else{
        toast.error('Login failed. ' + (response?.data?.non_field_errors[0] || 'Please try again.'));
      }
    } catch (err) {
      toast.error('Login failed. ' + (err?.response?.data?.non_field_errors[0] || 'Please try again.'));
      console.error(err, 'vgyhvgctfghvghb');
    } finally {
      setSubmitting(false);
    }
  };

  const userSuccess = async (tokenData) => {
    try {
      const response = await LoginSuccess(tokenData);
      if (response?.status === 200) {
        setSuccessLogin(response?.data?.users);
        const encryptedUserData = encryptData(response?.data?.users);
        localStorage.setItem('data', encryptedUserData);
        localStorage.setItem('role', response?.data?.role);
        localStorage.setItem('assigned_data', JSON.stringify(response?.data?.users[0]?.personal_details));
        localStorage.setItem('id', JSON.stringify(response?.data?.users[0]?.personal_details.id));
        navigate('/');
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('power_token');
    localStorage.removeItem('data');
    localStorage.removeItem('role');
    localStorage.removeItem('assigned_data');
    localStorage.removeItem('id');
    localStorage.removeItem('login_time'); // Clear login time
    navigate('/login');
  };

  return (
    <>
      <Formik
        initialValues={{
          username: '',
          password: '',
          submit: null,
        }}
        validationSchema={Yup.object().shape({
          username: Yup.string().max(255).required('Username is required'),
          password: Yup.string().max(255).required('Password is required'),
        })}
        onSubmit={handleLogin}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="username-login">Username</InputLabel>
                  <OutlinedInput
                    id="username-login"
                    type="text"
                    value={values.username}
                    name="username"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter username"
                    fullWidth
                    error={Boolean(touched.username && errors.username)}
                  />
                </Stack>
                {touched.username && errors.username && (
                  <FormHelperText error id="standard-weight-helper-text-username-login">
                    {errors.username}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-login">Password</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.password && errors.password)}
                    id="password-login"
                    type={showPassword ? 'text' : 'password'}
                    value={values.password}
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter password"
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          color="secondary"
                        >
                          {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </Stack>
                {touched.password && errors.password && (
                  <FormHelperText error id="standard-weight-helper-text-password-login">
                    {errors.password}
                  </FormHelperText>
                )}
              </Grid>

              <Grid item xs={12} sx={{ mt: -1 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={checked}
                        onChange={(event) => setChecked(event.target.checked)}
                        name="checked"
                        color="primary"
                      />
                    }
                    label={<Typography variant="h6">Keep me signed in</Typography>}
                  />
                </Stack>
              </Grid>
              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              <Grid item xs={12}>
                <AnimateButton>
                  <Button
                    disableElevation
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    Login
                  </Button>
                </AnimateButton>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
}

AuthLogin.propTypes = { isDemo: PropTypes.bool };













// auto logout after 24hours 


// import PropTypes from 'prop-types';
// import React, { useEffect, useState } from 'react';
// import { Link as RouterLink, useNavigate } from 'react-router-dom';

// // material-ui
// import Button from '@mui/material/Button';
// import Switch from '@mui/material/Switch';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import FormHelperText from '@mui/material/FormHelperText';
// import Grid from '@mui/material/Grid';
// import InputAdornment from '@mui/material/InputAdornment';
// import IconButton from '@mui/material/IconButton';
// import InputLabel from '@mui/material/InputLabel';
// import OutlinedInput from '@mui/material/OutlinedInput';
// import Stack from '@mui/material/Stack';
// import Typography from '@mui/material/Typography';

// // third party
// import * as Yup from 'yup';
// import { Formik } from 'formik';

// // project import
// import AnimateButton from 'components/@extended/AnimateButton';

// // assets
// import EyeOutlined from '@ant-design/icons/EyeOutlined';
// import EyeInvisibleOutlined from '@ant-design/icons/EyeInvisibleOutlined';
// import { LoginSuccess, Loginuse } from 'api/api';
// import { encryptData } from 'api/Encrypt_data';

// // ============================|| JWT - LOGIN ||============================ //

// export default function AuthLogin({ isDemo = false }) {
//   const navigate = useNavigate();

//   const [tokenData, settokenData] = useState("");
//   const [SuccessLogin, setSuccessLogin] = useState("")
//   const [checked, setChecked] = React.useState(false);
//   const [showPassword, setShowPassword] = React.useState(false);

//   useEffect(() => {
//     if (localStorage.getItem('power_token')) {
//       const loginTime = localStorage.getItem('login_time');
//       const currentTime = new Date().getTime();

//       // Check if the login time is older than 24 hours
//       if (loginTime && currentTime - loginTime > 86400000) { // 24 hours in milliseconds
//         handleLogout();
//       }
//     }
//   }, []);

//   const handleClickShowPassword = () => {
//     setShowPassword(!showPassword);
//   };

//   const handleMouseDownPassword = (event) => {
//     event.preventDefault();
//   };

//   const handleLogin = async (values, { setSubmitting }) => {
//     try {
//       const formData = new FormData();
//       formData.append('username', values.username);
//       formData.append('password', values.password);
//       const response = await Loginuse(formData);

//       if (response?.status === 200) {
//         settokenData(response?.data?.token);
//         localStorage.setItem(`power_token`, response?.data?.token);
//         localStorage.setItem('login_time', new Date().getTime()); // Store login time
//       }
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const userSuccess = async (tokenData) => {
//     try {
//       const response = await LoginSuccess(tokenData);
//       if (response?.status === 200) {
//         setSuccessLogin(response?.data?.users);
//         const encryptedUserData = encryptData(response?.data?.users);
//         localStorage.setItem('data', encryptedUserData);
//         localStorage.setItem('role', response?.data?.role);
//         localStorage.setItem('assigned_data', JSON.stringify(response?.data?.users[0]?.personal_details));
//         localStorage.setItem('id', JSON.stringify(response?.data?.users[0]?.personal_details.id));
//         navigate('/');
//         window.location.reload();
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('power_token');
//     localStorage.removeItem('data');
//     localStorage.removeItem('role');
//     localStorage.removeItem('assigned_data');
//     localStorage.removeItem('id');
//     localStorage.removeItem('login_time'); // Clear login time
//     navigate('/login');
//   };

//   return (
//     <>
//       <Formik
//         initialValues={{
//           username: '',
//           password: '',
//           submit: null,
//         }}
//         validationSchema={Yup.object().shape({
//           username: Yup.string().max(255).required('Username is required'),
//           password: Yup.string().max(255).required('Password is required'),
//         })}
//         onSubmit={handleLogin}
//       >
//         {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
//           <form noValidate onSubmit={handleSubmit}>
//             <Grid container spacing={3}>
//               <Grid item xs={12}>
//                 <Stack spacing={1}>
//                   <InputLabel htmlFor="username-login">Username</InputLabel>
//                   <OutlinedInput
//                     id="username-login"
//                     type="text"
//                     value={values.username}
//                     name="username"
//                     onBlur={handleBlur}
//                     onChange={handleChange}
//                     placeholder="Enter username"
//                     fullWidth
//                     error={Boolean(touched.username && errors.username)}
//                   />
//                 </Stack>
//                 {touched.username && errors.username && (
//                   <FormHelperText error id="standard-weight-helper-text-username-login">
//                     {errors.username}
//                   </FormHelperText>
//                 )}
//               </Grid>
//               <Grid item xs={12}>
//                 <Stack spacing={1}>
//                   <InputLabel htmlFor="password-login">Password</InputLabel>
//                   <OutlinedInput
//                     fullWidth
//                     error={Boolean(touched.password && errors.password)}
//                     id="password-login"
//                     type={showPassword ? 'text' : 'password'}
//                     value={values.password}
//                     name="password"
//                     onBlur={handleBlur}
//                     onChange={handleChange}
//                     placeholder="Enter password"
//                     endAdornment={
//                       <InputAdornment position="end">
//                         <IconButton
//                           aria-label="toggle password visibility"
//                           onClick={handleClickShowPassword}
//                           onMouseDown={handleMouseDownPassword}
//                           edge="end"
//                           color="secondary"
//                         >
//                           {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
//                         </IconButton>
//                       </InputAdornment>
//                     }
//                   />
//                 </Stack>
//                 {touched.password && errors.password && (
//                   <FormHelperText error id="standard-weight-helper-text-password-login">
//                     {errors.password}
//                   </FormHelperText>
//                 )}
//               </Grid>

//               <Grid item xs={12} sx={{ mt: -1 }}>
//                 <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
//                   <FormControlLabel
//                     control={
//                       <Switch
//                         checked={checked}
//                         onChange={(event) => setChecked(event.target.checked)}
//                         name="checked"
//                         color="primary"
//                       />
//                     }
//                     label={<Typography variant="h6">Keep me signed in</Typography>}
//                   />
//                 </Stack>
//               </Grid>
//               {errors.submit && (
//                 <Grid item xs={12}>
//                   <FormHelperText error>{errors.submit}</FormHelperText>
//                 </Grid>
//               )}
//               <Grid item xs={12}>
//                 <AnimateButton>
//                   <Button
//                     disableElevation
//                     disabled={isSubmitting}
//                     fullWidth
//                     size="large"
//                     type="submit"
//                     variant="contained"
//                     color="primary"
//                   >
//                     Login
//                   </Button>
//                 </AnimateButton>
//               </Grid>
//             </Grid>
//           </form>
//         )}
//       </Formik>
//     </>
//   );
// }

// AuthLogin.propTypes = { isDemo: PropTypes.bool };







// working code 




// import PropTypes from 'prop-types';
// import React, { useEffect, useState } from 'react';
// import { Link as RouterLink, useNavigate } from 'react-router-dom';

// // material-ui
// import Button from '@mui/material/Button';
// import Switch from '@mui/material/Switch';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import FormHelperText from '@mui/material/FormHelperText';
// import Grid from '@mui/material/Grid';
// import InputAdornment from '@mui/material/InputAdornment';
// import IconButton from '@mui/material/IconButton';
// import InputLabel from '@mui/material/InputLabel';
// import OutlinedInput from '@mui/material/OutlinedInput';
// import Stack from '@mui/material/Stack';
// import Typography from '@mui/material/Typography';

// // third party
// import * as Yup from 'yup';
// import { Formik } from 'formik';
// // import { toast } from 'react-toastify';
// // import 'react-toastify/dist/ReactToastify.css';

// // project import
// import AnimateButton from 'components/@extended/AnimateButton';

// // assets
// import EyeOutlined from '@ant-design/icons/EyeOutlined';
// import EyeInvisibleOutlined from '@ant-design/icons/EyeInvisibleOutlined';
// import FirebaseSocial from './FirebaseSocial';
// import { LoginSuccess, Loginuse } from 'api/api';
// import { encryptData } from 'api/Encrypt_data';

// // ============================|| JWT - LOGIN ||============================ //

// export default function AuthLogin({ isDemo = false }) {
//   const navigate = useNavigate();

//   // localStorage.setItem(
//   //   `power_token`, 'b6dd7cf6689b818350024b495ecebafe862e946b'
//   // );

//   const [tokenData, settokenData] = useState("");
//   const [SuccessLogin, setSuccessLogin] = useState("")
//   const [checked, setChecked] = React.useState(false);
//   const [showPassword, setShowPassword] = React.useState(false);

//   // useEffect(() => {
//   //   settokenData('b6dd7cf6689b818350024b495ecebafe862e946b')
//   // }, [])
  
//   useEffect(() => {
//     userSuccess(tokenData);
//   }, [tokenData])


//   const handleClickShowPassword = () => {
//     setShowPassword(!showPassword);
//   };

//   const handleMouseDownPassword = (event) => {
//     event.preventDefault();
//   };

//   const handleLogin = async (values, { setSubmitting }) => {
//     try {
//       const formData = new FormData();
//       formData.append('username', values.username);
//       formData.append('password', values.password);
//       const response = await Loginuse(formData);

//       if (response?.status === 200) {
//         settokenData(response?.data?.token);
//         localStorage.setItem(`power_token`, response?.data?.token);
//       }
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setSubmitting(false);
//     }
//   };


//   const userSuccess = async (tokenData) => {
//     try {
//       const response = await LoginSuccess(tokenData)
//       console.log(response, "Login Success response");
//       if (response?.status === 200) {
//         setSuccessLogin(response?.data?.users);
//         const encryptedUserData = encryptData(response?.data?.users);
//         localStorage.setItem(
//           `data`, encryptedUserData
//         );
//         localStorage.setItem(
//           `role`, response?.data?.role
//           // `role`, JSON.stringify(response?.data?.role)
//         );
//         localStorage.setItem(
//           `assigned_data`, JSON.stringify(response?.data?.users[0]?.personal_details)
//         );
//         localStorage.setItem(
//           `id`, JSON.stringify(response?.data?.users[0]?.personal_details.id)
//         );
//         navigate("/")
//         window.location.reload();
//       }
//     } catch (err) {
//       console.log(err)
//     }

//   };


//   return (
//     <>
//       <Formik
//         initialValues={{
//           username: '',
//           password: '',
//           submit: null,
//         }}
//         validationSchema={Yup.object().shape({
//           username: Yup.string().max(255).required('Username is required'),
//           password: Yup.string().max(255).required('Password is required'),
//         })}
//         onSubmit={handleLogin}
//       >
//         {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
//           <form noValidate onSubmit={handleSubmit}>
//             <Grid container spacing={3}>
//               <Grid item xs={12}>
//                 <Stack spacing={1}>
//                   <InputLabel htmlFor="username-login">Username</InputLabel>
//                   <OutlinedInput
//                     id="username-login"
//                     type="text"
//                     value={values.username}
//                     name="username"
//                     onBlur={handleBlur}
//                     onChange={handleChange}
//                     placeholder="Enter username"
//                     fullWidth
//                     error={Boolean(touched.username && errors.username)}
//                   />
//                 </Stack>
//                 {touched.username && errors.username && (
//                   <FormHelperText error id="standard-weight-helper-text-username-login">
//                     {errors.username}
//                   </FormHelperText>
//                 )}
//               </Grid>
//               <Grid item xs={12}>
//                 <Stack spacing={1}>
//                   <InputLabel htmlFor="password-login">Password</InputLabel>
//                   <OutlinedInput
//                     fullWidth
//                     error={Boolean(touched.password && errors.password)}
//                     id="password-login"
//                     type={showPassword ? 'text' : 'password'}
//                     value={values.password}
//                     name="password"
//                     onBlur={handleBlur}
//                     onChange={handleChange}
//                     placeholder="Enter password"
//                     endAdornment={
//                       <InputAdornment position="end">
//                         <IconButton
//                           aria-label="toggle password visibility"
//                           onClick={handleClickShowPassword}
//                           onMouseDown={handleMouseDownPassword}
//                           edge="end"
//                           color="secondary"
//                         >
//                           {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
//                         </IconButton>
//                       </InputAdornment>
//                     }
//                   />
//                 </Stack>
//                 {touched.password && errors.password && (
//                   <FormHelperText error id="standard-weight-helper-text-password-login">
//                     {errors.password}
//                   </FormHelperText>
//                 )}
//               </Grid>

//               <Grid item xs={12} sx={{ mt: -1 }}>
//                 <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
//                   <FormControlLabel
//                     control={
//                       <Switch
//                         checked={checked}
//                         onChange={(event) => setChecked(event.target.checked)}
//                         name="checked"
//                         color="primary"
//                       />
//                     }
//                     label={<Typography variant="h6">Keep me signed in</Typography>}
//                   />
//                 </Stack>
//               </Grid>
//               {errors.submit && (
//                 <Grid item xs={12}>
//                   <FormHelperText error>{errors.submit}</FormHelperText>
//                 </Grid>
//               )}
//               <Grid item xs={12}>
//                 <AnimateButton>
//                   <Button
//                     disableElevation
//                     disabled={isSubmitting}
//                     fullWidth
//                     size="large"
//                     type="submit"
//                     variant="contained"
//                     color="primary"
//                   >
//                     Login
//                   </Button>
//                 </AnimateButton>
//               </Grid>
//             </Grid>
//           </form>
//         )}
//       </Formik>
//     </>
//   );
// }

// AuthLogin.propTypes = { isDemo: PropTypes.bool };






