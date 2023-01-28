import { Button, Modal } from 'antd';
import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { useEffect } from 'react';
import axios from 'axios';
import { BE_URL } from '../../constant';
import { arrayBufferToBase64 } from '../../helpers';
import isEmail from 'validator/lib/isEmail';
import isMobilePhone from 'validator/lib/isMobilePhone';

function CreateUser(props) {
  const { isModalOpen, handleOk, handleCancel } = props;
  const defaultValue = {
    name: '',
    email: '',
    phone: '',
  };
  const [value, setValue] = useState(defaultValue);

  const onChange = (e) => {
    const name = e.target.name;
    const value1 = e.target.value;
    const newValue = {
      ...value,
      [name]: value1,
    };
    setValue(newValue);
  };

  const onOk = async () => {
    let check = true;
    if (!value.name || !isEmail(value.email) || !isMobilePhone(value.phone)) {
      check = false;
    }
    if (!check) return;
    await axios.post(`${BE_URL}/subscribers/`, value);
    setValue(defaultValue);
    handleOk();
  };

  return (
    <Modal
      style={{
        height: 100,
        width: 200,
      }}
      title="Tạo người dùng"
      open={isModalOpen}
      onOk={onOk}
      onCancel={handleCancel}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: 8,
        }}
      >
        <p
          style={{
            marginRight: 16,
            marginBottom: 0,
            width: 100,
          }}
        >
          Tên:
        </p>
        <input
          style={{
            border: '1px solid black',
            paddingLeft: 8,
            flex: 1,
          }}
          name="name"
          value={value.name}
          onChange={onChange}
        />
      </div>
      <div
        style={{
          display: 'flex',
          marginBottom: 8,
          alignItems: 'center',
        }}
      >
        <p
          style={{
            marginRight: 16,
            marginBottom: 0,
            width: 100,
          }}
        >
          Email:
        </p>
        <input
          style={{
            border: '1px solid black',
            paddingLeft: 8,
            flex: 1,
          }}
          name="email"
          value={value.email}
          onChange={onChange}
        />
      </div>
      <div
        style={{
          display: 'flex',
          marginBottom: 8,
          alignItems: 'center',
        }}
      >
        <p
          style={{
            marginRight: 16,
            marginBottom: 0,
            width: 100,
          }}
        >
          Số điện thoại:
        </p>
        <input
          style={{
            border: '1px solid black',
            paddingLeft: 8,
            flex: 1,
          }}
          name="phone"
          value={value.phone}
          onChange={onChange}
        />
      </div>
    </Modal>
  );
}

export default CreateUser;
