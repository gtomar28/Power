
import bellNotification from 'assets/images/bellNotification.svg';
import { OutlinedInput, InputAdornment, Box, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Typography, Grid } from '@mui/material';
import ProductDataCards from 'components/cards/statistics/ProductDataCards';
import ProductCards from 'components/cards/statistics/ProductCards';
import { useState, useEffect } from 'react';
import { clientDetails, graphData } from '../../api/api';
import { toast } from 'react-hot-toast';
import Notification from 'layout/Dashboard/Header/HeaderContent/Notification';
import HashLoader from 'components/HashLoader';
import { Link } from 'react-router-dom';


export default function ProductsDefault() {

    const userLocalData = JSON.parse(localStorage.getItem('assigned_data'));
    const [clientDetail, setclientDetail] = useState([]);

    const Details = async () => {
        try {
            const response = await clientDetails();
            console.log(response, "Details");
            if (response?.status === 200) {
                setclientDetail(response?.data);
            }
        } catch (err) {
            console.error(err);
            toast.error(err?.response?.data?.error || 'Error creating payment');
        }
    };

    const [graphDat, setGraphData] = useState('');
    const [showLoader, setShowLoader] = useState(false);
    const [year, setYear] = useState(2024);
    const [type, setType] = useState('');
    const [Statics, setStatics] = useState('');
    const [adminDetails, setAdminDetails] = useState([]);

    const fetchData = async () => {
        try {
            setShowLoader(true);
            const orderResponse = await graphData(year, type);
            console.log(orderResponse, "OrderGraphData")
            if (orderResponse?.status === 200)
                setShowLoader(false);
            setGraphData(orderResponse?.data?.graph_data);
            setStatics(orderResponse?.data);
            setAdminDetails(orderResponse?.data?.Hierarchy)
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchData();
        Details();
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
                            <Grid sx={{ display: 'flex' }}>
                                <Typography flexGrow={1} variant="h2">Welcome to  Products</Typography>
                                <Notification />
                            </Grid>
                        </Grid>
                        <Grid item xs={12} lg={5} sx={{ display: 'flex', alignItems: 'center', }}>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sx={{'&.MuiGrid-item': {pt:4}, display:'flex'}}>
                    <Grid container display='flex'>
                        <Grid xs={12} sm={6} lg={8}>
                            <Box sx={{ width: {sm:'fit-content', xs: '100%'}, backgroundColor: "#fff", borderRadius: "10px", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", padding: "16px", border: '1px solid #E3E3E3' }} >
                                <Typography variant="h4" sx={{ m: 0 }} >
                                    Total Revenue: INR {Statics?.wallet}
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid xs={12} sm={6} lg={4} display='flex' justifyContent='end' sx={{ mt: {sm:0, xs:2}}}>
                            <Box sx={{ width: { sm: 'fit-content', xs: '100%' }, backgroundColor: "#fff", borderRadius: "10px", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", padding: "12px", border: '1px solid #E3E3E3', display: 'flex', justifyContent: 'space-between' }} >
                                <Grid alignContent='center'>
                                    <Typography variant="body" color="textSecondary">Total Merchant: </Typography>
                                    <Typography variant="body">24</Typography>
                                </Grid>
                                <Button component={Link} to='/createMerchant' disableRipple sx={{
                                    minWidth: 'fit-content', textTransform: 'none', borderRadius: '32px', px: 2, ml: 1, py: 0.7, fontSize: '14px', fontWeight: 500,
                                    backgroundColor: '#F2F6FC', border: '1px solid #2C6DB5', color: '#2C6DB5', boxShadow: 'none',
                                    '&:hover, &:active, &:focus': { backgroundColor: '#F2F6FC', border: '1px solid #2C6DB5', color: '#2C6DB5', boxShadow: 'none', }, '&:focus-visible': { outline: 'none', boxShadow: 'none' }, '&.MuiOutlinedInput - notchedOutline': { borderColor: 'transparent', }, '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'transparent', },
                                }}> + Create New Merchant </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}  sx={{'&.MuiGrid-item': {pt:4}}}>
                    <ProductCards Statics={Statics} clientDetail={clientDetail} />
                </Grid>

                <Grid item xs={12}  sx={{'&.MuiGrid-item': {pt:4}}}>
                    <ProductDataCards clientDetail={clientDetail} />
                </Grid>

            </Grid>
        </>
    );
}
