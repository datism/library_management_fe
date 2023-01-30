import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

import './pages.css'
import logo from '../images/logo1.jpg'
import { BE_URL } from '../constant';

function Register() {
  const genderList = ['Nam', 'Nữ', 'Khác'];
  //const navigate = useNavigate();
  const [ gender, setGender ] = useState(null);
  const [ response, setResponse ] = useState({});

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role !== null) {
      //navigate('/');
    }
  })

  var username, password, passwordCheck, phone, fullname, email;
  const CheckValidate = () => {
    let flag = true;

    username = document.getElementById('username').value;
    let warning = document.getElementById('warning1');
    // Show warning if username is empty
    if (!username) {
      warning.classList.remove('hidden');
      flag = false;
    }
    else warning.classList.add('hidden');

    password = document.getElementById('password').value;
    warning = document.getElementById('warning2');
    // Show warning if password is empty
    if (!password) {
      warning.classList.remove('hidden');
      flag = false;
    }
    else warning.classList.add('hidden');

    passwordCheck = document.getElementById('password-check').value;
    warning = document.getElementById('warning3');
    // Show warning if password check is empty
    if (passwordCheck) {
      warning.classList.add('hidden');
      warning = document.getElementById('warning4');
      if (passwordCheck !== password) {
        warning.classList.remove('hidden');
        flag = false;
      }
      else warning.classList.add('hidden');
    }
    else {
      warning.classList.remove('hidden');
      flag = false;
    }

    fullname = document.getElementById('register-name').value;
    phone = document.getElementById('register-phone').value;
    warning = document.getElementById('warning5');
    // Show warning if name or password is empty
    if (!fullname || !phone) {
      warning.classList.remove('hidden');
      flag = false;
    }
    else warning.classList.add('hidden');

    email = document.getElementById('register-email').value;
    warning = document.getElementById('warning6');
    // Show warning if email is empty
    if (!email) {
      warning.classList.remove('hidden');
      flag = false;
    }
    else warning.classList.add('hidden');

    warning = document.getElementById('warning7');
    // Show warning if email is empty
    if (gender === -1) {
      warning.classList.remove('hidden');
      flag = false;
    }
    else warning.classList.add('hidden');

    return flag;
  }

  const handleSignUp = async () => {
    if (CheckValidate()) {
      const json = JSON.stringify({
        name: username,
        password: password
      })
      const customConfig = {
        headers: {
        'Content-Type': 'application/json'
        }
    };
      console.log(json)
      document.getElementById('warning8').classList.remove('hidden');
      setResponse({})
      const data = await axios.post(`${BE_URL}/auth/signup`, json, customConfig);

      console.log(data)
      setResponse(data);
      console.log(response)
    }
  }

  return (
    <div className='background'>
      <div className='login-box register-box'>
        <img
          src={logo}
          alt='logo'
          className='logo'
        />
        <div className='info'>
          <div className='authen-info'>
            <input
              id='username'
              className='input-form'
              placeholder='Tên đăng nhập'
            />
            <p id='warning1' className='warning hidden'>Cần nhập tên đăng nhập!!!</p>
            <input
              id='password'
              type='password'
              className='input-form'
              placeholder='Mật khẩu'
            />
            <p id='warning2' className='warning hidden'>Cần nhập mật khẩu!!!</p>
            <input
              id='password-check'
              type='password'
              className='input-form'
              placeholder='Nhập lại mật khẩu'
            />
            <p id='warning3' className='warning hidden'>Cần nhập lại mật khẩu!!!</p>
            <p id='warning4' className='warning hidden'>Mật khẩu nhập lại không khớp!!!</p>
          </div>
          <div className='register-line'></div>
          <div className='acc-info'>
            <div className='name-phone'>
              <input
                id='register-name'
                className='input-form'
                placeholder='Họ và tên'
              />
              <input
                id='register-phone'
                type='number'
                className='input-form'
                placeholder='Số điện thoại'
              />
            </div>
            <p id='warning5' className='warning hidden'>Cần nhập Họ tên và Số điện thoại!!!</p>
            <input
              id='register-email'
              type={'email'}
              className='input-form'
              placeholder='Email'
            />
            <p id='warning6' className='warning hidden'>Cần nhập email!!!</p>
            <div id='register-gender'>
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
            <p id='warning7' className='warning hidden'>Cần chọn giới tính!!!</p>
          </div>
        </div>
        <button className='button-form button-blue' onClick={handleSignUp}>Đăng ký</button>
        <p id='warning8' className='warning hidden' style={{fontSize: '15pt'}}>{response.status === 200 ? "Inserted successfully" : 'Another account has already existed.'}</p>
      </div>
    </div>
  )
}

export default Register