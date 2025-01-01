import { useState } from 'react';

import Box from '@mui/material/Box';

// project import
import MainCard from 'components/MainCard';
import IncomeAreaChart from './IncomeAreaChart';
import { Button, FormControl, Grid, IconButton, InputLabel, Menu, MenuItem, Select, Typography } from '@mui/material';
import CommissionPercentage from 'components/cards/statistics/CommissionPercentage';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function UniqueVisitorCard({ Statics, graphDat }) {

  const percentageData = [
    { name: 'PayIn Commission', percentage: Statics?.pay_incommission },
    { name: 'PayOut Commission', percentage: Statics?.pay_outcommission },
  ];

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <MainCard content={false} sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 900, color: '#676767' }}>
          Commission Percentage
        </Typography>
        <Box sx={{ pt: 1 }}>
          <CommissionPercentage data={percentageData} />
        </Box>
        <Grid item xs={12} md={12} lg={12} sx={{ display: 'flex', m: 1, p: 1.8, backgroundColor: '#F2F6FC', border: '1px solid #E5EEF7', height: '100%', borderRadius: '8px' }}>
          <Typography variant="h6" sx={{ fontWeight: 900, color: '#676767', flexGrow: 1 }}>
            Wallet Balance
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 900, color: '#2C6DB5' }}>
            {Statics?.wallet} INR
          </Typography>
        </Grid>
        {/* <Box sx={{ display: 'flex', justifyContent: 'center', pt: 2 }}>
          <Button variant='contained' sx={{ backgroundColor: '#2C6DB5', borderRadius: '34px', px: 4 }}>Transfer to Wallet</Button>
        </Box> */}
        <Box sx={{ pt: 1, p: 2 }}>
          <Grid display='flex'>
            <Typography alignSelf='center' flexGrow={1} fontWeight={900} sx={{ color: '#676767'}}>Analytics</Typography>
            <FormControl sx={{ minWidth: 80 }} size="medium">
              <Select value='PayIn' sx={{ border: 'none', boxShadow: 'none', '&:hover': { border: 'none', boxShadow: 'none', }, '&.Mui-focused': { border: 'none', boxShadow: 'none', }, '& .MuiOutlinedInput-notchedOutline': { border: 'none', }, '&:focus-visible': { outline: 'none', }, '&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { border: 'none', }, }} >
                <MenuItem value="" disabled>None</MenuItem>
                <MenuItem value="PayIn">PayIn</MenuItem>
                <MenuItem value="PayOut">PayOut</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ minWidth: 100 }} size="medium">
              <Select value='Monthly' sx={{ border: 'none', boxShadow: 'none', '&:hover': { border: 'none', boxShadow: 'none', }, '&.Mui-focused': { border: 'none', boxShadow: 'none', }, '& .MuiOutlinedInput-notchedOutline': { border: 'none', }, '&:focus-visible': { outline: 'none', }, '&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { border: 'none', }, }} >
                <MenuItem value="" disabled>None</MenuItem>
                <MenuItem value="Weekly">Weekly</MenuItem>
                <MenuItem value="Monthly">Monthly</MenuItem>
                <MenuItem value="Yearly">Yearly</MenuItem>
              </Select>
            </FormControl>
            <IconButton
              aria-label="more"
              id="long-button"
              aria-controls={open ? 'long-menu' : undefined}
              aria-expanded={open ? 'true' : undefined}
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>
          </Grid>
          <Grid sx={{ backgroundColor: '#F3F7FB', px: 1, py:3, mt: 1, border: '1px solid #E6EFF7', borderRadius: '10px' }}>
            <IncomeAreaChart graphDat={graphDat} />
          </Grid>
        </Box>
      </MainCard>
    </>
  );
}
