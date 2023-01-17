import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingOutlined } from '@ant-design/icons';

function BookDetail(props) {
  const navigate = useNavigate();
  var role = localStorage.getItem('role');
  const [detail, setDetail] = useState(null);
  const [response, setResponse] = useState('');

  useEffect(() => {
    if (props.bookID) fetchData();
  }, [props.bookID, role]);

  const fetchData = async () => {
    var data;
    if (role === '1') {
      // Call API here
    } else {
      // Call API here
    }

    const res = await data.json();
    if (typeof res !== 'string') {
      setDetail(await res);
    } else {
      setResponse(await res);
    }
  };

  const handleExitDetail = () => {
    document.getElementById('detail').classList.add('hidden');
  };

  const handleAddToCart = async () => {
    // Call API here
  };

  const handleModify = () => {
    navigate(`/BookTitle/${props.bookID}`);
  };

  const handleAddBook = async () => {
    // Call API here
  };

  if (detail)
    return (
      <div className="book-detail">
        <div className="button-X" onClick={handleExitDetail}></div>
        <div className="main-detail">
          <div className="book-content">
            <div className="left-column">
              <img src={detail.picture} alt={detail.bookname} />
            </div>
            <div className="right-column">
              <div className="bookname">{detail.bookname}</div>
              <div className="description member-book-detail">
                <b>Mô tả:</b> <i>{detail.description}</i>
              </div>
              <div className="author member-book-detail">
                <b>Tác giả:</b>{' '}
                <i>
                  {detail.author.map((e, index) =>
                    index === detail.author.length - 1 ? ` ${e}` : ` ${e},`,
                  )}
                </i>
              </div>
              <div className="year-page member-book-detail">
                <div className="year">
                  <b>Năm xuất bản: </b> <i>{detail.publishyear}</i>
                </div>
                <div>
                  <b>Số trang: </b> <i>{detail.pages}</i>
                </div>
              </div>
              <div className="category member-book-detail">
                <b>Thể loại: </b>
                <i>
                  {detail.category.map((e, index) =>
                    index === detail.category.length - 1 ? ` ${e}` : ` ${e},`,
                  )}
                </i>
              </div>
              <div className="quantity member-book-detail">
                <div className="total">
                  <b>Tổng số cuốn: </b> <i>{detail.quantity}</i>
                </div>
                <div>
                  <b>Số cuốn còn lại: </b> <i>{detail.quantityleft}</i>
                </div>
              </div>
              {role === '1' ? (
                <div className="book-id member-book-detail">
                  <b>Mã cuốn sách: </b>
                  <div>
                    {detail.books.map((e, index) => (
                      <p key={index}>{e.bookid}</p>
                    ))}
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
          {role === '2' ? (
            <button onClick={handleAddToCart}>
              <ShoppingOutlined className="btn-icon" />
              Thêm vào giỏ
            </button>
          ) : role === '1' ? (
            <div className="button-librarian">
              <button onClick={handleModify}>Chỉnh sửa</button>
              <button onClick={handleAddBook}>Thêm cuốn sách</button>
            </div>
          ) : (
            <></>
          )}
          <p id="response-book-detail" className="response">
            {response}
          </p>
        </div>
      </div>
    );
  else return <></>;
}

export default BookDetail;
