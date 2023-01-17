import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import './home.css';
import BookItem from './BookItem';
import BookDetail from './BookDetail';

const typeList = ['Đang hot', 'Mới ra mắt'];

function MiniListBook(props) {
  const navigate = useNavigate();
  const [bookID, setBookID] = useState(0);
  const [bookList, setBookList] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (props.type === 0) {
        // Call API here
      } else {
        // Call API here
      }
    };

    fetchData();
  }, [props.type]);

  const handleMore = () => {
    navigate(`/type=${props.type}`);
  };

  const handleSeeDetail = (e) => {
    document.getElementById('detail').classList.remove('hidden');
    setBookID(e.currentTarget.attributes.bookid.nodeValue);
  };

  if (bookList)
    return (
      <div className="wrap-list">
        <div className="title-list">
          <div className="name-list">{typeList[props.type]}</div>
          <button className="button-list" onClick={handleMore}>
            Xem thêm
          </button>
        </div>
        <div className="content-list">
          {bookList.map((e, index) => (
            <div
              key={index}
              className="wrap-item"
              onClick={handleSeeDetail}
              bookid={e.booktitleid}
            >
              <BookItem img={e.picture} name={e.bookname} />
            </div>
          ))}
        </div>
        <div id="detail" className="wrap-book-detail hidden">
          <BookDetail bookID={bookID} />
        </div>
      </div>
    );
  else return <></>;
}

export default MiniListBook;
