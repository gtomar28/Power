import bellNotification from 'assets/images/bellNotification.svg';
import { OutlinedInput, InputAdornment, Button, Stack, Select, MenuItem, useTheme, useMediaQuery } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Typography, Grid } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { CreateBank, CreateUser, clientDetails } from 'api/api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
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


export default function CreateUserPage() {

    const navigate = useNavigate()
    const role = localStorage.getItem('role')

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [showSecondSelect, setShowSecondSelect] = useState(false);
    const [selectedRole, setSelectedRole] = useState('');
    const [clientData, setClientData] = useState(false);

    const handleRoleChange = (event) => {
        console.log(event.target.value)
        setSelectedRole(event.target.value);
        if (userLocalData?.is_superadmin && event.target.value === 'admin') {
            setShowSecondSelect(true);
        } else {
            setShowSecondSelect(false);
        }
    };

    const userLocalData = JSON.parse(localStorage.getItem('assigned_data'));
    console.log(userLocalData)


    useEffect(() => {
        getAllClients();
    }, []);

    const getAllClients = async () => {
        try {
            const response = await clientDetails();
            console.log(response, "Clients");

            if (response?.status === 200) {
                setClientData(response?.data?.clients);
            } else {
                console.error('Failed to fetch data', response);
            }
        } catch (err) {
            console.error('Error fetching users:', err);
        } finally {
        }
    };



    const createAccount = async (data) => {
        const dataJson = {
            "bank_name": data.bank_name,
            "branch_name": data.branch_name,
            "account_number": data.bank_account_number,
            "ifsc": data.IFSC,
            "upi_id": data.upi_id,
        }
        try {
            const response = await CreateBank(dataJson);
            console.log(response, "Create Account")
            if (response.status === 201) {
                toast.success("Accounts Created Successfully");
                navigate('/')
            }
            else {
                toast.error(response.status);
            }
        } catch (err) {
            toast.error(response.status);
            console.log(err, 'errror');
        }
    };

    const onSubmit = async (data) => {
        console.log('start', data)
        const formData = new FormData();
        formData.append("username", data?.username);
        formData.append("name", data?.name);
        formData.append("email", data?.email);
        formData.append("password", data?.password);
        formData.append("is_superadmin", false);
        if (selectedRole === 'admin') {
            formData.append('is_admin', true);
            formData.append('is_creator', false);
            formData.append('is_agent', false);
        } else if (selectedRole === 'creator') {
            formData.append('is_creator', true);
            formData.append('is_admin', false);
            formData.append('is_agent', false);
        } else if (selectedRole === 'peer') {
            formData.append('is_agent', true);
            formData.append('is_admin', false);
            formData.append('is_creator', false);
        }
        formData.append("phone_number", data?.phone_number);
        formData.append("bank_name", data?.bank_name);
        formData.append("branch_name", data?.branch_name);
        formData.append("bank_account_number", data?.bank_account_number);
        formData.append("IFSC", data?.IFSC);
        formData.append("payin_limit", data?.payin_limit);
        formData.append("payout_limit", data?.payout_limit);
        formData.append("min_amount", data?.min_amount);
        formData.append("max_amount", data?.max_amount);
        formData.append("pay_incommission", data?.pay_incommission);
        formData.append("pay_outcommission", data?.pay_outcommission);
        formData.append("upi_id", data?.upi_id);
        if (selectedRole === 'admin') {
            formData.append("client", data?.adminOption);
        }

        try {
            const response = await CreateUser(formData);
            console.log(response, "Create User")
            if (response.status === 201) {
                toast.success("User Created Successfully");
                navigate('/accounts')
            }
            else {
                toast.error('Facing some issue');
            }
        } catch (err) {
            console.log(err, 'errror');
        }
    };

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
                            <Typography flexGrow={1} variant={isXsScreen ? "h3" : "h2"}>Welcome to Create {role !== 'agent' ? 'Users' : 'Account'}</Typography>
                            <Notification />
                        </Grid>
                    </Grid>
                    <Grid item xs={12} lg={5} sx={{ display: 'flex', alignItems: 'center' }}>

                    </Grid>
                </Grid>
            </Grid>
            {role !== 'agent' ?
                <Grid item xs={12} >
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container sx={{ backgroundColor: '#fff', borderRadius: '15px', px: 2 }}>
                            <Grid item xs={12} md={6} sx={{ p: 2 }}>
                                <Grid container rowSpacing={2}>
                                    <Grid item xs={12} >
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
                                                    <OutlinedInput {...register('phone_number', { required: 'Phone number is required', pattern: { value: /^[0-9]{10}$/, message: 'Phone number must be 10 digits' }, })} placeholder="Enter your Phone number"
                                                        sx={inputStyles(errors.phone_number)} />
                                                    {errors.phone_number && (
                                                        <Typography color="error" variant="caption">
                                                            {errors.phone_number.message}
                                                        </Typography>
                                                    )}
                                                </Stack>
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <Stack spacing={2}>
                                                    <Stack spacing={1}>
                                                        <Typography sx={{ color: '#929292', fontWeight: 'bold' }}>Select Role</Typography>
                                                        <Select {...register('role', { required: 'Role is required' })} displayEmpty defaultValue="" onChange={handleRoleChange} sx={{ mb: 2, width: '100%', backgroundColor: '#fff', borderRadius: '15px', border: errors.role ? '1px solid #ff4d4f' : 'none', '& .MuiSelect-select': { padding: '10px', boxShadow: 'none' }, '&.Mui-focused': { borderColor: errors.role ? '#ff4d4f' : '#e0e0e0', boxShadow: 'none' }, boxShadow: 'none', }} >
                                                            <MenuItem value="" disabled>
                                                                Select your role
                                                            </MenuItem>
                                                            {userLocalData?.is_superadmin && [
                                                                <MenuItem key="admin" value="admin">Admin</MenuItem>,
                                                                <MenuItem key="creator" value="creator">Sub Admin</MenuItem>,
                                                                <MenuItem key="peer" value="peer">Peer</MenuItem>,
                                                            ]}
                                                            {userLocalData?.is_admin && [
                                                                <MenuItem key="creator" value="creator">Sub Admin</MenuItem>,
                                                                <MenuItem key="peer" value="peer">Peer</MenuItem>,
                                                            ]}
                                                            {userLocalData?.is_creator && [
                                                                <MenuItem key="peer" value="peer">Peer</MenuItem>,
                                                            ]}
                                                        </Select>

                                                        {errors.role && (
                                                            <Typography color="error" variant="caption">
                                                                {errors.role.message}
                                                            </Typography>
                                                        )}
                                                    </Stack>

                                                    {showSecondSelect && (
                                                        <Stack spacing={1}>
                                                            <Typography sx={{ color: '#929292', fontWeight: 'bold' }}>Select Client</Typography>
                                                            <Select {...register('adminOption', { required: 'Admin option is required' })} displayEmpty defaultValue="" sx={{ mb: 2, width: '100%', backgroundColor: '#fff', borderRadius: '15px', border: errors.adminOption ? '1px solid #ff4d4f' : '1px solid #e0e0e0', '& .MuiSelect-select': { padding: '10px', boxShadow: 'none' }, '&.Mui-focused': { borderColor: errors.adminOption ? '#ff4d4f' : '#e0e0e0', boxShadow: 'none' }, boxShadow: 'none', }} >
                                                                <MenuItem value="" disabled>
                                                                    Select an option
                                                                </MenuItem>
                                                                {clientData.map((clients) => (
                                                                    <MenuItem value={clients?.id} key={clients?.id}>{clients?.name}</MenuItem>
                                                                ))}
                                                            </Select>
                                                            {errors.adminOption && (
                                                                <Typography color="error" variant="caption">
                                                                    {errors.adminOption.message}
                                                                </Typography>
                                                            )}
                                                        </Stack>
                                                    )}
                                                </Stack>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} >
                                        <Typography variant="h5">
                                            Operations Data
                                        </Typography>
                                        <Grid container rowSpacing={1.5} columnSpacing={1.5} sx={{ backgroundColor: '#F6F8FC', borderRadius: '15px', p: 1, mt: 2 }} >
                                            <Grid item xs={12} md={6}>
                                                <Stack spacing={1}>
                                                    <Typography sx={{ color: '#929292', fontWeight: 'bold' }}>Total PayIn Limit</Typography>
                                                    <OutlinedInput {...register('payin_limit', { required: 'Total PayIn Limit is required', min: { value: 0, message: 'Value must be greater than or equal to 0' }, })} placeholder="Enter total PayIn limit"
                                                        sx={inputStyles(errors.payin_limit)} />
                                                    {errors.payin_limit && (
                                                        <Typography color="error" variant="caption">
                                                            {errors.payin_limit.message}
                                                        </Typography>
                                                    )}
                                                </Stack>
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <Stack spacing={1}>
                                                    <Typography sx={{ color: '#929292', fontWeight: 'bold' }}>Total PayOut Limit</Typography>
                                                    <OutlinedInput {...register('payout_limit', { required: 'Total PayOut Limit is required', min: { value: 0, message: 'Value must be greater than or equal to 0' }, })} placeholder="Enter total PayOut limit"
                                                        sx={inputStyles(errors.payout_limit)} />
                                                    {errors.payout_limit && (
                                                        <Typography color="error" variant="caption">
                                                            {errors.payout_limit.message}
                                                        </Typography>
                                                    )}
                                                </Stack>
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <Stack spacing={1}>
                                                    <Typography sx={{ color: '#929292', fontWeight: 'bold' }}>Min. Amount Limit</Typography>
                                                    <OutlinedInput {...register('min_amount', { required: 'Min. Amount Limit is required', min: { value: 1, message: 'Minimum amount must be at least 1' }, })} placeholder="Enter minimum amount limit"
                                                        sx={inputStyles(errors.min_amount)} />
                                                    {errors.min_amount && (
                                                        <Typography color="error" variant="caption">
                                                            {errors.min_amount.message}
                                                        </Typography>
                                                    )}
                                                </Stack>
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <Stack spacing={1}>
                                                    <Typography sx={{ color: '#929292', fontWeight: 'bold' }}>Max. Amount Limit</Typography>
                                                    <OutlinedInput {...register('max_amount', { required: 'Max. Amount Limit is required', min: { value: 1, message: 'Maximum amount must be at least 1' }, })} placeholder="Enter maximum amount limit"
                                                        sx={inputStyles(errors.max_amount)} />
                                                    {errors.max_amount && (
                                                        <Typography color="error" variant="caption">
                                                            {errors.max_amount.message}
                                                        </Typography>
                                                    )}
                                                </Stack>
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <Stack spacing={1}>
                                                    <Typography sx={{ color: '#929292', fontWeight: 'bold' }}>PayIn Commission %</Typography>
                                                    <OutlinedInput {...register('pay_incommission', { required: 'PayIn Commission is required', min: { value: 0, message: 'Value must be 0 or greater' }, max: { value: 100, message: 'Value must be 100 or less' }, })} placeholder="Enter PayIn Commission (%)"
                                                        sx={inputStyles(errors.pay_incommission)} />
                                                    {errors.pay_incommission && (
                                                        <Typography color="error" variant="caption">
                                                            {errors.pay_incommission.message}
                                                        </Typography>
                                                    )}
                                                </Stack>
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <Stack spacing={1}>
                                                    <Typography sx={{ color: '#929292', fontWeight: 'bold' }}>PayOut Commission %</Typography>
                                                    <OutlinedInput {...register('pay_outcommission', { required: 'PayOut Commission is required', min: { value: 0, message: 'Value must be 0 or greater' }, max: { value: 100, message: 'Value must be 100 or less' }, })} placeholder="Enter PayOut Commission (%)"
                                                        sx={inputStyles(errors.pay_outcommission)} />
                                                    {errors.pay_outcommission && (
                                                        <Typography color="error" variant="caption">
                                                            {errors.pay_outcommission.message}
                                                        </Typography>
                                                    )}
                                                </Stack>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={6} sx={{ p: 2 }}>
                                <Grid container rowSpacing={2}>
                                    <Grid item xs={12} >
                                        <Typography variant="h5">
                                            Bank Details
                                        </Typography>
                                        <Grid container rowSpacing={1} columnSpacing={1.5} sx={{ backgroundColor: '#F6F8FC', borderRadius: '15px', p: 1, mt: 2 }}>
                                            <Grid item xs={12} md={12}>
                                                <Stack spacing={1}>
                                                    <Typography sx={{ color: '#929292', fontWeight: 'bold' }}>UPI ID</Typography>
                                                    <OutlinedInput
                                                        {...register('upi_id', { required: 'UPI ID is required', pattern: { value: /^[a-zA-Z0-9.\-_]+@[a-zA-Z]+$/, message: 'Invalid UPI ID format' } })}
                                                        placeholder="Enter your UPI ID"
                                                        sx={inputStyles(errors.upi_id)}
                                                    />
                                                    {errors.upi_id && (
                                                        <Typography color="error" variant="caption">
                                                            {errors.upi_id.message}
                                                        </Typography>
                                                    )}
                                                </Stack>
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <Stack spacing={1}>
                                                    <Typography sx={{ color: '#929292', fontWeight: 'bold' }}>Bank Name</Typography>
                                                    <OutlinedInput
                                                        {...register('bank_name', { required: 'Bank Name is required' })}
                                                        placeholder="Enter your bank name"
                                                        sx={inputStyles(errors.bank_name)}
                                                    />
                                                    {errors.bank_name && (
                                                        <Typography color="error" variant="caption">
                                                            {errors.bank_name.message}
                                                        </Typography>
                                                    )}
                                                </Stack>
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <Stack spacing={1}>
                                                    <Typography sx={{ color: '#929292', fontWeight: 'bold' }}>Branch Name</Typography>
                                                    <OutlinedInput
                                                        {...register('branch_name', { required: 'Branch Name is required' })}
                                                        placeholder="Enter your branch name"
                                                        sx={inputStyles(errors.branch_name)}
                                                    />
                                                    {errors.branch_name && (
                                                        <Typography color="error" variant="caption">
                                                            {errors.branch_name.message}
                                                        </Typography>
                                                    )}
                                                </Stack>
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <Stack spacing={1}>
                                                    <Typography sx={{ color: '#929292', fontWeight: 'bold' }}>Account Number</Typography>
                                                    <OutlinedInput
                                                        {...register('bank_account_number', { required: 'Account Number is required', pattern: { value: /^[0-9]{9,18}$/, message: 'Account Number must be 9-18 digits' } })}
                                                        placeholder="Enter your account number"
                                                        sx={inputStyles(errors.bank_account_number)}
                                                    />
                                                    {errors.bank_account_number && (
                                                        <Typography color="error" variant="caption">
                                                            {errors.bank_account_number.message}
                                                        </Typography>
                                                    )}
                                                </Stack>
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <Stack spacing={1}>
                                                    <Typography sx={{ color: '#929292', fontWeight: 'bold' }}>IFSC</Typography>
                                                    <OutlinedInput
                                                        {...register('IFSC', { required: 'IFSC is required', pattern: { value: /^[A-Z]{4}0[A-Z0-9]{6}$/, message: 'Invalid IFSC code' } })}
                                                        placeholder="Enter your IFSC code"
                                                        sx={inputStyles(errors.IFSC)}
                                                    />
                                                    {errors.IFSC && (
                                                        <Typography color="error" variant="caption">
                                                            {errors.IFSC.message}
                                                        </Typography>
                                                    )}
                                                </Stack>
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <Stack spacing={1}>
                                                    <Typography sx={{ color: '#929292', fontWeight: 'bold' }}>Account Holder Name</Typography>
                                                    <OutlinedInput
                                                        {...register('accountHolderName', { required: 'Account Holder Name is required' })}
                                                        placeholder="Enter account holder name"
                                                        sx={inputStyles(errors.accountHolderName)}
                                                    />
                                                    {errors.accountHolderName && (
                                                        <Typography color="error" variant="caption">
                                                            {errors.accountHolderName.message}
                                                        </Typography>
                                                    )}
                                                </Stack>
                                            </Grid>
                                        </Grid>

                                    </Grid>
                                    <Grid item xs={12} >
                                        <Typography variant="h5">
                                            Create Login Credentials
                                        </Typography>
                                        <Grid container rowSpacing={1.5} columnSpacing={1.5} sx={{ backgroundColor: '#F6F8FC', borderRadius: '15px', p: 1, mt: 2 }} >
                                            <Grid item xs={12} md={12}>
                                                <Stack spacing={1}>
                                                    <Typography sx={{ color: '#929292', fontWeight: 'bold' }}>
                                                        Create Username
                                                    </Typography>
                                                    <OutlinedInput {...register('username', { required: 'Username is required', pattern: { value: /^[a-zA-Z0-9._-]{5,15}$/, message: 'Username must be 5-15 characters and can include letters, numbers, and ._-', }, })} placeholder="Enter a Username"
                                                        sx={inputStyles(errors.username)} />
                                                    {errors.username && (
                                                        <Typography color="error" variant="caption">
                                                            {errors.username.message}
                                                        </Typography>
                                                    )}
                                                </Stack>
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <Stack spacing={1}>
                                                    <Typography sx={{ color: '#929292', fontWeight: 'bold' }}>
                                                        Create Password
                                                    </Typography>
                                                    <OutlinedInput type="password" {...register('password', { required: 'Password is required', minLength: { value: 8, message: 'Password must be at least 8 characters', }, pattern: { value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/, message: 'Password must include at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character', }, })} placeholder="Enter a strong password"
                                                        sx={inputStyles(errors.password)} />
                                                    {errors.password && (
                                                        <Typography color="error" variant="caption">
                                                            {errors.password.message}
                                                        </Typography>
                                                    )}
                                                </Stack>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid container sx={{ p: 1, m: 2 }}>
                                <Grid item xs={12} md={4} display='flex' justifyContent='end' alignItems='center'></Grid>
                                <Grid item xs={12} md={4} display='flex' justifyContent='center' alignItems='center'>
                                    <Button type="submit" disableRipple sx={{
                                        minWidth: '100%', textTransform: 'none', borderRadius: '32px', px: 6, mx: 0.5, py: 1, fontSize: '14px', fontWeight: 500,
                                        backgroundColor: '#2C6DB5', color: '#fff', boxShadow: 'none', border: 'none', outline: 'none',
                                        '&:hover, &:active, &:focus': { backgroundColor: '#2C6DB5', color: '#fff', boxShadow: 'none', }, '&:focus-visible': { outline: 'none', boxShadow: 'none' }, '&.MuiOutlinedInput - notchedOutline': { borderColor: 'transparent', }, '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'transparent', },
                                    }}>
                                        Publish User
                                    </Button>
                                </Grid>
                                <Grid item xs={12} md={4} display='flex' justifyContent='end' alignItems='center'></Grid>
                                <Grid item >
                                </Grid>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
                :

                <Grid item xs={6}>
                    <form onSubmit={handleSubmit(createAccount)}>
                        <Grid container sx={{ backgroundColor: '#fff', borderRadius: '15px', p: 3 }}>
                            <Grid item xs={12} >
                                <Typography variant="h5">
                                    Bank Details
                                </Typography>
                                <Grid container rowSpacing={1} columnSpacing={1.5} sx={{ backgroundColor: '#F6F8FC', borderRadius: '15px', p: 1, mt: 2, pb: 3 }}>
                                    <Grid item xs={12} md={12}>
                                        <Stack spacing={1}>
                                            <Typography sx={{ color: '#929292', fontWeight: 'bold' }}>UPI ID</Typography>
                                            <OutlinedInput
                                                {...register('upi_id', { required: 'UPI ID is required', pattern: { value: /^[a-zA-Z0-9.\-_]+@[a-zA-Z]+$/, message: 'Invalid UPI ID format' } })}
                                                placeholder="Enter your UPI ID"
                                                sx={inputStyles(errors.upi_id)}
                                            />
                                            {errors.upi_id && (
                                                <Typography color="error" variant="caption">
                                                    {errors.upi_id.message}
                                                </Typography>
                                            )}
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Stack spacing={1}>
                                            <Typography sx={{ color: '#929292', fontWeight: 'bold' }}>Bank Name</Typography>
                                            <OutlinedInput
                                                {...register('bank_name', { required: 'Bank Name is required' })}
                                                placeholder="Enter your bank name"
                                                sx={inputStyles(errors.bank_name)}
                                            />
                                            {errors.bank_name && (
                                                <Typography color="error" variant="caption">
                                                    {errors.bank_name.message}
                                                </Typography>
                                            )}
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Stack spacing={1}>
                                            <Typography sx={{ color: '#929292', fontWeight: 'bold' }}>Branch Name</Typography>
                                            <OutlinedInput
                                                {...register('branch_name', { required: 'Branch Name is required' })}
                                                placeholder="Enter your branch name"
                                                sx={inputStyles(errors.branch_name)}
                                            />
                                            {errors.branch_name && (
                                                <Typography color="error" variant="caption">
                                                    {errors.branch_name.message}
                                                </Typography>
                                            )}
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <Stack spacing={1}>
                                            <Typography sx={{ color: '#929292', fontWeight: 'bold' }}>Account Number</Typography>
                                            <OutlinedInput
                                                {...register('bank_account_number', { required: 'Account Number is required', pattern: { value: /^[0-9]{9,18}$/, message: 'Account Number must be 9-18 digits' } })}
                                                placeholder="Enter your account number"
                                                sx={inputStyles(errors.bank_account_number)}
                                            />
                                            {errors.bank_account_number && (
                                                <Typography color="error" variant="caption">
                                                    {errors.bank_account_number.message}
                                                </Typography>
                                            )}
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <Stack spacing={1}>
                                            <Typography sx={{ color: '#929292', fontWeight: 'bold' }}>IFSC</Typography>
                                            <OutlinedInput
                                                {...register('IFSC', { required: 'IFSC is required', pattern: { value: /^[A-Z]{4}0[A-Z0-9]{6}$/, message: 'Invalid IFSC code' } })}
                                                placeholder="Enter your IFSC code"
                                                sx={inputStyles(errors.IFSC)}
                                            />
                                            {errors.IFSC && (
                                                <Typography color="error" variant="caption">
                                                    {errors.IFSC.message}
                                                </Typography>
                                            )}
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <Stack spacing={1}>
                                            <Typography sx={{ color: '#929292', fontWeight: 'bold' }}>Account Holder Name</Typography>
                                            <OutlinedInput
                                                {...register('accountHolderName', { required: 'Account Holder Name is required' })}
                                                placeholder="Enter account holder name"
                                                sx={inputStyles(errors.accountHolderName)}
                                            />
                                            {errors.accountHolderName && (
                                                <Typography color="error" variant="caption">
                                                    {errors.accountHolderName.message}
                                                </Typography>
                                            )}
                                        </Stack>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid container sx={{ p: 1, m: 2 }}>
                                <Grid item xs={12} md={3} display='flex' justifyContent='end' alignItems='center'></Grid>
                                <Grid item xs={12} md={6} display='flex' justifyContent='center' alignItems='center'>
                                    <Button type="submit" disableRipple sx={{
                                        minWidth: '100%', textTransform: 'none', borderRadius: '32px', px: 6, mx: 0.5, py: 1, fontSize: '14px', fontWeight: 500,
                                        backgroundColor: '#5B3CA1', color: '#fff', boxShadow: 'none', border: 'none', outline: 'none',
                                        '&:hover, &:active, &:focus': { backgroundColor: '#5B3CA1', color: '#fff', boxShadow: 'none', }, '&:focus-visible': { outline: 'none', boxShadow: 'none' }, '&.MuiOutlinedInput - notchedOutline': { borderColor: 'transparent', }, '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'transparent', },
                                    }}>
                                        Publish Account
                                    </Button>
                                </Grid>
                                <Grid item xs={12} md={3} display='flex' justifyContent='end' alignItems='center'></Grid>
                                <Grid item >
                                </Grid>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
            }
        </Grid>
    );
}









