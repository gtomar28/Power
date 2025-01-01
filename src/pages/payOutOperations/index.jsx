import React, { useState, useEffect } from 'react';
import { Button, MenuItem, Select, Tab, TablePagination, useMediaQuery } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Grid, Typography } from '@mui/material';
import PayOutOperationData from 'components/cards/statistics/PayOutOperationsData';
import { OutlinedInput, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Notification from 'layout/Dashboard/Header/HeaderContent/Notification';
import { getAllAayoutRequests } from '../../api/api';
import { Link } from 'react-router-dom';
import HashLoader from 'components/HashLoader';
import { useTheme } from '@mui/material/styles';

export default function PayOutOperationsDefault() {
    const [value, setValue] = React.useState('');

    const userLocalData = JSON.parse(localStorage.getItem('assigned_data'));

    const [updateData, setupdateData] = useState(false);
    const [showLoader, setShowLoader] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 10;

    const [orderCreate, setCreateOrder] = useState([]);
    const [searchTerm, setSearchTerm] = useState('All');

    const [agent, setAgent] = useState('');

    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0);
    const [rowsPerPageOptions, setRowsPerPageOptions] = useState([10, 25, 50]); // Dynamic options
    const totalRows = 100; // Example total row count



    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        const newRowsPerPage = parseInt(event.target.value, 10);
        setRowsPerPage(newRowsPerPage);
        setPage(0); // Reset to the first page

        // Optionally update the options dynamically
        if (!rowsPerPageOptions.includes(newRowsPerPage)) {
            setRowsPerPageOptions([...rowsPerPageOptions, newRowsPerPage].sort((a, b) => a - b));
        }
    };



    const fetchData = async () => {
        try {
            setShowLoader(true);
            const orderResponse = await getAllAayoutRequests(searchTerm === 'All' ? '' : searchTerm, page + 1, agent, value);
            console.log(orderResponse, "Payout")
            if (orderResponse?.status === 200 && orderResponse?.data?.results)
                setShowLoader(false);
            setCreateOrder(orderResponse?.data.results);
            setTotalPages(orderResponse.data.count);
        } catch (err) {
            console.log(err);
            setShowLoader(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [searchTerm, page + 1, agent, updateData, value]);

    const handleStatusCode = () => {
        fetchData();
    };


    // Handle input change
    const handleInputChange = (value) => {
        console.log(value)
        setSearchTerm(value);
    };

    const handleChange = (event, newValue) => {
        setSearchTerm(newValue)
    };


    const theme = useTheme();
    const isXsScreen = useMediaQuery(theme.breakpoints.only('xs'));
    const menuScreenSize = useMediaQuery(theme.breakpoints.down('md'));


    // Search Input on small screen 
    const [showInput, setShowInput] = useState(false);
    const inputRef = React.useRef(null);

    const handleSearchClick = () => {
        setShowInput((prev) => !prev);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            console.log('Input entered:', searchTerm);
            setShowInput(false);
        }
    };
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (inputRef.current && !inputRef.current.contains(event.target)) {
                setShowInput(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

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
                                <Typography flexGrow={1} variant={isXsScreen ? "h3" : "h2"}>Welcome to  PayOut Operations</Typography>
                                <Notification />
                            </Grid>
                        </Grid>
                        {!menuScreenSize && (
                            <Grid item xs={12} md={6} lg={5} sx={{ display: 'flex', alignItems: 'center', }}>
                                <OutlinedInput
                                    onChange={(e) => handleInputChange(e.target.value)}
                                    placeholder="Search"
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <SearchIcon style={{ color: '#3B82F6' }} value={searchTerm === 'All' ? '' : searchTerm} />
                                        </InputAdornment>
                                    }
                                    sx={{
                                        width: '100%',
                                        backgroundColor: '#fff',
                                        borderRadius: '24px',
                                        padding: '6px 16px',
                                        '& .MuiOutlinedInput-notchedOutline': {
                                            border: 'none',
                                        },
                                        '&:hover .MuiOutlinedInput-notchedOutline': {
                                            border: 'none',
                                        },
                                        '&.Mui-focused': {
                                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                                        },
                                    }}
                                />
                            </Grid>
                        )}
                    </Grid>
                </Grid>

                {/* Row 2 */}
                <Grid item xs={12} md={12} lg={12}>
                    <Box sx={{ width: '100%', typography: 'body1' }}>
                        <TabContext value={searchTerm}>
                            <Box sx={{}}>
                                <Grid container >
                                    <Grid item xs={5} md={8} sx={{ display: { xs: 'flex', md: 'block' }, justifyContent: { xs: 'start', md: 'unset' }, }}>
                                        {menuScreenSize ?
                                            <Select value={searchTerm} onChange={(e) => { handleChange(e, e.target.value) }} sx={{ backgroundColor: '#fff', borderRadius: '4px', border: 'none', boxShadow: 'none', '&:hover': { border: 'none', boxShadow: 'none', }, '&.Mui-focused': { border: 'none', boxShadow: 'none', }, '& .MuiOutlinedInput-notchedOutline': { border: 'none', }, '&:focus-visible': { outline: 'none', }, '&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { border: 'none', }, }} >
                                                <MenuItem value="All">All</MenuItem>
                                                <MenuItem value="Created">CREATED</MenuItem>
                                                <MenuItem value="Pending">PENDING</MenuItem>
                                                <MenuItem value="Approved">APPROVED</MenuItem>
                                                <MenuItem value="Expired">EXPIRED</MenuItem>
                                                <MenuItem value="Declined">DENIED</MenuItem>
                                            </Select>
                                            :
                                            <TabList
                                                onChange={handleChange}
                                                aria-label="customized tabs"
                                                sx={{
                                                    '& .MuiTab-root': {
                                                        textTransform: 'none',
                                                        px: 2.5,
                                                        backgroundColor: '#fff',
                                                        borderRadius: '10px',
                                                        color: '#ADA7A7',
                                                        marginRight: 1,
                                                        minWidth: 'fit-content',
                                                        transition: 'background-color 0.3s',
                                                        '&:hover': {
                                                            backgroundColor: '#2C6DB5',
                                                            color: '#ffffff',
                                                        },
                                                        '&:active': {
                                                            backgroundColor: '#2C6DB5',
                                                            color: '#ffffff',
                                                        }
                                                    },
                                                    '& .Mui-selected': {
                                                        backgroundColor: '#2C6DB5',
                                                        color: '#ffffff !important',
                                                        borderRadius: '10px',
                                                    },
                                                    '& .MuiTabs-indicator': {
                                                        backgroundColor: 'transparent',
                                                    },
                                                }}
                                            >
                                                <Tab label="All" value="All" />
                                                <Tab label="Assigned" value="ASSIGNED" />
                                                <Tab label="Approved" value="APPROVED" />
                                                <Tab label="Created" value="CREATED" />
                                            </TabList>
                                        }
                                    </Grid>
                                    <Grid item xs={7} md={4} display='flex' justifyContent='end' alignItems='center' >
                                        <Button component={Link} to='/createPayOutOperations' disableRipple sx={{
                                            minWidth: 'fit-content', textTransform: 'none', borderRadius: '32px', px: 4, mx: 0.5, py: 1, fontSize: '14px', fontWeight: 500,
                                            backgroundColor: '#DDE7F3', color: '#2C6DB5', boxShadow: 'none', border: 'none', outline: 'none',
                                            '&:hover, &:active, &:focus': { backgroundColor: '#DDE7F3', color: '#2C6DB5', boxShadow: 'none', }, '&:focus-visible': { outline: 'none', boxShadow: 'none' }, '&.MuiOutlinedInput - notchedOutline': { borderColor: 'transparent', }, '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'transparent', },
                                        }}>
                                            + Create PayOut Order
                                        </Button>
                                        <Grid position='relative'>
                                            {menuScreenSize && (
                                                <Button disableRipple sx={{ minWidth: 'fit-content', textTransform: 'none', borderRadius: '32px', px: 1.2, mx: 0.5, py: 1, fontSize: '14px', fontWeight: 500, backgroundColor: '#DDE7F3', color: '#2C6DB5', boxShadow: 'none', border: 'none', outline: 'none', '&:hover, &:active, &:focus': { backgroundColor: '#DDE7F3', color: '#2C6DB5', boxShadow: 'none', }, '&:focus-visible': { outline: 'none', boxShadow: 'none' }, '&.MuiOutlinedInput-notchedOutline': { borderColor: 'transparent' }, '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'transparent' }, }} onClick={handleSearchClick} >
                                                    <SearchIcon />
                                                </Button>
                                            )}

                                            {menuScreenSize && showInput && (
                                                <OutlinedInput ref={inputRef} value={searchTerm === 'All' ? '' : searchTerm} onChange={(e) => setSearchTerm(e.target.value)} onKeyDown={handleKeyDown} autoFocus placeholder="Search" startAdornment={
                                                    <InputAdornment position="start">
                                                        <SearchIcon style={{ color: '#3B82F6' }} />
                                                    </InputAdornment>
                                                }
                                                    sx={{ position: 'absolute', top: 50, transform: 'translateX(-100%)', zIndex: 10, width: '38vh', backgroundColor: '#fff', borderRadius: '24px', padding: '6px 16px', '& .MuiOutlinedInput-notchedOutline': { border: 'none', }, '&:hover .MuiOutlinedInput-notchedOutline': { border: 'none', }, '&.Mui-focused': { boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)', }, }}
                                                />
                                            )}
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Box>
                            <TabPanel value={searchTerm}
                                sx={{
                                    p: 0, py: 2
                                }}>
                                <PayOutOperationData payOutData={orderCreate} onSendStatusCode={handleStatusCode} />
                            </TabPanel>
                        </TabContext>
                    </Box>
                </Grid>

                <TablePagination rowsPerPageOptions={rowsPerPageOptions} rowsPerPage={rowsPerPage} page={page} count={totalPages} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage} />


            </Grid>
        </>
    );
}
