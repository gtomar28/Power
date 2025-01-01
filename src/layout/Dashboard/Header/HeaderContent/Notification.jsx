
// import { useEffect, useRef, useState } from 'react';
// import { useTheme } from '@mui/material/styles';
// import useMediaQuery from '@mui/material/useMediaQuery';
// import ClickAwayListener from '@mui/material/ClickAwayListener';
// import IconButton from '@mui/material/IconButton';
// import List from '@mui/material/List';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemText from '@mui/material/ListItemText';
// import Paper from '@mui/material/Paper';
// import Popper from '@mui/material/Popper';
// import Typography from '@mui/material/Typography';
// import Box from '@mui/material/Box';
// import bellNotification from 'assets/images/bellNotification.svg';
// import MainCard from 'components/MainCard';
// import Transitions from 'components/@extended/Transitions';
// import { Badge } from '@mui/material';

// // Notification 
// import { PushNotifications } from '@capacitor/push-notifications';
// import { Capacitor } from '@capacitor/core';

// export default function Notification() {
//   const theme = useTheme();
//   const matchesXs = useMediaQuery(theme.breakpoints.down('md'));

//   const anchorRef = useRef(null);
//   const [read, setRead] = useState(2);
//   const [open, setOpen] = useState(false);
//   const [notifications, setNotifications] = useState([]);
//   const [UnreadCount, setUnreadCount] = useState(0)
  
//   const iconBackColorOpen = 'grey.100';

//   const token = localStorage.getItem('power_token');
//   const bio = JSON.parse(localStorage.getItem("assigned_data"));
//   const role = localStorage.getItem("role")

//   const handleToggle = () => {
//     setOpen((prevOpen) => !prevOpen);
//   };

//   const handleClose = (event) => {
//     if (anchorRef.current && anchorRef.current.contains(event.target)) {
//       return;
//     }
//     setOpen(false);
//   };

//   useEffect(() => {
//     let ws; // WebSocket instance
//     const wsBaseURL = "wss://auth2.upicollect.com";

//     // Determine WebSocket URL based on the user's role and the notification type
//     if (role === "super admin") {
//       ws = new WebSocket(`${wsBaseURL}/ws/superadmin/?token=${token}`);
//     } else {
//       // For other roles
//       ws = new WebSocket(`${wsBaseURL}/ws/user/${bio.id}/?token=${token}`);
//     }

//     ws.onopen = () => console.log("WebSocket connected.");
//     ws.onmessage = (event) => {
//       const data = JSON.parse(event.data);
//       console.log("Notification received:", data);
//       setNotifications((prev) => [
//         ...prev,
//         { title: "New Notification", message: data.message },
//       ]);
//       setUnreadCount((prev) => (prev || 0) + 1);
//     };
//     ws.onerror = (error) => console.error("WebSocket error:", error.message);
//     ws.onclose = () => console.log("WebSocket disconnected.");

//     return () => ws.close(); // Cleanup WebSocket on component unmount
//   }, [role, bio?.id, token]);

//   // WebSocket for Order-Specific Updates
//   useEffect(() => {
//     if (!bio || !bio.currentOrderId) return;

//     const wsBaseURL = "wss://auth2.upicollect.com";

//     const wsOrder = new WebSocket(`${wsBaseURL}/ws/order_status/${bio.currentOrderId}/?token=${token}`);

//     wsOrder.onopen = () => console.log("Order-specific WebSocket connected.");
//     wsOrder.onmessage = (event) => {
//       const data = JSON.parse(event.data);
//       console.log("Order update received:", data);
//       setNotifications((prev) => [
//         ...prev,
//         { title: "Order Update", message: data.message },
//       ]);
//       setUnreadCount((prev) => (prev || 0) + 1);
//     };
//     wsOrder.onerror = (error) => console.error("WebSocket error:", error.message);
//     wsOrder.onclose = () => console.log("Order-specific WebSocket disconnected.");

//     return () => wsOrder.close(); // Cleanup WebSocket on component unmount
//   }, [bio?.currentOrderId, token]);

//   // WebSocket for Payouts
//   useEffect(() => {
//     const wsBaseURL = "wss://auth2.upicollect.com";
//     let wsPayout;
//     if (role === "superadmin") {
//       wsPayout = new WebSocket(`${wsBaseURL}/ws/payout/superadmin/?token=${token}`);
//     } else {
//       wsPayout = new WebSocket(`${wsBaseURL}/ws/payout/user/${bio.id}/?token=${token}`);
//     }

