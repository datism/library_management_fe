import {
  LogoutOutlined,
  // IdcardOutlined,
  HomeOutlined,
  ReadOutlined,
  SolutionOutlined,
} from '@ant-design/icons';

import { FaExchangeAlt } from 'react-icons/fa';

import MenuPC from './MenuPC';

const menu = [
  {
    icon: <HomeOutlined />,
    text: 'Trang chủ',
    link: '/',
  },
  // {
  //   icon: <IdcardOutlined />,
  //   text: 'Thông tin tài khoản',
  //   link: '/AccountInfo'
  // },
  {
    icon: <ReadOutlined />,
    text: 'Quản lí đầu sách',
    link: '/BookTitle',
  },
  {
    icon: <SolutionOutlined />,
    text: 'Quản lí độc giả',
    link: '/ReaderAccount',
  },
  {
    icon: <FaExchangeAlt />,
    text: 'Quản lí mượn trả',
    link: '/TrasactionManage',
  },
  {
    icon: <LogoutOutlined />,
    text: 'Đăng xuất',
    link: '/',
    classname: 'logout',
  },
];

function LibrarianMenu(props) {
  return <MenuPC menu={menu} subMenu={props.subMenu} />;
}

export default LibrarianMenu;
