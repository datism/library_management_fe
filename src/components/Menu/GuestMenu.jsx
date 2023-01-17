import MenuPC from './MenuPC';
import { LoginOutlined, HomeOutlined } from '@ant-design/icons';

const menu = [
  {
    icon: <HomeOutlined />,
    text: 'Trang chủ',
    link: '/',
  },
  {
    icon: <LoginOutlined />,
    text: 'Đăng nhập',
    link: '/login',
  },
];

function GuestMenu(props) {
  return <MenuPC menu={menu} subMenu={props.subMenu} />;
}

export default GuestMenu;
