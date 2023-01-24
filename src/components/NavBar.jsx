import { useNavigate } from 'react-router-dom';
import { FilterOutlined, SearchOutlined } from '@ant-design/icons';

import './components.css';
import LibrarianMenu from './Menu/LibrarianMenu';
import GuestMenu from './Menu/GuestMenu';
import ReaderMenu from './Menu/ReaderMenu';

function NavBar(props) {
  const navigate = useNavigate();

  const handleSearch = () => {
    const inputSearch = document.querySelector('.input-search');
    let search = inputSearch?.value;
    if (search) {
      navigate(`/search=${search}`);
    }
  };

  const handleSearchMobile = () => {
    const inputSearch = document.querySelector('.input-mobile .input-search');
    let search = inputSearch?.value;
    if (search) {
      navigate(`/search=${search}`);
    }
  };

  const handleEnter = (e) => {
    if (e.keyCode === 13) handleSearch();
  };

  const handleOpenFilter = () => {
    let pathname = window.location.pathname;
    if (
      pathname === '/' ||
      pathname.slice(0, 7) === '/search' ||
      pathname.slice(0, 5) === '/type'
    ) {
      document.getElementById('filter-box')?.classList.toggle('close-filter');
    }
  };

  return (
    <div className="nav-bar">
      <img src="/images/library.jpeg" alt="logo" />
      <div className="search-box">
        <button className="btn-filter" onClick={handleOpenFilter}>
          <FilterOutlined className="icon-filter" />
          <p>Lọc</p>
        </button>
        <input
          className="input-search"
          placeholder="Tìm kiếm"
          onKeyDown={handleEnter}
        ></input>
        <button className="btn-search" onClick={handleSearch}>
          <SearchOutlined className="icon-search" />
        </button>
      </div>
      <div className="input-mobile">
        <button className="btn-filter" onClick={handleOpenFilter}>
          <FilterOutlined className="icon-filter" />
          <p>Lọc</p>
        </button>
        <input className="input-search" placeholder="Tìm kiếm" />
        <button className="btn-search" onClick={handleSearchMobile}>
          <SearchOutlined className="icon-search" />
        </button>
      </div>
      <div style={{ width: '70px' }}>
        <GuestMenu subMenu={props.subMenu} />
      </div>
    </div>
  );
}

export default NavBar;
