import React from 'react';

import { Icon } from '@chakra-ui/react';
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdLock,
  MdOutlineShoppingCart,
  MdLibraryBooks,
} from 'react-icons/md';

// Admin Imports
import MainDashboard from 'views/admin/default';
import NFTMarketplace from 'views/admin/marketplace';
import Profile from 'views/admin/profile';
import UserManagement from 'views/admin/userManagement';
import DataTables from 'views/admin/dataTables';
import QuizManagement from 'views/admin/quizManagement';
import DataManagerment from 'views/admin/dataManagerment';
import RTL from 'views/admin/rtl';

// Auth Imports
import SignInCentered from 'views/auth/signIn';

const routes = [
  {
    name: 'Main Dashboard',
    layout: '/admin',
    path: '/default',
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: <MainDashboard />,
  },
  {
    name: 'NFT Marketplace',
    layout: '/admin',
    path: '/nft-marketplace',
    icon: (
      <Icon
        as={MdOutlineShoppingCart}
        width="20px"
        height="20px"
        color="inherit"
      />
    ),
    component: <NFTMarketplace />,
    secondary: true,
    sidebar: false,
  },
  {
    name: 'Data Tables',
    layout: '/admin',
    icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
    path: '/data-tables',
    component: <DataTables />,
    sidebar: false,
  },
  {
    name: 'Quiz Management',
    layout: '/admin',
    icon: <Icon as={MdLibraryBooks} width="20px" height="20px" color="inherit" />,
    path: '/quiz-management',
    component: <QuizManagement />,
  },

  {
    name: 'Data Managerment',
    layout: '/admin',
    path: '/data-managerment',
    icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
    component: <DataManagerment />,
  },

  {
    name: 'Profile',
    layout: '/admin',
    path: '/user-management/profile',
    sidebar: false,
    icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
    component: <Profile />,
  },

  {
    name: 'User Management',
    layout: '/admin',
    path: '/user-management',
    icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
    component: <UserManagement />,
  },
  {
    name: 'Sign In',
    layout: '/auth',
    path: '/sign-in',
    icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
    component: <SignInCentered />,
  },
  {
    name: 'RTL Admin',
    layout: '/rtl',
    path: '/rtl-default',
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: <RTL />,
    sidebar: false,
  },
];

export default routes;
