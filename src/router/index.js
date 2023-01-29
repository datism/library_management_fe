import AccountInfo from '../pages/Common/AccountInfo';
import Home from '../pages/Common/Home';
import User from '../pages/User';
import Borrow from '../pages/Borrow/Borrow';

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
];