{/* <Stack spacing={1}>
                                                <Typography sx={{ color: '#929292', fontWeight: 'bold' }}>Select Role</Typography>
                                                <Select {...register('role', { required: 'Role is required', })} displayEmpty defaultValue="" sx={{
                                                    mb: 2, width: '100%', backgroundColor: '#fff', borderRadius: '15px', border: errors.role ? '1px solid #ff4d4f' : '1px solid #e0e0e0', '& .MuiSelect-select': { padding: '10px', boxShadow: 'none' }, '&.Mui-focused': { borderColor: errors.role ? '#ff4d4f' : '#e0e0e0', boxShadow: 'none' }, boxShadow: 'none'
                                                }} >
                                                    <MenuItem value="" disabled> Select your role </MenuItem>
                                                    {userLocalData?.is_superadmin &&
                                                        <>
                                                            <MenuItem value="admin">Admin</MenuItem>
                                                            <MenuItem value="editor">Sub Admin</MenuItem>
                                                            <MenuItem value="viewer">Peer</MenuItem>
                                                        </>
                                                    }
                                                    {userLocalData?.is_admin &&
                                                        <>
                                                            <MenuItem value="editor">Sub Admin</MenuItem>
                                                            <MenuItem value="viewer">Peer</MenuItem>
                                                        </>
                                                    }
                                                    {userLocalData?.is_created &&
                                                        <>
                                                            <MenuItem value="viewer">Peer</MenuItem>
                                                        </>
                                                    }

                                                </Select>
                                                {errors.role && (
                                                    <Typography color="error" variant="caption">
                                                        {errors.role.message}
                                                    </Typography>
                                                )}
                                            </Stack> */}











