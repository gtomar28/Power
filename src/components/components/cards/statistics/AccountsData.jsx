


import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Grid, Typography, TablePagination, Dialog } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import TripOriginIcon from '@mui/icons-material/TripOrigin';
import CircleIcon from '@mui/icons-material/Circle';
import { DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { updateUserbyId } from 'api/api';

export default function AccountsData({ data, count, next, previous, onPageChange }) {
    const [page, setPage] = React.useState(0); // Track current page
    console.log(page)
    const [rowsPerPage, setRowsPerPage] = React.useState(10); // Track rows per page
    const [paginatedData, setPaginatedData] = React.useState(data); // Store current page data
    const [openDialog, setOpenDialog] = React.useState(false);
    const [userState, setUserState] = React.useState();
    const [userId, setUserId] = React.useState();

    const handleOpenDialog = (id, val) => {
        setUserId(id)
        setUserState(val)
        console.log(val)
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleConfirm = async() => {
        try {
            const response = await updateUserbyId(userId);
            console.log(response, "user update successfully")
            if (response.status === 200) {
                onData(true);
                handleCloseDialog();
            }
        } catch (err) {
            console.log(err);
        }
        
    };


    // Function to handle page change

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        onPageChange(newPage+1)
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    return (
        <TableContainer component={Paper} sx={{ borderRadius: '10px' }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ py: 2.5 }}>Name</TableCell>
                        <TableCell sx={{ py: 2.5 }}>Role</TableCell>
                        <TableCell sx={{ py: 2.5 }}>User UPI ID</TableCell>
                        <TableCell sx={{ py: 2.5 }}>Active status</TableCell>
                        <TableCell sx={{ py: 2.5 }}>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {paginatedData.map((row, index) => (
                        <TableRow href={`/userProfile/${row?.personal_details?.name}`} key={index} sx={{ backgroundColor: index % 2 !== 0 ? '#fff' : '#F2F6FC' }}>
                            <TableCell sx={{ py: 1.8 }}>{row?.personal_details?.name}</TableCell>
                            <TableCell sx={{ py: 1.8 }}>{row?.personal_details?.username}</TableCell>
                            <TableCell sx={{ py: 1.8 }}>{row?.payment_details?.upi_id}</TableCell>
                            <TableCell sx={{ py: 1.8 }}>
                                <Grid alignItems="center" sx={{ display: 'flex' }}>
                                    <CircleIcon sx={{ mr: 1, fontSize: '1.2rem', color: row?.payment_details?.is_blocked ? '#EF4444' : '#22C55D' }} />
                                    <Typography variant="body1" sx={{ color: row?.payment_details?.is_blocked ? '#EF4444' : '#22C55D' }}> {row?.payment_details?.is_blocked ? 'Block' : 'Unblock'}</Typography>
                                </Grid>
                            </TableCell>
                            <TableCell sx={{ py: 1.8, display: 'flex', justifyContent: 'space-between' }}>
                                <Button disableRipple sx={{ '&:hover': { backgroundColor: 'transparent' } }} onClick={(e) => { e.stopPropagation(); handleOpenDialog(row?.payment_details?.is_blocked)}}>
                                    {row?.payment_details?.is_blocked ? <TripOriginIcon sx={{ mr: 1, fontSize: '1.2rem', color: '#22C55D' }} /> : <PanoramaFishEyeIcon sx={{ mr: 1, fontSize: '1.2rem', color: '#EF4444' }}/>}
                                    <Typography variant="body1" sx={{ color: row?.payment_details?.is_blocked ? '#22C55D' : '#EF4444' }}>{row?.payment_details?.is_blocked ? 'Mark UnBlock' : 'Mark Block'}</Typography>
                                </Button>
                                <Button sx={{ minWidth: 'fit-content', p: 1, '&:hover, &:active, &:focus': { backgroundColor: 'transparent !important' } }}>
                                    <MoreVertIcon sx={{ width: '1.2rem', color: '#2C6DB5', rotate: '90deg' }} />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* Pagination Controls */}
            {/* <TablePagination
                rowsPerPageOptions={[10, 25, 50]}
                component="div"
                count={count}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            /> */}
            <TablePagination
                rowsPerPageOptions={[10, 25, 50]}
                rowsPerPage={rowsPerPage}
                page={page}
                count={count}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />


            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle textAlign='center'>
                    <Typography variant="h4">Are you sure?</Typography>
                </DialogTitle>
                <DialogContent>
                    <Typography variant="h6" display='flex' >
                        Are you sure you would like to {userState ? <Typography fontWeight={900} sx={{ mx: 0.5 }}> Unblock</Typography> : <Typography fontWeight={900} sx={{ mx: 0.5 }}> Block</Typography>} this account?
                    </Typography>
                </DialogContent>
                <DialogActions alignItems='center'>
                    <Grid container rowSpacing={1}>
                        <Grid item xs={12}>
                            <Grid container >
                                <Grid item textAlign='center' xs={1} md={3}></Grid>
                                <Grid item textAlign='center' xs={10} md={6}>
                                    <Button variant='contained' onClick={handleConfirm} sx={{ backgroundColor: '#2C6DB5', borderRadius: '50px', width: '100%', '&:hover': {backgroundColor: '#2C6DB5',} }}>
                                        Confirm
                                    </Button>
                                </Grid>
                                <Grid item textAlign='center' xs={1} md={3}></Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container >
                                <Grid item textAlign='center' xs={1} md={3}></Grid>
                                <Grid item textAlign='center' xs={10} md={6}>
                                    <Button variant='contained' onClick={handleCloseDialog} sx={{ backgroundColor: '#929292', borderRadius: '50px', width: '100%', '&:hover': { backgroundColor: '#929292',} }}>
                                        Cancel
                                    </Button>
                                </Grid>
                                <Grid item textAlign='center' xs={1} md={3}></Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogActions>
            </Dialog>
        </TableContainer>



    );
}



// pagination


// import * as React from 'react';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import UTRSlip from 'assets/images/UTRSlip.svg';
// import { Button, Grid, Typography, TablePagination } from '@mui/material';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
// import TripOriginIcon from '@mui/icons-material/TripOrigin';
// import CircleIcon from '@mui/icons-material/Circle';
// import axios from 'axios';

// export default function AccountsData({ data, count, next, previous, onPageChange }) {
//     const [page, setPage] = React.useState(0); // Track current page
//     const [rowsPerPage, setRowsPerPage] = React.useState(10); // Track rows per page
//     const [paginatedData, setPaginatedData] = React.useState(data); // Store current page data

//     // Function to handle page change
//     const handleChangePage = async (event, newPage) => {
//         console.log(newPage, 'hdgfgyhbh')
//         setPage(newPage);
//         if (onPageChange) {
//             onPageChange(newPage);
//         }
//     };

//     // Handle rows per page change
//     const handleChangeRowsPerPage = (event) => {
//         setRowsPerPage(parseInt(event.target.value, 10));
//         setPage(0); // Reset to first page on rows per page change
//     };

//     return (
//         <TableContainer component={Paper} sx={{ borderRadius: '10px' }}>
//             <Table sx={{ minWidth: 650 }} aria-label="simple table">
//                 <TableHead>
//                     <TableRow>
//                         <TableCell sx={{ py: 2.5 }}>Name</TableCell>
//                         <TableCell sx={{ py: 2.5 }}>Role</TableCell>
//                         <TableCell sx={{ py: 2.5 }}>User UPI ID</TableCell>
//                         <TableCell sx={{ py: 2.5 }}>Active status</TableCell>
//                         <TableCell sx={{ py: 2.5 }}>Action</TableCell>
//                     </TableRow>
//                 </TableHead>
//                 <TableBody>
//                     {paginatedData.map((row, index) => (
//                         <TableRow href={`/userProfile/${row?.personal_details?.name}`} key={index} sx={{ backgroundColor: index % 2 !== 0 ? '#fff' : '#F2F6FC' }}>
//                             <TableCell sx={{ py: 1.8 }}>{row?.personal_details?.name}</TableCell>
//                             <TableCell sx={{ py: 1.8 }}>{row?.personal_details?.username}</TableCell>
//                             <TableCell sx={{ py: 1.8 }}>{row?.payment_details?.upi_id}</TableCell>
//                             <TableCell sx={{ py: 1.8 }}>
//                                 <Grid alignItems="center" sx={{ display: 'flex' }}>
//                                     {row?.payment_details?.is_blocked ? (
//                                         <>
//                                             <CircleIcon sx={{ mr: 1, fontSize: '1.2rem', color: '#EF4444' }} />
//                                             <Typography variant="body1" sx={{ color: '#EF4444' }}>Block</Typography>
//                                         </>
//                                     ) : (
//                                         <>
//                                             <CircleIcon sx={{ mr: 1, fontSize: '1.2rem', color: '#22C55D' }} />
//                                             <Typography variant="body1" sx={{ color: '#22C55D' }}>Unblock</Typography>
//                                         </>
//                                     )}
//                                 </Grid>
//                             </TableCell>
//                             <TableCell sx={{ py: 1.8, display: 'flex', justifyContent: 'space-between' }}>
//                                 <Button disableRipple sx={{ '&:hover': { backgroundColor: 'transparent' } }}>
//                                     <TripOriginIcon sx={{ mr: 1, fontSize: '1.2rem', color: row?.payment_details?.is_blocked ? '#22C55D' : '#EF4444' }} />
//                                     <Typography variant="body1" sx={{ color: row?.payment_details?.is_blocked ? '#22C55D' : '#EF4444' }}>{row?.payment_details?.is_blocked ? 'Mark UnBlock' : 'Mark Block'}</Typography>
//                                 </Button>
//                                 <Button sx={{ minWidth: 'fit-content', p: 1, '&:hover, &:active, &:focus': { backgroundColor: 'transparent !important' } }}>
//                                     <MoreVertIcon sx={{ width: '1.2rem', color: '#2C6DB5', rotate: '90deg' }} />
//                                 </Button>
//                             </TableCell>
//                         </TableRow>
//                     ))}
//                 </TableBody>
//             </Table>

//             {/* Pagination Controls */}
//             <TablePagination
//                 rowsPerPageOptions={[10, 25, 50]}
//                 component="div"
//                 count={count}
//                 rowsPerPage={rowsPerPage}
//                 page={page}
//                 onPageChange={handleChangePage}
//                 onRowsPerPageChange={handleChangeRowsPerPage}
//             />
//         </TableContainer>
//     );
// }














// import * as React from 'react';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import UTRSlip from 'assets/images/UTRSlip.svg';
// import { Button, Grid, Typography } from '@mui/material';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
// import TripOriginIcon from '@mui/icons-material/TripOrigin';
// import CircleIcon from '@mui/icons-material/Circle';

// export default function AccountsData({ data }) {

//     return (
//         <TableContainer component={Paper} sx={{ borderRadius: '10px' }}>
//             <Table sx={{ minWidth: 650 }} aria-label="simple table">
//                 <TableHead>
//                     <TableRow>
//                         <TableCell sx={{ py: 2.5 }}>Name</TableCell>
//                         <TableCell sx={{ py: 2.5 }}>Role</TableCell>
//                         <TableCell sx={{ py: 2.5 }}>User UPI ID</TableCell>
//                         <TableCell sx={{ py: 2.5 }}>Active status</TableCell>
//                         <TableCell sx={{ py: 2.5 }}>Action</TableCell>
//                     </TableRow>
//                 </TableHead>
//                 <TableBody>
//                     {data.map((row, index) => (
//                         <TableRow key={index} sx={{ backgroundColor: index % 2 !== 0 ? '#fff' : '#F2F6FC' }}>
//                             <TableCell sx={{ py: 1.8 }}>{row?.personal_details?.name}</TableCell>
//                             <TableCell sx={{ py: 1.8 }}>{row?.personal_details?.username}</TableCell>
//                             <TableCell sx={{ py: 1.8 }}>{row?.payment_details?.upi_id}</TableCell>
//                             <TableCell sx={{ py: 1.8 }}>
//                                 <Grid alignItems='center' sx={{display: 'flex'}}>
//                                     {row?.payment_details?.is_blocked
//                                         ?
//                                         <>
//                                             <CircleIcon sx={{ mr: 1, fontSize: '1.2rem', color: '#EF4444' }} />
//                                             <Typography variant="body1" sx={{ color: '#EF4444' }}>Block</Typography>
//                                         </>
//                                         :
//                                         <>
//                                             <CircleIcon sx={{ mr: 1, fontSize: '1.2rem', color: '#22C55D' }} />
//                                             <Typography variant="body1" sx={{ color: '#22C55D' }}>Unblock</Typography>
//                                         </>
//                                     }
                                    
//                                 </Grid>
//                             </TableCell>
//                             <TableCell sx={{ py: 1.8, display: 'flex', justifyContent: 'space-between' }}>
//                                 <Button disableRipple sx={{ '&:hover': { backgroundColor: 'transparent' } }}>
//                                     {row?.payment_details?.is_blocked
//                                         ?
//                                         <>
//                                             <TripOriginIcon sx={{ mr: 1, fontSize: '1.2rem', color: '#22C55D' }} />
//                                             <Typography variant="body1" sx={{ color: '#22C55D' }}>Mark UnBlock</Typography>
//                                         </>
//                                         :
//                                         <>
//                                             <PanoramaFishEyeIcon sx={{ mr: 1, fontSize: '1.2rem', color: '#EF4444' }} />
//                                             <Typography variant="body1" sx={{ color: '#EF4444' }}>Mark Block</Typography>
//                                         </>
//                                     }
//                                 </Button>
//                                 <Button sx={{ minWidth: 'fit-content', p: 1, '&:hover, &:active, &:focus': { backgroundColor: 'transparent !important', } }}><MoreVertIcon sx={{ width: '1.2rem', color: '#2C6DB5', rotate: '90deg' }} /></Button>
//                             </TableCell>
//                         </TableRow>
//                     ))}
//                 </TableBody>
//             </Table>
//         </TableContainer>
//     );
// }

