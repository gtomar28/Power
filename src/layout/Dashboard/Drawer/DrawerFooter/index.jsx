import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';

import { handlerDrawerOpen, useGetMenuMaster } from 'api/menu';

// project import
import DrawerFooterStyled from './DrawerFooterStyled';

import Logo from 'assets/images/PowerLogo.svg';
import { Grid, Typography } from '@mui/material';
import profileBg from 'assets/images/profileBg.svg';
import profileImage from 'assets/images/profileImage.svg';
import { Link } from 'react-router-dom';

const userLocalData = JSON.parse(localStorage.getItem('assigned_data'));

export default function DrawerFooter({ open }) {
  const theme = useTheme();

  const { menuMaster } = useGetMenuMaster();
  const drawerOpen = menuMaster.isDashboardDrawerOpened;

  return (
    <DrawerFooterStyled theme={theme} open={!!open} sx={{p:1}}>
      <Grid component={Link} to='/profile' sx={{ color: '#fff', textDecoration: 'none', p: drawerOpen ? 2 : 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundImage: `url(${profileBg})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center', width: '100%', height: 'fit-content', borderRadius: drawerOpen ? '20px' : '0px' }} >
        <img src={profileImage} alt="Logo" />
        {drawerOpen && 
        <>
          <Typography variant='h6' mt={1} sx={{ textTransform: 'uppercase' }}>{userLocalData?.name}</Typography>
          <Typography variant='h6'>
            {userLocalData?.is_superadmin ? 'Super Admin' : userLocalData?.is_admin ? 'Admin' : userLocalData?.is_creater ? 'Sub Admin' : 'Peer'}
          </Typography>
        </>
        }
      </Grid>

    </DrawerFooterStyled>
  );
}

DrawerFooter.propTypes = { open: PropTypes.bool };