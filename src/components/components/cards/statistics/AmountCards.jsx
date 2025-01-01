import PropTypes from 'prop-types';

// material-ui
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MoreVertIcon from '@mui/icons-material/MoreVert';
// project import
import MainCard from 'components/MainCard';

import { Button, Card } from '@mui/material';

const iconSX = { fontSize: '0.75rem', color: 'inherit', marginLeft: 0, marginRight: 0 };

export default function AmountCards({ title, count, extra, image }) {
    return (
        <MainCard contentSX={{ p: 1, pt:2 }}>
            <Grid container spacing={1} justifyContent='end'>
                <Button sx={{ p: 0, '&:hover, &:active, &:focus': { backgroundColor: 'transparent !important', }}}><MoreVertIcon sx={{ width: '1.2rem', color: '#2C6DB5', rotate: '90deg' }} /></Button>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={2} md={4}>
                    <Card sx={{ backgroundColor: '#F2F6FC', boxShadow: 'none', borderRadius: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center', p: 1 }}>
                        {image && (
                            <img
                                src={image}
                                alt={title}
                                style={{ height: '100%', width: '100%' }}
                            />
                        )}
                    </Card>
                </Grid>
                <Grid item xs={10} md={8} alignContent='center'>
                    <Stack spacing={0.5}>
                        <Typography variant="h6" sx={{ fontWeight: 900, color: '#676767' }}>
                            {title}
                        </Typography>
                        <Grid container alignItems="center">
                            <Grid item>
                                <Typography variant="h4" sx={{ color: '#2C6DB5' }}>
                                    {count}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Stack>
                </Grid>
            </Grid>
            <Box sx={{ pt: 2.25 }}>
                <Typography variant="caption" color="text.secondary">
                    {extra}
                </Typography>
            </Box>
        </MainCard>
    );
}

AmountCards.propTypes = {
    color: PropTypes.string,
    title: PropTypes.string,
    count: PropTypes.string,
    extra: PropTypes.string,
    image: PropTypes.string,
};

AmountCards.defaultProps = {
    extra: '',
    image: null, // Default to null if no image is provided
};
