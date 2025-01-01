import bellNotification from 'assets/images/bellNotification.svg';
import { OutlinedInput, InputAdornment, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Typography, Grid } from '@mui/material';
import { useNavigate } from 'react-router';
import React, { useState, useEffect } from 'react';
import CryptoJS from 'crypto-js';
import { toast } from 'react-hot-toast';
import { createOrder } from 'api/api';


export default function CreatePayIn() {

    const navigate = useNavigate();

    const userLocalData = JSON.parse(localStorage.getItem('assigned_data'));

    const token = localStorage.getItem('power_token')

    const [orderId, setOrderId] = useState('');
    console.log(orderId, "Create page")

    const [showLoader, setShowLoader] = useState(false);

    const [amount, setAmount] = useState(""); // Corrected state variable name
    const [amountValidError, setAmountValidError] = useState(false);
    const [amountIsRequiredError, setamountIsRequiredError] = useState(false); // Corrected state variable name


    const handleAmount = (value) => {
        setAmount(value);
        const indianCurrencyRegex = /^(?=.*[0-9])(?:\d{1,3}(?:,\d{3})*|\d+)(?:\.\d{1,2})?$/;

        if (value === "") {
            setAmountValidError(false);
            setamountIsRequiredError(true);
        } else if (indianCurrencyRegex.test(value) === false) {
            setAmountValidError(true);
            setamountIsRequiredError(false);
        } else {
            setAmountValidError(false);
            setamountIsRequiredError(false);
        }
    };



    const secretKey = "django-insecure-t4c5!_l0l$#@@o0+#=crk84#2662ev(f6ir@#)y%pzz2r&h&k%";


    const CreatePayemnt = async () => {

        const data = {
            amount: parseFloat(amount)
        };
        const hmac = CryptoJS.HmacSHA256(JSON.stringify(data), secretKey).toString();
        try {
            setShowLoader(true)
            const response = await createOrder(data, hmac);
            console.log(response, "Create Order details")
            if (response.status === 201) {
                setOrderId(response?.data?.order_id)
                setAmount("");
                toast.success("Order Created Successfully");
                setShowLoader(false);
                navigate('/payInOperations')
            }
        } catch (err) {
            console.log(err);
            toast.error(err?.response?.data[0]);
            setShowLoader(false)
        }
    };

    useEffect(() => {
        const socket = new WebSocket(`wss://auth2.upicollect.com/ws/order_status/${orderId}/?token=${token}`);
        const onSocketMessage = (event) => {
            const data = JSON.parse(event.data);
            console.log(data, "WebSocket Data");

        };
        socket.addEventListener("message", onSocketMessage);
        socket.onopen = () => {
            console.log("WebSocket connection established");
        };
        socket.onclose = () => {
            console.log("WebSocket connection closed");
        };
        socket.onerror = (error) => {
            console.error("WebSocket error:", error);
        };
        return () => {
            socket.removeEventListener("message", onSocketMessage);
            socket.close();
        };
    }, [orderId]);


    return (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            {/* Column 1 */}
            <Grid item xs={12} sx={{ mb: -2.25 }}>
                <Typography variant="h5" sx={{ color: '#828282', textTransform: 'capitalize' }}>
                    Hi {userLocalData?.name},
                </Typography>
                <Grid container sx={{ display: 'flex' }}>
                    <Grid item xs={12} lg={7} alignSelf='center'>
                        <Typography variant="h2">Welcome to Create Orders</Typography>
                    </Grid>
                    <Grid item xs={12} lg={5} sx={{ display: 'flex', alignItems: 'center' }}>
                        <img src={bellNotification} alt="bellNotification" />
                        <OutlinedInput
                            placeholder="Search"
                            startAdornment={
                                <InputAdornment position="start">
                                    <SearchIcon style={{ color: '#3B82F6' }} />
                                </InputAdornment>
                            }
                            sx={{
                                ml: 2,
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
                </Grid>
            </Grid>
            <Grid item xs={12} >
                <Grid container sx={{ backgroundColor: '#fff', borderRadius: '15px', p: 3 }}>
                    <Typography variant="h5">
                        Enter Details to create order
                    </Typography>
                    <Grid container sx={{ backgroundColor: '#F6F8FC', borderRadius: '15px', p: 1, mt: 2 }}>
                        <Grid item xs={12} md={12} >
                            <Grid fullWidth sx={{ m: 2 }}>
                                <Typography sx={{ color: '#929292', fontWeight: 'bold' }} >Amount</Typography>
                                <OutlinedInput  value={amount} onChange={(e) => handleAmount(e.target.value)} variant="outlined" placeholder='Enter Amount' sx={{ mb: 2, width: '100%', boxShadow: 'none', backgroundColor: '#fff', border: 'none', borderRadius: '15px', '&.Mui-focused': { boxShadow: 'none', border: 'none' }, '&:hover': { border: 'none' } }} />
                            </Grid>
                        </Grid>
                        <Grid container sx={{ p: 1, m: 2 }}>
                            <Grid item xs={12} md={3} display='flex' justifyContent='end' alignItems='center'></Grid>
                            <Grid item xs={12} md={6} display='flex' justifyContent='center' alignItems='center'>
                                <Button
                                    onClick={CreatePayemnt}
                                    disableRipple sx={{
                                        minWidth: '100%', textTransform: 'none', borderRadius: '32px', px: 6, mx: 0.5, py: 1, fontSize: '14px', fontWeight: 500,
                                        backgroundColor: '#2C6DB5', color: '#fff', boxShadow: 'none', border: 'none', outline: 'none',
                                        '&:hover, &:active, &:focus': { backgroundColor: '#2C6DB5', color: '#fff', boxShadow: 'none', }, '&:focus-visible': { outline: 'none', boxShadow: 'none' }, '&.MuiOutlinedInput - notchedOutline': { borderColor: 'transparent', }, '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'transparent', },
                                    }}>
                                    Create Order
                                </Button>
                            </Grid>
                            <Grid item xs={12} md={3} display='flex' justifyContent='end' alignItems='center'></Grid>
                            <Grid item >
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>


        </Grid>
    );
}
