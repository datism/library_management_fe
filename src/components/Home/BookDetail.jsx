import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import {
  ShoppingOutlined,
} from '@ant-design/icons'

import { SERVER_ADDR } from '../../api/serverAddr'

function BookDetail(props) {
  //const navigate = useNavigate();
  var role = localStorage.getItem('role');
  const [ detail, setDetail ] = useState(null);
  const [ response, setResponse ] = useState('');

  useEffect(() => {

    if (props.bookID) fetchData();
  }, [props.bookID, role]);

  const fetchData = async () => {
    var data;
    if (role === '1') {
      data = await fetch(`${SERVER_ADDR}/library_be/index.php?controller=booktitle&action=findById&id=${props.bookID}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
        }
      });
    }
    else data = await fetch(`${SERVER_ADDR}/library_be/index.php?controller=booktitle&action=getById&id=${props.bookID}`);


    const res = await data.json();
    if (typeof res !== 'string') {
      setDetail(await res);
    } else {
      setResponse(await res);
    }
    // console.log(res);
  }

  const handleExitDetail = () => {
    document.getElementById('detail').classList.add('hidden');
  }

  const handleAddToCart = async () => {
    const data = await fetch(`${SERVER_ADDR}/library_be/index.php?controller=cart&action=add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
      },
      body: JSON.stringify({
        booktitleid: props.bookID
      })
    });

    setResponse(await data.json());
    setTimeout(() => {
      setResponse('');
    }, 2000)
  }

  const handleModify = () => {
    //navigate(`/BookTitle/${props.bookID}`);
  }

  const handleAddBook = async () => {
    const data = await fetch(`${SERVER_ADDR}/library_be/index.php?controller=book&action=create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
      },
      body: JSON.stringify({
        "booktitleid": props.bookID
    })
    });

    const res = await data.json();
    setResponse(await res);

    console.log(res);

    fetchData();
    setTimeout(() => {
      setResponse('');
    }, 2000);
  }

  if (detail) return (
    <div className='book-detail'>
      <div className="button-X" onClick={handleExitDetail}></div>
      <div className="main-detail">
        <div className="book-content">
          <div className="left-column">
            <img
              src={detail.picture}
              alt={detail.bookname}
            />
          </div>
          <div className="right-column">
            <div className="bookname">{detail.bookname}</div>
            <div className="description member-book-detail"><b>Mô tả:</b> <i>{detail.description}</i></div>
            <div className="author member-book-detail">
              <b>Tác giả:</b> <i>{detail.author.map((e, index) => index === detail.author.length - 1 ? ` ${e}` : ` ${e},`)}</i>
            </div>
            <div className="year-page member-book-detail">
              <div className="year"><b>Năm xuất bản: </b> <i>{detail.publishyear}</i></div>
              <div><b>Số trang: </b> <i>{detail.pages}</i></div>
            </div>
            <div className="category member-book-detail">
              <b>Thể loại: </b><i>{detail.category.map((e, index) => index === detail.category.length - 1 ? ` ${e}` : ` ${e},`)}</i>
            </div>
            <div className="quantity member-book-detail">
              <div className="total"><b>Tổng số cuốn: </b> <i>{detail.quantity}</i></div>
              <div><b>Số cuốn còn lại: </b> <i>{detail.quantityleft}</i></div>
            </div>
            {
              role === '1' ?
                <div className="book-id member-book-detail">
                  <b>Mã cuốn sách: </b>
                  <div>
                    {console.log(detail)}
                    {console.log(detail.books)}
                    {detail.books.map((e, index) =>
                      <p key={index}>{e.bookid}</p>
                    )}
                  </div>
                </div>
                :
                <></>
            }
          </div>
        </div>
        {
          role === '2' ?
            <button onClick={handleAddToCart}>
              <ShoppingOutlined className="btn-icon" />
              Thêm vào giỏ
            </button>
            : role === '1' ?
              <div className="button-librarian">
                <button onClick={handleModify}>
                  Chỉnh sửa
                </button>
                <button onClick={handleAddBook}>
                  Thêm cuốn sách
                </button>
              </div>
              :
              <></>
        }
        <p id="response-book-detail" className="response">{response}</p>
      </div>
    </div>
  )
  else return (<></>)
}

export default BookDetail;