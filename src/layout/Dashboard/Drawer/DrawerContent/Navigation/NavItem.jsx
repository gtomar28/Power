import PropTypes from 'prop-types';
import { forwardRef, useEffect } from 'react';
import { Link, useLocation, matchPath } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

// project import
import { handlerActiveItem, useGetMenuMaster } from 'api/menu';

export default function NavItem({ item, level }) {
  const theme = useTheme();
  const { menuMaster } = useGetMenuMaster();
  const drawerOpen = menuMaster.isDashboardDrawerOpened;
  const openItem = menuMaster.openedItem;

  const { pathname } = useLocation();

  // Determine if the current item is selected based on `pathname`
  const isSelected =
    (Array.isArray(item.url)
      ? item.url.some((url) => !!matchPath({ path: url, end: true }, pathname))
      : !!matchPath({ path: item.url, end: true }, pathname)) ||
    openItem === item.id;

  // Set the active item when the page loads or changes
  useEffect(() => {
    if (Array.isArray(item.url)) {
      if (item.url.includes(pathname)) handlerActiveItem(item.id);
    } else if (pathname === item.url) {
      handlerActiveItem(item.id);
    }
  }, [pathname, item.id, item.url]);

  // Dynamic properties for external/internal links
  let itemTarget = '_self';
  if (item.target) itemTarget = '_blank';

  let listItemProps = {};

  if (Array.isArray(item.url)) {
    // Use the first URL as the primary target
    listItemProps = {
      component: forwardRef((props, ref) => <Link ref={ref} {...props} to={item.url[0]} target={itemTarget} />),
    };
  } else if (item?.external) {
    listItemProps = { component: 'a', href: item.url, target: itemTarget };
  } else {
    listItemProps = {
      component: forwardRef((props, ref) => <Link ref={ref} {...props} to={item.url} target={itemTarget} />),
    };
  }

  const Icon = item.icon;
  const itemIcon = item.icon ? (
    <Icon style={{ fontSize: drawerOpen ? theme.typography.pxToRem(16) : theme.typography.pxToRem(20) }} />
  ) : null;

  const textColor = 'text.primary';
  const iconSelectedColor = 'primary.main';

  return (
    <ListItemButton
      {...listItemProps}
      disabled={item.disabled}
      onClick={() => handlerActiveItem(item.id)}
      selected={isSelected}
      sx={{
        zIndex: 1201,
        display: drawerOpen ? `flex` : 'block',
        textAlign: drawerOpen ? `start` : 'center',
        pl: drawerOpen ? `${level * 28}px` : 0,
        py: !drawerOpen && level === 1 ? 1.25 : 1,
        ...(drawerOpen && {
          '&:hover': {
            bgcolor: 'primary.lighter',
          },
          '&.Mui-selected': {
            bgcolor: 'primary.lighter',
            borderRight: `2px solid ${theme.palette.primary.main}`,
            color: iconSelectedColor,
            '&:hover': {
              color: iconSelectedColor,
              bgcolor: 'primary.lighter',
            },
          },
        }),
        ...(!drawerOpen && {
          '&:hover': {
            bgcolor: 'transparent',
          },
          '&.Mui-selected': {
            '&:hover': {
              bgcolor: 'transparent',
            },
            bgcolor: 'transparent',
          },
        }),
      }}
    >
      {itemIcon && (
        <ListItemIcon
          sx={{
            minWidth: 28,
            color: isSelected ? iconSelectedColor : textColor,
            ...(!drawerOpen && {
              borderRadius: 1.5,
              width: 36,
              height: 36,
              alignItems: 'center',
              justifyContent: 'center',
              '&:hover': {
                bgcolor: 'secondary.lighter',
              },
            }),
            ...(!drawerOpen &&
              isSelected && {
              bgcolor: 'primary.lighter',
              '&:hover': {
                bgcolor: 'primary.lighter',
              },
            }),
          }}
        >
          {itemIcon}
        </ListItemIcon>
      )}
      {(drawerOpen || (!drawerOpen && level !== 1)) && (
        <ListItemText
          primary={
            <Typography variant="h6" sx={{ color: isSelected ? iconSelectedColor : textColor }}>
              {item.title}
            </Typography>
          }
        />
      )}
      {(drawerOpen || (!drawerOpen && level !== 1)) && item.chip && (
        <Chip
          color={item.chip.color}
          variant={item.chip.variant}
          size={item.chip.size}
          label={item.chip.label}
          avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
        />
      )}
    </ListItemButton>
  );
}

NavItem.propTypes = { item: PropTypes.object.isRequired, level: PropTypes.number.isRequired };










