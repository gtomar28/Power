import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import bellNotification from 'assets/images/bellNotification.svg';
import UniqueVisitorCard from './UniqueVisitorCard';
import FirstCardBoxHolder from './FirstCardBoxHolder';
import { OutlinedInput, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Notification from 'layout/Dashboard/Header/HeaderContent/Notification';

import { useState, useEffect } from 'react';
import { graphData } from 'api/api';
import HashLoader from 'components/HashLoader';

export default function DashboardDefault() {


  // const role = JSON.parse(localStorage.getItem("role"));

  const userLocalData = JSON.parse(localStorage.getItem('assigned_data'));

  const [year, setYear] = useState(2024);
  const [type, setType] = useState('payin')

  const [Statics, setStatics] = useState('');
  const [adminDetails, setAdminDetails] = useState([])

  useEffect(() => {
    fetchData()
  }, [])


  const handleType = (value) => {
    setType(value)
  }

  const handleyear = (value) => {
    setYear(value)
  }

  const [graphDat, setGraphData] = useState('');
  const [showLoader, setShowLoader] = useState(false);

  const fetchData = async () => {
    try {
      setShowLoader(true);
      const orderResponse = await graphData(year, type);
      console.log(orderResponse, "OrderGraphData")
      if (orderResponse?.status === 200)
        setShowLoader(false);
      setGraphData(orderResponse?.data?.graph_data);
      setStatics(orderResponse?.data);
      setAdminDetails(orderResponse?.data?.Hierarchy);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [year, type]);


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
            <Grid item xs={12} lg={7} alignSelf='center'>
              <Grid sx={{display: 'flex'}}>
                <Typography flexGrow={1} variant="h2">Welcome to  Dashboard</Typography>
                <Notification />
              </Grid>
            </Grid>
            <Grid item xs={12} lg={5} sx={{ display: 'flex', alignItems: 'center', }}>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <FirstCardBoxHolder Statics={Statics} adminDetails={adminDetails} />
        </Grid>

        {/* Column 2 */}
        <Grid item xs={12} md={6} lg={6}>
          <UniqueVisitorCard Statics={Statics} graphDat={graphDat} />
        </Grid>

      </Grid>
    </>
  );
}
