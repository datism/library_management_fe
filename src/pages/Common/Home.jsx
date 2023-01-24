import { useParams } from 'react-router-dom';
import { useState } from 'react';
// import {
//   ControlOutlined
// } from '@ant-design/icons'

import MiniListBook from '../../components/Home/MiniListBook';
import ListBook from '../../components/Home/ListBook';
import { type } from '../../components/Home/BookDetail';

function Home(props) {
  const [filter, setFilter] = useState({});

  const CheckFilterNumber = (num) => {};

  const CheckValidate = () => {
    let flag = true;

    let minPage = Number(document.getElementById('min-page').value);
    let maxPage = Number(document.getElementById('max-page').value);
    let warning = document.getElementById('ft-warning1');
    CheckFilterNumber(minPage);
    if (
      !Number.isInteger(minPage) ||
      minPage < 0 ||
      !Number.isInteger(maxPage) ||
      maxPage < 0 ||
      (minPage > maxPage && document.getElementById('max-page').value !== '')
    ) {
      warning.classList.remove('hidden');
      flag = false;
    } else {
      warning.classList.add('hidden');
      if (minPage === 0) minPage = '';
      if (maxPage === 0) maxPage = '';
    }

    let minYear = Number(document.getElementById('min-year').value);
    let maxYear = Number(document.getElementById('max-year').value);
    warning = document.getElementById('ft-warning2');
    if (!Number.isInteger(minYear) || !Number.isInteger(maxYear)) {
      warning.classList.remove('hidden');
      flag = false;
    } else {
      if (minYear === 0) minYear = '';
      if (maxYear === 0) maxYear = '';
      warning.classList.add('hidden');
    }

    if (flag)
      setFilter({
        minPage,
        maxPage,
        minYear,
        maxYear,
        author: document.getElementById('author-input').value,
      });
    return flag;
  };

  const handleFilter = async () => {
    CheckValidate();

    document.getElementById('filter-box').classList.add('close-filter');
  };

  return (
    <div className="home">
      <div className="filter">
        <div id="filter-box" className="filter-box close-filter">
          <div className="filter-title">Bộ lọc</div>
          <div className="filter-item">
            Thể loại
            {/* <div className='filter-item-title'>Thể loại</div> */}
            <div className="grid-container">
              {type.map((e, index) => (
                <div key={index} className="box-checkbox">
                  <input
                    className="input-checkbox"
                    type="checkbox"
                    // checked={index === check}
                    // onChange={() => setCheck(index)}
                  />
                  {e}
                </div>
              ))}
            </div>
          </div>
          <div className="line"></div>
          <div className="filter-item">
            Sách
            <br />
            <input
              id="book-input"
              className="input-full"
              placeholder="Nhập tên sách"
            />
          </div>
          <div className="line"></div>
          <div className="filter-item">
            Tác giả
            <br />
            <input
              id="author-input"
              className="input-full"
              placeholder="Nhập tên tác giả"
            />
          </div>
          <div className="wrap-button-filter">
            <button className="button-submit" onClick={handleFilter}>
              Lọc
            </button>
            <button className="button-submit">Hủy lọc</button>
          </div>
        </div>
      </div>
      <div className="main">
        <ListBook filter={filter} />
      </div>
    </div>
  );
}

export default Home;
