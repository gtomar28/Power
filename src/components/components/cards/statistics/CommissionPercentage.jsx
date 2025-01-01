import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// project import
import MainCard from 'components/MainCard';

export default function CommissionPercentage({ data }) {
    return (
        <MainCard contentSX={{ p: 0, '&.MuiCardContent-root:last-child': { paddingBottom: '0 !important' } }}>
            {data && data.length > 0 && (
                <Grid sx={{ display: 'flex', p: 0 }}>
                    {data.map((item, index) => (
                        <Grid key={index} item xs={12} md={6} lg={6} sx={{ display: 'flex', m: 1, py: 1.8, px:1.3, backgroundColor: '#F2F6FC', border: '1px solid #E5EEF7', borderRadius: '8px' }}>
                            <Typography variant="h6" sx={{ fontWeight: 900, color: '#676767', flexGrow: 1 }}>
                                {item.name}
                            </Typography>
                            <Typography variant="h6" sx={{ fontWeight: 900, color: '#676767' }}>
                                {item.percentage}
                            </Typography>
                        </Grid>
                    ))}
                </Grid>
            )}
        </MainCard>
    );
}

CommissionPercentage.propTypes = {
    title: PropTypes.string,
    items: PropTypes.array,
};
