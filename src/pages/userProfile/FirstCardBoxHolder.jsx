import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';

import CircleIcon from '@mui/icons-material/Circle';
import ProfileAmountCards from 'components/cards/statistics/ProfileAmountCards';

const FirstCardBoxHolder = ({ data, personalData, paymentData }) => {

    const adminStatsData = [
        { admin: 'Admin 1', payIn: '30,00,000', payOut: '22,00,000' },
        { admin: 'Admin 2', payIn: '44,00,000', payOut: '31,00,000' },
    ];

    const adminData = [
        { adminName: 'Admin 1', adminDropOptions: ['SuperAdmin1', 'SuperAdmin2', 'SuperAdmin3'] },
        { adminName: 'Admin 2', adminDropOptions: ['SuperAdmin1', 'SuperAdmin2', 'SuperAdmin3'] },
    ];

    return (
        <Grid container spacing={2} alignItems='center'>
            <Grid item xs={12} sm={4} md={4} lg={4}>
                <ProfileAmountCards title="Total Operations" count={data?.total_operations} extra={`Total Operations: ${data?.total_operations}`} image='' />
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={4}>
                <ProfileAmountCards title="Total PayIn" count={data?.total_payin_count} extra={`Available PayIn Limit: ${paymentData?.payin_limit}`} image='' />
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={4}>
                <ProfileAmountCards title="Total PayOut" count={data?.total_payout_count} extra={`Available PayOut Limit: ${paymentData?.payout_limit}`} image='' />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={4}>
                <AnalyticEcommerce title="Total PayIn" count={data?.total_payin_count} />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={4}>
                <AnalyticEcommerce title="Total PayOut" count={data?.total_payout_count} />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={4}>
                <AnalyticEcommerce title="Total Sub Admin" count={data?.total_subAdmin_count} />
            </Grid>
            <Grid item xs={12} lg={12}>
                <TableContainer component={Paper} sx={{ borderRadius: '10px', boxShadow: 'none' }}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ py: 0.8, color: '#8E8E8E' }}>Name</TableCell>
                                <TableCell sx={{ py: 0.8, color: '#8E8E8E' }}>Category</TableCell>
                                <TableCell sx={{ py: 0.8, color: '#8E8E8E' }}>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow sx={{ backgroundColor: '#E9F0F8' }}>
                                <TableCell sx={{ py: 0.8, fontSize: '12px' }}>{personalData?.name}</TableCell>
                                <TableCell sx={{ py: 0.8, fontSize: '12px' }}>{personalData?._}</TableCell>
                                <TableCell sx={{ py: 0.8, color: '#8E8E8E', fontSize: '12px', alignItems: 'center' }}>
                                    <CircleIcon sx={{ mr: 1, fontSize: '1.2rem', color: '#22C55D' }} /> {personalData?.last_check_in}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    )
}

export default FirstCardBoxHolder




