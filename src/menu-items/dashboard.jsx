// assets
import { UserOutlined } from '@ant-design/icons';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import DnsOutlinedIcon from '@mui/icons-material/DnsOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import LeaderboardOutlinedIcon from '@mui/icons-material/LeaderboardOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import LabelImportantOutlinedIcon from '@mui/icons-material/LabelImportantOutlined';

// icons
const icons = {
  LabelImportantOutlinedIcon,
  HomeOutlinedIcon,
  DnsOutlinedIcon,
  LeaderboardOutlinedIcon,
  UserOutlined,
  DescriptionOutlinedIcon,
  LogoutOutlinedIcon,
};

const role = localStorage.getItem("role") || '';

const dashboard = {
  id: 'group-dashboard',
  title: 'Main',
  type: 'group',
  children: [
    // Role-based rendering for "Products" based on superAdmin role
    ...(role === 'super admin' ? [{
      id: 'products',
      title: 'Products',
      type: 'item',
      url: '/products',
      icon: icons.DnsOutlinedIcon,
      breadcrumbs: false,
    }] : []),
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/',
      icon: icons.HomeOutlinedIcon,
      breadcrumbs: false,
    },
    {
      id: 'Operations',
      title: 'Operations',
      type: 'collapse',
      icon: icons.LeaderboardOutlinedIcon,
      children: [
        {
          id: 'payInOperations',
          title: 'PayIn',
          type: 'item',
          url: ['/payInOperations', '/createPayInOperations'],
          icon: icons.LabelImportantOutlinedIcon,
          breadcrumbs: false,
        },
        {
          id: 'payOutOperations',
          title: 'PayOut',
          type: 'item',
          url: ['/payOutOperations', '/createPayOutOperations'],
          icon: icons.LabelImportantOutlinedIcon,
          breadcrumbs: false,
        },
      ],
    },
    ...(role !== 'agent' ? [{
      id: 'accounts',
      title: 'Accounts',
      type: 'item',
      url: ['/accounts', '/createUser', 'userProfile/:id'],
      icon: icons.UserOutlined,
      breadcrumbs: false,
    }] : []),
    {
      id: 'statements',
      title: 'Statements',
      type: 'item',
      url: ['/statements', '/savedReports'],
      icon: icons.DescriptionOutlinedIcon,
      breadcrumbs: false,
    },
  ],
};

export default dashboard;












// // assets
// import { UserOutlined } from '@ant-design/icons';
// import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
// import DnsOutlinedIcon from '@mui/icons-material/DnsOutlined';
// import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
// import LeaderboardOutlinedIcon from '@mui/icons-material/LeaderboardOutlined';
// import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
// import LabelImportantOutlinedIcon from '@mui/icons-material/LabelImportantOutlined';
// // icons
// const icons = {
//   LabelImportantOutlinedIcon,
//   HomeOutlinedIcon,
//   DnsOutlinedIcon,
//   LeaderboardOutlinedIcon,
//   UserOutlined,
//   DescriptionOutlinedIcon,
//   LogoutOutlinedIcon
// };

