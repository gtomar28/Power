import React, { createContext, useContext, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { Dialog, DialogTitle, DialogContent, Button, Typography, IconButton, Grid, OutlinedInput, Stack, MenuItem, Select, Checkbox, ListItemText } from "@mui/material";
import LinearProgress from '@mui/material/LinearProgress';
import { useForm } from "react-hook-form";
import { Downloadreport, generateReport, getAllUsers, getAllUsersData } from "api/api";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const DialogContext = createContext();

export const useDialog = () => useContext(DialogContext);

export const DialogProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedAccounts, setSelectedAccounts] = useState([]);
  console.log(selectedAccounts)
  const [excelData, setExcelData] = useState();
  const [progressCompleted, setProgressCompleted] = useState(false);

  const role = localStorage.getItem('role')
  const agentId = localStorage.getItem('id')

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => {
    setIsOpen(false);
    setIsGenerated(false);
    setProgressCompleted(false)
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  React.useEffect(() => {
    getUsers();
  }, [isOpen]);

  const getUsers = async () => {
    // setLoading(true);
    try {
      const response = await getAllUsersData();
      if (response?.status === 200) {
        setData(response?.data.users);
      } else {
        console.error('Failed to fetch data', response);
      }
    } catch (err) {
      console.error('Error fetching users:', err);
    } finally {
      // setLoading(false);
    }
  };

  const handleChange = (event) => {
    const { value } = event.target;
    if (value.includes('all')) {
      if (selectedAccounts[0] === 'all') {
        setSelectedAccounts([]);
      } else {
        setSelectedAccounts(['all']);
      }
    } else {
      const filteredValues = value.filter((val) => val !== 'all');
      setSelectedAccounts(filteredValues);
    }
  };



  const onSubmit = async (data) => {
    const reportData = {
      report_name: data.reportName,
      type: data.type,
      amount: parseInt(data.amount),
      accounts: role === 'agent' ? parseInt(agentId) : selectedAccounts.includes('all') ? 'all' : selectedAccounts.toString(),
      start_date: data.startDate,
      end_date: data.endDate,
    };

    try {
      const response = await generateReport(reportData);
      console.log(response, "generate");
      if (response?.status === 201) {
        console.log("Report Created Successfully");
        setExcelData(response?.data?.excel);
        setSelectedAccounts([]);
        setIsGenerated(true);

        // Start Progress Simulation
        setProgress(0);
        const interval = setInterval(() => {
          setProgress((prev) => {
            if (prev >= 100) {
              clearInterval(interval);
              setProgressCompleted(true);
              return 100;
            }
            return prev + 5;
          });
        }, 500);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDownloadClick = () => {
    const byteCharacters = atob(excelData);
    const byteNumbers = new Array(byteCharacters.length).fill().map((_, i) => byteCharacters.charCodeAt(i));
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = 'Report.xlsx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  return (
    <DialogContext.Provider value={{ openDialog, closeDialog }}>
      {children}
      <Dialog
        open={isOpen}
        onClose={closeDialog}
        aria-labelledby="customized-dialog-title"
        maxWidth="sm"
        fullWidth
        sx={{
          '& .MuiDialog-paper': {
            borderRadius: '24px',
          },
        }}
      >
        <Grid sx={{ backgroundColor: '#F2F6FC', borderRadius: '24px', p: 1 }}>
          {/* Dialog Title */}
          <DialogTitle sx={{ display: 'flex', flexDirection: 'column' }} id="customized-dialog-title">
            <Typography sx={{ p: 0, textAlign: 'center' }}> Generate Report </Typography>
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={closeDialog}
            sx={(theme) => ({
              position: 'absolute',
              right: 15,
              top: 15,
              color: theme.palette.grey[500],
            })}
          >
            <CloseIcon />
          </IconButton>

          {/* Dialog Content */}
          <DialogContent>
            {!isGenerated ?
              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                  {/* Report Name */}
                  <Grid item xs={12}>
                    <Stack spacing={1}>
                      <Typography sx={{ color: '#929292', fontWeight: 'bold' }}>Report Name</Typography>
                      <OutlinedInput {...register('reportName', { required: 'Report name is required', })} placeholder="Enter report name" sx={{ width: '100%', backgroundColor: '#fff !important', borderRadius: '15px', height: '40px', fontSize: '14px', padding: '0px', border: errors.reportName ? '1px solid #ff4d4f' : '1px solid #e0e0e0', '&.Mui-focused': { borderColor: errors.reportName ? '#ff4d4f' : '#e0e0e0', boxShadow: 'none', border: 'none', backgroundColor: '#fff' }, '&:hover': { borderColor: errors.reportName ? '#ff4d4f' : '#e0e0e0', border: 'none' } }} />
                      {errors.reportName && (
                        <Typography color="error" variant="caption">
                          {errors.reportName.message}
                        </Typography>
                      )}
                    </Stack>
                  </Grid>

                  {/* Type Dropdown */}
                  <Grid item xs={12}>
                    <Stack spacing={1}>
                      <Typography sx={{ color: '#929292', fontWeight: 'bold' }}>Type</Typography>
                      <Select {...register('type', { required: 'Type is required', })} defaultValue="" displayEmpty IconComponent={(props) => (<ArrowDropDownIcon {...props} sx={{ backgroundColor: '#E4EDF6', color: '#2C6DB5 !important', borderRadius: '6px' }} />)} sx={{ width: '100%', backgroundColor: '#fff', borderRadius: '15px', height: '40px', fontSize: '14px', padding: '0px', border: errors.type ? '1px solid #ff4d4f' : '1px solid #e0e0e0', '&.Mui-focused': { borderColor: errors.type ? '#ff4d4f' : '#e0e0e0', boxShadow: 'none', border: 'none' }, '&:hover': { borderColor: errors.type ? '#ff4d4f' : '#e0e0e0', border: 'none' }, }} >
                        <MenuItem value="" disabled>Select type</MenuItem>
                        <MenuItem value="All">All</MenuItem>
                        <MenuItem value="PayIn">PayIn</MenuItem>
                        <MenuItem value="PayOut">PayOut</MenuItem>
                      </Select>
                      {errors.type && (
                        <Typography color="error" variant="caption">
                          {errors.type.message}
                        </Typography>
                      )}
                    </Stack>
                  </Grid>

                  {/* Amount */}
                  <Grid item xs={12}>
                    <Stack spacing={1}>
                      <Typography sx={{ color: '#929292', fontWeight: 'bold' }}>Amount</Typography>
                      <OutlinedInput {...register('amount', { required: 'Amount is required', pattern: { value: /^[0-9]*$/, message: 'Amount must be a number', }, })} placeholder="Enter amount" sx={{ width: '100%', backgroundColor: '#fff', borderRadius: '15px', height: '40px', fontSize: '14px', padding: '0px', border: errors.amount ? '1px solid #ff4d4f' : '1px solid #e0e0e0', '&.Mui-focused': { borderColor: errors.amount ? '#ff4d4f' : '#e0e0e0', boxShadow: 'none', border: 'none' }, '&:hover': { borderColor: errors.amount ? '#ff4d4f' : '#e0e0e0', border: 'none' } }} />
                      {errors.amount && (
                        <Typography color="error" variant="caption">
                          {errors.amount.message}
                        </Typography>
                      )}
                    </Stack>
                  </Grid>

                  {/* Accounts Dropdown */}
                  {role !== 'agent' &&
                    <Grid item xs={12}>
                      <Stack spacing={1}>
                        <Typography sx={{ color: '#929292', fontWeight: 'bold' }}>Accounts</Typography>
                        <Select multiple value={selectedAccounts} onChange={handleChange} input={<OutlinedInput />} renderValue={(selected) => selected.length > 0 ? selected.join(', ') : 'Select account'} IconComponent={(props) => (<ArrowDropDownIcon {...props} sx={{ color: '#2C6DB5' }} />)} sx={{ width: '100%', backgroundColor: '#fff', borderRadius: '15px', height: '40px' }} >
                          <MenuItem key='all' value='all'>
                            <Checkbox checked={selectedAccounts[0] === 'all'} />
                            <ListItemText primary='Select All' />
                          </MenuItem>
                          {data && data.map((account) => (
                            <MenuItem key={account?.id} value={account?.id} disabled={selectedAccounts[0] === 'all'}>
                              <Checkbox checked={selectedAccounts.includes(account?.id)} />
                              <ListItemText primary={account?.username} />
                            </MenuItem>
                          ))}
                        </Select>
                        {errors.accounts && (
                          <Typography color="error" variant="caption">
                            {errors.accounts.message}
                          </Typography>
                        )}
                      </Stack>
                    </Grid>
                  }

                  {/* Date Range */}
                  <Grid item xs={12}>
                    <Typography sx={{ color: '#929292', fontWeight: 'bold' }}>Date Range</Typography>
                    <Grid container spacing={1}>
                      <Grid item xs={6}>
                        <OutlinedInput type="date" {...register('startDate', { required: 'Start date is required', })} placeholder="Start Date" sx={{ width: '100%', backgroundColor: '#fff', borderRadius: '15px', height: '40px', fontSize: '14px', padding: '0px', border: errors.startDate ? '1px solid #ff4d4f' : '1px solid #e0e0e0', '&.Mui-focused': { borderColor: errors.startDate ? '#ff4d4f' : '#e0e0e0', boxShadow: 'none', border: 'none' }, '&:hover': { borderColor: errors.startDate ? '#ff4d4f' : '#e0e0e0', border: 'none' } }} />
                        {errors.startDate && (
                          <Typography color="error" variant="caption">
                            {errors.startDate.message}
                          </Typography>
                        )}
                      </Grid>
                      <Grid item xs={6}>
                        <OutlinedInput type="date" {...register('endDate', { required: 'End date is required', })} placeholder="End Date" sx={{ width: '100%', backgroundColor: '#fff', borderRadius: '15px', height: '40px', fontSize: '14px', padding: '0px', border: errors.endDate ? '1px solid #ff4d4f' : '1px solid #e0e0e0', '&.Mui-focused': { borderColor: errors.endDate ? '#ff4d4f' : '#e0e0e0', boxShadow: 'none', border: 'none' }, '&:hover': { borderColor: errors.endDate ? '#ff4d4f' : '#e0e0e0', border: 'none' } }} />
                        {errors.endDate && (
                          <Typography color="error" variant="caption">
                            {errors.endDate.message}
                          </Typography>
                        )}
                      </Grid>
                    </Grid>
                  </Grid>

                  {/* Generate Button */}
                  <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                    <Button type="submit" disableRipple sx={{ textTransform: 'none', borderRadius: '32px', px: 10, py: 1, fontSize: '14px', fontWeight: 500, backgroundColor: '#2C6DB5', color: '#fff', '&:hover': { backgroundColor: '#2C6DB5' }, }} >
                      Generate
                    </Button>
                  </Grid>
                </Grid>
              </form>
              :
              <Grid container spacing={2}>
                {/* Report Name */}
                <Grid item xs={12}>
                  <Typography align="center" sx={{ color: '#000', fontWeight: 'bold' }}>Report is in Progress</Typography>
                  <Typography align="center" sx={{ color: '#929292' }}>Your Report is being processed. Please do not refresh or close this page until the process is complete. This may take a few moments.</Typography>
                </Grid>
                <Grid item xs={12}>
                  <LinearProgress variant="determinate" value={progress} sx={{ m: 2, height: 10, borderRadius: 5 }} />
                </Grid>


                <Grid container>
                  <Grid item xs={3}></Grid>
                  <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                    <Button onClick={handleDownloadClick} disabled={!progressCompleted} disableRipple sx={{ minWidth: '100%', textTransform: 'none', borderRadius: '32px', px: 5, mx: 0.5, py: 1, fontSize: '14px', fontWeight: 500, backgroundColor: isGenerated ? '#2C6DB5' : '#808080', color: '#fff', boxShadow: 'none', border: 'none', outline: 'none', '&:hover': { backgroundColor: isGenerated ? '#2C6DB5' : '#808080', }, }} >
                      Download Report
                    </Button>
                  </Grid>
                  <Grid item xs={3}></Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={3}></Grid>
                  <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                    <Button onClick={closeDialog} disableRipple sx={{
                      minWidth: '100%', textTransform: 'none', borderRadius: '32px', px: 5, mx: 0.5, py: 1, fontSize: '14px', fontWeight: 500,
                      backgroundColor: '#808080', color: '#fff', boxShadow: 'none', border: 'none', outline: 'none',
                      '&:hover, &:active, &:focus': { backgroundColor: '#808080', color: '#fff', boxShadow: 'none', }, '&:focus-visible': { outline: 'none', boxShadow: 'none' }, '&.MuiOutlinedInput - notchedOutline': { borderColor: 'transparent', }, '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'transparent', },
                    }}>
                      Cancel
                    </Button>
                  </Grid>
                  <Grid item xs={3}></Grid>
                </Grid>
              </Grid>

            }
          </DialogContent>
        </Grid>
      </Dialog >
    </DialogContext.Provider >
  );
};
