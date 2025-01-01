
import { useEffect, useRef, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import bellNotification from 'assets/images/bellNotification.svg';

// project import
import MainCard from 'components/MainCard';
import Transitions from 'components/@extended/Transitions';

// assets
import CheckCircleOutlined from '@ant-design/icons/CheckCircleOutlined';

export default function Notification() {
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down('md'));

  const anchorRef = useRef(null);
  const [read, setRead] = useState(2);
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const iconBackColorOpen = 'grey.100';

  const token = localStorage.getItem('power_token');
  const bio = JSON.parse(localStorage.getItem("assigned_data"));
  console.log(bio, 'biioooo')

  useEffect(() => {

    const ws = new WebSocket(`wss://auth2.upicollect.com/ws/user/${bio.id}/?token=${token}`);

    ws.onopen = () => console.log('WebSocket connected.');
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data);
      setNotifications((prev) => [
        ...prev,
        { title: "New Notification", message: data.message },
      ]);
      setUnreadCount((prev) => prev + 1);
    };

    ws.onerror = (error) => console.error('WebSocket error:', error.message);
    ws.onclose = () => console.log('WebSocket disconnected.');

    return () => ws.close();
  }, [bio?.id, token]);


  const markAllRead = () => {
    setRead(0);
  };


  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      <IconButton
        color="secondary"
        variant="light"
        sx={{ color: 'text.primary', bgcolor: open ? iconBackColorOpen : 'transparent' }}
        aria-label="open profile"
        ref={anchorRef}
        aria-controls={open ? 'profile-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <img src={bellNotification} alt="bellNotification" />
      </IconButton>
      <Popper
        placement={matchesXs ? 'bottom-start' : 'bottom-start'}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        modifiers={[
          {
            name: 'offset',
            options: {
              offset: [0, 10],
            },
          },
        ]}
        style={{
          zIndex: 1500,
        }}
      >
        {({ TransitionProps }) => (
          <Transitions type="grow" position={matchesXs ? 'top' : 'top-right'} in={open} {...TransitionProps}>
            <Paper sx={{ boxShadow: theme.customShadows.z1, width: '100%', minWidth: 400, maxWidth: { xs: 400, md: 600 } }}>
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard
                  title="All Notification"
                  elevation={0}
                  border={false}
                  content={false}
                  sx={{ '& .MuiCardHeader-root': { padding: '10px', }, }} >
                  {notifications.length > 0 ? (
                    <List component="nav" sx={{ p: 0, bgcolor: '#F2F6FC', color: 'text.primary', borderRadius: 1, boxShadow: 1, '& .MuiListItemButton-root': { py: 1.5, px: 1.5, border: '6px solid white', '&:hover': { bgcolor: '#e3ebf6' }, '&.Mui-selected': { bgcolor: '#e3ebf6', color: 'text.primary' }, }, '& .MuiTypography-h6': { fontWeight: 'bold' }, '& .MuiTypography-subtitle1': { color: '#757575' }, '& .MuiTypography-caption': { fontSize: '0.75rem', color: '#9e9e9e' }, }} >
                      {notifications.map((notification, index) => (
                        <ListItemButton key={index}>
                          <ListItemText
                            primary={
                              <Typography variant="h6">
                                {notification.title || 'Notification'}
                              </Typography>
                            }
                            secondary={
                              <Typography variant="subtitle1">
                                {notification.message || 'No details available.'}
                              </Typography>
                            }
                          />
                        </ListItemButton>
                      ))}
                    </List>
                  ) : (
                    <Typography variant="body2" align="center" color="text.secondary" sx={{ m: 2 }} > No new notifications. </Typography>
                  )}

                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </Box>
  );
}