// const dashboard = {
//   id: 'group-dashboard',
//   title: 'Main',
//   type: 'group',
//   children: [
//     {
//       id: 'products',
//       title: 'Products',
//       type: 'item',
//       url: '/products',
//       icon: icons.DnsOutlinedIcon,
//       breadcrumbs: false
//     },
//     {
//       id: 'dashboard',
//       title: 'Dashboard',
//       type: 'item',
//       url: '/dashboard',
//       icon: icons.HomeOutlinedIcon,
//       breadcrumbs: false
//     }, 
//     {
//       id: 'Operations',
//       title: 'Operations',
//       type: 'collapse',
//       icon: icons.LeaderboardOutlinedIcon,
//       children: [
//         {
//           id: 'payInOperations',
//           title: 'PayIn',
//           type: 'item',
//           url: ['/payOutOperations', '/createPayInOperations'],
//           icon: icons.LabelImportantOutlinedIcon,
//           breadcrumbs: false
//         },
//         {
//           id: 'payOutOperations',
//           title: 'PayOut',
//           type: 'item',
//           url: ['/payOutOperations', '/createPayOutOperations'],
//           icon: icons.LabelImportantOutlinedIcon,
//           breadcrumbs: false
//         },
//       ],
//     },
//     {
//       id: 'accounts',
//       title: 'Accounts',
//       type: 'item',
//       url: ['/accounts', '/createUser', 'userProfile/:id'],
//       icon: icons.UserOutlined,
//       breadcrumbs: false
//     },
//     {
//       id: 'statements',
//       title: 'Statements',
//       type: 'item',
//       url: ['/statements', '/savedReports'],
//       icon: icons.DescriptionOutlinedIcon,
//       breadcrumbs: false
//     },
//     {
//       id: 'logout',
//       title: 'Logout',
//       type: 'item',
//       icon: icons.LogoutOutlinedIcon,
//       url: '/logout',
//       breadcrumbs: false
//     },
//     // {
//     //   id: 'profile',
//     //   title: 'Profile',
//     //   type: 'item',
//     //   url: '/profile',
//     //   icon: icons.NightShelterOutlinedIcon,
//     //   breadcrumbs: false
//     // },
//   ]
// };

// export default dashboard;







// import { Icon } from '@iconify/react';
// import { UserOutlined } from '@ant-design/icons';
// import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
// import DnsOutlinedIcon from '@mui/icons-material/DnsOutlined';
// import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
// import LeaderboardOutlinedIcon from '@mui/icons-material/LeaderboardOutlined';
// import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

// const payIn = <Icon icon="mdi:account-payment" />
// const payOut = <Icon icon="mdi:account-payment-outline" />

// // icons
// const icons = {
//   payIn, payOut,
//   HomeOutlinedIcon,
//   DnsOutlinedIcon,
//   LeaderboardOutlinedIcon,
//   UserOutlined,
//   DescriptionOutlinedIcon,
//   LogoutOutlinedIcon
// };

// const dashboard = {
//   id: 'group-dashboard',
//   title: 'Main',
//   type: 'group',
//   children: [
//     {
//       id: 'products',
//       title: 'Products',
//       type: 'item',
//       url: '/products',
//       icon: icons.DnsOutlinedIcon,
//       breadcrumbs: false
//     },
//     {
//       id: 'dashboard',
//       title: 'Dashboard',
//       type: 'item',
//       url: '/dashboard',
//       icon: icons.HomeOutlinedIcon,
//       breadcrumbs: false
//     },
//     {
//       id: 'Operations',
//       title: 'Operations',
//       type: 'collapse',
//       icon: icons.LeaderboardOutlinedIcon,
//       children: [
//         {
//           id: 'payInOperations',
//           title: 'PayIn',
//           type: 'item',
//           url: '/payInOperations',
//           icon: icons.payIn,
//           breadcrumbs: false
//         },
//         {
//           id: 'payOutOperations',
//           title: 'PayOut',
//           type: 'item',
//           url: '/payOutOperations',
//           icon: icons.payOut,
//           breadcrumbs: false
//         },
//       ],
//     },
//     {
//       id: 'accounts',
//       title: 'Accounts',
//       type: 'item',
//       url: '/accounts',
//       icon: icons.UserOutlined,
//       breadcrumbs: false
//     },
//     {
//       id: 'statements',
//       title: 'Statements',
//       type: 'item',
//       url: '/statements',
//       icon: icons.DescriptionOutlinedIcon,
//       breadcrumbs: false
//     },
//     {
//       id: 'logout',
//       title: 'Logout',
//       type: 'item',
//       icon: icons.LogoutOutlinedIcon,
//       url: '/logout',
//       breadcrumbs: false
//     },
//     // {
//     //   id: 'profile',
//     //   title: 'Profile',
//     //   type: 'item',
//     //   url: '/profile',
//     //   icon: icons.NightShelterOutlinedIcon,
//     //   breadcrumbs: false
//     // },
//   ]
// };

// export default dashboard;
