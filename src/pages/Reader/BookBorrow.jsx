import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  DeleteOutlined
} from '@ant-design/icons'

import BookBorrowItem from "../../components/Reader/BookBorrowItem";
import BookDetail from "../../components/Home/BookDetail";
import './reader.css'
import { SERVER_ADDR } from '../../api/serverAddr'

const bookBorrowItem = [
  {
      "booktitleid": "4",
      "bookname": "Love is War ascdcds dsfioewr jscdjsido cdseqwirw acdsoif acsdll sdoeoiwq",
      "pages": "100",
      "publishyear": "2009",
      "quantity": "2",
      "quantityleft": "1",
      "description": "It is really good, yeahh",
      "picture": "https://images-na.ssl-images-amazon.com/images/I/51HFQfT7OFL._SX331_BO1,204,203,200_.jpg",
      "author": [
          "Duong Quang Trieu",
          "Harry Marguire"
      ],
      "category": [
          "Tinh cam",
          "Tieu thuyet"
      ]
  },
  {
      "booktitleid": "1",
      "bookname": "Math",
      "pages": "100",
      "publishyear": "2019",
      "quantity": "2",
      "quantityleft": "2",
      "description": "It is really good, yeahh",
      "picture": "https://bizweb.dktcdn.net/thumb/grande/100/397/420/products/61sc4vidcyl-sx419-bo1-204-203-200.jpg?v=1619849924967",
      "author": [
          "Tran Quoc Binh"
      ],
      "category": [
          "Toan hoc",
          "Lap trinh"
      ]
  },
  {
    "booktitleid": "4",
    "bookname": "Love is War ascdcds dsfioewr jscdjsido cdseqwirw acdsoif acsdll sdoeoiwq",
    "pages": "100",
    "publishyear": "2009",
    "quantity": "2",
    "quantityleft": "1",
    "description": "It is really good, yeahh",
    "picture": "https://images-na.ssl-images-amazon.com/images/I/51HFQfT7OFL._SX331_BO1,204,203,200_.jpg",
    "author": [
        "Duong Quang Trieu",
        "Harry Marguire"
    ],
    "category": [
        "Tinh cam",
        "Tieu thuyet"
    ]
}
]

function Borrow() {
  // const navigate = useNavigate();
  // const [ borrow, setBorrow ] = useState([]);
  // const [ checked, setChecked ] = useState([]);
  // const [ bookID,  setBookID ] = useState(0);
  // const [ response, setResponse ] = useState('');

  // useEffect(() => {
  //   const role = localStorage.getItem('role');
  //   if (role !== '2') {
  //     //navigate('/');
  //   }

  //   getBookFromBorrow();
  // }, [navigate])

  // const getBookFromBorrow = async () => {
  //   const data = await fetch(`${SERVER_ADDR}/library_be/index.php?controller=borrow`, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
  //     }
  //   });

  //   const res = await data.json();
  //   setBorrow(await res);
  //   console.log(res);
  // }

  // const handleSubmit = async () => {
  //   console.log(checked);
  //   let week = document.getElementById('week-input').value;
  //   if (week) {
  //     document.getElementById('warning').classList.add('hidden');
  //     checked.map(async (e) => {
  //       const data = await fetch(`${SERVER_ADDR}/library_be/index.php?controller=transaction&action=create`, {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
  //         },
  //         body: JSON.stringify({
  //           booktitleid: e,
  //           extratime: `${week} weeks`
  //         })
  //       });

  //       const res = await data.json();
  //       setResponse(await res);
  //       console.log(res);

  //       getBookFromBorrow();
  //       setTimeout(() => {
  //         setResponse('');
  //       }, 2000)
  //     })
  //   }
  //   else document.getElementById('warning').classList.remove('hidden');
  // }

  // const handleSeeDetail = (e) => {
  //   document.getElementById('detail').classList.remove('hidden');
  //   setBookID(e.currentTarget.attributes.bookid.nodeValue);
  // }

  // const handleDeleteFromBorrow = async (id) => {
  //   console.log(id);
  //   const data = await fetch(`${SERVER_ADDR}/library_be/index.php?controller=borrow&action=delete&booktitleid=${id}`, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
  //     },
  //   });

  //   console.log(await data.json());
  //   getBookFromBorrow();
  // }

  // const handleCheck = (id) => {
  //   if (checked.includes(id)) {
  //     setChecked(prev => prev.filter(e => e !== id));
  //   }
  //   else setChecked(prev => [...prev, id]);
  // }

  return (
    <div className="borrow-page">
      <div className="grid-container-borrow">
        {bookBorrowItem.map((e, index) =>
          <div
            key={index}
            className="wrap-borrow-item"
          >
            <div
              //onClick={handleSeeDetail}
              bookid={e.booktitleid}
            >
              <BookBorrowItem
                booktitleid={e.booktitleid}
                img={e.picture}
                name={e.bookname}
                quantity={e.quantity}
                quantityleft={e.quantityleft}
              />
            </div>
            <div className='borrow-item-button'>
              <input type='checkbox' /*onChange={() => handleCheck(e.booktitleid)} *//>
            </div>
          </div>
        )}
        <div></div>
        <div></div>
      </div>
      {
        // checked.length ?
          <div className="borrow-box">
            <div className="checked-number">Đã chọn {/*checked.length*/ 2 } quyển</div>
            <div>
              {/* <input id="week-input" type='number' placeholder="Chọn số tuần mượn"/> */}
              <select id="week-input" className="input" defaultValue={""}>
                <option value="" disabled hidden>Số ngày mượn</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">13</option>
                <option value="14">14</option>
              </select>
              <button /*onClick={handleSubmit}*/>Mượn ngay</button>
              <p id="warning" className="warning hidden">Cần chọn số tuần</p>
              <p id="response" className="response">{/*response*/}</p>
            </div>
          </div>
          // :
          // <></>
      }
      <div id='detail' className='wrap-book-detail hidden'>
        <BookDetail /*bookID={bookID} *//>
      </div>
    </div>
  )
}

export default Borrow