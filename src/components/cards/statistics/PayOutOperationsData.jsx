import React, { useState, useEffect } from 'react';
import { Box, Button, DialogActions, Grid, OutlinedInput } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CloseIcon from '@mui/icons-material/Close';
import { Dialog, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CircleIcon from '@mui/icons-material/Circle';
import { approvePayout, assignOrder, onlineUser, perticularPayoutOrder } from 'api/api';
import { toast } from 'react-hot-toast';
import HashLoader from 'components/HashLoader';
import CopyIcon from 'components/logo/CopyIcon';
import NoDataFound from 'assets/images/noDataFound.svg'

export default function PayOutOperationData({ payOutData, onSendStatusCode }) {


    const [utr, setutr] = useState("");
    const [showLoader, setShowLoader] = useState(false);
    const [utrValidError, setutrValidError] = useState(false);
    const [utrIsRequiredError, setutrIsRequiredlError] = useState(false);
    const [remark, setRemark] = useState("");
    const [remarkValidError, setRemarkValidError] = useState(false);
    const [remarkIsRequiredError, setRemarkIsRequiredlError] = useState(false);
    const [OrderDetails, setOrderDetails] = useState('');
    const [image, setImage] = useState();
    const [imageValidError, setImageValidError] = useState(false);
    const [imageIsRequiredError, setImageIsRequiredlError] = useState(false);

    const [openSubmittedModal, setOpenSubmittedModal] = React.useState(false);
    const [openApproveModal, setOpenApproveModal] = React.useState(false);
    const [userStatus, setUserStatus] = React.useState('');
    const [OrderId, setOrderId] = useState();
    const [Ids, setIds] = useState();
    const [Price, setPrice] = useState();
    const [userOnine, setuserOnine] = useState();

    const handleUTR = (value) => {
        setutr(value);
        const rex = /^[A-Za-z0-12]{10,20}$/;
        if (value === "") {
            setutrValidError(false);
            setutrIsRequiredlError(true);
        } else if (rex.test(value) === false) {
            setutrValidError(true);
            setutrIsRequiredlError(false);
        } else {
            setutrValidError(false);
            setutrIsRequiredlError(false);
        }
    }

    const handleImage = (event) => {
        const file = event.target.files[0];
        console.log(file, "Image")
        if (!file) {
            setImageValidError(false);
            setImageIsRequiredlError(true);
            return;
        }
        const validTypes = ["image/jpeg", "image/png", "image/jpg"];
        if (!validTypes.includes(file.type)) {
            setImageValidError(true);
            setImageIsRequiredlError(false);
            return;
        }
        if (file.size > 5 * 1024 * 1024) { // 5MB limit
            setImageValidError(true);
            return;
        }
        setImage(file);
        setImageValidError(false);
        setImageIsRequiredlError(false);
    };


    const handleRemark = (value) => {
        setRemark(value);
        const rex = /^[a-zA-Z\s]*$/;
        if (value === "") {
            setRemarkValidError(false);
            setRemarkIsRequiredlError(true);
        } else if (rex.test(value) === false) {
            setRemarkValidError(true);
            setRemarkIsRequiredlError(false);
        } else {
            setRemarkValidError(false);
            setRemarkIsRequiredlError(false);
        }
    }

    const ApprovedOrders = async () => {
        if (!utr) setutrIsRequiredlError(true);
        if (!remark) setRemarkIsRequiredlError(true);
        if (!image) setImageIsRequiredlError(true);

        if (utr && remark && image) {
            const formData = new FormData();
            formData.append('utr', utr);
            formData.append('upload_slip', image);
            formData.append('remark', remark);

            try {
                setShowLoader(true);
                const response = await approvePayout(OrderId, formData);
                console.log(response, "Done Order")
                if (response?.status === 200) {
                    onSendStatusCode(false);
                    setOpenSubmittedModal(false)
                    setShowLoader(false);
                    setutr('');
                    setRemark('');
                    setImage('');
                }
            } catch (err) {
                setShowLoader(false);
                console.error(err);
            }
        }
    };



    const fetchParticularData = async () => {
        try {
            setShowLoader(true);
            const orderResponse = await perticularPayoutOrder(OrderId);
            console.log(orderResponse, "Assigned Order by Id")
            if (orderResponse?.status === 200 && orderResponse?.data)
                setShowLoader(false);
            setOrderDetails(orderResponse?.data);
        } catch (err) {
            console.log(err);
            setShowLoader(false);
        }
    };

    useEffect(() => {
        fetchParticularData();
    }, [OrderId]);



    const userData = {
        "Order ID": OrderDetails?.order_id,
        "Client Name": OrderDetails?.client_name,
        "Client UPI": OrderDetails?.client_upi,
        "Bank Name": OrderDetails?.bank_name,
        "Account No.": OrderDetails?.account_number,
        "IFSC": OrderDetails?.ifsc,
        "Created On": OrderDetails?.created_at,
        "Assignee To": OrderDetails?.assigned_to,
        "Assigned UPI": OrderDetails?.assignee_upi,
    };




    const modalFlow = (id, orderId, price) => {
        setOpenSubmittedModal(true);
        setIds(id);
        setOrderId(orderId);
        setPrice(price);
    }


    const fetchData = async () => {
        try {
            setShowLoader(true);
            const orderResponse = await onlineUser(Ids);
            console.log(orderResponse, "Onlin euSers")
            if (orderResponse?.status === 200)
                setShowLoader(false);
            setuserOnine(orderResponse?.data);
        } catch (err) {
            console.log(err);
            setShowLoader(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [Ids])


    const getRole = (employee) => {
        if (employee.is_superadmin) return "Super Admin";
        if (employee.is_admin) return "Admin";
        if (employee.is_creator) return "Sub Admin";
        if (employee.is_agent) return "Peer";
        return "No Role Assigned";
    };

    const getStatus = (isCheckedIn) => {
        if (isCheckedIn) {
            return {
                color: '#22C55D',
                text: 'Active'
            };
        } else {
            return {
                color: '#FC2222',
                text: 'Inactive'
            };
        }
    };

    const Assign = async (id) => {
        const formData = new FormData();
        formData.append("user_id", id);
        formData.append("order_id", OrderId);
        try {
            setShowLoader(true);
            const response = await assignOrder(formData);
            console.log(response, "Asssign")
            if (response?.status === 200) {
                setShowLoader(false);
                setOpenSubmittedModal(false);
                onSendStatusCode(false);
            }
        } catch (err) {
            console.log(err);
            toast.error(err?.response?.data?.non_field_errors[0])
        }
    };

    const handleCopyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
    };


    return (
        <>
            {
                showLoader && (
                    <HashLoader />
                )
            }
            {payOutData.length > 0 ?
                <Box>
                    {payOutData.map((row) => (
                        <Grid container sx={{ backgroundColor: '#E9F0F8', height: '100%', mb: 2 }}>
                            <Grid item xs={12} md={10} sx={{ p: 2.4 }}>
                                <Grid container>
                                    <Grid item xs={12} xl={4} xxl={2} rowSpacing={2}>
                                        <Grid>
                                            <Box sx={{ display: 'flex', alignItems: 'center', py: 0.4 }} >
                                                <Grid container>
                                                    <Grid item xs={6} xl={4} xxl={4} rowSpacing={2}>
                                                        <Typography variant="body" sx={{ fontWeight: 'bold', }} > Order ID: </Typography>
                                                    </Grid>
                                                    <Grid item xs={6} xl={8} xxl={8} rowSpacing={2}>
                                                        <Typography variant="body" sx={{ fontWeight: 400, color: '#666', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} > {row?.order_id} </Typography>
                                                    </Grid>
                                                </Grid>
                                            </Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center', py: 0.4 }} >
                                                <Grid container>
                                                    <Grid item xs={6} xl={4} xxl={4} rowSpacing={2}>
                                                        <Typography variant="body" sx={{ fontWeight: 'bold', }} > Client Name: </Typography>
                                                    </Grid>
                                                    <Grid item xs={6} xl={8} xxl={8} rowSpacing={2}>
                                                        <Typography variant="body" sx={{ fontWeight: 400, color: '#666', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} > {row?.client_name} </Typography>
                                                    </Grid>
                                                </Grid>
                                            </Box>
                                        </Grid>
                                        <Grid>
                                            <Box sx={{ display: 'flex', alignItems: 'center', py: 0.4 }} >
                                                <Grid container>
                                                    <Grid item xs={6} xl={4} xxl={4} rowSpacing={2}>
                                                        <Typography variant="body" sx={{ fontWeight: 'bold', }} > Client UPI: </Typography>
                                                    </Grid>
                                                    <Grid item xs={6} xl={8} xxl={8} rowSpacing={2}>
                                                        <Typography variant="body" sx={{ fontWeight: 400, color: '#666', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} > {row?.client_upi} </Typography>
                                                    </Grid>
                                                </Grid>
                                            </Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center', py: 0.4 }} >
                                                <Grid container>
                                                    <Grid item xs={6} xl={4} xxl={4} rowSpacing={2}>
                                                        <Typography variant="body" sx={{ fontWeight: 'bold', }} > Bank name: </Typography>
                                                    </Grid>
                                                    <Grid item xs={6} xl={8} xxl={8} rowSpacing={2} sx={{ display: 'flex' }}>
                                                        <Grid>
                                                            <Typography variant="body" sx={{ fontWeight: 400, color: '#666', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} > {row?.bank_name} </Typography>
                                                        </Grid>
                                                        <Button
                                                            onClick={() => handleCopyToClipboard(row?.bank_name)}
                                                            sx={{
                                                                ml: 1,
                                                                minWidth: 0,
                                                                padding: '6px',
                                                                color: '#666',
                                                                '&:hover': { color: '#333' },
                                                            }}
                                                        >
                                                            <CopyIcon />
                                                        </Button>
                                                    </Grid>
                                                </Grid>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} xl={4} xxl={2} rowSpacing={2}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', py: 0.4 }} >
                                            <Grid container>
                                                <Grid item xs={6} xl={4} xxl={4} rowSpacing={2}>
                                                    <Typography variant="body" sx={{ fontWeight: 'bold', }} > Account no.: </Typography>
                                                </Grid>
                                                <Grid item xs={6} xl={8} xxl={8} rowSpacing={2} sx={{ display: 'flex' }}>
                                                    <Grid>
                                                        <Typography variant="body" sx={{ fontWeight: 400, color: '#666', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} > {row?.account_number} </Typography>
                                                    </Grid>
                                                    <Button
                                                        onClick={() => handleCopyToClipboard(row?.account_number)}
                                                        sx={{
                                                            ml: 1,
                                                            minWidth: 0,
                                                            padding: '6px',
                                                            color: '#666',
                                                            '&:hover': { color: '#333' },
                                                        }}
                                                    >
                                                        <CopyIcon />
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', py: 0.4 }} >
                                            <Grid container>
                                                <Grid item xs={6} xl={4} xxl={4} rowSpacing={2}>
                                                    <Typography variant="body" sx={{ fontWeight: 'bold' }} > IFCS: </Typography>
                                                </Grid>
                                                <Grid item xs={6} xl={8} xxl={8} rowSpacing={2} sx={{ display: 'flex' }}>
                                                    <Grid>
                                                        <Typography variant="body" sx={{ fontWeight: 400, color: '#666', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} > {row?.ifsc} </Typography>
                                                    </Grid>
                                                    <Button
                                                        onClick={() => handleCopyToClipboard(row?.ifsc)}
                                                        sx={{
                                                            ml: 1,
                                                            minWidth: 0,
                                                            padding: '6px',
                                                            color: '#666',
                                                            '&:hover': { color: '#333' },
                                                        }}
                                                    >
                                                        <CopyIcon />
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', py: 0.4 }} >
                                            <Grid container>
                                                <Grid item xs={6} xl={4} xxl={4} rowSpacing={2}>
                                                    <Typography variant="body" sx={{ fontWeight: 'bold', }} > Created on: </Typography>
                                                </Grid>
                                                <Grid item xs={6} xl={8} xxl={8} rowSpacing={2}>
                                                    <Typography variant="body" sx={{ fontWeight: 400, color: '#666', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} > {row?.created_at.slice(0, 10)} </Typography>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', py: 0.4 }} >
                                            <Grid container>
                                                <Grid item xs={6} xl={4} xxl={4} rowSpacing={2}>
                                                    <Typography variant="body" sx={{ fontWeight: 'bold', }} > Assigned to: </Typography>
                                                </Grid>
                                                <Grid item xs={6} xl={8} xxl={8} rowSpacing={2}>
                                                    <Typography variant="body" sx={{ fontWeight: 400, color: '#666', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} > {row?.assigned_to} </Typography>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} xl={4} xxl={2} rowSpacing={2}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', py: 0.4 }} >
                                            <Grid container>
                                                <Grid item xs={6} xl={4} xxl={4} rowSpacing={2}>
                                                    <Typography variant="body" sx={{ fontWeight: 'bold', }} > Assignee UPI: </Typography>
                                                </Grid>
                                                <Grid item xs={6} xl={8} xxl={8} rowSpacing={2}>
                                                    <Typography variant="body" sx={{ fontWeight: 400, color: '#666', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} > {row?.assignee_upi} </Typography>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', py: 0.4 }} >
                                            <Grid container>
                                                <Grid item xs={6} xl={4} xxl={4} rowSpacing={2}>
                                                    <Typography variant="body" sx={{ fontWeight: 'bold', }} > Approved by: </Typography>
                                                </Grid>
                                                <Grid item xs={6} xl={8} xxl={8} rowSpacing={2}>
                                                    <Typography variant="body" sx={{ fontWeight: 400, color: '#666', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} > {row?.approved_by} </Typography>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', py: 0.4 }} >
                                            <Grid container>
                                                <Grid item xs={6} xl={4} xxl={4} rowSpacing={2}>
                                                    <Typography variant="body" sx={{ fontWeight: 'bold', }} > UTR Code: </Typography>
                                                </Grid>
                                                <Grid item xs={6} xl={8} xxl={8} rowSpacing={2}>
                                                    <Typography variant="body" sx={{ fontWeight: 400, color: '#666', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} > {row?.utr_code} </Typography>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', py: 0.4 }} >
                                            <Grid container>
                                                <Grid item xs={6} xl={4} xxl={4} rowSpacing={2}>
                                                    <Typography variant="body" sx={{ fontWeight: 'bold', }} > UTR receipt: </Typography>
                                                </Grid>
                                                <Grid item xs={6} xl={8} xxl={8} rowSpacing={2}>
                                                    <Typography variant="body" sx={{ fontWeight: 400, color: '#666', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} > {row?.details?.uTRReceipt} </Typography>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Grid >
                            <Grid item xs={12} md={2} alignContent='center' >
                                <Grid container sx={{ backgroundColor: '#E9F0F8', height: '100%' }}>
                                    <Grid item xs={12} md={10} sx={{ height: '100%' }}>
                                        <Grid container sx={{ backgroundColor: '#fff', py: 6, height: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                                            <Typography variant="h4" sx={{ fontWeight: 900 }}>
                                                {row.amount}
                                            </Typography>
                                            <Button
                                                disableRipple
                                                onClick={() => {
                                                    modalFlow(row?.id, row?.order_id, row?.payment_amount);
                                                    setUserStatus(row?.approval_status);
                                                }}
                                                disabled={row?.approval_status === "APPROVED"} // Disable button when status is APPROVED
                                                sx={{
                                                    width: 'fit-content',
                                                    textTransform: 'none',
                                                    borderRadius: '20px',
                                                    px: 3,
                                                    py: 0.5,
                                                    fontSize: '14px',
                                                    fontWeight: 500,
                                                    backgroundColor: row?.approval_status === 'CREATED' ? '#E6B400'
                                                        : row?.approval_status === 'ASSIGNED' ? '#2C6DB5'
                                                            : row?.approval_status === "APPROVED" ? '#22C55D'
                                                                : '#2C6DB51F',
                                                    color: '#fff',
                                                    boxShadow: 'none',
                                                    border: 'none',
                                                    outline: 'none',
                                                    '&:hover, &:active, &:focus': {
                                                        backgroundColor: row?.approval_status === 'CREATED' ? '#E6B400'
                                                            : row?.approval_status === 'ASSIGNED' ? '#2C6DB5'
                                                                : row?.approval_status === "APPROVED" ? '#22C55D'
                                                                    : '#2C6DB51F',
                                                        color: 'white',
                                                        boxShadow: 'none',
                                                    },
                                                    '&:focus-visible': {
                                                        outline: 'none',
                                                        boxShadow: 'none',
                                                    },
                                                }}
                                            >
                                                {row?.approval_status}
                                            </Button>

                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid >
                    ))}
                    {/* Approve MOdal */}
                    <Dialog
                        onClose={() => setOpenSubmittedModal(false)}
                        aria-labelledby="customized-dialog-title"
                        open={openSubmittedModal}
                        maxWidth="sm"
                        fullWidth
                        sx={{
                            '& .MuiDialog-paper': {
                                borderRadius: '24px 24px 24px 24px',
                            },
                        }}
                    >
                        <DialogTitle sx={{ m: 1.2, mb: 0, p: 2, backgroundColor: '#F2F6FC', borderRadius: '24px 24px 0px 0px', display: 'flex', flexDirection: 'column' }} id="customized-dialog-title">
                            <Typography sx={{ textAlign: 'center' }}> Amount </Typography>
                            <Typography variant='h1' sx={{ textAlign: 'center', color: '#EF4444', fontWeight: '700' }}> {Price} INR </Typography>
                        </DialogTitle>
                        <IconButton
                            aria-label="close"
                            onClick={() => setOpenSubmittedModal(false)}
                            sx={(theme) => ({
                                position: 'absolute',
                                right: 18,
                                top: 18,
                                color: theme.palette.grey[500],
                            })}
                        >
                            <CloseIcon />
                        </IconButton>
                        <DialogContent sx={{ m: 2, mt: 0, p: 2, borderTop: '1px solid #EDEDED', display: 'flex', flexDirection: 'column' }}>
                            {userStatus === 'CREATED' &&
                                <TableContainer >
                                    <Table sx={{ width: '100%' }} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell sx={{ py: 2.5 }}>Name</TableCell>
                                                <TableCell sx={{ py: 2.5 }}>UserName</TableCell>
                                                <TableCell sx={{ py: 2.5 }}>User UPI ID</TableCell>
                                                <TableCell sx={{ py: 2.5 }}>Action</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {userOnine?.length !== 0 ? (
                                                userOnine?.map((row) => {
                                                    const role = getRole(row);
                                                    const status = getStatus(row.is_checked_in);
                                                    return (
                                                        <TableRow key={row?.id} sx={{ backgroundColor: row?.id % 2 === 0 ? '#fff' : '#F2F6FC' }}>
                                                            <TableCell sx={{ py: 1.8 }}>{row?.name}</TableCell>
                                                            <TableCell sx={{ py: 1.8 }}>{row?.username}</TableCell>
                                                            <TableCell sx={{ py: 1.8 }}>{row?.upi_id}</TableCell>
                                                            <TableCell sx={{ py: 1.8, display: 'flex', justifyContent: 'space-between' }}>
                                                                <Button
                                                                    onClick={(e) => Assign(row?.id)}
                                                                    disableRipple sx={{
                                                                        minWidth: 'fit-content', textTransform: 'none', borderRadius: '32px', px: 5, mx: 0.5, py: 0.8, fontSize: '14px', fontWeight: 500,
                                                                        backgroundColor: '#2C6DB5', color: '#fff', boxShadow: 'none', border: 'none', outline: 'none',
                                                                        '&:hover, &:active, &:focus': { backgroundColor: '#2C6DB5', color: '#fff', boxShadow: 'none', }, '&:focus-visible': { outline: 'none', boxShadow: 'none' }, '&.MuiOutlinedInput - notchedOutline': { borderColor: 'transparent', }, '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'transparent', },
                                                                    }}>
                                                                    Assign
                                                                </Button>
                                                            </TableCell>
                                                        </TableRow>
                                                    );
                                                })
                                            ) : (
                                                <tr>
                                                    <td style={{ textAlign: "center" }} colSpan={6}>
                                                        No data found
                                                    </td>
                                                </tr>
                                            )
                                            }
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            }
                            {userStatus === 'ASSIGNED' &&
                                <Grid container>
                                    <Grid xs={12} md={6} sx={{ borderRight: '1px dashed #ddd', pr: 3 }}>
                                        <Grid
                                            container
                                            spacing={2}
                                            sx={{
                                                borderRadius: '8px',
                                                maxWidth: '400px',
                                                pb: 2,
                                                backgroundColor: '#fff',
                                            }}
                                        >
                                            {Object.entries(userData).map(([key, value]) => (
                                                <>
                                                    <Grid item xs={5} key={key}>
                                                        <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'start' }}>
                                                            {key}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={7}>
                                                        <Typography variant="body2" sx={{ textAlign: 'end' }}>
                                                            {value}
                                                        </Typography>
                                                    </Grid>
                                                </>
                                            ))}
                                        </Grid>
                                    </Grid>
                                    <Grid xs={12} md={6}>
                                        <Grid fullWidth sx={{ m: 2 }}>
                                            <Typography variant='body1'>Enter UTR*</Typography>
                                            <OutlinedInput onChange={(e) => handleUTR(e.target.value)} value={utr} variant="outlined" placeholder='Remarks: Fake deposit' sx={{ mb: 2, width: '100%', boxShadow: 'none', backgroundColor: '#F7F7F7', border: 'none', '&.Mui-focused': { boxShadow: 'none', border: 'none' }, '&:hover': { border: 'none' } }} />
                                            {utrIsRequiredError && <Typography color="error">UTR is required.</Typography>}
                                            {utrValidError && (
                                                <Typography sx={{ color: 'red', fontSize: '0.75rem', mt: 1 }}>
                                                    Please enter a valid UTR number
                                                </Typography>
                                            )}
                                            <Typography variant='body1'>Upload Slip*</Typography>
                                            <OutlinedInput
                                                type="file"
                                                onChange={handleImage}
                                                inputProps={{ accept: "image/*" }}
                                            />
                                            {imageValidError && <Typography color="error">Invalid file type or size exceeds 5MB.</Typography>}
                                            {imageIsRequiredError && <Typography color="error">Image is required.</Typography>}


                                            <Typography variant='body1'>Remarks*</Typography>
                                            <OutlinedInput onChange={(e) => handleRemark(e.target.value)} value={remark} variant="outlined" placeholder='Fake deposit' sx={{ mb: 2, width: '100%', boxShadow: 'none', backgroundColor: '#F7F7F7', border: 'none', '&.Mui-focused': { boxShadow: 'none', border: 'none' } }} />
                                            {remarkIsRequiredError && <Typography color="error">Remark is required.</Typography>}
                                            {remarkValidError && (
                                                <Typography sx={{ color: 'red', fontSize: '0.75rem', mt: 1 }}>
                                                    Please enter a valid remark
                                                </Typography>
                                            )}
                                            <Grid sx={{ display: 'flex', justifyContent: 'center' }}>
                                                <Button
                                                    onClick={ApprovedOrders}
                                                    disableRipple sx={{
                                                        minWidth: 'fit-content', textTransform: 'none', borderRadius: '32px', px: 6, mx: 0.5, py: 1, fontSize: '14px', fontWeight: 500,
                                                        backgroundColor: '#22C55D', color: '#fff', boxShadow: 'none', border: 'none', outline: 'none',
                                                        '&:hover, &:active, &:focus': { backgroundColor: '#22C55D', color: '#fff', boxShadow: 'none', }, '&:focus-visible': { outline: 'none', boxShadow: 'none' }, '&.MuiOutlinedInput - notchedOutline': { borderColor: 'transparent', }, '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'transparent', },
                                                    }}>
                                                    Approve
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            }
                        </DialogContent>
                    </Dialog>
                    {/* Approve MOdal */}
                    <Dialog
                        onClose={() => setOpenApproveModal(false)}
                        aria-labelledby="customized-dialog-title"
                        open={openApproveModal}
                        maxWidth="xs"
                        fullWidth
                        sx={{
                            '& .MuiDialog-paper': {
                                borderRadius: '24px 24px 24px 24px',
                            },
                        }}
                    >
                        <DialogTitle sx={{ m: 1.2, mb: 0, p: 2, backgroundColor: '#F2F6FC', borderRadius: '24px 24px 0px 0px', display: 'flex', flexDirection: 'column' }} id="customized-dialog-title">
                            <Typography sx={{ textAlign: 'center' }}> Amount </Typography>
                            <Typography variant='h1' sx={{ textAlign: 'center', color: '#EF4444', fontWeight: '700' }}> {Price} INR </Typography>
                        </DialogTitle>
                        <IconButton
                            aria-label="close"
                            onClick={() => setOpenApproveModal(false)}
                            sx={(theme) => ({
                                position: 'absolute',
                                right: 18,
                                top: 18,
                                color: theme.palette.grey[500],
                            })}
                        >
                            <CloseIcon />
                        </IconButton>
                        <DialogContent sx={{ m: 1.2, mt: 0, mb: 0, p: 0, borderTop: '1px solid #EDEDED', display: 'flex', flexDirection: 'column' }}>
                            {/* <Grid textAlign="center" xs={10} md={10} lg={10} xl={9} sx={{}}>
                        <Typography sx={{ p: 2 }}> All fields are filled—would you like to <Typography sx={{ ml: 2, fontWeight: 800 }}>approve</Typography> the order now? </Typography></Grid> */}
                            <Grid container

                                textAlign="center" // Centers the content horizontally
                                alignItems="center" // Aligns the content vertically (
                                sx={{ mt: 2 }}
                            >
                                <Grid xs={2}
                                    md={2}
                                    lg={2}
                                    xl={2}></Grid>
                                <Grid

                                    xs={8}
                                    md={8}
                                    lg={8}
                                    xl={8}
                                >
                                    <Typography
                                        variant="body1" // Adjust the typography variant for desired font size
                                        sx={{
                                            textAlign: 'center', // Center the text
                                            fontSize: { xs: '12px', md: '12px', lg: '14px' }, // Responsive font size
                                            fontWeight: 400, // Normal weight
                                        }}
                                    >
                                        All fields are filled—would you like to{' '}
                                        <Typography
                                            component="span"
                                            sx={{
                                                fontWeight: 'bold', // Bold for "approve"
                                            }}
                                        >
                                            approve
                                        </Typography>{' '}
                                        the order now?
                                    </Typography>
                                </Grid>
                                <Grid xs={2}
                                    md={2}
                                    lg={2}
                                    xl={2}></Grid>
                            </Grid>
                            <Grid fullWidth sx={{ m: 2 }}>
                                <Typography>Enter UTR*</Typography>
                                <OutlinedInput variant="outlined" placeholder='Remarks: Fake deposit' sx={{ mb: 2, width: '100%', boxShadow: 'none', backgroundColor: '#F7F7F7', border: 'none', '&.Mui-focused': { boxShadow: 'none', border: 'none' }, '&:hover': { border: 'none' } }} />
                                <Typography>Enter UTR*</Typography>
                                <OutlinedInput variant="outlined" placeholder='Remarks: Fake deposit' sx={{ mb: 2, width: '100%', boxShadow: 'none', backgroundColor: '#F7F7F7', border: 'none', '&.Mui-focused': { boxShadow: 'none', border: 'none' }, '&:hover': { border: 'none' } }} />
                            </Grid>
                        </DialogContent>
                        <DialogActions
                            sx={{
                                mb: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center', // Center-align buttons horizontally
                                gap: 2, // Add space between buttons
                            }}
                        >
                            <Grid container justifyContent="center" xs={10} md={10} lg={10} xl={9}>
                                <Button
                                    disableRipple
                                    fullWidth
                                    sx={{
                                        textTransform: 'none',
                                        borderRadius: '32px',
                                        py: 1, // Adjust vertical padding
                                        fontSize: '14px', // Slightly larger font size for better appearance
                                        fontWeight: 'bold',
                                        backgroundColor: '#22C55D', // Green button
                                        color: '#fff',
                                        '&:hover': {
                                            backgroundColor: '#22C55D', // No color change on hover
                                            color: '#fff',
                                        },
                                    }}
                                >
                                    Approve Now
                                </Button>
                            </Grid>
                            <Grid container justifyContent="center" xs={10} md={10} lg={10} xl={9}>
                                <Button
                                    disableRipple
                                    fullWidth
                                    sx={{
                                        textTransform: 'none',
                                        borderRadius: '32px',
                                        py: 1, // Adjust vertical padding
                                        fontSize: '14px', // Slightly larger font size for better appearance
                                        fontWeight: 'bold',
                                        backgroundColor: '#929292', // Gray button
                                        color: '#fff',
                                        '&:hover': {
                                            backgroundColor: '#929292', // No color change on hover
                                            color: '#fff',
                                        },
                                    }}
                                >
                                    Let the assignee approve
                                </Button>
                            </Grid>
                        </DialogActions>
                    </Dialog>
                </Box>
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
        </>


    );
}
