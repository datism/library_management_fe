import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import './reader.css';
import '../../components/Home/home.css';
import BookItem from '../../components/Home/BookItem';
import BookDetail from '../../components/Home/BookDetail';
import axios from 'axios';
import { BE_URL } from '../../constant';


function Borrow(props) {
  //const navigate = useNavigate();
  const [bookList, setBookList] = useState([]);
  const [ checked, setChecked ] = useState([]);
  const [ subscriberID,  setSubscriberID ] = useState(0);
  const [total, setTotal] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookSelected, setBookSelected] = useState();
  const [ response, setResponse ] = useState('');

  // useEffect(() => {
  //   const role = localStorage.getItem('role');
  //   if (role !== '2') {
  //     navigate('/');
  //   }

  //   getUserID();
  // }, [navigate])

  const getUserID = async () => {
    const res = await axios.get(`${BE_URL}/auth`);
    setSubscriberID(res.data._id);
  }

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
    const res = await axios.get(`${BE_URL}/books`);
    setBookList(res.data.items);
    setTotal(res.data.totalItems);
  };

  useEffect(() => {
    fetchData();
  }, [props.filter]);

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

  const handleSubmit = async () => {
    let day = document.getElementById('week-input').value;
    let startDate = new Date();
    let endDate = new Date();

    if (day) {
      endDate.setDate(endDate.getDate() + day);
      checked.map(async (e) => {
        const data = await axios.post(`${BE_URL}/borrows`,
        {
          subscriber: subscriberID,
          copy: e._id,
          startDate: startDate,
          endDate: endDate,
          status: "inProgress"
        });

        const res = await data.json();
        setResponse(await res);
        console.log(res);
      })
    }
    else document.getElementById('warning').classList.remove('hidden');
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
      <div className="content-list">
        {bookList.map((e, index) => (
          <div
            key={index}
            className="wrap-item"
          >
            <div
              //onClick={handleSeeDetail}
              bookid={e.booktitleid}
            >
              <BookItem
                book={e}
                onShowDetail={() => {
                  showModal(e);
                }}
              />
            </div>
            <div className='borrow-item-button'>
              <input type='checkbox' onChange={() => handleCheck(e.booktitleid)} />
            </div>
          </div>
        ))}
      </div>

      <BookDetail
        bookID={bookSelected?._id}
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        book={bookSelected}
      />

      {
        checked.length ?
          <div className="borrow-box">
            <div className="checked-number">Đã chọn {checked.length} quyển</div>
            <div>
              {/* <input id="day-input" type='number' placeholder="Chọn số ngày mượn"/> */}
              <select id="day-input" className="input" defaultValue={""}>
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
              <button onClick={handleSubmit}>Mượn ngay</button>
              <p id="warning" className="warning hidden">Cần chọn số ngày</p>
              <p id="response" className="response">{/*response*/}</p>
            </div>
          </div>
          :
          <></>
      }
    </div>

  );
}

export default Borrow