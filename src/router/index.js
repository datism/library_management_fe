import AccountInfo from '../pages/Common/AccountInfo';
import Home from '../pages/Common/Home';
import User from '../pages/User';
import Borrow from '../pages/Borrow/Borrow';
import Status from '../pages/Status/Status';

export const PUBLIC_ROUTER = [
  {
    key: 'home',
    path: '/',
    element: <Home />,
    exact: true,
  },
  {
    key: 'user',
    path: '/user',
    element: <User />,
    exact: true,
  },
  {
    key: 'borrow',
    path: '/borrow',
    element: <Borrow />,
    exact: true,
  },
  {
    key: 'status',
    path: '/status',
    element: <Status />,
    exact: true,
  },
];
