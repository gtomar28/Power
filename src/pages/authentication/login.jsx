

// material-ui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project import
import AuthWrapper from './AuthWrapper';
import AuthLogin from './auth-forms/AuthLogin';

// ================================|| LOGIN ||================================ //

export default function Login() {
  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack direction="column" rowGap={2} justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
            <Typography variant="h3" sx={{ color: '#2C6DB5', fontSize: '32px'}}>Login</Typography>
            <Typography variant="body1" sx={{ textDecoration: 'none', color: '#8392AB' }}>
              Enter your email and password to sign in
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} p={0}>
          <AuthLogin />
        </Grid>
      </Grid>
    </AuthWrapper>
  );
}
