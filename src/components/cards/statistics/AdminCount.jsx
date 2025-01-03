import React, { useState } from "react";
import { Grid, Stack, Typography, Card, Menu, MenuItem, Box } from "@mui/material";
import MainCard from "components/MainCard";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CircleIcon from "@mui/icons-material/Circle";


export default function AdminCount({ title, items, selectedAdminIds, onAdminSelect }) {
    
    const role = localStorage.getItem('role')
    const [anchorEl, setAnchorEl] = useState({});
    const [selectedAdmins, setSelectedAdmins] = useState({});

    // Open menu handler
    const handleClick = (event, index) => {
        setAnchorEl((prev) => ({ ...prev, [index]: event.currentTarget }));
    };

    // Close menu handler
    const handleClose = (index) => {
        setAnchorEl((prev) => ({ ...prev, [index]: null }));
    };

    // Select admin handler
    const handleSelectAdmin = (index, username, id) => {
        setSelectedAdmins((prev) => ({ ...prev, [index]: username }));
        onAdminSelect(index, id);
        handleClose(index);
    };

    return (
        <MainCard contentSX={{ p: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 900, color: "#676767" }}>
                {title} {role === 'super admin' ? 'Admin' : role === 'admin' ? 'Sub Admin' : role === 'sub-admin' ? 'Peer' : 'Bank Acoounts'}
            </Typography>

            {/* Dynamic Dropdowns */}
            {role !== 'agent'
                ?
                (Array.isArray(items) ? (role === 'super admin' ? items.slice(0, 2) : items.slice(0, 7)) : []).map((item, index) => (
                    <Grid
                        key={index}
                        id={`dropdown-${index}`}
                        sx={{
                            width: "100%",
                            backgroundColor: "#F2F6FC",
                            borderRadius: "8px",
                            p: 1,
                            my: 2,
                            cursor: "pointer",
                        }}
                        onClick={(e) => handleClick(e, index)}
                    >

                        <Stack
                            direction="row"
                            sx={{ justifyContent: "space-between", alignItems: "center" }}
                        >
                            <Typography variant="h6" sx={{ fontWeight: 900, color: "#676767" }} onClick={(e) => { e.stopPropagation(); if (role === "admin") { navigate(`/userProfile/${item.id}`); } }}>
                                {selectedAdmins[index] ? selectedAdmins[index] : role === 'super admin' ? 'Select Admin' : role === 'admin' ? item?.username : role === 'sub-admin' ? 'Select Peer' : ''}
                            </Typography>
                            <Card
                                sx={{
                                    backgroundColor: "#DAE5F2",
                                    boxShadow: "none",
                                    borderRadius: "6px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    p: 0.4,
                                }}
                            >
                                <KeyboardArrowDownIcon />
                            </Card>
                        </Stack>

                        {/* Dropdown Menu */}
                        <Menu
                            anchorEl={anchorEl[index]}
                            open={Boolean(anchorEl[index])}
                            onClose={() => handleClose(index)}
                            sx={{
                                '& .MuiPaper-root': {
                                    marginTop: '2px',
                                    boxShadow: '0px 3px 3px rgba(159, 159, 159, 0.15)',
                                    width: '35%',
                                },
                                width: '100%',
                            }}
                        >
                            {role === 'super admin'
                                ?
                                (
                                    items.map((admin) => (
                                        <MenuItem
                                            key={admin.id}
                                            onClick={() => handleSelectAdmin(index, admin.username, admin.id)}
                                        >
                                            {admin.username}
                                        </MenuItem>
                                    ))
                                )
                                :
                                role === 'admin'
                                    ?
                                    (
                                        item.agent && item.agent.length > 0
                                            ?
                                            item.agent.map((agent) => (
                                                <MenuItem
                                                    key={agent.id}
                                                    onClick={() => navigate(`userProfile/${agent.id}`)}
                                                >
                                                    {agent.username}
                                                </MenuItem>
                                            ))
                                            :
                                            <MenuItem disabled>No agents available</MenuItem>
                                    )
                                    :
                                    role === 'creator'
                                        ?
                                        (
                                            item.agent && item.agent.length > 0
                                                ?
                                                item.agent.map((agent) => (
                                                    <MenuItem
                                                        key={agent.id}
                                                        onClick={() => navigate(`userProfile/${agent.id}`)}
                                                    >
                                                        {agent.username}
                                                    </MenuItem>
                                                ))
                                                :
                                                <MenuItem disabled>No agents available</MenuItem>
                                        )
                                        : 'No Data'
                            }
                        </Menu>
                    </Grid>
                ))
                :
                data.map((bankData, index) => (
                    <>
                        <Box sx={{ backgroundColor: "#F7F4FF", borderRadius: "10px", boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)", mt: 2 }} >
                            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ p: 1 }} >
                                <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "#333", textTransform: 'capitalize' }} >
                                    {bankData?.bank_name}
                                </Typography>
                                <Stack direction="row" alignItems="center" spacing={0.5} onClick={() => handleActivateAccount(bankData?.id)} sx={{ cursor: 'pointer' }}>
                                    <CircleIcon sx={{ color: bankData?.is_active ? '#22C55D' : '#EF4444', fontSize: "12px" }} />
                                    <Typography variant="body2" sx={{ color: bankData?.is_active ? '#22C55D' : '#EF4444', fontWeight: "bold" }} >
                                        {bankData?.is_active ? 'Active' : 'Inactive'}
                                    </Typography>
                                </Stack>
                            </Stack>

                            <Box sx={{ backgroundColor: "#EEE8FF", padding: "12px", borderRadius: "0px 0px 10px 10px" }}>
                                <Grid sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="body2" sx={{ color: "#666", marginBottom: "4px" }}>
                                        Account Holder Number:
                                    </Typography>
                                    <Typography component="span" variant="body2" sx={{ color: "#333", fontWeight: "bold", marginLeft: "8px" }} >
                                        {bankData?.bank_details?.name}
                                    </Typography>
                                </Grid>

                                <Grid sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="body2" sx={{ color: "#666", marginBottom: "4px" }}>
                                        Account Number:
                                    </Typography>
                                    <Typography component="span" variant="body2" sx={{ color: "#333", fontWeight: "bold", marginLeft: "8px" }} >
                                        {bankData?.account_number}
                                    </Typography>
                                </Grid>

                                <Grid sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="body2" sx={{ color: "#666" }}>
                                        IFSC code:
                                    </Typography>
                                    <Typography component="span" variant="body2" sx={{ color: "#333", fontWeight: "bold", marginLeft: "8px" }} >
                                        {bankData?.ifsc}
                                    </Typography>
                                </Grid>
                            </Box>
                        </Box>
                    </>
                ))

            }

            {role === 'agent' &&
                <Box sx={{ display: 'flex', justifyContent: 'center', pt: 2 }}>
                    <Button variant='contained' href="/createUser" sx={{ backgroundColor: '#5B3CA1', borderRadius: '34px', px: 4, '&:hover': { backgroundColor: '#5B3CA1' } }}>Add Bank Account</Button>
                </Box>
            }
        </MainCard>
    );
}



