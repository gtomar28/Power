import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

// material-ui
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import UnfoldLessIcon from '@mui/icons-material/UnfoldLess';

// project import
import Drawer from './Drawer';
import navigation from 'menu-items';
import Loader from 'components/Loader';
import Breadcrumbs from 'components/@extended/Breadcrumbs';

import { handlerDrawerOpen, useGetMenuMaster } from 'api/menu';

export default function DashboardLayout() {
  const { menuMaster, menuMasterLoading } = useGetMenuMaster();
  const downXL = useMediaQuery((theme) => theme.breakpoints.down('xl'));
  const matchDownMD = useMediaQuery((theme) => theme.breakpoints.down('lg'));

  // const { menuMaster } = useGetMenuMaster();
  // const drawerOpen = menuMaster.isDashboardDrawerOpened;

  const iconBackColor = 'grey.100';
  const iconBackColorOpen = 'grey.200';


  useEffect(() => {
    handlerDrawerOpen(!downXL);
  }, [downXL]);


  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (token) {
      let backButtonListener;
      if (window.Capacitor) {
        import('@capacitor/app').then(({ App }) => {
          backButtonListener = App.addListener('backButton', () => {
            if (location.pathname === '/') {
              App.exitApp();
            } else {
              navigate(-1);
            }
          });
        });
      }

      return () => {
        if (backButtonListener) {
          backButtonListener.remove();
        }
      };
    }
  }, [token, navigate, location.pathname]);

  const drawerOpen = menuMaster?.isDashboardDrawerOpened || false;

  // Close drawer on route change only for small screens
  useEffect(() => {
    if (matchDownMD && drawerOpen) {
      handlerDrawerOpen(false);
    }
  }, [location.pathname, matchDownMD]); // Run on every route change and screen size change

  if (menuMasterLoading) return <Loader />;

  return (
    <Box sx={{ display: 'flex', backgroundColor: ' #F6F8FC', position: 'relative', height: '100vh', overflow: 'scroll' }}>
      <Drawer sx={{
        height: '100%', overflow: 'scroll'
      }} />
      <Box component="main"
        sx={{
          // width: menuMaster?.isDashboardDrawerOpened ? '90%' : '96%',
          marginLeft: menuMaster?.isDashboardDrawerOpened ? '0%' : !matchDownMD && '6%',
          // backgroundColor:' #2a8746',
          flexGrow: 1,
          p: { xs: 2, sm: 3, md: 5 },
          transition: 'width 0.3s ease',
          height: '100%', overflow: 'scroll'
        }}>{matchDownMD &&
          <IconButton
            disableRipple
            aria-label="open drawer"
            onClick={() => handlerDrawerOpen(!menuMaster.isDashboardDrawerOpened)}
            edge="start"
            color="secondary"
            variant="light"
            sx={{
              color: 'text.primary', bgcolor: menuMaster.isDashboardDrawerOpened ? iconBackColorOpen : iconBackColor,
              position: menuMaster?.isDashboardDrawerOpened ? 'absolute' : 'relative', zIndex: 1000000,
              left: menuMaster?.isDashboardDrawerOpened ? '255px' : '2%',
              top: menuMaster?.isDashboardDrawerOpened ? '50px' : '0px',
              transition: 'width 0.3s ease',
              mb: 2,
              boxShadow: '0px 1px 3px #838383'
            }}
          >
            <UnfoldLessIcon sx={{ rotate: '90deg' }} />
            {/* {!menuMaster.isDashboardDrawerOpened ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />} */}
          </IconButton>
        }
        <Breadcrumbs navigation={navigation} title />
        <Outlet />
      </Box>


      {!matchDownMD &&
        <IconButton
          disableRipple
          aria-label="open drawer"
          onClick={() => handlerDrawerOpen(!menuMaster.isDashboardDrawerOpened)}
          edge="start"
          color="secondary"
          variant="light"
          sx={{
            color: 'text.primary', bgcolor: menuMaster.isDashboardDrawerOpened ? iconBackColorOpen : iconBackColor,
            position: 'absolute', zIndex: 1000000,
            left: menuMaster?.isDashboardDrawerOpened ? '254px' : '5.5%',
            top: '52px',
            transition: 'width 0.3s ease',
            boxShadow: '0px 1px 3px #838383'
          }}
        >
          <UnfoldLessIcon sx={{ rotate: '90deg' }} />
          {/* {!menuMaster.isDashboardDrawerOpened ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />} */}
        </IconButton>
      }
    </Box>
  );
}
