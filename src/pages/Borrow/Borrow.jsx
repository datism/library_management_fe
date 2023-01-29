import { useParams } from 'react-router-dom';
import { useState } from 'react';

import ListBookBorrow from './ListBookBorrow';
import { type } from '../../components/Home/BookDetail';
import './borrow.css';
import '../../pages/Common/commonPage.css'

function Borrow() {

  const [filterCheck, setFilterCheck] = useState(false);

  const [filter, setFilter] = useState({
    title: '',
    publisher: '',
    type: {},
  });
  const [filterDraft, setFilterDraft] = useState({
    title: '',
    publisher: '',
    type: {},
  });

  const handleFilter = () => {
    setFilter({
      ...filterDraft,
    });
    setFilterCheck(true);
  };

  const cancelFilter = () => {
    const reNew = {
      title: '',
      publisher: '',
      type: {},
    };
    setFilter(reNew);
    setFilterDraft(reNew);
    setFilterCheck(false);
  };

  const setCheck = (e) => {
    setFilterDraft({
      ...filterDraft,
      type: {
        ...filterDraft.type,
        [e]: !filterDraft.type[e],
      },
    });
  };

  const onChangeValue = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFilterDraft({
      ...filterDraft,
      [name]: value,
    });
  };

  const handleContinue = ()=>{


  }

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
                    checked={filterDraft.type[e]}
                    onChange={() => setCheck(e)}
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
              className="input-full"
              placeholder="Nhập tên sách"
              name="title"
              value={filterDraft.title}
              onChange={onChangeValue}
            />
          </div>
          <div className="line"></div>
          <div className="filter-item">
            Tác giả
            <br />
            <input
              className="input-full"
              placeholder="Nhập tên tác giả"
              name="publisher"
              onChange={onChangeValue}
            />
          </div>
          <div className="wrap-button-filter">
            <button className="button-submit" onClick={handleFilter}>
              Lọc
            </button>
            <button className="button-submit" onClick={cancelFilter}>
              Hủy lọc
            </button>
          </div>
        </div>
      </div>
      <div className="main">
        {!filterCheck &&
        <div id="scroll-container">
          <div id="scroll-text">Vui lòng tìm kiếm sách cần mượn để được mượn sách.</div>
        </div>}
        {filterCheck && <ListBookBorrow filter={filter} />}
      </div>
    </div>
  );
}

export default Borrow;