// import bellNotification from 'assets/images/bellNotification.svg';
// import { OutlinedInput, InputAdornment, Button, Stack } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';
// import { Typography, Grid } from '@mui/material';
// import { useForm } from 'react-hook-form';


// export default function CreateUserPage() {
//     const { register, handleSubmit, formState: { errors } } = useForm();

//     const onSubmit = (data) => {
//         console.log('Form Data:', data);
//     };

//     return (
//         <Grid container rowSpacing={4.5} columnSpacing={2.75}>
//             {/* Column 1 */}
//             <Grid item xs={12} sx={{ mb: -2.25 }}>
//                 <Typography variant="h5" sx={{ color: '#828282' }}>
//                     Hi Rocky,
//                 </Typography>
//                 <Grid container sx={{ display: 'flex' }}>
//                     <Grid item xs={12} lg={7} alignSelf='center'>
//                         <Typography variant="h2">Welcome to Crea    l;;;;;;te Sub admin</Typography>
//                     </Grid>
//                     <Grid item xs={12} lg={5} sx={{ display: 'flex', alignItems: 'center' }}>
//                         <img src={bellNotification} alt="bellNotification" />
//                         <OutlinedInput placeholder="Search" startAdornment={<InputAdornment position="start"> <SearchIcon style={{ color: '#3B82F6' }} /> </InputAdornment>} sx={{ ml: 2, width: '100%', backgroundColor: '#fff', borderRadius: '24px', padding: '6px 16px', '& .MuiOutlinedInput-notchedOutline': { border: 'none', }, '&:hover .MuiOutlinedInput-notchedOutline': { border: 'none', }, '&.Mui-focused': { boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)', }, }} />
//                     </Grid>
//                 </Grid>
//             </Grid>
//             <Grid item xs={12} >
//                 <form onSubmit={handleSubmit(onSubmit)}>
//                     <Grid container sx={{ backgroundColor: '#fff', borderRadius: '15px', px: 2 }}>
//                         <Grid item xs={12} md={6} sx={{ p: 2 }}>
//                             <Grid container rowSpacing={2}>
//                                 <Grid item xs={12} >
//                                     <Typography variant="h5">
//                                         Personal Details
//                                     </Typography>
//                                     <Grid container rowSpacing={1} columnSpacing={1.5} sx={{ backgroundColor: '#F6F8FC', borderRadius: '15px', p: 1, mt: 2 }}>
//                                         <Grid item xs={12} md={6} >
//                                             <Stack spacing={1}>
//                                                 <Typography sx={{ color: '#929292', fontWeight: 'bold' }}>Name</Typography>
//                                                 <OutlinedInput variant="outlined" placeholder='' sx={{ mb: 2, width: '100%', boxShadow: 'none', backgroundColor: '#fff', border: 'none', borderRadius: '15px', '&.Mui-focused': { boxShadow: 'none', border: 'none' }, '&:hover': { border: 'none' } }} />
//                                             </Stack>
//                                         </Grid>
//                                         <Grid item xs={12} md={6} >
//                                             <Stack spacing={1}>
//                                                 <Typography sx={{ color: '#929292', fontWeight: 'bold' }}>username</Typography>
//                                                 <OutlinedInput variant="outlined" placeholder='' sx={{ mb: 2, width: '100%', boxShadow: 'none', backgroundColor: '#fff', border: 'none', borderRadius: '15px', '&.Mui-focused': { boxShadow: 'none', border: 'none' }, '&:hover': { border: 'none' } }} />
//                                             </Stack>
//                                         </Grid>
//                                         <Grid item xs={12} md={12} >
//                                             <Stack spacing={1}>
//                                                 <Typography sx={{ color: '#929292', fontWeight: 'bold' }}>Email ID</Typography>
//                                                 <OutlinedInput variant="outlined" placeholder='' sx={{ mb: 2, width: '100%', boxShadow: 'none', backgroundColor: '#fff', border: 'none', borderRadius: '15px', '&.Mui-focused': { boxShadow: 'none', border: 'none' }, '&:hover': { border: 'none' } }} />
//                                             </Stack>
//                                         </Grid>
//                                         <Grid item xs={12} md={12} >
//                                             <Stack spacing={1}>
//                                                 <Typography sx={{ color: '#929292', fontWeight: 'bold' }}>phone_number Number</Typography>
//                                                 <OutlinedInput variant="outlined" placeholder='' sx={{ mb: 2, width: '100%', boxShadow: 'none', backgroundColor: '#fff', border: 'none', borderRadius: '15px', '&.Mui-focused': { boxShadow: 'none', border: 'none' }, '&:hover': { border: 'none' } }} />
//                                             </Stack>
//                                         </Grid>
//                                         <Grid item xs={12} md={12} >
//                                             <Stack spacing={1}>
//                                                 <Typography sx={{ color: '#929292', fontWeight: 'bold' }}>Select Role</Typography>
//                                                 <OutlinedInput variant="outlined" placeholder='' sx={{ mb: 2, width: '100%', boxShadow: 'none', backgroundColor: '#fff', border: 'none', borderRadius: '15px', '&.Mui-focused': { boxShadow: 'none', border: 'none' }, '&:hover': { border: 'none' } }} />
//                                             </Stack>
//                                         </Grid>
//                                     </Grid>
//                                 </Grid>
//                                 <Grid item xs={12} >
//                                     <Typography variant="h5">
//                                         Operations Data
//                                     </Typography>
//                                     <Grid container rowSpacing={1} columnSpacing={1.5} sx={{ backgroundColor: '#F6F8FC', borderRadius: '15px', p: 1, mt: 2 }}>
//                                         <Grid item xs={12} md={6} >
//                                             <Stack spacing={1}>
//                                                 <Typography sx={{ color: '#929292', fontWeight: 'bold' }}>Total PayIn Limit</Typography>
//                                                 <OutlinedInput variant="outlined" placeholder='' sx={{ mb: 2, width: '100%', boxShadow: 'none', backgroundColor: '#fff', border: 'none', borderRadius: '15px', '&.Mui-focused': { boxShadow: 'none', border: 'none' }, '&:hover': { border: 'none' } }} />
//                                             </Stack>
//                                         </Grid>
//                                         <Grid item xs={12} md={6} >
//                                             <Stack spacing={1}>
//                                                 <Typography sx={{ color: '#929292', fontWeight: 'bold' }}>Total PayOut Limit</Typography>
//                                                 <OutlinedInput variant="outlined" placeholder='' sx={{ mb: 2, width: '100%', boxShadow: 'none', backgroundColor: '#fff', border: 'none', borderRadius: '15px', '&.Mui-focused': { boxShadow: 'none', border: 'none' }, '&:hover': { border: 'none' } }} />
//                                             </Stack>
//                                         </Grid>
//                                         <Grid item xs={12} md={6} >
//                                             <Stack spacing={1}>
//                                                 <Typography sx={{ color: '#929292', fontWeight: 'bold' }}>Min. Amount Limit</Typography>
//                                                 <OutlinedInput variant="outlined" placeholder='' sx={{ mb: 2, width: '100%', boxShadow: 'none', backgroundColor: '#fff', border: 'none', borderRadius: '15px', '&.Mui-focused': { boxShadow: 'none', border: 'none' }, '&:hover': { border: 'none' } }} />
//                                             </Stack>
//                                         </Grid>
//                                         <Grid item xs={12} md={6} >
//                                             <Stack spacing={1}>
//                                                 <Typography sx={{ color: '#929292', fontWeight: 'bold' }}>Max. Amount Limit</Typography>
//                                                 <OutlinedInput variant="outlined" placeholder='' sx={{ mb: 2, width: '100%', boxShadow: 'none', backgroundColor: '#fff', border: 'none', borderRadius: '15px', '&.Mui-focused': { boxShadow: 'none', border: 'none' }, '&:hover': { border: 'none' } }} />
//                                             </Stack>
//                                         </Grid>
//                                         <Grid item xs={12} md={6} >
//                                             <Stack spacing={1}>
//                                                 <Typography sx={{ color: '#929292', fontWeight: 'bold' }}>PayIn Commission %</Typography>
//                                                 <OutlinedInput variant="outlined" placeholder='' sx={{ mb: 2, width: '100%', boxShadow: 'none', backgroundColor: '#fff', border: 'none', borderRadius: '15px', '&.Mui-focused': { boxShadow: 'none', border: 'none' }, '&:hover': { border: 'none' } }} />
//                                             </Stack>
//                                         </Grid>
//                                         <Grid item xs={12} md={6} >
//                                             <Stack spacing={1}>
//                                                 <Typography sx={{ color: '#929292', fontWeight: 'bold' }}>PayOut Commission %</Typography>
//                                                 <OutlinedInput variant="outlined" placeholder='' sx={{ mb: 2, width: '100%', boxShadow: 'none', backgroundColor: '#fff', border: 'none', borderRadius: '15px', '&.Mui-focused': { boxShadow: 'none', border: 'none' }, '&:hover': { border: 'none' } }} />
//                                             </Stack>
//                                         </Grid>
//                                     </Grid>
//                                 </Grid>
//                             </Grid>
//                         </Grid>
//                         <Grid item xs={12} md={6} sx={{ p: 2 }}>
//                             <Grid container rowSpacing={2}>
//                                 <Grid item xs={12} >
//                                     <Typography variant="h5">
//                                         Bank Details
//                                     </Typography>
//                                     <Grid container rowSpacing={1} columnSpacing={1.5} sx={{ backgroundColor: '#F6F8FC', borderRadius: '15px', p: 1, mt: 2 }}>
//                                         <Grid item xs={12} md={12} >
//                                             <Stack spacing={1}>
//                                                 <Typography sx={{ color: '#929292', fontWeight: 'bold' }}>UPI ID</Typography>
//                                                 <OutlinedInput variant="outlined" placeholder='' sx={{ mb: 2, width: '100%', boxShadow: 'none', backgroundColor: '#fff', border: 'none', borderRadius: '15px', '&.Mui-focused': { boxShadow: 'none', border: 'none' }, '&:hover': { border: 'none' } }} />
//                                             </Stack>
//                                         </Grid>
//                                         <Grid item xs={12} md={6} >
//                                             <Stack spacing={1}>
//                                                 <Typography sx={{ color: '#929292', fontWeight: 'bold' }}>Bank Name</Typography>
//                                                 <OutlinedInput variant="outlined" placeholder='' sx={{ mb: 2, width: '100%', boxShadow: 'none', backgroundColor: '#fff', border: 'none', borderRadius: '15px', '&.Mui-focused': { boxShadow: 'none', border: 'none' }, '&:hover': { border: 'none' } }} />
//                                             </Stack>
//                                         </Grid>
//                                         <Grid item xs={12} md={6} >
//                                             <Stack spacing={1}>
//                                                 <Typography sx={{ color: '#929292', fontWeight: 'bold' }}>Branch Name</Typography>
//                                                 <OutlinedInput variant="outlined" placeholder='' sx={{ mb: 2, width: '100%', boxShadow: 'none', backgroundColor: '#fff', border: 'none', borderRadius: '15px', '&.Mui-focused': { boxShadow: 'none', border: 'none' }, '&:hover': { border: 'none' } }} />
//                                             </Stack>
//                                         </Grid>
//                                         <Grid item xs={12} md={12} >
//                                             <Stack spacing={1}>
//                                                 <Typography sx={{ color: '#929292', fontWeight: 'bold' }}>Account Number</Typography>
//                                                 <OutlinedInput variant="outlined" placeholder='' sx={{ mb: 2, width: '100%', boxShadow: 'none', backgroundColor: '#fff', border: 'none', borderRadius: '15px', '&.Mui-focused': { boxShadow: 'none', border: 'none' }, '&:hover': { border: 'none' } }} />
//                                             </Stack>
//                                         </Grid>
//                                         <Grid item xs={12} md={12} >
//                                             <Stack spacing={1}>
//                                                 <Typography sx={{ color: '#929292', fontWeight: 'bold' }}>IFSC</Typography>
//                                                 <OutlinedInput variant="outlined" placeholder='' sx={{ mb: 2, width: '100%', boxShadow: 'none', backgroundColor: '#fff', border: 'none', borderRadius: '15px', '&.Mui-focused': { boxShadow: 'none', border: 'none' }, '&:hover': { border: 'none' } }} />
//                                             </Stack>
//                                         </Grid>
//                                         <Grid item xs={12} md={12} >
//                                             <Stack spacing={1}>
//                                                 <Typography sx={{ color: '#929292', fontWeight: 'bold' }}>Account Holder Name</Typography>
//                                                 <OutlinedInput variant="outlined" placeholder='' sx={{ mb: 2, width: '100%', boxShadow: 'none', backgroundColor: '#fff', border: 'none', borderRadius: '15px', '&.Mui-focused': { boxShadow: 'none', border: 'none' }, '&:hover': { border: 'none' } }} />
//                                             </Stack>
//                                         </Grid>
//                                     </Grid>
//                                 </Grid>
//                                 <Grid item xs={12} >
//                                     <Typography variant="h5">
//                                         Create Login Credentials
//                                     </Typography>
//                                     <Grid container rowSpacing={1} columnSpacing={1.5} sx={{ backgroundColor: '#F6F8FC', borderRadius: '15px', p: 1, mt: 2 }}>
//                                         <Grid item xs={12} md={12} >
//                                             <Stack spacing={1}>
//                                                 <Typography sx={{ color: '#929292', fontWeight: 'bold' }}>Create username</Typography>
//                                                 <OutlinedInput variant="outlined" placeholder='' sx={{ mb: 2, width: '100%', boxShadow: 'none', backgroundColor: '#fff', border: 'none', borderRadius: '15px', '&.Mui-focused': { boxShadow: 'none', border: 'none' }, '&:hover': { border: 'none' } }} />
//                                             </Stack>
//                                         </Grid>
//                                         <Grid item xs={12} md={12} >
//                                             <Stack spacing={1}>
//                                                 <Typography sx={{ color: '#929292', fontWeight: 'bold' }}>Create Password</Typography>
//                                                 <OutlinedInput variant="outlined" placeholder='' sx={{ mb: 2, width: '100%', boxShadow: 'none', backgroundColor: '#fff', border: 'none', borderRadius: '15px', '&.Mui-focused': { boxShadow: 'none', border: 'none' }, '&:hover': { border: 'none' } }} />
//                                             </Stack>
//                                         </Grid>
//                                     </Grid>
//                                 </Grid>
//                             </Grid>
//                         </Grid>

