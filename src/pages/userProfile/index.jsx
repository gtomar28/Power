import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import bellNotification from 'assets/images/bellNotification.svg';
import UniqueVisitorCard from './UniqueVisitorCard';
import FirstCardBoxHolder from './FirstCardBoxHolder';
import { OutlinedInput, InputAdornment, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { getAgentsById, getDashStatics } from 'api/api';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import OperationDataForm from './OperationDataForm';
import UserDetailsForm from './UserDetailsForm';
import HashLoader from 'components/HashLoader';
import Notification from 'layout/Dashboard/Header/HeaderContent/Notification';

export default function UserProfileDefault() {

  const { id } = useParams()
  const token = "Token b6dd7cf6689b818350024b495ecebafe862e946b"
  const [userData, setUserData] = useState('');
  const [showLoader, setShowLoader] = useState(false);

  const userLocalData = JSON.parse(localStorage.getItem('assigned_data'));

  useEffect(() => {
    getUserData();
  }, [token])

  const getUserData = async () => {
    setShowLoader(true);
    try {
      const response = await getAgentsById(id);
      console.log(response, "Dash Statics ")
      if (response?.status === 200) {
        setUserData(response?.data);
        setShowLoader(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {
        showLoader && (
          <HashLoader />
        )
      }
      <Grid container rowSpacing={4.5} columnSpacing={2.75}>
        {/* Column 1 */}
        <Grid item xs={12} sx={{ mb: -2.25 }}>
          <Typography variant="h5" sx={{ color: '#828282', textTransform: 'capitalize' }}>
          Hi {userLocalData?.name !== '' ? userLocalData?.name : userLocalData?.username},
          </Typography>
          <Grid container sx={{ display: 'flex' }}>
            <Grid item xs={11} lg={7} alignSelf='center'>
              <Typography variant="h2">Welcome to {userData?.personal_details?.name}'s Profile</Typography>
            </Grid>
            <Grid item xs={1} lg={5} sx={{ display: 'flex', alignItems: 'center' }}>
              <Notification />
              {/* <img src={bellNotification} alt="bellNotification" /> */}
              {/* <OutlinedInput placeholder="Search" startAdornment={<InputAdornment position="start"> <SearchIcon style={{ color: '#3B82F6' }} /> </InputAdornment>} sx={{ ml: 2, width: '100%', backgroundColor: '#fff', borderRadius: '24px', padding: '6px 16px', '& .MuiOutlinedInput-notchedOutline': { border: 'none', }, '&:hover .MuiOutlinedInput-notchedOutline': { border: 'none', }, '&.Mui-focused': { boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)', }, }} /> */}
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
          <Grid container sx={{ p: 2, backgroundColor: '#fff', borderRadius: '14px' }}>
            <UserDetailsForm userId={id} />
            <OperationDataForm userId={id} />
          </Grid>
        </Grid>

      </Grid>
    </>
  );
}
