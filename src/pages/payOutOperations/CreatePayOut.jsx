import bellNotification from 'assets/images/bellNotification.svg';
import { OutlinedInput, InputAdornment, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Typography, Grid } from '@mui/material';
import { useNavigate } from 'react-router';
import React, { useState } from 'react';
import CryptoJS from 'crypto-js';
import { toast } from 'react-hot-toast';
import { createOrderForPayout } from 'api/api';


export default function CreatePayOut() {

    const navigate = useNavigate();
    const [showLoader, setShowLoader] = useState(false);

    const userLocalData = JSON.parse(localStorage.getItem('assigned_data'));

    const [amount, setAmount] = useState('');
    const [amountValidError, setAmountValidError] = useState(false);
    const [amountIsRequiredError, setAmountIsRequiredError] = useState(false);

    const [accountNumber, setAccountNumber] = useState('');
    const [accountNumberError, setAccountNumberError] = useState(false);
    const [accountNumberIsRequiredError, setAccountNumberIsRequiredError] = useState(false);

    const [bankName, setBankName] = useState('');
    const [bankNameError, setBankNameError] = useState(false);
    const [bankNameIsRequiredError, setBankNameIsRequiredError] = useState(false);

    const [ifsc, setIfsc] = useState('');
    const [ifscError, setIfscError] = useState(false);
    const [ifscIsRequiredError, setIfscIsRequiredError] = useState(false);

    const [clientUPI, setClientUPI] = useState('');
    const [clientUPIError, setClientUPIError] = useState(false);
    const [clientUPIIsRequiredError, setClientUPIIsRequiredError] = useState(false);

    const handleClientUPI = (value) => {
        setClientUPI(value);
        const bankNameRegex = /^[A-Za-z\s]{2,50}$/;
        if (value === '') {
            setClientUPIError(false);
            setClientUPIIsRequiredError(true);
        } else if (!bankNameRegex.test(value)) {
            setClientUPIError(true);
            setClientUPIIsRequiredError(false);
        } else {
            setClientUPIError(false);
            setClientUPIIsRequiredError(false);
        }
    };

    const handleAmount = (value) => {
        setAmount(value);
        const indianCurrencyRegex = /^(\₹)?(\d{1,2})(,\d{2})*(\.\d{1,2})?$/;
        if (value === '') {
            setAmountValidError(false);
            setAmountIsRequiredError(true);
        } else if (!indianCurrencyRegex.test(value)) {
            setAmountValidError(true);
            setAmountIsRequiredError(false);
        } else {
            setAmountValidError(false);
            setAmountIsRequiredError(false);
        }
    };

    const handleAccountNumber = (value) => {
        setAccountNumber(value);
        const regex = /^\d{9,18}$/;
        if (value === '') {
            setAccountNumberError(false);
            setAccountNumberIsRequiredError(true);
        } else if (!regex.test(value)) {
            setAccountNumberError(true);
            setAccountNumberIsRequiredError(false);
        } else {
            setAccountNumberError(false);
            setAccountNumberIsRequiredError(false);
        }
    };

    const handleBankName = (value) => {
        setBankName(value);
        const bankNameRegex = /^[A-Za-z\s]{2,50}$/;
        if (value === '') {
            setBankNameError(false);
            setBankNameIsRequiredError(true);
        } else if (!bankNameRegex.test(value)) {
            setBankNameError(true);
            setBankNameIsRequiredError(false);
        } else {
            setBankNameError(false);
            setBankNameIsRequiredError(false);
        }
    };

    const handleIfsc = (value) => {
        setIfsc(value);
        const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
        if (value === '') {
            setIfscError(false);
            setIfscIsRequiredError(true);
        } else if (!ifscRegex.test(value)) {
            setIfscError(true);
            setIfscIsRequiredError(false);
        } else {
            setIfscError(false);
            setIfscIsRequiredError(false);
        }
    };

    const secretKey = "django-insecure-t4c5!_l0l$#@@o0+#=crk84#2662ev(f6ir@#)y%pzz2r&h&k%";


    const register = async () => {
        if (amount === '' || !amount) setAmountIsRequiredError(true);
        if (accountNumber === '') setAccountNumberIsRequiredError(true);
        if (bankName === '') setBankNameIsRequiredError(true);
        if (ifsc === '') setIfscIsRequiredError(true);

        if (amount && accountNumber && bankName && ifsc) {
            const data = { account_number: accountNumber, amount: parseFloat(amount), bank_name: bankName, client_upi: clientUPI, ifsc: ifsc };
            let jsonString = JSON.stringify(data);
            jsonString = jsonString.replace(/\s+/g, ''); 

            console.log(jsonString, "payload");

            const hmac = CryptoJS.HmacSHA256(jsonString, secretKey).toString();
            try {
                setShowLoader(true);
                const response = await createOrderForPayout(JSON.parse(jsonString), hmac);
                if (response.status === 200) {
                    setAmount('');
                    setAccountNumber('');
                    setBankName('');
                    setIfsc('');
                    setShowLoader(false);
                    toast.success('Order Created Successfully');
                    navigate('/payOutOperations');
                }
            } catch (err) {
                console.log(err);
                setShowLoader(false);
            }
        }
    };




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
                        <Grid item xs={12} md={6} >
                            <Grid fullWidth sx={{ m: 2 }}>
                                <Typography sx={{ color: '#929292', fontWeight: 'bold' }}>Amount</Typography>
                                <OutlinedInput value={amount} onChange={(e) => handleAmount(e.target.value)} variant="outlined" placeholder='' sx={{ mb: 2, width: '100%', boxShadow: 'none', backgroundColor: '#fff', border: 'none', borderRadius: '15px', '&.Mui-focused': { boxShadow: 'none', border: 'none' }, '&:hover': { border: 'none' } }} />
                                <Typography sx={{ color: '#929292', fontWeight: 'bold' }}>Bank Name</Typography>
                                <OutlinedInput value={bankName} onChange={(e) => handleBankName(e.target.value)} variant="outlined" placeholder='' sx={{ mb: 2, width: '100%', boxShadow: 'none', backgroundColor: '#fff', border: 'none', borderRadius: '15px', '&.Mui-focused': { boxShadow: 'none', border: 'none' }, '&:hover': { border: 'none' } }} />
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={6} >
                            <Grid fullWidth sx={{ m: 2 }}>
                                <Typography sx={{ color: '#929292', fontWeight: 'bold' }}>Account Number</Typography>
                                <OutlinedInput value={accountNumber} onChange={(e) => handleAccountNumber(e.target.value)} variant="outlined" placeholder='' sx={{ mb: 2, width: '100%', boxShadow: 'none', backgroundColor: '#fff', border: 'none', borderRadius: '15px', '&.Mui-focused': { boxShadow: 'none', border: 'none' }, '&:hover': { border: 'none' } }} />
                                <Typography sx={{ color: '#929292', fontWeight: 'bold' }}>IFSC</Typography>
                                <OutlinedInput value={ifsc} onChange={(e) => handleIfsc(e.target.value)} variant="outlined" placeholder='' sx={{ mb: 2, width: '100%', boxShadow: 'none', backgroundColor: '#fff', border: 'none', borderRadius: '15px', '&.Mui-focused': { boxShadow: 'none', border: 'none' }, '&:hover': { border: 'none' } }} />
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={6} >
                            <Grid fullWidth sx={{ m: 2 }}>
                                <Typography sx={{ color: '#929292', fontWeight: 'bold' }}>Client UPI</Typography>
                                <OutlinedInput value={clientUPI} onChange={(e) => handleClientUPI(e.target.value)} variant="outlined" placeholder='' sx={{ mb: 2, width: '100%', boxShadow: 'none', backgroundColor: '#fff', border: 'none', borderRadius: '15px', '&.Mui-focused': { boxShadow: 'none', border: 'none' }, '&:hover': { border: 'none' } }} />
                            </Grid>
                        </Grid>
                        <Grid container sx={{ p: 1, m: 2 }}>
                            <Grid item xs={12} md={3} display='flex' justifyContent='end' alignItems='center'></Grid>
                            <Grid item xs={12} md={6} display='flex' justifyContent='center' alignItems='center'>
                                <Button disableRipple
                                    onClick={register}
                                    sx={{
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