// import PropTypes from 'prop-types';
// import { forwardRef, useEffect } from 'react';
// import { Link, useLocation, matchPath } from 'react-router-dom';

// // material-ui
// import { useTheme } from '@mui/material/styles';
// import Avatar from '@mui/material/Avatar';
// import Chip from '@mui/material/Chip';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import Typography from '@mui/material/Typography';

// // project import
// import { handlerActiveItem, useGetMenuMaster } from 'api/menu';

// export default function NavItem({ item, level }) {
//   const theme = useTheme();
//   const { menuMaster } = useGetMenuMaster();
//   const drawerOpen = menuMaster.isDashboardDrawerOpened;
//   const openItem = menuMaster.openedItem;

//   const { pathname } = useLocation();

//   // // Corrected `matchPath` logic for selected state
//   // const isSelected = !!matchPath({ path: item.url, end: false }, pathname) || openItem === item.id;

//   // // Handle active menu item on page load
//   // useEffect(() => {
//   //   if (pathname === item.url) handlerActiveItem(item.id);
//   //   // eslint-disable-next-line react-hooks/exhaustive-deps
//   // }, [pathname]);


//   // Update the isSelected logic to handle multiple URLs
//   const isSelected =
//     (Array.isArray(item.url)
//       ? item.url.some((url) => !!matchPath({ path: url, end: false }, pathname))
//       : !!matchPath({ path: item.url, end: false }, pathname)) ||
//     openItem === item.id;

//   // Handle active menu item on page load
//   useEffect(() => {
//     if (Array.isArray(item.url)) {
//       if (item.url.includes(pathname)) handlerActiveItem(item.id);
//     } else if (pathname === item.url) {
//       handlerActiveItem(item.id);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [pathname]);









//   // Dynamic properties for external/internal links
//   let itemTarget = '_self';
//   if (item.target) itemTarget = '_blank';

//   let listItemProps = {
//     component: forwardRef((props, ref) => <Link ref={ref} {...props} to={item.url} target={itemTarget} />),
//   };
//   if (item?.external) {
//     listItemProps = { component: 'a', href: item.url, target: itemTarget };
//   }

//   const Icon = item.icon;
//   const itemIcon = item.icon ? (
//     <Icon style={{ fontSize: drawerOpen ? theme.typography.pxToRem(16) : theme.typography.pxToRem(20) }} />
//   ) : null;

//   const textColor = 'text.primary';
//   const iconSelectedColor = 'primary.main';

//   return (
//     <ListItemButton
//       {...listItemProps}
//       disabled={item.disabled}
//       onClick={() => handlerActiveItem(item.id)}
//       selected={isSelected}
//       sx={{
//         zIndex: 1201,
//         display: drawerOpen ? `flex` : 'block',
//         textAlign: drawerOpen ? `start` : 'center',
//         pl: drawerOpen ? `${level * 28}px` : 0,
//         py: !drawerOpen && level === 1 ? 1.25 : 1,
//         ...(drawerOpen && {
//           '&:hover': {
//             bgcolor: 'primary.lighter',
//           },
//           '&.Mui-selected': {
//             bgcolor: 'primary.lighter',
//             borderRight: `2px solid ${theme.palette.primary.main}`,
//             color: iconSelectedColor,
//             '&:hover': {
//               color: iconSelectedColor,
//               bgcolor: 'primary.lighter',
//             },
//           },
//         }),
//         ...(!drawerOpen && {
//           '&:hover': {
//             bgcolor: 'transparent',
//           },
//           '&.Mui-selected': {
//             '&:hover': {
//               bgcolor: 'transparent',
//             },
//             bgcolor: 'transparent',
//           },
//         }),
//       }}
//     >
//       {itemIcon && (
//         <ListItemIcon
//           sx={{
//             minWidth: 28,
//             color: isSelected ? iconSelectedColor : textColor,
//             ...(!drawerOpen && {
//               borderRadius: 1.5,
//               width: 36,
//               height: 36,
//               alignItems: 'center',
//               justifyContent: 'center',
//               '&:hover': {
//                 bgcolor: 'secondary.lighter',
//               },
//             }),
//             ...(!drawerOpen &&
//               isSelected && {
//               bgcolor: 'primary.lighter',
//               '&:hover': {
//                 bgcolor: 'primary.lighter',
//               },
//             }),
//           }}
//         >
//           {itemIcon}
//         </ListItemIcon>
//       )}
//       {(drawerOpen || (!drawerOpen && level !== 1)) && (
//         <ListItemText
//           primary={
//             <Typography variant="h6" sx={{ color: isSelected ? iconSelectedColor : textColor }}>
//               {item.title}
//             </Typography>
//           }
//         />
//       )}
//       {(drawerOpen || (!drawerOpen && level !== 1)) && item.chip && (
//         <Chip
//           color={item.chip.color}
//           variant={item.chip.variant}
//           size={item.chip.size}
//           label={item.chip.label}
//           avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
//         />
//       )}
//     </ListItemButton>
//   );
// }

