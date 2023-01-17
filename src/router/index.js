import AccountInfo from '../pages/Common/AccountInfo';
import Home from '../pages/Common/Home';

export const PUBLIC_ROUTER = [
  {
    key: 'home',
    path: '/',
    element: <Home />,
    exact: true,
    subMenu: 0,
  },
  {
    key: 'homeChildren',
    path: '/:type',
    element: <Home />,
    exact: true,
    subMenu: 0,
  },
  {
    key: 'homeChildren2',
    path: '/:type=:param',
    element: <Home />,
    exact: true,
    subMenu: 0,
  },
  {
    key: 'AccountInfo',
    path: '/AccountInfo',
    element: <AccountInfo />,
    exact: true,
    subMenu: 1,
  },
];
