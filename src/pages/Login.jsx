import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './index.css';

function Login() {
  const [response, setResponse] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    document.addEventListener('keydown', handleEnter);

    return () => document.removeEventListener('keydown', handleEnter);
  });

  var username, password;
  const CheckValidate = () => {
    username = document.getElementById('username').value;
    let warning = document.getElementById('warning1');
    // Show warning if username is empty
    if (username) {
      warning.classList.add('hidden');
    } else warning.classList.remove('hidden');

    password = document.getElementById('password').value;
    warning = document.getElementById('warning2');
    // Show warning if password is empty
    if (password) {
      warning.classList.add('hidden');
    } else warning.classList.remove('hidden');
  };

  const handleLogin = async () => {
    document.querySelector('#warning3').classList.add('hidden');
    CheckValidate();

    if (username && password) {
      // login API

      const res = {
        accessToken: '',
        username: 'duc',
      };
      setResponse(res);

      if (typeof res === 'string') {
        document.querySelector('#warning3').classList.remove('hidden');
      } else {
        localStorage.setItem('accessToken', res.accessToken);
        localStorage.setItem('username', res.user.username);
        navigate('/');
      }
    }
  };

  const handleSignup = () => {
    navigate('/register');
  };

  const handleEnter = (e) => {
    if (e.keyCode === 13) {
      handleLogin();
    }
  };

  return (
    <div className="background">
      <div className="login-box">
        <img src="images/library.jpeg" alt="logo" className="logo" />
        <input
          id="username"
          className="input-form"
          placeholder="Tên đăng nhập"
        />
        <p id="warning1" className="warning hidden">
          Cần nhập tên đăng nhập!!!
        </p>
        <input
          id="password"
          type="password"
          className="input-form"
          placeholder="Mật khẩu"
        />
        <p id="warning2" className="warning hidden">
          Cần nhập mật khẩu!!!
        </p>
        <p id="warning3" className="warning hidden">
          {typeof response === 'string' ? response : ''}
        </p>
        <button className="button-form button-blue" onClick={handleLogin}>
          Đăng nhập
        </button>
        <div className="line"></div>
        <button className="button-form button-green" onClick={handleSignup}>
          Tạo tài khoản
        </button>
      </div>
    </div>
  );
}

export default Login;
