import { useEffect, useState } from 'react';

import './home.css';
import BookItem from './BookItem';
import BookDetail from './BookDetail';
import axios from 'axios';
import { BE_URL } from '../../constant';

const typeList = ['Đang hot', 'Mới ra mắt'];

function ListBook(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookList, setBookList] = useState([]);
  const [bookID, setBookID] = useState(0);
  const [pageNum, setPageNum] = useState(1);
  const [bookSelected, setBookSelected] = useState();
  const fetchData = async () => {
    console.log('11111');
    const res = await axios.get(`${BE_URL}/books`);
    setBookList(res.data);
  };
  useEffect(() => {
    fetchData();
  }, [props.filter, props.search, props.type, pageNum]);

  const handleSeeDetail = (e) => {
    // document.getElementById('detail').classList.remove('hidden');
    // setBookID(e.currentTarget.attributes.bookid.nodeValue);
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

  const showModal = (e) => {
    setBookSelected(e);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    fetchData();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onCreateNewBook = () => {
    setBookSelected(null);
    setIsModalOpen(true);
  };

  return (
    <div className="wrap-list">
      <div className="title-list"></div>
      <div className="content-list">
        {bookList.map((e, index) => (
          <div
            key={index}
            className="wrap-item"
            onClick={handleSeeDetail}
            bookid={e.booktitleid}
          >
            <BookItem
              book={e}
              onShowDetail={() => {
                showModal(e);
              }}
            />
          </div>
        ))}
      </div>
      <div className="number-of-page-search">
        <div className="left-column-page-num">
          Trang:
          <button className="btn-number-page" onClick={handleJumpFirstPage}>
            {'Trang 1'}
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
          <input id="page-num-jump" type="number" placeholder="Trang" />
          <button className="btn-number-page btn2" onClick={handleJumpPage}>
            Đi
          </button>
        </div>
        <button
          style={{
            width: 100,
            cursor: 'pointer',
          }}
          onClick={onCreateNewBook}
        >
          Tạo sách
        </button>
      </div>
      <BookDetail
        bookID={bookSelected?._id}
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        book={bookSelected}
      />
    </div>
  );
}

export default ListBook;