//     wsPayout.onopen = () => console.log("Payout WebSocket connected.");
//     wsPayout.onmessage = (event) => {
//       const data = JSON.parse(event.data);
//       console.log("Payout update received:", data);
//       setNotifications((prev) => [
//         ...prev,
//         { title: "Payout Notification", message: data.message },
//       ]);
//       setUnreadCount((prev) => (prev || 0) + 1);
//     };
//     wsPayout.onerror = (error) => console.error("Payout WebSocket error:", error.message);
//     wsPayout.onclose = () => console.log("Payout WebSocket disconnected.");

//     return () => wsPayout.close(); // Cleanup WebSocket on component unmount
//   }, [role, bio?.id, token]);

//   // notification
//   useEffect(() => {
//     if (Capacitor.getPlatform() !== 'web'){
//       // Request permission for push notifications
//       PushNotifications.requestPermission().then((result) => {
//         if (result.granted) {
//           // Register for push notifications if permission is granted
//           PushNotifications.register();
//         } else {
//           console.log('Push notification permission denied');
//         }
//       });

//       // Handle push notifications
//       PushNotifications.addListener('pushNotificationReceived', (notification) => {
//         console.log('Push notification received:', notification);
//         setNotifications((prev) => [
//           ...prev,
//           { title: 'Push Notification', message: notification.body },
//         ]);
//         setUnreadCount((prev) => (prev || 0) + 1);
//       });

//       PushNotifications.addListener('pushNotificationActionPerformed', (notification) => {
//         console.log('Push notification action performed:', notification);
//       });

//       // Cleanup listeners on unmount
//       return () => {
//         PushNotifications.removeAllListeners();
//       };
//     }
//   }, []);



//   return (
//     <Box sx={{ flexShrink: 0, ml: 0.75 }}>
//       <IconButton
//         color="secondary"
//         variant="light"
//         sx={{ color: 'text.primary', bgcolor: open ? iconBackColorOpen : 'transparent' }}
//         aria-label="open profile"
//         ref={anchorRef}
//         aria-controls={open ? 'profile-grow' : undefined}
//         aria-haspopup="true"
//         onClick={handleToggle}
//       >
//         <Badge
//           badgeContent={UnreadCount > 0 ? UnreadCount : null}
//           color="error"
//           sx={{
//             '& .MuiBadge-badge': {
//               right: 10,
//               top: 4,
//               minWidth: '16px',
//               height: '16px',
//               fontSize: '0.75rem',
//             },
//           }}
//         >
//           {/* <NotificationsNoneOutlinedIcon sx={{ fontSize: '30px' }} /> */}
//           <img src={bellNotification} alt='Notification' />
//         </Badge>
//       </IconButton>
//       <Popper
//         placement={matchesXs ? 'bottom-start' : 'bottom-start'}
//         open={open}
//         anchorEl={anchorRef.current}
//         role={undefined}
//         transition
//         disablePortal
//         modifiers={[
//           {
//             name: 'offset',
//             options: {
//               offset: [0, 10],
//             },
//           },
//         ]}
//         style={{
//           zIndex: 1500,
//         }}
//       >
//         {({ TransitionProps }) => (
//           <Transitions type="grow" position={matchesXs ? 'top' : 'top-right'} in={open} {...TransitionProps}>
//             <Paper sx={{ boxShadow: theme.customShadows.z1, width: '100%', minWidth: 400, maxWidth: { xs: 400, md: 600 } }}>
//               <ClickAwayListener onClickAway={handleClose}>
//                 <MainCard
//                   title="All Notification"
//                   elevation={0}
//                   border={false}
//                   content={false}
//                   sx={{ '& .MuiCardHeader-root': { padding: '10px' } }}
//                 >
//                   {notifications.length > 0 ? (
//                     <Box
//                       sx={{
//                         maxHeight: 300, // Set the fixed height for the notification box
//                         overflow: 'auto', // Enable scrolling for content overflow
//                         bgcolor: '#F2F6FC',
//                         borderRadius: 1,
//                         boxShadow: 1,
//                       }}
//                     >
//                       <List
//                         component="nav"
//                         sx={{
//                           p: 0,
//                           color: 'text.primary',
//                           '& .MuiListItemButton-root': {
//                             py: 1.5,
//                             px: 1.5,
//                             border: '6px solid white',
//                             '&:hover': { bgcolor: '#e3ebf6' },
//                             '&.Mui-selected': { bgcolor: '#e3ebf6', color: 'text.primary' },
//                           },
//                           '& .MuiTypography-h6': { fontWeight: 'bold' },
//                           '& .MuiTypography-subtitle1': { color: '#757575' },
//                           '& .MuiTypography-caption': { fontSize: '0.75rem', color: '#9e9e9e' },
//                         }}
//                       >
//                         {notifications.map((notification, index) => (
//                           <ListItemButton key={index}>
//                             <ListItemText
//                               primary={
//                                 <Typography variant="h6">
//                                   {notification.title || 'Notification'}
//                                 </Typography>
//                               }
//                               secondary={
//                                 <Typography variant="subtitle1">
//                                   {notification.message || 'No details available.'}
//                                 </Typography>
//                               }
//                             />
//                           </ListItemButton>
//                         ))}
//                       </List>
//                     </Box>
//                   ) : (
//                     <Typography variant="body2" align="center" color="text.secondary" sx={{ m: 2 }}>
//                       No new notifications.
//                     </Typography>
//                   )}
//                 </MainCard>
//               </ClickAwayListener>
//             </Paper>
//           </Transitions>
//         )}
//       </Popper>