// NavItem.propTypes = { item: PropTypes.object.isRequired, level: PropTypes.number.isRequired };






















// import PropTypes from 'prop-types';
// import { forwardRef, useEffect } from 'react';
// import { Link, useLocation, matchPath } from 'react-router-dom';

// // material-ui
// import { useTheme } from '@mui/material/styles';
// import Avatar from '@mui/material/Avatar';
// import Chip from '@mui/material/Chip';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import Typography from '@mui/material/Typography';

// // project import
// import { handlerActiveItem, useGetMenuMaster } from 'api/menu';

// export default function NavItem({ item, level }) {
//   const theme = useTheme();

//   const { menuMaster } = useGetMenuMaster();
//   const drawerOpen = menuMaster.isDashboardDrawerOpened;
//   const openItem = menuMaster.openedItem;

//   let itemTarget = '_self';
//   if (item.target) {
//     itemTarget = '_blank';
//   }
//   let listItemProps = { component: forwardRef((props, ref) => <Link ref={ref} {...props} to={item.url} target={itemTarget} />) };
//   if (item?.external) {
//     listItemProps = { component: 'a', href: item.url, target: itemTarget };
//   }

//   const Icon = item.icon;
//   const itemIcon = item.icon ? <Icon style={{ fontSize: drawerOpen ? '1rem' : '1.25rem' }} /> : false;

//   const { pathname } = useLocation();
//   // const isSelected = !!matchPath({ path: item.url, end: false }, pathname) || openItem === item.id;
//   const isSelected = matchPath({ path: item.url, end: true }, pathname) && pathname === item.url;


//   // active menu item on page load
//   useEffect(() => {
//     if (pathname === item.url) handlerActiveItem(item.id);
//     // eslint-disable-next-line
//   }, [pathname]);

//   const textColor = 'text.primary';
//   const iconSelectedColor = 'primary.main';

//   return (
//     <ListItemButton
//       {...listItemProps}
//       disabled={item.disabled}
//       onClick={() => handlerActiveItem(item.id)}
//       selected={isSelected}
//       sx={{
//         zIndex: 1201,
//         pl: drawerOpen ? `${level * 28}px` : 0,
//         py: !drawerOpen && level === 1 ? 1.25 : 1,
//         ...(drawerOpen && {
//           '&:hover': {
//             bgcolor: 'primary.lighter'
//           },
//           '&.Mui-selected': {
//             bgcolor: 'primary.lighter',
//             borderRight: `2px solid ${theme.palette.primary.main}`,
//             color: iconSelectedColor,
//             '&:hover': {
//               color: iconSelectedColor,
//               bgcolor: 'primary.lighter'
//             }
//           }
//         }),
//         ...(!drawerOpen && {
//           '&:hover': {
//             bgcolor: 'transparent'
//           },
//           '&.Mui-selected': {
//             '&:hover': {
//               bgcolor: 'transparent'
//             },
//             bgcolor: 'transparent'
//           }
//         })
//       }}
//     >
//       {itemIcon && (
//         <ListItemIcon
//           sx={{
//             minWidth: 28,
//             color: isSelected ? iconSelectedColor : textColor,
//             ...(!drawerOpen && {
//               borderRadius: 1.5,
//               width: 36,
//               height: 36,
//               alignItems: 'center',
//               justifyContent: 'center',
//               '&:hover': {
//                 bgcolor: 'secondary.lighter'
//               }
//             }),
//             ...(!drawerOpen &&
//               isSelected && {
//                 bgcolor: 'primary.lighter',
//                 '&:hover': {
//                   bgcolor: 'primary.lighter'
//                 }
//               })
//           }}
//         >
//           {itemIcon}
//         </ListItemIcon>
//       )}
//       {(drawerOpen || (!drawerOpen && level !== 1)) && (
//         <ListItemText
//           primary={
//             <Typography variant="h6" sx={{ color: isSelected ? iconSelectedColor : textColor }}>
//               {item.title}
//             </Typography>
//           }
//         />
//       )}
//       {(drawerOpen || (!drawerOpen && level !== 1)) && item.chip && (
//         <Chip
//           color={item.chip.color}
//           variant={item.chip.variant}
//           size={item.chip.size}
//           label={item.chip.label}
//           avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
//         />
//       )}
//     </ListItemButton>
//   );
// }

// NavItem.propTypes = { item: PropTypes.object, level: PropTypes.number };
