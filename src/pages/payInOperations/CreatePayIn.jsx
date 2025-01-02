
// neww 
import React, { useState, useEffect } from 'react';
import { OutlinedInput, Button, Grid, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import { toast } from 'react-hot-toast';
import { createOrder } from 'api/api';
import Notification from 'layout/Dashboard/Header/HeaderContent/Notification';
import HashLoader from 'components/HashLoader';

export default function CreatePayIn() {
    const navigate = useNavigate();
    const userLocalData = JSON.parse(localStorage.getItem('assigned_data') || '{}');
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
            amount: parseFloat(data.amount),
        };

        const hmac = CryptoJS.HmacSHA256(JSON.stringify(requestData), secretKey).toString();

        try {
            setShowLoader(true);
            const response = await createOrder(requestData, hmac);

            if (response?.status === 201) {
                setOrderId(response.data?.order_id);
                setAmount('');
                toast.success('Order Created Successfully');
                navigate('/payInOperations');
            } else {
                toast.error('Failed to create the order. Please try again.');
            }
        } catch (err) {
            const errorMessage = err?.response?.data?.[0] || 'An unexpected error occurred.';
            toast.error(errorMessage);
        } finally {
            setShowLoader(false);
        }
    };

    useEffect(() => {
        if (!orderId) return;

        const socket = new WebSocket(`wss://auth2.upicollect.com/ws/order_status/${orderId}/?token=${token}`);

        const onSocketMessage = (event) => {
            const data = JSON.parse(event.data);
            console.log('WebSocket Message:', data);
        };

        socket.addEventListener('message', onSocketMessage);

        socket.onopen = () => console.log('WebSocket connection established');
        socket.onclose = () => console.log('WebSocket connection closed');
        socket.onerror = (error) => console.error('WebSocket error:', error);

        return () => {
            socket.removeEventListener('message', onSocketMessage);
            socket.close();
        };
    }, [orderId, token]);

    return (
        <>
            {showLoader && <HashLoader />}
            <Grid container rowSpacing={4.5} columnSpacing={2.75}>
                {/* Header */}
                <Grid item xs={12} sx={{ mb: -2.25 }}>
                    <Typography variant="h5" sx={{ color: '#828282', textTransform: 'capitalize' }}>
                        Hi {userLocalData?.name},
                    </Typography>
                    <Grid container>
                        <Grid item xs={12} lg={7}>
                            <Grid container alignItems="center">
                                <Typography flexGrow={1} variant="h2">
                                    Welcome to Create Orders
                                </Typography>
                                <Notification />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                {/* Form Section */}
                <Grid item xs={12}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container sx={{ backgroundColor: '#fff', borderRadius: '15px', p: 3 }}>
                            <Typography variant="h5">Enter Details to Create Order</Typography>
                            <Grid container sx={{ backgroundColor: '#F6F8FC', borderRadius: '15px', p: 1, mt: 2 }}>
                                {/* Amount Input */}
                                <Grid item xs={12}>
                                    <Grid fullWidth sx={{ m: 2 }}>
                                        <Typography sx={{ color: '#929292', fontWeight: 'bold' }}>Amount</Typography>
                                        <OutlinedInput
                                            id="amount"
                                            placeholder="Enter Amount"
                                            sx={{
                                                mb: 2,
                                                width: '100%',
                                                backgroundColor: '#fff',
                                                borderRadius: '15px',
                                                '&.Mui-focused': { boxShadow: 'none' },
                                                '&:hover': { boxShadow: 'none' },
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

                                {/* Submit Button */}
                                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                                    <Button
                                        type="submit"
                                        disableRipple
                                        sx={{
                                            textTransform: 'none',
                                            borderRadius: '32px',
                                            px: 6,
                                            py: 1,
                                            fontSize: '14px',
                                            fontWeight: 500,
                                            backgroundColor: '#2C6DB5',
                                            color: '#fff',
                                            '&:hover': { backgroundColor: '#2C6DB5' },
                                        }}
                                    >
                                        Create Order
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
            </Grid>
        </>
    );
}
