import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// project import
import MainCard from 'components/MainCard';
import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router';

export default function AdminStats({ title, items, selectedAdminIds }) {
    const filteredItems = items?.filter((item) => selectedAdminIds?.includes(item.id));

    const role = localStorage.getItem('role')
    return (
        <MainCard contentSX={{ p: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 900, color: "#676767" }}>
                {title} {role === 'super admin' ? 'Admin' : role === 'admin' ? 'Sub Admin' : role === 'sub-admin' ? 'Peer' : 'Bank Acoounts'}
            </Typography>

            {filteredItems && filteredItems.length > 0 && (
                <Grid container sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    {filteredItems.map((item, index) => (
                        <Grid item xs={12} md={6} lg={6} xl={6} sx={{ p: 1 }}>
                            <Grid sx={{ p: 1.5, backgroundColor: '#F2F6FC', border: '1px solid #E5EEF7', borderRadius: '8px' }}>
                                <Typography variant="h6" sx={{ fontWeight: 900, color: '#676767' }}>
                                    {item.username}
                                </Typography>
                                <Box sx={{ py: 1 }}>
                                    <Typography variant="caption" sx={{ color: '#676767' }}>
                                        Total PayIn
                                    </Typography>
                                </Box>
                                <Grid sx={{ p: 1.2, backgroundColor: '#fff', borderRadius: '8px' }}>
                                    <Typography variant="h4" sx={{ color: '#2C6DB5' }}>
                                        {item.payin || 0}
                                    </Typography>
                                </Grid>
                                <Box sx={{ py: 1 }}>
                                    <Typography variant="caption" sx={{ color: '#676767' }}>
                                        Total PayOut
                                    </Typography>
                                </Box>
                                <Grid sx={{ p: 1.2, backgroundColor: '#fff', borderRadius: '8px' }}>
                                    <Typography variant="h4" sx={{ color: '#2C6DB5' }}>
                                        {item.payout || 0}
                                    </Typography>
                                </Grid>

                                <Box sx={{ display: 'flex', justifyContent: 'center', pt: 2 }}>
                                    <Button variant='contained' onClick={() => navigate(`/userProfile/${item?.id}`)} sx={{ backgroundColor: '#2C6DB5', borderRadius: '34px', px: 4, '&:hover': { backgroundColor: '#2C6DB5', } }}>See Details</Button>
                                </Box>
                            </Grid>
                        </Grid>
                    ))}
                </Grid>
            )}
        </MainCard>
    );
}


AdminStats.propTypes = {
    title: PropTypes.string,
    items: PropTypes.array,
};




// import PropTypes from 'prop-types';
// import Grid from '@mui/material/Grid';
// import Typography from '@mui/material/Typography';

// // project import
// import MainCard from 'components/MainCard';
// import { Box, Button } from '@mui/material';
// import { useNavigate } from 'react-router';

// export default function AdminStats({ title, items, firstId, secId }) {

//     const navigate = useNavigate()
//     const filteredItems = items.filter((item) =>
//         (item.id === firstId || item.id === secId)
//     );

//     return (
//         <MainCard contentSX={{ p: 2 }}>
//             <Typography variant="h6" sx={{ fontWeight: 900, color: '#676767' }}>
//                 {title}
//             </Typography>
// {filteredItems && filteredItems.length > 0 && (
//     <Grid columnSpacing={2} sx={{ display: 'flex' }}>
//         {filteredItems.map((item, index) => (
//                         <Grid xs={12} md={6} lg={6} sx={{ m: 1, p: 1.5, backgroundColor: '#F2F6FC', border: '1px solid #E5EEF7', borderRadius: '8px' }}>
//                             <Typography variant="h6" sx={{ fontWeight: 900, color: '#676767' }}>
//                                 {item.username}
//                             </Typography>
//                             <Box sx={{ py: 1 }}>
//                                 <Typography variant="caption" sx={{ color: '#676767' }}>
//                                     Total PayIn
//                                 </Typography>
//                             </Box>
//                             <Grid sx={{ p: 1.2, backgroundColor: '#fff', borderRadius: '8px' }}>
//                                 <Typography variant="h4" sx={{ color: '#2C6DB5' }}>
//                                     {item.payin || 0}
//                                 </Typography>
//                             </Grid>
//                             <Box sx={{ py: 1 }}>
//                                 <Typography variant="caption" sx={{ color: '#676767' }}>
//                                     Total PayOut
//                                 </Typography>
//                             </Box>
//                             <Grid sx={{ p: 1.2, backgroundColor: '#fff', borderRadius: '8px' }}>
//                                 <Typography variant="h4" sx={{ color: '#2C6DB5' }}>
//                                     {item.payout || 0}
//                                 </Typography>
//                             </Grid>

//                             <Box sx={{ display: 'flex', justifyContent: 'center', pt: 2 }}>
//                                 <Button variant='contained' onClick={() => navigate(`/userProfile/${item?.id}`)} sx={{ backgroundColor: '#2C6DB5', borderRadius: '34px', px: 4, '&:hover': { backgroundColor: '#2C6DB5', } }}>See Details</Button>
//                             </Box>
//                         </Grid>
//                     ))}
//                 </Grid>
//             )}
//         </MainCard>
//     );
// }

// AdminStats.propTypes = {
//     title: PropTypes.string,
//     items: PropTypes.array,
// };
