import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// project import
import MainCard from 'components/MainCard';

export default function AnalyticEcommerce({ title, count }) {
  return (
    <MainCard contentSX={{ p: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={9} sx={{}}>
          <Typography variant="h6" sx={{ fontWeight: 900, color: '#676767' }}>
            {title}
          </Typography>
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography variant="h6" sx={{ fontWeight: 900, color: '#2C6DB5' }}>
            {count}
          </Typography>
        </Grid>
      </Grid>
    </MainCard>
  );
}

AnalyticEcommerce.propTypes = {
  title: PropTypes.string,
  count: PropTypes.string,
};
