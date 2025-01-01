
import { Button, Tab, CircularProgress, TablePagination, useMediaQuery, Select, MenuItem } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Grid } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import { getAllStatements } from 'api/api';
import { OutlinedInput, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Notification from 'layout/Dashboard/Header/HeaderContent/Notification';
import { useDialog } from 'components/Dialogs/DialogProvider';
import HashLoader from 'components/HashLoader';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import NoDataFound from 'assets/images/noDataFound.svg'

export default function AccountsDefault() {

    const userLocalData = JSON.parse(localStorage.getItem('assigned_data'));
    const [showLoader, setShowLoader] = useState(false);

    const { openDialog } = useDialog();

    const [value, setValue] = React.useState('All');
    const [data, setData] = React.useState([]);
    const [onData, setOnData] = React.useState(false);
    const [roleVal, setRoleVal] = React.useState('');
    const [statusVal, setStatusVal] = React.useState('');
    const [searchVal, setSearchVal] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [userState, setUserState] = React.useState();
    const [userId, setUserId] = React.useState();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const rows = data?.results;

    React.useEffect(() => {
        getUsers();
    }, [page, searchVal, roleVal, statusVal, onData]);

    const getUsers = async () => {
        setShowLoader(true);
        try {
            const response = await getAllStatements();
            console.log(response, "Users");
            if (response?.status === 200) {
                setData(response?.data);
            } else {
                console.error('Failed to fetch data', response);
            }
        } catch (err) {
            console.error('Error fetching users:', err);
        } finally {
            setShowLoader(false);
        }
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleConfirm = async () => {
        setShowLoader(true);
        try {
            console.log(userId)
            const response = await updateUserbyId(userId);
            console.log(response, "user update successfully")
            if (response.status === 200) {
                getUsers();
                handleCloseDialog();
                setShowLoader(false);
            }
        } catch (err) {
            console.log(err);
        }

    };


    const theme = useTheme();
    const isXsScreen = useMediaQuery(theme.breakpoints.only('xs'));
    const menuScreenSize = useMediaQuery(theme.breakpoints.down('md'));


    return (
        <>
            {
                showLoader && (
                    <HashLoader />
                )
            }
            <Grid container rowSpacing={4.5} columnSpacing={2.75}>
                {/* Row 1 */}
                <Grid item xs={12} sx={{ mb: -2.25 }}>
                    <Typography variant="h5" sx={{ color: '#828282', textTransform: 'capitalize' }}>
                        Hi {userLocalData?.name !== '' ? userLocalData?.name : userLocalData?.username},
                    </Typography>
                    <Grid container spacing={isXsScreen ? 3 : 1} sx={{ display: 'flex' }}>
                        <Grid item xs={12} md={6} lg={7} alignSelf='center'>
                            <Grid sx={{ display: 'flex' }}>
                                <Typography flexGrow={1} variant={isXsScreen ? "h3" : "h2"}>Welcome to Statement</Typography>
                                <Notification />
                            </Grid>
                        </Grid>
                        {/* <Grid item xs={12} md={6} lg={5} sx={{ display: 'flex', alignItems: 'center', }}>
                        </Grid> */}
                    </Grid>
                </Grid>
                {/* Row 2 */}
                <Grid item xs={12} md={12} lg={12}>
                    <Box sx={{ width: '100%', typography: 'body1' }}>
                        <TabContext value={value}>
                            <Box sx={{}}>
                                <Grid container>
                                    <Grid item xs={5} md={6} sx={{ display: { xs: 'flex', md: 'block' }, justifyContent: { xs: 'start', md: 'unset' } }}>
                                        {menuScreenSize ?
                                            <Select value={value} onChange={(e) => { handleChange(e, e.target.value) }} sx={{ backgroundColor: '#fff', borderRadius: '4px', border: 'none', boxShadow: 'none', '&:hover': { border: 'none', boxShadow: 'none', }, '&.Mui-focused': { border: 'none', boxShadow: 'none', }, '& .MuiOutlinedInput-notchedOutline': { border: 'none', }, '&:focus-visible': { outline: 'none', }, '&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { border: 'none', }, }} >
                                                <MenuItem value="All">All</MenuItem>
                                            </Select>
                                            :
                                            <TabList onChange={handleChange} aria-label="customized tabs" sx={{
                                                '& .MuiTab-root': {
                                                    textTransform: 'none', px: 2.5, backgroundColor: '#fff', borderRadius: '10px',
                                                    color: '#ADA7A7', marginRight: 1, minWidth: 'fit-content', transition: 'background-color 0.3s',
                                                    '&:hover': { backgroundColor: '#2C6DB5', color: '#ffffff' },
                                                    '&:active': { backgroundColor: '#2C6DB5', color: '#ffffff' },
                                                },
                                                '& .Mui-selected': { backgroundColor: '#2C6DB5', color: '#ffffff !important', borderRadius: '10px' },
                                                '& .MuiTabs-indicator': { backgroundColor: 'transparent' },
                                            }}>
                                                <Tab label="All" value="All" onClick={() => { setStatusVal(''); setRoleVal(''); }} />
                                                {/* <Tab label="PayIn" value="2" onClick={() => { setRoleVal(''); setStatusVal('payIn') }} />
                                        <Tab label="PayOut" value="3" onClick={() => { setRoleVal(''); setStatusVal('PayOut') }} /> */}
                                            </TabList>
                                        }
                                    </Grid>
                                    <Grid item xs={7} md={6} display='flex' justifyContent='end' alignItems='center'>
                                        <Button component={Link} to='/savedReports' disableRipple sx={{
                                            minWidth: 'fit-content', textTransform: 'none', borderRadius: '32px', px: 3.5, mx: 0.5, py: 0.9, fontSize: '14px', fontWeight: 500,
                                            backgroundColor: 'none', border: '1px solid #2C6DB5', color: '#2C6DB5', boxShadow: 'none',
                                            '&:hover, &:active, &:focus': { backgroundColor: 'none', border: '1px solid #2C6DB5', color: '#2C6DB5', boxShadow: 'none', }, '&:focus-visible': { outline: 'none', boxShadow: 'none' }, '&.MuiOutlinedInput - notchedOutline': { borderColor: 'transparent', }, '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'transparent', },
                                        }}>
                                            Saved Reports
                                        </Button>
                                        <Button onClick={openDialog} disableRipple sx={{
                                            minWidth: 'fit-content', textTransform: 'none', borderRadius: '32px', px: 4, mx: 0.5, py: 1, fontSize: '14px', fontWeight: 500,
                                            backgroundColor: '#DDE7F3', color: '#2C6DB5', boxShadow: 'none', border: 'none', outline: 'none',
                                            '&:hover, &:active, &:focus': { backgroundColor: '#DDE7F3', color: '#2C6DB5', boxShadow: 'none', }, '&:focus-visible': { outline: 'none', boxShadow: 'none' }, '&.MuiOutlinedInput - notchedOutline': { borderColor: 'transparent', }, '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'transparent', },
                                        }}>
                                            + Generate Report
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Box>
                            {loading ? (
                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
                                    <CircularProgress />
                                </Box>
                            ) : (
                                <>
                                    <TabPanel value={value} sx={{ p: 0, py: 2 }}>
                                        {rows && rows.length > 0
                                            ?
                                            <TableContainer component={Paper} sx={{ borderRadius: '10px' }}>
                                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell sx={{ textWrap: 'nowrap', py: 2.5 }}>Date & Time</TableCell>
                                                            <TableCell sx={{ textWrap: 'nowrap', py: 2.5 }}>Order ID</TableCell>
                                                            <TableCell sx={{ textWrap: 'nowrap', py: 2.5 }}>Amount</TableCell>
                                                            <TableCell sx={{ textWrap: 'nowrap', py: 2.5 }}>Type</TableCell>
                                                            <TableCell sx={{ textWrap: 'nowrap', py: 2.5 }}>Before PayIn Limit</TableCell>
                                                            <TableCell sx={{ textWrap: 'nowrap', py: 2.5 }}>After PayIn Limit</TableCell>
                                                            <TableCell sx={{ textWrap: 'nowrap', py: 2.5 }}>Commission</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {rows.map((row) => (
                                                            <TableRow key={row?.id} sx={{ backgroundColor: row?.id % 2 === 0 ? '#fff' : '#F2F6FC' }}>
                                                                <TableCell sx={{ textWrap: 'nowrap', py: 1.8, color: '#797B7E' }}>{row?.date_time}</TableCell>
                                                                <TableCell sx={{ textWrap: 'nowrap', py: 1.8, color: '#797B7E' }}>{row?.order_id}</TableCell>
                                                                <TableCell sx={{ textWrap: 'nowrap', py: 1.8 }}>{row?.amount}</TableCell>
                                                                <TableCell sx={{ textWrap: 'nowrap', py: 1.8 }}>{row?.type}</TableCell>
                                                                <TableCell sx={{ textWrap: 'nowrap', py: 1.8 }}>{row?.before_payin_limit}</TableCell>
                                                                <TableCell sx={{ textWrap: 'nowrap', py: 1.8 }}>{row?.after_payin_limit}</TableCell>
                                                                <TableCell sx={{ textWrap: 'nowrap', py: 1.8 }}>{row?.commission}</TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                                <TablePagination rowsPerPageOptions={[10, 25, 50]} rowsPerPage={rowsPerPage} page={page} count={data?.count} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage} />
                                            </TableContainer>

                                            :
                                                <Grid sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                                    <img
                                                        src={NoDataFound}
                                                        alt='No Data Found'
                                                        style={{
                                                            maxWidth: '100%',
                                                            maxHeight: '100%',
                                                            objectFit: 'contain',
                                                        }}
                                                    />
                                                </Grid>

                                        }
                                    </TabPanel>
                                </>
                            )}
                        </TabContext>
                    </Box>
                </Grid>
            </Grid>
        </>
    );
}