// #ECE8F4







// import * as React from 'react';

// import Button from '@mui/material/Button';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import MainCard from 'components/MainCard';
// import { Card, Grid, Stack, Typography, Box } from '@mui/material';
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

// export default function AdminCount({ title, items,  onSelectFirstAdmin, onSelectSecondAdmin  }) {

//     const role = localStorage.getItem('role');
//     console.log(role);

    
//     const [anchorEl, setAnchorEl] = React.useState(null);
//     const [anchorElSecond, setAnchorElSecond] = React.useState(null);
//     const [selectedAdmin, setSelectedAdmin] = React.useState(items[0]?.username || 'Select Admin');
//     const [selectedSecondAdmin, setSelectedSecondAdmin] = React.useState(items[1]?.username || 'Select Admin');

//     const open = Boolean(anchorEl);
//     const openSecond = Boolean(anchorElSecond);

//     const handleClick = (event) => {
//         setAnchorEl(event.currentTarget);
//     };
//     const handleClose = () => {
//         setAnchorEl(null);
//     };

//     const handleClickSecond = (event) => {
//         setAnchorElSecond(event.currentTarget);
//     };
//     const handleCloseSecond = () => {
//         setAnchorElSecond(null);
//     };

//     const handleSelectAdmin = (username, id) => {
//         setSelectedAdmin(username);
//         onSelectFirstAdmin(id);
//         handleClose();
//     };

