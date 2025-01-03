import React, { useState, useEffect } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import UTRSlip from 'assets/images/UTRSlip.svg';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, OutlinedInput, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CloseIcon from '@mui/icons-material/Close';
import { getOrderById, Orderapproval } from 'api/api';
import { toast } from 'react-hot-toast';
import HashLoader from 'components/HashLoader';
import NoDataFound from 'assets/images/noDataFound.svg'

export default function PayInOperationData({ data, onSendStatusCode }) {

    const [openDeclineModal, setOpenDeclineModal] = React.useState(false);
    const [openApproveModal, setOpenApproveModal] = React.useState(false);
    const [OrdersIds, setOrdersIds] = React.useState()
    const [openUTRSlip, setOpenUTRSlip] = React.useState(false);
    const role = localStorage.getItem('role');

    const handleApprovedOrder = (val, id) => {
        setOrdersIds(id);
        setOpenApproveModal(val)
    }

    const handleDeclinedOrder = (val, id) => {
        setOrdersIds(id);
        setOpenDeclineModal(val)
    }

    const [Orders, setOrders] = useState('');
    const [showLoader, setShowLoader] = useState(false);
    const [utr, setutr] = useState("");
    const [utrValidError, setutrValidError] = useState(false);
    const [utrIsRequiredError, setutrIsRequiredlError] = useState(false);
    const [remark, setRemark] = useState("");
    const [remarkValidError, setRemarkValidError] = useState(false);
    const [remarkIsRequiredError, setRemarkIsRequiredlError] = useState(false);


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

    const ApprovedOrders = async (status) => {
        if ((remark !== "")) {
            const formData = new FormData();
            // formData.append('utr', utr);
            formData.append("approval_status", status);
            formData.append("remark", remark);
            formData.append("callback_url", "https://pay-sb1.ddtechlabs.com/powerpay/result?id=2");
            try {
                setShowLoader(true);
                const response = await Orderapproval(formData, Orders?.agent, Orders?.order_id);
                console.log(response,)
                if (response?.status === 200) {
                    setShowLoader(false);
                    setOpenApproveModal(false);
                    setOpenDeclineModal(false)
                    onSendStatusCode(false);
                    toast.success(response?.data?.message);
                    setutr('');
                    setRemark('');
                }
            } catch (err) {
                console.log(err);
            }
        }
    };

    const fetchData = async () => {
        try {
            const orderResponse = await getOrderById(OrdersIds);
            console.log(orderResponse, "By Id")
            if (orderResponse?.status === 200 && orderResponse?.data)
                setOrders(orderResponse?.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchData();
    }, [OrdersIds]);



    const userData = {
        "Assignee UPI": Orders?.upi,
        "Created On": Orders?.created_at?.slice(0, 10),
        "Receipt Number": Orders?.receipt,
        "Client Name": Orders?.client_name,
        "Order ID": Orders?.order_id,
    };


    return (
        <>
            {
                showLoader && (
                    <HashLoader />
                )
            }
            {data.length > 0 ?
                <TableContainer component={Paper} sx={{ borderRadius: '10px' }}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ textWrap: 'nowrap', py: 2.5 }}>Reciept No.</TableCell>
                                <TableCell sx={{ textWrap: 'nowrap', py: 2.5 }}>Client Name</TableCell>
                                <TableCell sx={{ textWrap: 'nowrap', py: 2.5, textAlign: 'center' }}>Order ID</TableCell>
                                <TableCell sx={{ textWrap: 'nowrap', py: 2.5, textAlign: 'center' }}>Created on</TableCell>
                                <TableCell sx={{ textWrap: 'nowrap', py: 2.5, textAlign: 'center' }}>UTR Number</TableCell>
                                {/* <TableCell sx={{ py: 2.5, textAlign: 'center' }}>UTR Slip</TableCell> */}
                                <TableCell sx={{ textWrap: 'nowrap', py: 2.5, textAlign: 'center' }}>Assignee UPI</TableCell>
                                <TableCell sx={{ textWrap: 'nowrap', py: 2.5, textAlign: 'center' }}>Amount</TableCell>
                                <TableCell sx={{ textWrap: 'nowrap', py: 2.5 }}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((row) => (
                                <TableRow sx={{ backgroundColor: row?.id % 2 === 0 ? '#fff' : '#F2F6FC' }}>
                                    <TableCell sx={{ textWrap: 'nowrap', py: 2 }}>{row?.receipt}</TableCell>
                                    <TableCell sx={{ textWrap: 'nowrap', py: 2 }}>{row?.client_name}</TableCell>
                                    <TableCell sx={{ textWrap: 'nowrap', py: 2, color: '#5C82A3', textAlign: 'center' }}>{row?.order_id}</TableCell>
                                    <TableCell sx={{ textWrap: 'nowrap', py: 2, color: '#5C82A3', textAlign: 'center' }}>{row?.created_at?.slice(0, 10)}</TableCell>
                                    <TableCell sx={{ textWrap: 'nowrap', py: 2, textAlign: 'center' }}>{row?.utr}</TableCell>
                                    {/* <TableCell sx={{ py: 2, textAlign: 'center' }}><img src={UTRSlip} alt={UTRSlip} onClick={() => setOpenUTRSlip(true)} /></TableCell> */}
                                    <TableCell sx={{ textWrap: 'nowrap', py: 2, color: '#2C6DB5', fontWeight: 600, textAlign: 'center' }}>{row?.upi}</TableCell>
                                    <TableCell sx={{ textWrap: 'nowrap', py: 2, textAlign: 'center' }}>
                                        <Button
                                            disableRipple
                                            sx={{
                                                textTransform: 'none',
                                                borderRadius: '20px',
                                                px: 3,
                                                py: 0.5,
                                                fontSize: '14px',
                                                fontWeight: 500,
                                                backgroundColor:
                                                    row?.approval_status === "APPROVED" ? '#B2F0A5' :
                                                        row?.approval_status === "DENIED" ? '#EC202838' :
                                                            row?.approval_status === "CREATED" ? '#AFE4FF80' :
                                                                row?.approval_status === "PENDING" ? '#FFD8AB' :
                                                                    row?.approval_status === "EXPIRED" ? '#ADA7A766' : '#fff',
                                                color:
                                                    row?.approval_status === "APPROVED" ? '#01AE08' :
                                                        row?.approval_status === "DENIED" ? '#EC2028' :
                                                            row?.approval_status === "CREATED" ? '#2C6DB5' :
                                                                row?.approval_status === "PENDING" ? '#BE6700' :
                                                                    row?.approval_status === "EXPIRED" ? '#676767' : '#000',
                                                boxShadow: 'none',
                                                border: 'none',
                                                outline: 'none',
                                                '&:hover, &:active, &:focus': {
                                                    backgroundColor:
                                                        row?.approval_status === "APPROVED" ? '#B2F0A5' :
                                                            row?.approval_status === "DENIED" ? '#EC202838' :
                                                                row?.approval_status === "CREATED" ? '#AFE4FF80' :
                                                                    row?.approval_status === "PENDING" ? '#FFD8AB' :
                                                                        row?.approval_status === "EXPIRED" ? '#ADA7A766' : '#fff',
                                                    color:
                                                        row?.approval_status === "APPROVED" ? '#01AE08' :
                                                            row?.approval_status === "DENIED" ? '#EC2028' :
                                                                row?.approval_status === "CREATED" ? '#2C6DB5' :
                                                                    row?.approval_status === "PENDING" ? '#BE6700' :
                                                                        row?.approval_status === "EXPIRED" ? '#676767' : '#000',
                                                    boxShadow: 'none',
                                                },
                                                '&:focus-visible': { outline: 'none', boxShadow: 'none' },
                                            }}
                                        >
                                            {row?.approval_status}
                                        </Button>
                                        <Typography variant="h4" sx={{ mt: 1, fontWeight: 900 }}>
                                            {row?.payment_amount}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Grid sx={{ display: 'flex', width: 'fit-content' }}>
                                            <Button
                                                onClick={() => handleApprovedOrder(true, row?.id)}
                                                disabled={row?.approval_status === "APPROVED" || row?.approval_status === "DENIED" || row?.approval_status === "CREATED"}
                                                sx={{
                                                    textTransform: 'none',
                                                    borderRadius: '32px',
                                                    px: 2,
                                                    mx: 0.5,
                                                    py: 1,
                                                    fontSize: '14px',
                                                    fontWeight: 500,
                                                    backgroundColor: row?.approval_status === "APPROVED" || row?.approval_status === "DENIED" || row?.approval_status === "CREATED" ? '#A9A9A9' : '#01AE08',
                                                    color: '#fff',
                                                    boxShadow: 'none',
                                                    border: 'none',
                                                    outline: 'none',
                                                    '&:hover, &:active, &:focus': {
                                                        backgroundColor: row?.approval_status === "APPROVED" || row?.approval_status === "DENIED" || row?.approval_status === "CREATED" ? '#A9A9A9' : '#01AE08',
                                                        color: '#fff',
                                                        boxShadow: 'none',
                                                    },
                                                    '&:focus-visible': { outline: 'none', boxShadow: 'none' },
                                                }}
                                            >
                                                Approve
                                            </Button>


                                            <Button
                                                disableRipple
                                                onClick={() => handleDeclinedOrder(true, row?.id)}
                                                disabled={row?.approval_status === "APPROVED" || row?.approval_status === "DENIED" || row?.approval_status === "CREATED"}
                                                sx={{
                                                    minWidth: 'fit-content',
                                                    textTransform: 'none',
                                                    borderRadius: '32px',
                                                    px: 2,
                                                    mx: 0.5,
                                                    py: 1,
                                                    fontSize: '14px',
                                                    fontWeight: 500,
                                                    backgroundColor: row?.approval_status === "APPROVED" || row?.approval_status === "DENIED" || row?.approval_status === "CREATED" ? '#A9A9A9' : '#FF6262',
                                                    color: '#fff',
                                                    boxShadow: 'none',
                                                    border: 'none',
                                                    outline: 'none',
                                                    '&:hover, &:active, &:focus': {
                                                        backgroundColor: row?.approval_status === "APPROVED" || row?.approval_status === "DENIED" || row?.approval_status === "CREATED" ? '#A9A9A9' : '#FF6262',
                                                        color: '#fff',
                                                        boxShadow: 'none',
                                                    },
                                                    '&:focus-visible': { outline: 'none', boxShadow: 'none' },
                                                }}
                                            >
                                                Decline
                                            </Button>
                                        </Grid>

                                        {/* <Button sx={{ minWidth: 'fit-content', p: 1, '&:hover, &:active, &:focus': { backgroundColor: 'transparent !important', } }}><MoreVertIcon sx={{ width: '1.2rem', color: '#2C6DB5', rotate: '90deg' }} /></Button> */}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>


                    {/* UTR Slip */}
                    <Dialog
                        onClose={() => setOpenUTRSlip(false)}
                        aria-labelledby="customized-dialog-title"
                        open={openUTRSlip}
                        maxWidth="xs"
                        fullWidth
                        sx={{
                            '& .MuiDialog-paper': {
                                borderRadius: '24px 24px 24px 24px',
                            },
                        }}
                    >
                        <DialogTitle sx={{ m: 1.2, mb: 0, p: 2, backgroundColor: '#F2F6FC', borderRadius: '24px 24px 0px 0px', display: 'flex', flexDirection: 'column' }} id="customized-dialog-title">
                            <Typography sx={{ textAlign: 'center' }}> Payment Reciept </Typography>
                        </DialogTitle>
                        <IconButton
                            aria-label="close"
                            onClick={() => setOpenUTRSlip(false)}
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
                            <Grid
                                container
                                spacing={2}
                                sx={{
                                    borderTop: '1px dashed #ddd',
                                    borderBottom: '1px dashed #ddd',
                                    borderRadius: '8px',
                                    mt: 2, p: 5,
                                    backgroundColor: '#F2F6FC',
                                }}
                            >
                            </Grid>
                        </DialogContent>
                        <DialogActions sx={{ m: 2, display: 'flex', justifyContent: 'center' }}>
                            <Button disableRipple sx={{
                                minWidth: 'fit-content', textTransform: 'none', borderRadius: '32px', px: 6, mx: 0.5, py: 1, fontSize: '14px', fontWeight: 500,
                                backgroundColor: '#2C6DB5', color: '#fff', boxShadow: 'none', border: 'none', outline: 'none',
                                '&:hover, &:active, &:focus': { backgroundColor: '#2C6DB5', color: '#fff', boxShadow: 'none', }, '&:focus-visible': { outline: 'none', boxShadow: 'none' }, '&.MuiOutlinedInput - notchedOutline': { borderColor: 'transparent', }, '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'transparent', },
                            }}>
                                Close
                            </Button>
                        </DialogActions>
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
                            <Typography variant='h1' sx={{ textAlign: 'center', color: '#EF4444', fontWeight: '700' }}> {Orders?.payment_amount} INR </Typography>
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
                            <Typography sx={{ p: 2, display: 'flex', justifyContent: 'center' }}> UTR : <Typography sx={{ ml: 2, fontWeight: 800 }}>{Orders?.utr}</Typography> </Typography>
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
                                {Object.entries(userData).map(([key, value]) => (
                                    <>
                                        <Grid item xs={6} key={key}>
                                            <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'start' }}>
                                                {key}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant="body2" sx={{ textAlign: 'end' }}>
                                                {value}
                                            </Typography>
                                        </Grid>
                                    </>
                                ))}
                            </Grid>
                            <Grid item xs={12} mt={2} px={2}>
                                <Typography variant="body1">Add Remarks*</Typography>
                                <OutlinedInput
                                    value={remark}
                                    onChange={(e) => handleRemark(e.target.value)}
                                    placeholder="Add remarks..."
                                    fullWidth
                                    sx={{
                                        backgroundColor: '#F7F7F7',
                                        boxShadow: 'none',
                                        '&.Mui-focused': { boxShadow: 'none' },
                                        '&:hover': { boxShadow: 'none' },
                                    }}
                                />
                                {remarkIsRequiredError && (
                                    <Typography sx={{ color: 'red', fontSize: '0.75rem', mt: 1 }}>
                                        Remark is required
                                    </Typography>
                                )}
                                {remarkValidError && (
                                    <Typography sx={{ color: 'red', fontSize: '0.75rem', mt: 1 }}>
                                        Please enter a valid remark
                                    </Typography>
                                )}
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
                            <Grid container justifyContent="center">
                                <Button
                                    fullWidth
                                    onClick={() => ApprovedOrders("APPROVED")}
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
                        </DialogActions>


                    </Dialog>

                    {/* Decline MOdal */}
                    <Dialog
                        onClose={() => setOpenDeclineModal(false)}
                        aria-labelledby="customized-dialog-title"
                        open={openDeclineModal}
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
                            <Typography variant='h1' sx={{ textAlign: 'center', color: '#EF4444', fontWeight: '700' }}> {Orders?.payment_amount}INR </Typography>
                            <Button disableRipple sx={{
                                alignSelf: 'center', width: 'fit-content', textTransform: 'none', borderRadius: '20px', px: 3, py: 0.5, fontSize: '14px', fontWeight: 500,
                                backgroundColor: '#FFD8AB', color: '#BE6700', boxShadow: 'none', border: 'none', outline: 'none',
                                '&:hover, &:active, &:focus': { backgroundColor: '#FFD8AB', color: '#BE6700', boxShadow: 'none', }, '&:focus-visible': { outline: 'none', boxShadow: 'none', },
                            }}>
                                Pending
                            </Button>
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
                        <DialogContent sx={{ m: 1.2, mt: 0, mb: 0, p: 0, borderTop: '1px solid #EDEDED', display: 'flex', flexDirection: 'column' }}>
                            <Typography sx={{ p: 2, display: 'flex', justifyContent: 'center' }}> UTR : <Typography sx={{ ml: 2, fontWeight: 800 }}>{Orders?.utr}</Typography> </Typography>
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
                                {Object.entries(userData).map(([key, value]) => (
                                    <>
                                        <Grid item xs={6} key={key}>
                                            <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'start' }}>
                                                {key}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant="body2" sx={{ textAlign: 'end' }}>
                                                {value}
                                            </Typography>
                                        </Grid>
                                    </>
                                ))}
                            </Grid>
                            <Grid item xs={12} mt={2} px={2}>
                                <Typography variant="body1">Add Remarks*</Typography>
                                <OutlinedInput
                                    value={remark}
                                    onChange={(e) => handleRemark(e.target.value)}
                                    placeholder="Add remarks..."
                                    fullWidth
                                    sx={{
                                        backgroundColor: '#F7F7F7',
                                        boxShadow: 'none',
                                        '&.Mui-focused': { boxShadow: 'none' },
                                        '&:hover': { boxShadow: 'none' },
                                    }}
                                />
                                {remarkIsRequiredError && (
                                    <Typography sx={{ color: 'red', fontSize: '0.75rem', mt: 1 }}>
                                        Remark is required
                                    </Typography>
                                )}
                                {remarkValidError && (
                                    <Typography sx={{ color: 'red', fontSize: '0.75rem', mt: 1 }}>
                                        Please enter a valid remark
                                    </Typography>
                                )}
                            </Grid>
                        </DialogContent>
                        <DialogActions sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
                            <Button disableRipple
                                onClick={() => ApprovedOrders("DENIED")}
                                sx={{
                                    minWidth: 'fit-content', textTransform: 'none', borderRadius: '32px', px: 5, mx: 0.5, py: 1, fontSize: '14px', fontWeight: 500,
                                    backgroundColor: '#FF6262', color: '#fff', boxShadow: 'none', border: 'none', outline: 'none',
                                    '&:hover, &:active, &:focus': { backgroundColor: '#FF6262', color: '#fff', boxShadow: 'none', }, '&:focus-visible': { outline: 'none', boxShadow: 'none' }, '&.MuiOutlinedInput - notchedOutline': { borderColor: 'transparent', }, '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'transparent', },
                                }}>
                                Decline
                            </Button>
                        </DialogActions>
                    </Dialog>
                </TableContainer>
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
