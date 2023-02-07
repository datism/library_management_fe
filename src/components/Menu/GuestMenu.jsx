import MenuPC from './MenuPC';
import {
  LoginOutlined,
  BookOutlined,
  UserOutlined,
  AccountBookOutlined,
} from '@ant-design/icons';

const menu = [
  {
    icon: <BookOutlined />,
    text: 'Sách',
    link: '/',
  },
  {
    icon: <BookOutlined />,
    text: 'Người dùng',
    link: '/user',
  },
  {
    icon: <UserOutlined />,
    text: 'Mượn sách',
    link: '/borrow',
  },
  {
    icon: <AccountBookOutlined />,
    text: 'Lịch sử mượn',
    link: '/status',
  },
];

function GuestMenu(props) {
  return <MenuPC menu={menu} subMenu={props.subMenu} />;
}

export default GuestMenu;