//     const handleSelectSecondAdmin = (username, id) => {
//         setSelectedSecondAdmin(username);
//         onSelectSecondAdmin(id);
//         handleCloseSecond();
//     };

//     return (
//         <MainCard contentSX={{ p: 2 }}>
//             <Typography variant="h6" sx={{ fontWeight: 900, color: '#676767' }}>
//                 {title}
//             </Typography>

//             {/* First Admin Dropdown */}
//             <Grid id="basic-button" aria-controls={open ? 'basic-menu' : undefined} aria-haspopup="true" aria-expanded={open ? 'true' : undefined} onClick={handleClick}
//                 sx={{ width: '100%', backgroundColor: '#F2F6FC', borderRadius: '8px', p: 1, my: 2 }}
//             >
//                 <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
//                     <Typography variant="h6" sx={{ fontWeight: 900, color: '#676767' }}>
//                         {selectedAdmin}
//                     </Typography>
//                     <Card sx={{ backgroundColor: '#DAE5F2', boxShadow: 'none', borderRadius: '6px', display: 'flex', justifyContent: 'center', alignItems: 'center', p: 0.4 }}>
//                         <KeyboardArrowDownIcon />
//                     </Card>
//                 </Stack>
//             </Grid>
//             <Menu id="basic-menu" anchorEl={anchorEl} open={open} onClose={handleClose} MenuListProps={{ 'aria-labelledby': 'basic-button', }} sx={{ '& .MuiPaper-root': { boxShadow: '0px 3px 3px rgba(159, 159, 159, 0.15)', width: '35%', }, width: '100%', }} >
//                 {items.map((item, index) => (
//                     <MenuItem key={index} onClick={() => handleSelectAdmin(item.username, item?.id)}>
//                         {item.username}
//                     </MenuItem>
//                 ))}
//             </Menu>

//             {/* Second Admin Dropdown */}
//             <Grid id="second-button" aria-controls={openSecond ? 'second-menu' : undefined} aria-haspopup="true" aria-expanded={openSecond ? 'true' : undefined} onClick={handleClickSecond}
//                 sx={{ width: '100%', backgroundColor: '#F2F6FC', borderRadius: '8px', p: 1, my: 2 }}
//             >
//                 <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
//                     <Typography variant="h6" sx={{ fontWeight: 900, color: '#676767' }}>
//                         {selectedSecondAdmin}
//                     </Typography>
//                     <Card sx={{ backgroundColor: '#DAE5F2', boxShadow: 'none', borderRadius: '6px', display: 'flex', justifyContent: 'center', alignItems: 'center', p: 0.4 }}>
//                         <KeyboardArrowDownIcon />
//                     </Card>
//                 </Stack>
//             </Grid>
//             <Menu id="second-menu" anchorEl={anchorElSecond} open={openSecond} onClose={handleCloseSecond} MenuListProps={{ 'aria-labelledby': 'second-button', }} sx={{ '& .MuiPaper-root': { boxShadow: '0px 3px 3px rgba(159, 159, 159, 0.15)', width: '35%', }, width: '100%', }} >
//                 {items.map((item, index) => (
//                     <MenuItem key={index} onClick={() => handleSelectSecondAdmin(item.username, item?.id)}>
//                         {item.username}
//                     </MenuItem>
//                 ))}
//             </Menu>

//             <Box sx={{ display: 'flex', justifyContent: 'center' }}>
//                 <Button variant='contained' sx={{ backgroundColor: '#2C6DB5', borderRadius: '34px', px: 4 }}>Create User</Button>
//             </Box>
//         </MainCard>
//     );
// }
