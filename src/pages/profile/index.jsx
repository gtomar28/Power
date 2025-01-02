import bellNotification from 'assets/images/bellNotification.svg';
import UniqueVisitorCard from './UniqueVisitorCard';
import FirstCardBoxHolder from './FirstCardBoxHolder';
import SearchIcon from '@mui/icons-material/Search';
import { getAgentsById, getDashStatics, updateAgentsById } from 'api/api';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Grid, Typography, OutlinedInput, Button, Snackbar, Alert } from '@mui/material';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import { useForm } from 'react-hook-form';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import HashLoader from 'components/HashLoader';
import { DialogActions, DialogContent, DialogTitle, Dialog } from '@mui/material';
import { LogoutOutlined } from '@ant-design/icons';
import Notification from 'layout/Dashboard/Header/HeaderContent/Notification';

export default function UserProfileDefault() {

  const navigate = useNavigate();
  const [userData, setUserData] = useState('');
  const [showLoader, setShowLoader] = useState(false);

  const { register, handleSubmit, setValue, reset, watch } = useForm();

  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  // const userLocalData = localStorage.getItem('assigned_data');
  const userLocalData = JSON.parse(localStorage.getItem('assigned_data'));
  const userId = JSON.parse(localStorage.getItem('id'));

  useEffect(() => {
    getUserData();
  }, [userId, isEditable])

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  const getUserData = async () => {
    setShowLoader(true);
    try {
      const response = await getAgentsById(userId);
      console.log(response, "user id")
      if (response?.status === 200) {
        setValue('name', response?.data?.personal_details?.name)
        setValue('username', response?.data?.personal_details?.username)
        setValue('email', response?.data?.personal_details?.email)
        setValue('phone_number', response?.data?.personal_details?.phone_number)
        setUserData(response?.data)
        setShowLoader(false);
      }
    } catch (err) {
      console.log(err);
    }
  };


  const onSubmit = async (data) => {
    setShowLoader(true);
    try {
      const formData = new FormData();
      formData.append('name', data?.name);
      formData.append('username', data?.username);
      formData.append('email', data?.email);
      formData.append('phone_number', data?.phone_number);

      const response = await updateAgentsById(userId, formData);
      if (response?.status === 200) {
        console.log('Data updated successfully:', response.data);
        setOpenSnackBar(true);
        setShowLoader(false);
        setIsEditable(false)
      }
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };


  const handleUpdateClick = () => {
    if (isEditable) {
      handleSubmit(onSubmit)(); // Save data when "Save" is clicked
    } else {
      setIsEditable(true); // Switch to editable mode
    }
  };

  const handleCancelClick = () => {
    setIsEditable(false);
  };

  const handleLogout = () => {
    setShowLoader(true); // Show loader immediately
    const timeout = setTimeout(() => {
      try {
        navigate("/");
        setTimeout(() => {
          localStorage.removeItem("power_token");
          localStorage.removeItem("role");
          localStorage.removeItem("data");
          localStorage.removeItem("assigned_data");
          window.location.reload();
        }, 500);
      } catch (err) {
        console.error("Error during logout:", err);
      } finally {
        setShowLoader(false); // Hide loader after navigation
      }
    }, 2000);

    // Cleanup timeout on component unmount
    return () => clearTimeout(timeout);
  };


  return (
    <>
      {
        showLoader && (
          <HashLoader />
        )
      }
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
          {/* Column 1 */}
          <Grid item xs={12} sx={{ mb: -2.25 }}>
            <Typography variant="h5" sx={{ color: '#828282' }}>
              Profile / Profile
            </Typography>
            <Grid container sx={{ display: 'flex' }}>
              <Grid item xs={8} lg={10} alignSelf='center'>
                <Typography variant="h2">Profile</Typography>
              </Grid>
              <Grid item xs={4} lg={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Notification />
                {/* <img src={bellNotification} alt="bellNotification" /> */}
                <Button onClick={() => setOpenDialog(true)} disableRipple sx={{
                  minWidth: 'fit-content', textTransform: 'none', borderRadius: '32px', px: 2, ml: 1, py: 0.7, fontSize: '14px', fontWeight: 500,
                  backgroundColor: '#F2F6FC', border: '1px solid #2C6DB5', color: '#2C6DB5', boxShadow: 'none',
                  '&:hover, &:active, &:focus': { backgroundColor: '#F2F6FC', border: '1px solid #2C6DB5', color: '#2C6DB5', boxShadow: 'none', }, '&:focus-visible': { outline: 'none', boxShadow: 'none' }, '&.MuiOutlinedInput - notchedOutline': { borderColor: 'transparent', }, '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'transparent', },
                }}> <LogoutOutlined /> <Typography sx={{ ml: 1 }}>Logout</Typography> </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container rowSpacing={4.5} columnSpacing={2.75}>
              <Grid item xs={12} md={6} lg={7}>
                <FirstCardBoxHolder data={userData?.statistics} personalData={userData?.personal_details} paymentData={userData?.payment_details} />
              </Grid>

              {/* Column 2 */}
              <Grid item xs={12} md={6} lg={5}>
                <UniqueVisitorCard data={userData?.payment_details} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container sx={{ mb: 2, display: 'flex', justifyContent: 'space-between' }}>
              <Typography alignSelf="center" variant="h5">
                User Details
              </Typography>
              <div>
                {!isEditable ? (
                  <Grid display='flex' alignItems='center' onClick={handleUpdateClick} sx={{ cursor: 'pointer', border: '1px solid #2C6DB5', borderRadius: '34px', px: 4, py: 1, color: '#2C6DB5' }} >
                    <DriveFileRenameOutlineIcon /> <Typography>Update</Typography>
                  </Grid>
                ) : (
                  <>
                    <Button variant="outlined" type="submit" sx={{ border: '1px solid #2C6DB5', borderRadius: '34px', px: 4, color: '#2C6DB5', marginRight: 2, }} >
                      Save
                    </Button>
                    <Button variant="outlined" onClick={handleCancelClick} sx={{ border: '1px solid #d32f2f', borderRadius: '34px', px: 4, color: '#d32f2f', }} >
                      Cancel
                    </Button>
                  </>
                )}
              </div>
            </Grid>
            <Grid sx={{ backgroundColor: '#fff', borderRadius: '14px', width: '100%' }}>
              <TableContainer sx={{ borderRadius: '10px' }}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>User Name</TableCell>
                      <TableCell>Email Id</TableCell>
                      <TableCell>Phone Number</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <OutlinedInput {...register('name', { required: 'Name is required' })} disabled={!isEditable} sx={{ mb: 2, width: '100%', boxShadow: 'none', backgroundColor: '#fff', border: !isEditable ? 'none' : '', borderRadius: '15px', '& .MuiOutlinedInput-notchedOutline': { border: !isEditable ? 'none' : '', }, '&.Mui-disabled': { backgroundColor: '#fff', color: '#000 !important', }, }} />
                      </TableCell>
                      <TableCell>
                        <OutlinedInput {...register('username', { required: 'Username is required' })} disabled={!isEditable} sx={{ mb: 2, width: '100%', boxShadow: 'none', backgroundColor: '#fff', border: !isEditable ? 'none' : '', borderRadius: '15px', '& .MuiOutlinedInput-notchedOutline': { border: !isEditable ? 'none' : '', }, '&.Mui-disabled': { backgroundColor: '#fff', color: '#000 !important', }, }} />
                      </TableCell>
                      <TableCell>
                        <OutlinedInput {...register('email', { required: 'Email is required' })} disabled={!isEditable} sx={{ mb: 2, width: '100%', boxShadow: 'none', backgroundColor: '#fff', border: !isEditable ? 'none' : '', borderRadius: '15px', '& .MuiOutlinedInput-notchedOutline': { border: !isEditable ? 'none' : '', }, '&.Mui-disabled': { backgroundColor: '#fff', color: '#000 !important', }, }} />
                      </TableCell>
                      <TableCell>
                        <OutlinedInput {...register('phone_number', { required: 'Phone number is required' })} disabled={!isEditable} sx={{ mb: 2, width: '100%', boxShadow: 'none', backgroundColor: '#fff', border: !isEditable ? 'none' : '', borderRadius: '15px', '& .MuiOutlinedInput-notchedOutline': { border: !isEditable ? 'none' : '', }, '&.Mui-disabled': { backgroundColor: '#fff', color: '#000 !important', }, }} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>

          <Snackbar open={openSnackBar} autoHideDuration={6000} onClose={() => setOpenSnackBar(false)}>
            <Alert
              onClose={() => setOpenSnackBar(false)}
              severity="success"
              variant="filled"
              sx={{ width: '100%', color: '#fff' }}
            >
              User profile data updated successfully
            </Alert>
          </Snackbar>
        </Grid>

        {/* Logout */}

        <Dialog open={openDialog} onClose={(handleCloseDialog)}>
          <DialogTitle textAlign='center'>
            <Typography variant="h4">Are you sure?</Typography>
          </DialogTitle>
          <DialogContent>
            <Typography variant="h6" display='flex' >
              Are you sure you want to Logout?
            </Typography>
          </DialogContent>
          <DialogActions alignItems='center'>
            <Grid container rowSpacing={1}>
              <Grid item xs={12}>
                <Grid container >
                  <Grid item textAlign='center' xs={1} md={3}></Grid>
                  <Grid item textAlign='center' xs={10} md={6}>
                    <Button variant='contained' onClick={handleLogout} sx={{ backgroundColor: '#2C6DB5', borderRadius: '50px', width: '100%', '&:hover': { backgroundColor: '#2C6DB5', } }}>
                      Confirm
                    </Button>
                  </Grid>
                  <Grid item textAlign='center' xs={1} md={3}></Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container >
                  <Grid item textAlign='center' xs={1} md={3}></Grid>
                  <Grid item textAlign='center' xs={10} md={6}>
                    <Button variant='contained' onClick={handleCloseDialog} sx={{ backgroundColor: '#929292', borderRadius: '50px', width: '100%', '&:hover': { backgroundColor: '#929292', } }}>
                      Cancel
                    </Button>
                  </Grid>
                  <Grid item textAlign='center' xs={1} md={3}></Grid>
                </Grid>
              </Grid>
            </Grid>
          </DialogActions>
        </Dialog>
      </form>
    </>
  );
}
