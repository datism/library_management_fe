import { useEffect, useState } from 'react';

import './home.css';
import BookItem from './BookItem';
import BookDetail from './BookDetail';

const typeList = ['Đang hot', 'Mới ra mắt'];

function ListBook(props) {
  const [bookList, setBookList] = useState({ data: [] });
  const [bookID, setBookID] = useState(0);
  const [pageNum, setPageNum] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      if (props.type === 0) {
        // Call API here
      } else if (props.type === 1) {
        // Call API here
      } else {
        // Call API here
      }
    };
    fetchData();
  }, [props.filter, props.search, props.type, pageNum]);

  const handleSeeDetail = (e) => {
    document.getElementById('detail').classList.remove('hidden');
    setBookID(e.currentTarget.attributes.bookid.nodeValue);
  };

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

  return (
    <div className="wrap-list">
      <div className="title-list">
        {props.type || props.type === 0 ? (
          <div className="name-list">{typeList[props.type]}</div>
        ) : (
          <div className="name-list">Tìm kiếm cho {props.search}</div>
        )}
      </div>
      <div className="content-list">
        {bookList.data.map((e, index) => (
          <div
            key={index}
            className="wrap-item"
            onClick={handleSeeDetail}
            bookid={e.booktitleid}
          >
            <BookItem img={e.picture} name={e.bookname} />
          </div>
        ))}
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className="number-of-page-search">
        <div className="left-column-page-num">
          Trang:
          <button className="btn-number-page" onClick={handleJumpFirstPage}>
            Về trang đầu
          </button>
          {pageNum === 1 || pageNum > bookList.pages + 1 ? (
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
          {pageNum >= bookList.pages ? (
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
          <input
            id="page-num-jump"
            type="number"
            placeholder="Nhập trang muốn đến"
          />
          <button className="btn-number-page btn2" onClick={handleJumpPage}>
            Đi
          </button>
        </div>
      </div>
      <div id="detail" className="wrap-book-detail hidden">
        <BookDetail bookID={bookID} />
      </div>
    </div>
  );
}

export default ListBook;
