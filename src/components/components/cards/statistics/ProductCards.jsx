import { Card, CardContent, Typography, Grid, Box, Divider, Button } from '@mui/material';
export default function ProductCards({ Statics, clientDetail }) {

    return (
        <Grid container spacing={3} >
            {/* Total Revenue Card */}
            <Grid item xs={12} md={4}>
                {/* Bottom Card */}
                <Card
                    sx={{
                        padding: "16px",
                        height: '100%',
                        borderRadius: "10px",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                        alignContent: 'center',
                        border: '1px solid #E3E3E3'
                    }}
                >
                    <CardContent>
                        <Grid container>
                            <Grid item xs={12}>
                                <Grid container >
                                    <Grid item xs={4}>
                                        <Typography
                                            variant="body2"
                                            fontWeight="bold"
                                            color="textSecondary"
                                            sx={{ marginBottom: "8px", fontSize: "14px" }}
                                        >
                                            Total PayIn:
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <Typography component="span" sx={{ fontWeight: 'bold' }}>INR {Statics?.total_payin_amount}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container >
                                    <Grid item xs={4}>
                                        <Typography
                                            variant="body2"
                                            fontWeight="bold"
                                            color="textSecondary"
                                            sx={{ marginBottom: "8px", fontSize: "14px" }}
                                        >
                                            Total PayOut:
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <Typography component="span" sx={{ fontWeight: 'bold' }}>INR {Statics?.total_payout_amount}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container >
                                    <Grid item xs={4}>
                                        <Typography
                                            variant="body2"
                                            fontWeight="bold"
                                            color="textSecondary"
                                            sx={{ marginBottom: "8px", fontSize: "14px" }}
                                        >
                                            Total Profit:
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <Typography component="span" sx={{ fontWeight: 'bold' }}>INR {Statics?.total_payout_amount + Statics?.total_payin_amount}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>

            {/* Pending Operations Card */}
            <Grid item xs={12} md={4}>
                <Card
                    sx={{
                        backgroundColor: "#fff",
                        borderRadius: "10px",
                        height: '100%',
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    }}
                >
                    <CardContent>
                        <Typography
                            variant="body"
                            color="textSecondary"
                        >
                            Pending Operations
                        </Typography>
                        <Divider sx={{ my: 0.6 }} />
                        <Typography variant="body1" sx={{ fontSize: "14px", marginBottom: "6px" }}>
                            Pending PayIn: <strong>{clientDetail?.pending_operations?.pending_payin}</strong>
                        </Typography>
                        <Divider sx={{ my: 0.6 }} />
                        <Typography variant="body1" sx={{ fontSize: "14px", marginBottom: "16px" }}>
                            Pending Payout: <strong>{clientDetail?.pending_operations?.pending_payout}</strong>
                        </Typography>
                        <Grid sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Button
                                alignSelf='center'
                                variant="contained"
                                sx={{
                                    textTransform: "none",
                                    border: '1px solid #2C6DB5',
                                    backgroundColor: "#F2F6FC",
                                    color: "#2C6DB5",
                                    fontSize: "14px",
                                    padding: "6px 28px",
                                    borderRadius: '12px',
                                    '&:hover, &:active, &:focus': {
                                        border: '1px solid #2C6DB5',
                                        backgroundColor: "#F2F6FC",
                                        color: "#2C6DB5",
                                    }
                                }}
                            >
                                View Report
                            </Button>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>

            {/* Top Projects Card */}
            <Grid item xs={12} md={4}>
                <Card
                    sx={{
                        backgroundColor: "#fff",
                        borderRadius: "10px",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        height: '100%'
                    }}
                >
                    <CardContent>
                        <Typography
                            variant="h6"
                            fontWeight="bold"
                            color="textSecondary"
                            gutterBottom
                            sx={{ fontSize: "16px" }}
                        >
                            Top Projects
                        </Typography>
                        {clientDetail?.top_projects?.map((top, index) => (
                            <Card
                                key={index}
                                sx={{
                                    padding: 2,
                                    mb: 2,
                                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                                    borderRadius: 3,
                                    maxWidth: "100%",
                                    backgroundColor: "#f8f9fc",
                                }}
                            >
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item xs={12} sm={6}>
                                        <Typography variant="h6" fontWeight="bold">
                                            {top?.name}
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <Box
                                            sx={{
                                                width: "100%",
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                            }}
                                        >
                                            {/* Uncomment and replace with the correct image source if needed */}
                                            {/* <img
                        src="https://via.placeholder.com/200x80" // Replace with your chart image URL
                        alt="Chart"
                        style={{ width: "100%", height: "auto", objectFit: "contain" }}
                    /> */}
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Card>
                        ))}


                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}
