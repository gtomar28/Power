import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Grid, Typography, Button, Stack, OutlinedInput, MenuItem, Select, Snackbar, Alert } from '@mui/material';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import { getAgentsById, updateAgentsById } from 'api/api';

const UserDetailsForm = ({ userId }) => {

    console.log(userId)
    const token = "Token b6dd7cf6689b818350024b495ecebafe862e946b"
    const { register, handleSubmit, setValue, reset, watch } = useForm();

    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [isEditable, setIsEditable] = useState(false);

    const [ name, setname ] = useState();
    const [ username, setusername ] = useState();
    const [ email, setemail ] = useState();
    const [ password, setpassword ] = useState();
    const [ phone_number, setphone_number ] = useState();
    const [ is_blocked, setis_blocked ] = useState();

    useEffect(() => {
        getUserData();
    }, [token, setValue])

    const getUserData = async () => {
        try {
            const response = await getAgentsById(userId);
            console.log(response, "Dash Statics ")
            if (response?.status === 200) {
                setValue('name', response?.data?.personal_details?.name);
                setname(response?.data?.personal_details?.name);
                setValue('username', response?.data?.personal_details?.username);
                setusername(response?.data?.personal_details?.username);
                setValue('email', response?.data?.personal_details?.email);
                setemail(response?.data?.personal_details?.email);
                setValue('password', '**********');
                setpassword('**********');
                setValue('phone_number', response?.data?.personal_details?.phone_number);
                setphone_number(response?.data?.personal_details?.phone_number);
                setValue('is_blocked', response?.data?.personal_details?.is_checked_in);
                setis_blocked(response?.data?.personal_details?.is_checked_in);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const onSubmit = async (data) => {
        try {
            const formData = new FormData();

            if (data.name !== name) formData.append('name', data?.name);
            if (data.username !== username) formData.append('username', data?.username);
            if (data.email !== email) formData.append('email', data?.email);
            if (data.password !== password) formData.append('password', data?.password);
            if (data.phone_number !== phone_number) formData.append('phone_number', data?.phone_number);
            if (data.is_blocked !== is_blocked) formData.append('is_blocked', data?.is_blocked);

            const response = await updateAgentsById(userId, formData);

            if (response?.status === 200) {
                console.log('Data updated successfully:', response.data);
                setOpenSnackBar(true);
                setIsEditable(false);
            }
        } catch (error) {
            console.error('Error saving data:', error);
        }
    };


    const handleUpdateClick = () => {
        if (isEditable) {
            handleSubmit(onSubmit)();
        } else {
            setIsEditable(true);
        }
    };

    const handleCancelClick = () => {
        setIsEditable(false);
    };


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid item xs={12}>
                <Grid container sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography textAlign="center" variant="h5">
                        User Details
                    </Typography>
                    <Grid>
                        {!isEditable ? (
                            <Button variant="outlined" onClick={handleUpdateClick} sx={{ cursor: 'pointer', border: '1px solid #2C6DB5', borderRadius: '34px', px: 4, py: 1, color: '#2C6DB5' }} >
                                <DriveFileRenameOutlineIcon /> Update
                            </Button>
                        ) : (
                            <>
                                <Button variant="outlined" type="submit" sx={{ border: '1px solid #2C6DB5', borderRadius: '34px', px: 4, color: '#2C6DB5', marginRight: 2, }} >
                                    Save
                                </Button>
                                <Button variant="outlined" onClick={handleCancelClick} sx={{ border: '1px solid #d32f2f', borderRadius: '34px', px: 4, color: '#d32f2f', }} >
                                    Cancel
                                </Button>
                            </>
                        )}
                    </Grid>
                </Grid>
            </Grid>
            <Grid
                item
                xs={12}
                alignSelf="center"
                sx={{
                    backgroundColor: '#F6F8FC',
                    borderRadius: '15px',
                    p: 2,
                    mt: 2,
                }}
            >
                <Grid container columnSpacing={2} rowSpacing={1.5}>
                    <Grid item xs={12} md={6}>
                        <Stack spacing={1}>
                            <Typography sx={{ color: '#929292', fontWeight: 'bold' }}>Name</Typography>
                            <OutlinedInput {...register('name', { required: 'Name is required' })} disabled={!isEditable} sx={{ mb: 2, width: '100%', boxShadow: 'none', backgroundColor: '#fff', border: 'none', borderRadius: '15px', '&.Mui-focused': { boxShadow: 'none', border: 'none' }, '&:hover': { border: 'none' }, }} />
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Stack spacing={1}>
                            <Typography sx={{ color: '#929292', fontWeight: 'bold' }}>Username</Typography>
                            <OutlinedInput {...register('username', { required: 'Username is required' })} disabled={!isEditable} sx={{ mb: 2, width: '100%', boxShadow: 'none', backgroundColor: '#fff', border: 'none', borderRadius: '15px', '&.Mui-focused': { boxShadow: 'none', border: 'none' }, '&:hover': { border: 'none' }, }} />
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Stack spacing={1}>
                            <Typography sx={{ color: '#929292', fontWeight: 'bold' }}>Email</Typography>
                            <OutlinedInput {...register('email', { required: 'Email is required', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email address', }, })} disabled={!isEditable} sx={{ mb: 2, width: '100%', boxShadow: 'none', backgroundColor: '#fff', border: 'none', borderRadius: '15px', '&.Mui-focused': { boxShadow: 'none', border: 'none' }, '&:hover': { border: 'none' }, }} />
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Stack spacing={1}>
                            <Typography sx={{ color: '#929292', fontWeight: 'bold' }}>Password</Typography>
                            <OutlinedInput type="text" {...register('password', { required: 'Password is required' })} disabled={!isEditable} sx={{ mb: 2, width: '100%', boxShadow: 'none', backgroundColor: '#fff', border: 'none', borderRadius: '15px', '&.Mui-focused': { boxShadow: 'none', border: 'none' }, '&:hover': { border: 'none' }, }} />
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Stack spacing={1}>
                            <Typography sx={{ color: '#929292', fontWeight: 'bold' }}>Phone Number</Typography>
                            <OutlinedInput {...register('phone_number', { required: 'Phone number is required', pattern: { value: /^\d+$/, message: 'Phone number must contain only digits', }, minLength: { value: 10, message: 'Phone number must be 10 digits', }, maxLength: { value: 10, message: 'Phone number must be 10 digits', }, })} disabled={!isEditable} sx={{ mb: 2, width: '100%', boxShadow: 'none', backgroundColor: '#fff', border: 'none', borderRadius: '15px', '&.Mui-focused': { boxShadow: 'none', border: 'none' }, '&:hover': { border: 'none' }, }} />
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Stack spacing={1}>
                            <Typography sx={{ color: '#929292', fontWeight: 'bold' }}>Status</Typography>
                            <Select 
                                {...register('is_blocked', { required: 'Status is required' })}
                                value={watch('is_blocked') ?? ""} // Ensure correct default value
                                onChange={(e) => setValue('is_blocked', e.target.value)} // Update form value
                                disabled={!isEditable}
                                sx={{ mb: 2, width: '100%', backgroundColor: '#fff', border: 'none', borderRadius: '15px', }} >
                                <MenuItem value="">Select</MenuItem>
                                <MenuItem value={true}>Active</MenuItem>
                                <MenuItem value={false}>Inactive</MenuItem>
                            </Select>
                        </Stack>
                    </Grid>
                </Grid>
            </Grid>


            <Snackbar open={openSnackBar} autoHideDuration={6000} onClose={() => setOpenSnackBar(false)}>
                <Alert
                    onClose={() => setOpenSnackBar(false)}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Data Updated Successfully
                </Alert>
            </Snackbar>
        </form>
    );
};

export default UserDetailsForm;
