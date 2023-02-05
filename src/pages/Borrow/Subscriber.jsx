import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BE_URL } from '../../constant';

import './subscriber.css';
import '../../pages/Common/commonPage.css';
import { openNotification } from '../../helpers';

const genderList = ['Nam', 'Nữ', 'Khác'];

function Subscriber(props) {
  const { copyID, user } = props;
  //const navigate = useNavigate();
  const [gender, setGender] = useState(null);
  const [response, setResponse] = useState();

  useEffect(() => {
    console.log(props.booktitleid);

    document.addEventListener('keydown', handleEnter);

    return () => document.removeEventListener('keydown', handleEnter);
  }, []);

  var day;

  const CheckValidate = () => {
    day = document.getElementById('day-input').value;
    let warning = document.getElementById('warning5');
    if (day) {
      warning.classList.add('hidden');
    } else warning.classList.remove('hidden');
  };

  const handleSubmit = async () => {
    //document.querySelector('#warning6').classList.add('hidden');
    CheckValidate();
    const endDate = new Date();

    if (day) {
      endDate.setDate(endDate.getDate() + Number(day));
      const json = JSON.stringify({
        subscriber: user._id,
        copy: copyID,
        startDate: new Date(),
        endDate: endDate,
        status: 'inProgress',
      });
      const customConfig = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      // subscriber API

      console.log(json);
      //document.getElementById('warning6').classList.remove('hidden');
      setResponse({});
      try {
        const data = await axios.post(`${BE_URL}/borrows`, json, customConfig);
        setResponse(data);
        openNotification('Mượn thành công');
      } catch (e) {
        openNotification(
          'Mượn thất bại: ' + e.response.data.errorMessage,
          'error',
        );
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
          <p id="name" className="input-box">
            {user.name}
          </p>
        </div>
        <div className="box-member">
          <div className="label">Số điện thoại: </div>
          <p type="number" id="phone" className="input-box">
            {user.phone}
          </p>
        </div>
        <div className="box-member">
          <div className="label">Email: </div>
          <p id="email" className="input-box">
            {user.email}
          </p>
        </div>
        <div className="box-member">
          <div className="label">Ngày mượn: </div>
          <p id="startDate" className="input-box">
            {new Date().toLocaleString()}
          </p>
        </div>
        <div className="box-member">
          <div className="label">Chọn số ngày mượn: </div>
          <select id="day-input" className="input-box" defaultValue={''}>
            <option value="" disabled hidden>
              Số ngày mượn
            </option>
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
          <p id="warning5" className="warning hidden">
            Cần chọn số ngày!!!
          </p>
        </div>
        <button className="button-submit" onClick={handleSubmit}>
          Mượn ngay
        </button>
      </div>
    </>
  );
}

export default Subscriber;
