import { useEffect, useState } from 'react';

import '../../components/Home/home.css';
import './listBookBorrow.css';
import BookItem from '../../components/Home/BookItem';
import axios from 'axios';
import { BE_URL } from '../../constant';
import Subscriber from './Subscriber';

const typeList = ['Đang hot', 'Mới ra mắt'];

function ListBookBorrow(props) {
  const [bookList, setBookList] = useState([]);
  const [bookID, setBookID] = useState(0);
  const [pageNum, setPageNum] = useState(1);
  const [total, setTotal] = useState(0);
  const [checked, setChecked] = useState([]);
  const [continuePage, setContinuePage] = useState(false);

  const fetchData = async () => {
    const filter = {};
    Object.keys(props.filter).forEach((e) => {
      if (props.filter[e] && e != 'type') {
        filter[e] = props.filter[e];
      }
    });
    let type = [];
    Object.keys(props.filter.type).forEach((e) => {
      if (props.filter.type[e]) {
        type.push(e);
      }
    });
    if (type.length > 0) {
      filter.type = type;
    }
    const res = await axios.get(`${BE_URL}/books`, {
      params: {
        currentPage: pageNum,
        itemsPerPage: 10,
        ...filter,
      },
    });
    setBookList(res.data.items);
    setTotal(res.data.totalItems);
  };
  useEffect(() => {
    fetchData();
  }, [props.filter, pageNum]);

  const handleChoosePage = (p) => {
    setPageNum(p);
  };

  const handleJumpPage = () => {
    let p = document.getElementById('page-num-jump').value;
    if (p) setPageNum(Number(p));
  };

  const handleJumpFirstPage = () => {
    setPageNum(1);
  };

  const handleContinue = () => {
    setContinuePage(true);
  }

  const handleBack = () => {
    setContinuePage(false);
  }

  const handleCheck = (id) => {
    if (checked.includes(id)) {
      setChecked(prev => prev.filter(e => e !== id));
    }
    else setChecked(prev => [...prev, id]);
  }

  return (
    <div className="wrap-list">
      <div className="title-list"></div>
      {continuePage === false ?
      <div>
        <div className="content-list">
          {bookList.map((e, index) => (
            <div
              key={index}
              className="wrap-item"
              bookid={e.booktitleid}
            >
              <BookItem
                book={e}
              />
              <div className='borrow-item'>
                  <input type='checkbox' onChange={() => handleCheck(e.booktitleid)} />
              </div>

            </div>
          ))}
        </div>
        <div className="number-of-page-search">
          <div className="left-column-page-num">
            Trang:
            <button className="btn-number-page" onClick={handleJumpFirstPage}>
              {'Trang 1'}
            </button>
            {pageNum === 1 || pageNum > total / 10 + 1 ? (
              <></>
            ) : (
              <div
                className="page-number btn-number-page"
                onClick={() => handleChoosePage(pageNum - 1)}
              >
                {pageNum - 1}
              </div>
            )}
            <div className="page-number selected">{pageNum}</div>
            {pageNum >= total / 10 ? (
              <></>
            ) : (
              <div
                className="page-number btn-number-page"
                onClick={() => handleChoosePage(pageNum + 1)}
              >
                {pageNum + 1}
              </div>
            )}
          </div>
          <div className="right-column-page-num">
            <input id="page-num-jump" type="number" placeholder="Trang" />
            <button className="btn-number-page btn2" onClick={handleJumpPage}>
              Đi
            </button>
          </div>
        </div>

      </div>:
        <Subscriber
          booktitleid = {checked}
        />
      }

      <div className='continue-page button-page'>
        {!continuePage && <button className='continue-page-button' onClick={handleContinue}>
              <p>Continue</p>
          </button>
        }
      </div>
      <div className='back-page button-page'>
        {continuePage && <button className='continue-page-button' onClick={handleBack}>
              <p>Back</p>
          </button>
        }
      </div>

    </div>
  );
}

export default ListBookBorrow;