//     </Box>
//   );
// }





















// working with badge 

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
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import bellNotification from 'assets/images/bellNotification.svg';

// project import
import MainCard from 'components/MainCard';
import Transitions from 'components/@extended/Transitions';

// assets
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import { Badge } from '@mui/material';

export default function Notification() {
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down('md'));



  const anchorRef = useRef(null);
  const [read, setRead] = useState(2);
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [UnreadCount, setUnreadCount] = useState(0)

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

  const role = localStorage.getItem("role")

  useEffect(() => {
    let ws; // WebSocket instance
    const wsBaseURL = "wss://auth2.upicollect.com";

    // Determine WebSocket URL based on the user's role and the notification type
    if (role === "super admin") {
      ws = new WebSocket(`${wsBaseURL}/ws/superadmin/?token=${token}`);
    } else {
      // For other roles
      ws = new WebSocket(`${wsBaseURL}/ws/user/${bio.id}/?token=${token}`);
    }

    ws.onopen = () => console.log("WebSocket connected.");
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Notification received:", data);
      setNotifications((prev) => [
        ...prev,
        { title: "New Notification", message: data.message },
      ]);
      setUnreadCount((prev) => (prev || 0) + 1);
    };
    ws.onerror = (error) => console.error("WebSocket error:", error.message);
    ws.onclose = () => console.log("WebSocket disconnected.");

    return () => ws.close(); // Cleanup WebSocket on component unmount
  }, [role, bio?.id, token]);

  // WebSocket for Order-Specific Updates
  useEffect(() => {
    if (!bio || !bio.currentOrderId) return;

    const wsBaseURL = "wss://auth2.upicollect.com";

    const wsOrder = new WebSocket(`${wsBaseURL}/ws/order_status/${bio.currentOrderId}/?token=${token}`);

    wsOrder.onopen = () => console.log("Order-specific WebSocket connected.");
    wsOrder.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Order update received:", data);
      setNotifications((prev) => [
        ...prev,
        { title: "Order Update", message: data.message },
      ]);
      setUnreadCount((prev) => (prev || 0) + 1);
    };
    wsOrder.onerror = (error) => console.error("WebSocket error:", error.message);
    wsOrder.onclose = () => console.log("Order-specific WebSocket disconnected.");

    return () => wsOrder.close(); // Cleanup WebSocket on component unmount
  }, [bio?.currentOrderId, token]);

  // WebSocket for Payouts
  useEffect(() => {
    const wsBaseURL = "wss://auth2.upicollect.com";
    let wsPayout;
    if (role === "superadmin") {
      wsPayout = new WebSocket(`${wsBaseURL}/ws/payout/superadmin/?token=${token}`);
    } else {
      wsPayout = new WebSocket(`${wsBaseURL}/ws/payout/user/${bio.id}/?token=${token}`);
    }

    wsPayout.onopen = () => console.log("Payout WebSocket connected.");
    wsPayout.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Payout update received:", data);
      setNotifications((prev) => [
        ...prev,
        { title: "Payout Notification", message: data.message },
      ]);
      setUnreadCount((prev) => (prev || 0) + 1);
    };
    wsPayout.onerror = (error) => console.error("Payout WebSocket error:", error.message);
    wsPayout.onclose = () => console.log("Payout WebSocket disconnected.");

    return () => wsPayout.close(); // Cleanup WebSocket on component unmount
  }, [role, bio?.id, token]);



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
        <Badge
          badgeContent={UnreadCount > 0 ? UnreadCount : null}
          color="error"
          sx={{
            '& .MuiBadge-badge': {
              right: 10,
              top: 4,
              minWidth: '16px',
              height: '16px',
              fontSize: '0.75rem',
            },
          }}
        >
          {/* <NotificationsNoneOutlinedIcon sx={{ fontSize: '30px' }} /> */}
          <img src={bellNotification} alt='Notification' />
        </Badge>
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













