import Home from '../pages/Common/Home'
import AccountInfo from '../pages/Common/AccountInfo'
import BookBorrow from '../pages/Reader/BookBorrow'
import History from '../pages/Reader/History'

export const PUBLIC_ROUTER = [
  {
    key: "home",
    path: '/',
    element: <Home />,
    exact: true,
    subMenu: 0
  },
  {
    key: "homeChildren",
    path: '/:type',
    element: <Home />,
    exact: true,
    subMenu: 0
  },
  {
    key: "homeChildren2",
    path: '/:type=:param',
    element: <Home />,
    exact: true,
    subMenu: 0
  },
  {
    key: 'AccountInfo',
    path: '/AccountInfo',
    element: <AccountInfo />,
    exact: true,
    subMenu: 1
  },
  {
    key: 'BookBorrow',
    path: '/BookBorrow',
    element: <BookBorrow />,
    exact: true,
    subMenu: 2
  },
  {
    key: 'History',
    path: '/History',
    element: <History />,
    exact: true,
    subMenu: 3
  },
]