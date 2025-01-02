import { useState } from 'react';

import Box from '@mui/material/Box';

// project import
import MainCard from 'components/MainCard';
import IncomeAreaChart from './IncomeAreaChart';
import { Button, Grid, Typography } from '@mui/material';
import CommissionPercentage from 'components/cards/statistics/CommissionPercentage';

// ==============================|| DEFAULT - UNIQUE VISITOR ||============================== //

export default function UniqueVisitorCard({ data }) {

  const percentageData = [
    { name: 'PayIn Commission', percentage: data?.pay_incommission },
    { name: 'PayOut Commission', percentage: data?.pay_outcommission },
  ];

  const [slot, setSlot] = useState('week');

  return (
    <>
      <MainCard content={false} sx={{ p: 2, pb: 0 }}>
        <Typography variant="h6" sx={{ fontWeight: 900, color: '#676767', ml:0.6 }}>
          Commission Percentage
        </Typography>
        <Box sx={{ pt: 0.6 }}>
          <MainCard contentSX={{ p: 0, '&.MuiCardContent-root:last-child': { paddingBottom: '0 !important' } }}>
            <CommissionPercentage data={percentageData} />
          </MainCard>
        </Box>
        <Grid item xs={12} md={12} lg={12} sx={{ display: 'flex', m: 0.6, p: 1.8, backgroundColor: '#F2F6FC', border: '1px solid #E5EEF7', borderRadius: '8px' }}>
          <Typography variant="h6" sx={{ fontWeight: 900, color: '#676767', flexGrow: 1 }}>
            Wallet
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 900, color: '#2C6DB5' }}>
            {data?.wallet}
          </Typography>
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'center', pt: 2, pb: 2 }}>
          <Button variant='contained' sx={{ backgroundColor: '#2C6DB5', borderRadius: '34px', px: 4 }}>Transfer to Wallet</Button>
        </Box>
      </MainCard>
    </>
  );
}