// import { useEffect, useRef, useState } from 'react';

// // material-ui
// import { useTheme } from '@mui/material/styles';
// import useMediaQuery from '@mui/material/useMediaQuery';
// import ClickAwayListener from '@mui/material/ClickAwayListener';
// import IconButton from '@mui/material/IconButton';
// import List from '@mui/material/List';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemText from '@mui/material/ListItemText';
// import Paper from '@mui/material/Paper';
// import Popper from '@mui/material/Popper';
// import Tooltip from '@mui/material/Tooltip';
// import Typography from '@mui/material/Typography';
// import Box from '@mui/material/Box';
// import bellNotification from 'assets/images/bellNotification.svg';

// // project import
// import MainCard from 'components/MainCard';
// import Transitions from 'components/@extended/Transitions';

// // assets
// import CheckCircleOutlined from '@ant-design/icons/CheckCircleOutlined';

// export default function Notification() {
//   const theme = useTheme();
//   const matchesXs = useMediaQuery(theme.breakpoints.down('md'));



//   const anchorRef = useRef(null);
//   const [read, setRead] = useState(2);
//   const [open, setOpen] = useState(false);
//   const [notifications, setNotifications] = useState([]);
//   const [UnreadCount, setUnreadCount] = useState()

//   const handleToggle = () => {
//     setOpen((prevOpen) => !prevOpen);
//   };

//   const handleClose = (event) => {
//     if (anchorRef.current && anchorRef.current.contains(event.target)) {
//       return;
//     }
//     setOpen(false);
//   };

//   const iconBackColorOpen = 'grey.100';

//   const token = localStorage.getItem('power_token');
//   const bio = JSON.parse(localStorage.getItem("assigned_data"));
//   console.log(bio, 'biioooo')

//   const role = localStorage.getItem("role")

//   useEffect(() => {
//     let ws; // WebSocket instance
//     const wsBaseURL = "wss://auth2.upicollect.com";

//     // Determine WebSocket URL based on the user's role and the notification type
//     if (role === "super admin") {
//       ws = new WebSocket(`${wsBaseURL}/ws/superadmin/?token=${token}`);
//     } else {
//       // For other roles
//       ws = new WebSocket(`${wsBaseURL}/ws/user/${bio.id}/?token=${token}`);
//     }

//     ws.onopen = () => console.log("WebSocket connected.");
//     ws.onmessage = (event) => {
//       const data = JSON.parse(event.data);
//       console.log("Notification received:", data);
//       setNotifications((prev) => [
//         ...prev,
//         { title: "New Notification", message: data.message },
//       ]);
//       setUnreadCount((prev) => (prev || 0) + 1);
//     };
//     ws.onerror = (error) => console.error("WebSocket error:", error.message);
//     ws.onclose = () => console.log("WebSocket disconnected.");

//     return () => ws.close(); // Cleanup WebSocket on component unmount
//   }, [role, bio?.id, token]);

//   // WebSocket for Order-Specific Updates
//   useEffect(() => {
//     if (!bio || !bio.currentOrderId) return;

//     const wsBaseURL = "wss://auth2.upicollect.com";

//     const wsOrder = new WebSocket(`${wsBaseURL}/ws/order_status/${bio.currentOrderId}/?token=${token}`);

//     wsOrder.onopen = () => console.log("Order-specific WebSocket connected.");
//     wsOrder.onmessage = (event) => {
//       const data = JSON.parse(event.data);
//       console.log("Order update received:", data);
//       setNotifications((prev) => [
//         ...prev,
//         { title: "Order Update", message: data.message },
//       ]);
//       setUnreadCount((prev) => (prev || 0) + 1);
//     };
//     wsOrder.onerror = (error) => console.error("WebSocket error:", error.message);
//     wsOrder.onclose = () => console.log("Order-specific WebSocket disconnected.");

//     return () => wsOrder.close(); // Cleanup WebSocket on component unmount
//   }, [bio?.currentOrderId, token]);

