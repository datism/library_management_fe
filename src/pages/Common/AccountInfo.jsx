import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import './commonPage.css'

const test = {
  name: 'Hà Nhật Tuấn',
  phone: '123456789',
  email: 'abc@ok.com',
  gender: 0
}

const genderList = ['Nam', 'Nữ', 'Khác'];

function AccountInfo() {
  const navigate = useNavigate();
  const [ gender, setGender ] = useState(test.gender);

  useEffect(() => {
    const role = localStorage.getItem('role')
    if (role === null) {
      navigate('/')
    }
  })

  const handleSubmit = () => {
    const name = document.querySelector('#name').value;
    const phone = document.querySelector('#phone').value;
    const email = document.querySelector('#email').value;
    console.log({
      name,
      phone,
      email,
      gender//: gender
    })
  }

  return (
    <>
      <div className="title">Thông tin tài khoản</div>
      <div className="info-box">
        <div className="box-title">Thông tin cơ bản</div>
        <div className="box-member">
          <div className="label">Họ và Tên: </div>
          <input id="name" className="input-box" defaultValue={test.name}/>
        </div>
        <div className="box-member">
          <div className="label">Số điện thoại: </div>
          <input type='number' id="phone" className="input-box" defaultValue={test.phone}/>
        </div>
        <div className="box-member">
          <div className="label">Email: </div>
          <input id="email" className="input-box" defaultValue={test.email}/>
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
        </div>
        <button className="button-submit" onClick={handleSubmit}>Xác nhận</button>
      </div>
    </>
  )
}

export default AccountInfo