import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import './subscriber.css'
import '../../pages/Common/commonPage.css'

const genderList = ['Nam', 'Nữ', 'Khác'];

function Subscriber(props) {
  const {booktitleid} = props;
  //const navigate = useNavigate();
  const [ gender, setGender ] = useState(null);
  const [response, setResponse] = useState();

  useEffect(() => {

    document.addEventListener('keydown', handleEnter);

    return () => document.removeEventListener('keydown', handleEnter);
  }, []);

  var name, phone, email, day;

  const CheckValidate = () => {
    name = document.getElementById('name').value;
    let warning = document.getElementById('warning1');
    if (name) {
      warning.classList.add('hidden');
    } else warning.classList.remove('hidden');

    phone = document.getElementById('phone').value;
    warning = document.getElementById('warning2');
    if (phone) {
      warning.classList.add('hidden');
    } else warning.classList.remove('hidden');

    email = document.getElementById('email').value;
    warning = document.getElementById('warning3');
    if (email) {
      warning.classList.add('hidden');
    } else warning.classList.remove('hidden');

    warning = document.getElementById('warning4');
    if (gender) {
      warning.classList.add('hidden');
    } else warning.classList.remove('hidden');

    day = document.getElementById('day-input').value;
    warning = document.getElementById('warning5');
    if (day) {
      warning.classList.add('hidden');
    } else warning.classList.remove('hidden');
  };

  const handleSubmit = async () => {
    document.querySelector('#warning6').classList.add('hidden');
    CheckValidate();

    if (name && phone && email && day) {
      // subscriber API

      const res = {

      };
      setResponse(res);

      if (typeof res === 'string') {
        document.querySelector('#warning6').classList.remove('hidden');
      } else {

      }
    }
  };

  const handleEnter = (e) => {
    if (e.keyCode === 13) {
      handleSubmit();
    }
  };

  return (
    <>
      <div className="title">Xác nhận thông tin mượn sách</div>
      <div className="info-box">
        <div className="box-title">Thông tin cơ bản</div>
        <div className="box-member">
          <div className="label">Họ và Tên: </div>
          <input id="name" className="input-box" placeholder="Hãy nhập họ tên"/>
          <p id="warning1" className="warning hidden">
          Cần nhập họ và tên!!!
          </p>
        </div>
        <div className="box-member">
          <div className="label">Số điện thoại: </div>
          <input type='number' id="phone" className="input-box" placeholder="Hãy nhập số điện thoại"/>
          <p id="warning2" className="warning hidden">
          Cần nhập số điện thoại!!!
          </p>
        </div>
        <div className="box-member">
          <div className="label">Email: </div>
          <input id="email" className="input-box" placeholder="Hãy nhập địa chỉ Email"/>
          <p id="warning3" className="warning hidden">
          Cần nhập địa chỉ Email!!!
          </p>
        </div>
        <div className="box-member gender">
          <div className="label">Giới tính: </div>
          <div id="gender" className="input-box">
            {genderList.map((e, index) =>
              <div key={index} className='box-radio'>
                <input
                  className={index ? 'input-radio' : 'input-radio first-radio'}
                  type="radio"
                  checked={index === gender}
                  onChange={() => setGender(index)}
                />
                <p>{e}</p>
              </div>
            )}
          </div>
          <p id="warning4" className="warning hidden">
              Cần chọn giới tính!!!
          </p>
        </div>
        <div className="box-member">
          <div className="label">Ngày mượn: </div>
          <p id="startDate" className="input-box">
            {new Date().toLocaleString()}
          </p>
        </div>
        <div className="box-member">
          <div className="label">Ngày trả: </div>
          <select id="day-input" className="input-box" defaultValue={""}>
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
          <p id="warning5" className="warning hidden">Cần chọn số ngày</p>
          <p id="warning6" className="warning hidden">
            {typeof response === 'string' ? response : ''}
          </p>
        </div>
        <button className="button-submit" onClick={handleSubmit}>Mượn ngay</button>
      </div>
    </>
  )
}

export default Subscriber