//   // WebSocket for Payouts
//   useEffect(() => {
//     const wsBaseURL = "wss://auth2.upicollect.com";
//     let wsPayout;
//     if (role === "superadmin") {
//       wsPayout = new WebSocket(`${wsBaseURL}/ws/payout/superadmin/?token=${token}`);
//     } else {
//       wsPayout = new WebSocket(`${wsBaseURL}/ws/payout/user/${bio.id}/?token=${token}`);
//     }

//     wsPayout.onopen = () => console.log("Payout WebSocket connected.");
//     wsPayout.onmessage = (event) => {
//       const data = JSON.parse(event.data);
//       console.log("Payout update received:", data);
//       setNotifications((prev) => [
//         ...prev,
//         { title: "Payout Notification", message: data.message },
//       ]);
//       setUnreadCount((prev) => (prev || 0) + 1);
//     };
//     wsPayout.onerror = (error) => console.error("Payout WebSocket error:", error.message);
//     wsPayout.onclose = () => console.log("Payout WebSocket disconnected.");

//     return () => wsPayout.close(); // Cleanup WebSocket on component unmount
//   }, [role, bio?.id, token]);



//   const markAllRead = () => {
//     setRead(0);
//   };


//   return (
//     <Box sx={{ flexShrink: 0, ml: 0.75 }}>
//       <IconButton
//         color="secondary"
//         variant="light"
//         sx={{ color: 'text.primary', bgcolor: open ? iconBackColorOpen : 'transparent' }}
//         aria-label="open profile"
//         ref={anchorRef}
//         aria-controls={open ? 'profile-grow' : undefined}
//         aria-haspopup="true"
//         onClick={handleToggle}
//       >
//         <img src={bellNotification} alt="bellNotification" />
//       </IconButton>
//       <Popper
//         placement={matchesXs ? 'bottom-start' : 'bottom-start'}
//         open={open}
//         anchorEl={anchorRef.current}
//         role={undefined}
//         transition
//         disablePortal
//         modifiers={[
//           {
//             name: 'offset',
//             options: {
//               offset: [0, 10],
//             },
//           },
//         ]}
//         style={{
//           zIndex: 1500,
//         }}
//       >
//         {({ TransitionProps }) => (
//           <Transitions type="grow" position={matchesXs ? 'top' : 'top-right'} in={open} {...TransitionProps}>
//             <Paper sx={{ boxShadow: theme.customShadows.z1, width: '100%', minWidth: 400, maxWidth: { xs: 400, md: 600 } }}>
//               <ClickAwayListener onClickAway={handleClose}>
//                 <MainCard
//                   title="All Notification"
//                   elevation={0}
//                   border={false}
//                   content={false}
//                   secondary={
//                     <>
//                       {read > 0 && (
//                         <Tooltip title="Mark all as read">
//                           {/* <IconButton color="success" size="small" onClick={markAllRead}>
//                             <CheckCircleOutlined style={{ fontSize: '1.15rem' }} />
//                           </IconButton> */}
//                         </Tooltip>
//                       )}
//                     </>
//                   }
//                   sx={{ '& .MuiCardHeader-root': { padding: '10px', }, }} >
//                   {notifications.length > 0 ? (
//                     <List component="nav" sx={{ p: 0, bgcolor: '#F2F6FC', color: 'text.primary', borderRadius: 1, boxShadow: 1, '& .MuiListItemButton-root': { py: 1.5, px: 1.5, border: '6px solid white', '&:hover': { bgcolor: '#e3ebf6' }, '&.Mui-selected': { bgcolor: '#e3ebf6', color: 'text.primary' }, }, '& .MuiTypography-h6': { fontWeight: 'bold' }, '& .MuiTypography-subtitle1': { color: '#757575' }, '& .MuiTypography-caption': { fontSize: '0.75rem', color: '#9e9e9e' }, }} >
//                       {notifications.map((notification, index) => (
//                         <ListItemButton key={index}>
//                           <ListItemText
//                             primary={
//                               <Typography variant="h6">
//                                 {notification.title || 'Notification'}
//                               </Typography>
//                             }
//                             secondary={
//                               <Typography variant="subtitle1">
//                                 {notification.message || 'No details available.'}
//                               </Typography>
//                             }
//                           />
//                         </ListItemButton>
//                       ))}
//                     </List>
//                   ) : (
//                     <Typography variant="body2" align="center" color="text.secondary" sx={{ m: 2 }} > No new notifications. </Typography>
//                   )}

//                 </MainCard>
//               </ClickAwayListener>
//             </Paper>
//           </Transitions>
//         )}
//       </Popper>
//     </Box>
//   );
// }
