import  { useParams } from 'react-router-dom';
import { useState } from 'react';
// import {
//   ControlOutlined
// } from '@ant-design/icons'

import MiniListBook from '../../components/Home/MiniListBook';
import ListBook from '../../components/Home/ListBook';

const categoryList = ['Tiểu thuyết', 'Truyện tranh', 'Kinh tế', 'Chính trị', 'Tâm lý', 'Kĩ năng sống', 'Tình cảm', 'Khoa học'];

function Home(props) {
  const { type, param } = useParams();
  const [ filter, setFilter ] = useState({});
  // console.log(type);
  // console.log(param);

  const CheckFilterNumber = (num) => {
    console.log('abc');
    console.log(`num: ${num}`);
  }

  const CheckValidate = () => {
    let flag = true;

    let minPage = Number(document.getElementById('min-page').value);
    let maxPage = Number(document.getElementById('max-page').value);
    let warning = document.getElementById('ft-warning1');
    CheckFilterNumber(minPage);
    if (!Number.isInteger(minPage) || minPage < 0 || !Number.isInteger(maxPage) || maxPage < 0 || (minPage > maxPage && document.getElementById('max-page').value !== '')) {
      warning.classList.remove('hidden');
      flag = false;
    } 
    else {
      warning.classList.add('hidden');
      if (minPage === 0) minPage = '';
      if (maxPage === 0) maxPage = '';
    }

    console.log()
    let minYear = Number(document.getElementById('min-year').value);
    let maxYear = Number(document.getElementById('max-year').value);
    warning = document.getElementById('ft-warning2');
    if (!Number.isInteger(minYear) || !Number.isInteger(maxYear)) {
      warning.classList.remove('hidden');
      flag = false;
    } 
    else {
      if (minYear === 0) minYear = '';
      if (maxYear === 0) maxYear = '';
      warning.classList.add('hidden');
    }

    if (flag) setFilter({
      minPage,
      maxPage,
      minYear,
      maxYear,
      author: document.getElementById('author-input').value
    })
    return flag;
  }

  const handleFilter = async () => {
    // console.log(CheckValidate());
    CheckValidate();

    // console.log(filter);
    document.getElementById('filter-box').classList.add('close-filter');
  }

  if (!type || type === 'search' || type === 'type') {
    return (
      <div className='home'>
        <div className='main'>
          {!type ?
            <>
              <MiniListBook type={0} />
              <MiniListBook type={1} />
            </>
            :
            type === 'type' ?
            <ListBook type={Number(param)} filter={filter} />
            :
            <ListBook search={param} filter={filter}/>
          }
        </div>
        <div className='filter'>
          <div id='filter-box' className='filter-box close-filter'>
            <div className='filter-title'>Bộ lọc</div>
            <div className='filter-item'>
              Thể loại
              {/* <div className='filter-item-title'>Thể loại</div> */}
              <div className='grid-container'>
                {categoryList.map((e, index) =>
                  <div key={index} className='box-checkbox'>
                    <input
                      className="input-checkbox"
                      type="checkbox"
                    // checked={index === check}
                    // onChange={() => setCheck(index)}
                    />
                    {e}
                  </div>
                )}
              </div>
            </div>
            <div className='line'></div>
            <div className='filter-item'>
              Số trang
              <div className='minmax-input'>
                <input id='min-page' type="number" placeholder='min' />
                <p>-</p>
                <input id='max-page' type='number' placeholder='max' />
              </div>
              <p id='ft-warning1' className='warning hidden'>Cần nhập đúng định dạng!!!</p>
            </div>
            <div className='line'></div>
            <div className='filter-item'>
              Năm xuất bản
              <div className='minmax-input'>
                <input id='min-year' type="number" placeholder='min' />
                <p>-</p>
                <input id='max-year' type='number' placeholder='max' />
              </div>
              <p id='ft-warning2' className='warning hidden'>Cần nhập đúng định dạng!!!</p>
            </div>
            <div className='line'></div>
            <div className='filter-item'>
              Tác giả
              <br />
              <input id='author-input' className='input-full' placeholder='Nhập tên tác giả' />
            </div>
            <div className='wrap-button-filter'>
              <button className='button-submit' onClick={handleFilter}>Lọc</button>
              <button className='button-submit'>Hủy lọc</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Home