//                         <Grid container sx={{ p: 1, m: 2 }}>
//                             <Grid xs={12} md={4} display='flex' justifyContent='end' alignItems='center'></Grid>
//                             <Grid xs={12} md={4} display='flex' justifyContent='center' alignItems='center'>
//                                 <Button disableRipple sx={{
//                                     minWidth: '100%', textTransform: 'none', borderRadius: '32px', px: 6, mx: 0.5, py: 1, fontSize: '14px', fontWeight: 500,
//                                     backgroundColor: '#2C6DB5', color: '#fff', boxShadow: 'none', border: 'none', outline: 'none',
//                                     '&:hover, &:active, &:focus': { backgroundColor: '#2C6DB5', color: '#fff', boxShadow: 'none', }, '&:focus-visible': { outline: 'none', boxShadow: 'none' }, '&.MuiOutlinedInput - notchedOutline': { borderColor: 'transparent', }, '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'transparent', },
//                                 }}>
//                                     Publish User
//                                 </Button>
//                             </Grid>
//                             <Grid xs={12} md={4} display='flex' justifyContent='end' alignItems='center'></Grid>
//                             <Grid item >
//                             </Grid>
//                         </Grid>
//                     </Grid>
//                 </form>
//             </Grid>
//         </Grid>
//     );
// }
