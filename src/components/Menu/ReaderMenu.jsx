import {
  LogoutOutlined,
  IdcardOutlined,
  HomeOutlined,
  ShoppingOutlined,
} from '@ant-design/icons';

import { FaExchangeAlt } from 'react-icons/fa';

import MenuPC from './MenuPC';

const menu = [
  {
    icon: <HomeOutlined />,
    text: 'Trang chủ',
    link: '/',
    class: '',
  },
  {
    icon: <IdcardOutlined />,
    text: 'Thông tin tài khoản',
    link: '/AccountInfo',
  },
  {
    icon: <ShoppingOutlined />,
    text: 'Giỏ sách',
    link: '/Cart',
  },
  {
    icon: <FaExchangeAlt />,
    text: 'Lịch sử mượn',
    link: '/History',
  },
  {
    icon: <LogoutOutlined />,
    text: 'Đăng xuất',
    link: '/',
    classname: 'logout',
  },
];

function ReaderMenu(props) {
  return <MenuPC menu={menu} subMenu={props.subMenu} />;
}

export default ReaderMenu;
