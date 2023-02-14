import { useEffect, useState } from 'react';

import './home.css';
import BookItem from './BookItem';
import BookDetail from './BookDetail';
import axios from 'axios';
import { BE_URL } from '../../constant';
import QRCodeModal from "./QRCodeModal";

const typeList = ['Đang hot', 'Mới ra mắt'];

function ListBook(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State for Copy QR Code
  const [isQRCodeModalOpen, setQRCodeModalOpen] = useState(false);
  const [addedCopyId, setAddedCopyId] = useState(null)

  // State for book
  const [bookList, setBookList] = useState([]);
  const [bookID, setBookID] = useState(0);
  const [pageNum, setPageNum] = useState(1);
  const [bookSelected, setBookSelected] = useState();
  const [total, setTotal] = useState(0);

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
        itemsPerPage: 8,
        ...filter,
      },
    });

    setBookList(res.data.items);
    setTotal(res.data.totalItems);
  };

  useEffect(() => {
    fetchData();
  }, [props.filter, pageNum]);

  const handleSeeDetail = (e) => showModal(e)

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

  const handleOpenQRCodeModal = (data) => {
    console.log(data)
    setAddedCopyId(data)
    setQRCodeModalOpen(true)
  }

  const onCloseQRCodeModal = () => {
    fetchData();
    setQRCodeModalOpen(false)
  }

  return (
    <div className="wrap-list">
      <div className="content-list">
        {bookList.map((e, index) => (
          <div
            key={index}
            className="wrap-item"
            onClick={() => {
              handleSeeDetail(e);
            }}
            bookid={e.booktitleid}
          >
            <BookItem
              book={e}
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
        onCopyAdded={(e) => handleOpenQRCodeModal(e)}
      />
      <QRCodeModal
          isQRCodeModalOpen={isQRCodeModalOpen}
          data={addedCopyId}
          closeQRCodeModal={onCloseQRCodeModal}
      />
    </div>
  );
}

export default ListBook;
