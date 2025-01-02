import bellNotification from 'assets/images/bellNotification.svg';
import { OutlinedInput, InputAdornment, Stack, IconButton, useTheme, useMediaQuery, } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { addNewClient } from 'api/api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';
import CloseIcon from '@mui/icons-material/Close';
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Button, Grid, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import Notification from 'layout/Dashboard/Header/HeaderContent/Notification';

const inputStyles = (error) => ({
    mb: 2,
    width: '100%',
    boxShadow: 'none',
    backgroundColor: '#fff',
    borderRadius: '15px',
    border: error ? '1px solid red' : 'none',
    '&.Mui-focused': {
        borderColor: error ? '#ff4d4f' : '#e0e0e0',
        boxShadow: 'none',
        border: 'none',
    },
    '&:hover': {
        borderColor: error ? '#ff4d4f' : '#e0e0e0',
        border: 'none',
    },
});

export default function CreateMerchant() {

    const navigate = useNavigate()
    const [openDialog, setOpenDialog] = useState(false);

    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm();

    const userLocalData = JSON.parse(localStorage.getItem('assigned_data'));
    console.log(userLocalData)

    const [merchantData, setMerchantData] = useState({
        'ID': '',
        'Name': '',
        "Phone Number": '',
        "Email ID": '',
        'Domain': '',
        "API Key": '',
        'Active': '',
        "Created At": '',
    })

    const onSubmit = async (data) => {
        const jsonData = {
            "name": data?.name,
            "phone_number": data?.phone_number,
            "email": data?.email,
            "domain": data?.Domain,
        }
        console.log(jsonData)
        try {
            const response = await addNewClient(jsonData);
            console.log(response, "Create User")
            if (response.status === 201) {
                // toast.success("Merchant Created Successfully");
                setOpenDialog(true)
                setTimeout(() => {
                    setOpenDialog(false)
                    navigate('/products')
                }, 5000);
                setMerchantData({
                    'ID': response?.data?.client?.id,
                    'Name': response?.data?.client?.name,
                    "Phone Number": response?.data?.client?.phone_number,
                    "Email ID": response?.data?.client?.email,
                    'Domain': response?.data?.client?.domain,
                    "API Key": response?.data?.client?.api_key,
                    'Active': response?.data?.client?.is_active ? 'True' : 'False',
                    "Created At": response?.data?.client?.created_at,
                })
            }
            else {
                toast.error('Facing some issue');
            }
        } catch (err) {
            console.log(err, 'errror');
        }
    };

    const handlePhoneChange = (value) => {
        setValue('phone_number', value); // Set the value for react-hook-form
    };

    const handleCloseDialog = () => {
        setOpenDialog(false)
    }

    const phoneNo = watch('phone_number')

    const theme = useTheme();
    const isXsScreen = useMediaQuery(theme.breakpoints.only('xs'));

    return (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            <Grid item xs={12} sx={{ mb: -2.25 }}>
                <Typography variant="h5" sx={{ color: '#828282', textTransform: 'capitalize' }}>
                    Hi {userLocalData?.name},
                </Typography>
                <Grid container sx={{ display: 'flex' }}>
                    <Grid item xs={12} lg={7} alignSelf='center'>
                        <Grid sx={{ display: 'flex' }}>
                            <Typography flexGrow={1} variant={isXsScreen ? "h3" : "h2"}>Welcome to Create Merchant</Typography>
                            <Notification />
                        </Grid>
                    </Grid>
                    <Grid item xs={12} lg={5} sx={{ display: 'flex', alignItems: 'center' }}>
                        {/* <img src={bellNotification} alt="bellNotification" /> */}
                        {/* <OutlinedInput placeholder="Search" startAdornment={<InputAdornment position="start"> <SearchIcon style={{ color: '#3B82F6' }} /> </InputAdornment>} sx={{ ml: 2, width: '100%', backgroundColor: '#fff', borderRadius: '24px', padding: '6px 16px', '& .MuiOutlinedInput-notchedOutline': { border: 'none', }, '&:hover .MuiOutlinedInput-notchedOutline': { border: 'none', }, '&.Mui-focused': { boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)', }, }} /> */}
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} md={6}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container sx={{ backgroundColor: '#fff', borderRadius: '15px', px: 2 }}>
                        <Grid item xs={12} p={2}>
                            <Typography variant="h5">
                                Personal Details
                            </Typography>
                            <Grid container rowSpacing={1.5} columnSpacing={1.5} sx={{ backgroundColor: '#F6F8FC', borderRadius: '15px', p: 1, mt: 2 }} >
                                <Grid item xs={12} md={12}>
                                    <Stack spacing={1}>
                                        <Typography sx={{ color: '#929292', fontWeight: 'bold' }}>Name</Typography>
                                        <OutlinedInput {...register('name', { required: 'Name is required', minLength: { value: 3, message: 'Name must be at least 3 characters' }, })} placeholder="Enter your name"
                                            sx={inputStyles(errors.name)} />
                                        {errors.name && (
                                            <Typography color="error" variant="caption">
                                                {errors.name.message}
                                            </Typography>
                                        )}
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <Stack spacing={1}>
                                        <Typography sx={{ color: '#929292', fontWeight: 'bold' }}>Email ID</Typography>
                                        <OutlinedInput {...register('email', { required: 'Email is required', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email address' }, })} placeholder="Enter your email"
                                            sx={inputStyles(errors.email)} />
                                        {errors.email && (
                                            <Typography color="error" variant="caption">
                                                {errors.email.message}
                                            </Typography>
                                        )}
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <Stack spacing={1}>
                                        <Typography sx={{ color: '#929292', fontWeight: 'bold' }}>Phone Number</Typography>
                                        <PhoneInput
                                            country={'in'}
                                            value={phoneNo}
                                            onChange={handlePhoneChange}
                                            inputStyle={{
                                                width: '100%',
                                                borderColor: errors.phone_number ? 'red' : '#d9d9d9',
                                                borderRadius: '15px',
                                                height: '42px',
                                                '&.flag-dropdown': {
                                                    borderRadius: '15px 0px 0px 15px !important',
                                                }
                                            }}
                                            dropdownStyle={{
                                                zIndex: 1000,
                                                borderRadius: '10px',
                                            }}
                                        />
                                        {errors.phone_number && (
                                            <Typography color="error" variant="caption">
                                                {errors.phone_number.message}
                                            </Typography>
                                        )}
                                        <Typography variant="caption" sx={{ color: '#EF9644' }}>
                                            Note: Number should be linked with bank
                                        </Typography>
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <Stack spacing={1}>
                                        <Typography sx={{ color: '#929292', fontWeight: 'bold' }}>Domain</Typography>
                                        <OutlinedInput {...register('Domain', { required: 'Domain is required', pattern: { value: /^https?:\/\/([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/, message: 'Invalid domain format. Example: https://example.com', }, })} placeholder="Enter your Domain"
                                            sx={inputStyles(errors.Domain)} />
                                        {errors.Domain && (
                                            <Typography color="error" variant="caption">
                                                {errors.Domain.message}
                                            </Typography>
                                        )}
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid container sx={{ p: 1, m: 2 }}>
                            <Grid item xs={2} md={1} display='flex' justifyContent='end' alignItems='center'></Grid>
                            <Grid item xs={8} md={10} display='flex' justifyContent='center' alignItems='center'>
                                <Button type="submit" disableRipple sx={{
                                    minWidth: '100%', textTransform: 'none', borderRadius: '32px', px: 6, mx: 0.5, py: 1, fontSize: '14px', fontWeight: 500,
                                    backgroundColor: '#2C6DB5', color: '#fff', boxShadow: 'none', border: 'none', outline: 'none',
                                    '&:hover, &:active, &:focus': { backgroundColor: '#2C6DB5', color: '#fff', boxShadow: 'none', }, '&:focus-visible': { outline: 'none', boxShadow: 'none' }, '&.MuiOutlinedInput - notchedOutline': { borderColor: 'transparent', }, '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'transparent', },
                                }}>
                                    Publish User
                                </Button>
                            </Grid>
                            <Grid item xs={2} md={1} display='flex' justifyContent='end' alignItems='center'></Grid>
                            <Grid item >
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </Grid>


            {/* Success Modal */}

            <Dialog open={openDialog} onClose={handleCloseDialog}
                aria-labelledby="customized-dialog-title"
                maxWidth="xs"
                fullWidth
                sx={{
                    '& .MuiDialog-paper': {
                        borderRadius: '24px 24px 24px 24px',
                    },
                }}
            >
                <DialogTitle sx={{ m: 1.2, mb: 0, p: 2, borderRadius: '24px 24px 0px 0px', display: 'flex', flexDirection: 'column' }} id="customized-dialog-title">
                    <Typography sx={{ textAlign: 'start' }}> New Merchant has been Created successfully </Typography>
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={() => setOpenDeclineModal(false)}
                    sx={(theme) => ({
                        position: 'absolute',
                        right: 18,
                        top: 18,
                        color: theme.palette.grey[500],
                    })}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent sx={{ m: 1.2, mt: 0, mb: 0, p: 0, display: 'flex', flexDirection: 'column' }}>
                    <Grid
                        container
                        spacing={2}
                        sx={{
                            borderTop: '1px dashed #ddd',
                            borderBottom: '1px dashed #ddd',
                            borderRadius: '8px',
                            maxWidth: '400px',
                            margin: 'auto',
                            pb: 2,
                            backgroundColor: '#fff',
                        }}
                    >
                        {Object.entries(merchantData).map(([key, value]) => (
                            <>
                                <Grid item xs={4} key={key}>
                                    <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'start' }}>
                                        {key}
                                    </Typography>
                                </Grid>
                                <Grid item xs={8}>
                                    <Typography variant="body2" sx={{ textAlign: 'end', fontWeight: '900' }}>
                                        {value}
                                    </Typography>
                                </Grid>
                            </>
                        ))}
                    </Grid>
                </DialogContent>
                <DialogActions sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
                    <Button
                        variant="contained"
                        component={Link}
                        to='/products'
                        onClick={handleCloseDialog}
                        sx={{
                            backgroundColor: '#929292',
                            borderRadius: '20px',
                            px: 4,
                            '&:hover': { backgroundColor: '#7a7a7a' },
                        }}
                    >
                        Close
                    </Button>
                </DialogActions>
            </Dialog>


        </Grid>
    );
}
