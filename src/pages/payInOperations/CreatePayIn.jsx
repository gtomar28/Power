import { OutlinedInput, Button, Grid, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import CryptoJS from 'crypto-js';
import { toast } from 'react-hot-toast';
import { createOrder } from 'api/api';
import Notification from 'layout/Dashboard/Header/HeaderContent/Notification';
import HashLoader from 'components/HashLoader';

export default function CreatePayIn() {
    const navigate = useNavigate();
    const userLocalData = JSON.parse(localStorage.getItem('assigned_data'));
    const token = localStorage.getItem('power_token');

    const [amount, setAmount] = useState('');
    const [orderId, setOrderId] = useState('');
    const [showLoader, setShowLoader] = useState(false);

    const secretKey = "django-insecure-t4c5!_l0l$#@@o0+#=crk84#2662ev(f6ir@#)y%pzz2r&h&k%";

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        const requestData = {
            amount: parseFloat(amount),
        };
        const hmac = CryptoJS.HmacSHA256(JSON.stringify(requestData), secretKey).toString();
        try {
            setShowLoader(true);
            const response = await createOrder(requestData, hmac);
            if (response.status === 201) {
                setOrderId(response?.data?.order_id);
                setAmount('');
                toast.success("Order Created Successfully");
                setShowLoader(false);
                navigate('/payInOperations');
            }
        } catch (err) {
            toast.error(err?.response?.data[0]);
            setShowLoader(false);
        }
    };

    useEffect(() => {
        const socket = new WebSocket(`wss://auth2.upicollect.com/ws/order_status/${orderId}/?token=${token}`);
        const onSocketMessage = (event) => {
            const data = JSON.parse(event.data);
        };
        socket.addEventListener("message", onSocketMessage);
        socket.onopen = () => console.log("WebSocket connection established");
        socket.onclose = () => console.log("WebSocket connection closed");
        socket.onerror = (error) => console.error("WebSocket error:", error);

        return () => {
            socket.removeEventListener("message", onSocketMessage);
            socket.close();
        };
    }, [orderId]);

    return (
        <>
            {showLoader && <HashLoader />}
            <Grid container rowSpacing={4.5} columnSpacing={2.75}>
                {/* Column 1 */}
                <Grid item xs={12} sx={{ mb: -2.25 }}>
                    <Typography variant="h5" sx={{ color: '#828282', textTransform: 'capitalize' }}>
                        Hi {userLocalData?.name},
                    </Typography>
                    <Grid container sx={{ display: 'flex' }}>
                        <Grid item xs={12} lg={7} alignSelf='center'>
                            <Grid sx={{ display: 'flex' }}>
                                <Typography flexGrow={1} variant="h2">Welcome to Create Orders</Typography>
                                <Notification />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container sx={{ backgroundColor: '#fff', borderRadius: '15px', p: 3 }}>
                        <Typography variant="h5">Enter Details to create order</Typography>
                        <Grid container sx={{ backgroundColor: '#F6F8FC', borderRadius: '15px', p: 1, mt: 2 }}>
                            <Grid item xs={12} md={12}>
                                <Grid fullWidth sx={{ m: 2 }}>
                                    <Typography sx={{ color: '#929292', fontWeight: 'bold' }}>Amount</Typography>
                                    <OutlinedInput
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        variant="outlined"
                                        placeholder="Enter Amount"
                                        sx={{
                                            mb: 2,
                                            width: '100%',
                                            boxShadow: 'none',
                                            backgroundColor: '#fff',
                                            border: 'none',
                                            borderRadius: '15px',
                                            '&.Mui-focused': { boxShadow: 'none', border: 'none' },
                                            '&:hover': { border: 'none' },
                                        }}
                                        {...register('amount', {
                                            required: 'Amount is required',
                                            pattern: {
                                                value: /^[0-9]*\.?[0-9]{0,2}$/,
                                                message: 'Invalid amount format',
                                            },
                                        })}
                                    />
                                    {errors.amount && (
                                        <Typography color="error" sx={{ fontSize: '12px' }}>
                                            {errors.amount.message}
                                        </Typography>
                                    )}
                                </Grid>
                            </Grid>
                            <Grid container sx={{ p: 1, m: 2 }}>
                                <Grid item xs={12} md={3} display="flex" justifyContent="end" alignItems="center"></Grid>
                                <Grid item xs={12} md={6} display="flex" justifyContent="center" alignItems="center">
                                    <Button
                                        onClick={handleSubmit(onSubmit)}
                                        disableRipple
                                        sx={{
                                            minWidth: '100%',
                                            textTransform: 'none',
                                            borderRadius: '32px',
                                            px: 6,
                                            mx: 0.5,
                                            py: 1,
                                            fontSize: '14px',
                                            fontWeight: 500,
                                            backgroundColor: '#2C6DB5',
                                            color: '#fff',
                                            boxShadow: 'none',
                                            border: 'none',
                                            outline: 'none',
                                            '&:hover, &:active, &:focus': { backgroundColor: '#2C6DB5', color: '#fff', boxShadow: 'none' },
                                            '&:focus-visible': { outline: 'none', boxShadow: 'none' },
                                        }}
                                    >
                                        Create Order
                                    </Button>
                                </Grid>
                                <Grid item xs={12} md={3} display="flex" justifyContent="end" alignItems="center"></Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}
