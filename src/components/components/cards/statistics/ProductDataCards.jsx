import rockyBook from 'assets/images/rockyBook.svg';
import { Card, CardContent, Typography, Grid, Box, Pagination } from '@mui/material';
import { useState } from 'react';

export default function ProductDataCards({ clientDetail }) {
    const [currentPage, setCurrentPage] = useState(1); // Current page state
    const itemsPerPage = 6; // Number of items per page

    // Get the current page's data
    const totalItems = clientDetail?.clients?.length || 0;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = clientDetail?.clients?.slice(startIndex, endIndex);

    const handleChange = (event, value) => {
        setCurrentPage(value);
    };

    return (
        <Box sx={{ backgroundColor: '#fff', p: 3, borderRadius: '12px' }}>
            <Grid container rowGap={5} spacing={3}>
                {currentItems?.map((project, index) => (
                    <Grid
                        key={index}
                        item xs={12} md={4}
                        sx={{
                            position: "relative",
                            display: "inline-block",
                        }}
                    >
                        {/* Top Card */}
                        <Box
                            sx={{
                                position: "absolute",
                                top: "-10px",
                                left: "10px",
                                width: '70%',
                                border: '1px solid #E3E3E3',
                                backgroundColor: "#fff",
                                borderRadius: "10px",
                                boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
                                zIndex: 1,
                                padding: "12px",
                                display: 'flex'
                            }}
                        >
                            <img src={rockyBook} alt="" />
                            <Typography variant="h5" alignSelf='center' ml={1}>
                                {project.name}
                            </Typography>
                        </Box>

                        {/* Bottom Card */}
                        <Card
                            sx={{
                                pt: '20px',
                                height: '100%',
                                borderRadius: "10px",
                                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                                alignContent: 'center'
                            }}
                        >
                            <CardContent>
                                <Typography variant="body1" sx={{ fontSize: "14px", marginBottom: "6px" }}>
                                    Total PayIn: <strong>INR {project?.total_payin}</strong>
                                </Typography>
                                <Typography variant="body1" sx={{ fontSize: "14px", marginBottom: "6px" }}>
                                    Total Payout: <strong>INR {project?.total_payout}</strong>
                                </Typography>
                            </CardContent>

                            <Grid container>
                                <Grid item xs={4}>
                                    <Box
                                        sx={{
                                            backgroundColor: "#F2F6FC",
                                            padding: 0.9,
                                            margin: 0.5,
                                            borderRadius: 1,
                                            textAlign: "start",
                                        }}
                                    >
                                        <Typography variant="body2">
                                            Total Admin:
                                        </Typography>
                                        <Typography variant="h6" fontWeight="bold">{project.admin_count}</Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={4}>
                                    <Box
                                        sx={{
                                            backgroundColor: "#F2F6FC",
                                            padding: 0.9,
                                            margin: 0.5,
                                            borderRadius: 1,
                                            textAlign: "start",
                                            textWrap: 'nowrap'
                                        }}
                                    >
                                        <Typography variant="body2">
                                            Total Sub Admin:
                                        </Typography>
                                        <Typography variant="h6" fontWeight="bold">{project.sub_admin_count}</Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={4}>
                                    <Box
                                        sx={{
                                            backgroundColor: "#F2F6FC",
                                            padding: 0.9,
                                            margin: 0.5,
                                            borderRadius: 1,
                                            textAlign: "start",
                                        }}
                                    >
                                        <Typography variant="body2">
                                            Total Peer:
                                        </Typography>
                                        <Typography variant="h6" fontWeight="bold">{project.peer_count}</Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Pagination */}
            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
                <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handleChange}
                    sx={{
                        '& .MuiPaginationItem-root.Mui-selected': {
                            fontWeight:900,
                            color: '#2c6db5',
                            backgroundColor: '#daeffe',
                        },
                    }}
                />

            </Box>
        </Box>
    );
}
