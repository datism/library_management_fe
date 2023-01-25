import { useNavigate } from 'react-router-dom'
import {
  FilterOutlined,
  SearchOutlined
} from '@ant-design/icons'

import logo from '../images/logo1.jpg'
import './components.css'
// import LibrarianMenu from './Menu/LibrarianMenu'
// import GuestMenu from './Menu/GuestMenu'
// import ReaderMenu from './Menu/ReaderMenu'

function NavBar(props) {
  const navigate = useNavigate();
  const role = localStorage.getItem('role');

  const handleSearch = () => {
    let search = document.querySelector('.input-search').value;
    if (search) {
      navigate(`/search=${search}`);
    }
  }

  const handleSearchMobile = () => {
    let search = document.querySelector('.input-mobile .input-search').value;
    if (search) {
      navigate(`/search=${search}`);
    }
  }

  const handleEnter = (e) => {
    if (e.keyCode === 13) handleSearch();
  }

  const handleOpenFilter = () => {
    let pathname = window.location.pathname;
    if (pathname === '/' || pathname.slice(0, 7) === '/search' || pathname.slice(0, 5) === '/type') {
      document.getElementById('filter-box').classList.toggle('close-filter');
    }
  }

  return (
    <div className='nav-bar'>
      <div style={{width:'70px'}}>
        {/* { role === null ? <GuestMenu subMenu={props.subMenu}/> : role === '2' ? <ReaderMenu subMenu={props.subMenu}/> : <LibrarianMenu subMenu={props.subMenu}/> } */}
      </div>
      <div className='search-box' >
        <button className='btn-filter' onClick={handleOpenFilter}>
          <FilterOutlined className='icon-filter' />
          <p>Lọc</p>
        </button>
        <input className='input-search' placeholder='Tìm kiếm' onKeyDown={handleEnter}></input>
        <button className='btn-search' onClick={handleSearch}>
          <SearchOutlined className='icon-search' />
        </button>
      </div>
      <img
        src={logo}
        alt='logo'
      />
      <div className='input-mobile'>
        <button className='btn-filter' onClick={handleOpenFilter}>
          <FilterOutlined className='icon-filter' />
          <p>Lọc</p>
        </button>
        <input className='input-search' placeholder='Tìm kiếm'/>
        <button className='btn-search' onClick={handleSearchMobile}>
          <SearchOutlined className='icon-search' />
        </button>
      </div>
    </div>
  )
}

export default NavBar;