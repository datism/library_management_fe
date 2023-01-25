import { useParams } from 'react-router-dom';
import { useState } from 'react';
// import {
//   ControlOutlined
// } from '@ant-design/icons'

import MiniListBook from '../../components/Home/MiniListBook';
import ListBook from '../../components/Home/ListBook';
import { type } from '../../components/Home/BookDetail';

function Home(props) {
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
  };

  const cancelFilter = () => {
    const reNew = {
      title: '',
      publisher: '',
      type: {},
    };
    setFilter(reNew);
    setFilterDraft(reNew);
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
        <ListBook filter={filter} />
      </div>
    </div>
  );
}

export default Home;
