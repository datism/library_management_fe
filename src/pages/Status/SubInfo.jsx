import { Button, Modal } from 'antd';
import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { useEffect } from 'react';
import axios from 'axios';
import { BE_URL } from '../../constant';
import { arrayBufferToBase64 } from '../../helpers';
import isEmail from 'validator/lib/isEmail';
import isMobilePhone from 'validator/lib/isMobilePhone';

function SubInfo(props) {
  const { isModalOpen, handleOk, subinfo } = props;
  const defaultValue = {
    name: '',
    email: '',
    phone: '',
  };
  const [value, setValue] = useState(defaultValue);

  const onOk = async () => {
    handleOk();
  };

  return (
    <Modal
      style={{
        height: 100,
        width: 200,
      }}
      title="Thông tin người mượn"
      visible={isModalOpen}
      onOk={onOk}
      //onCancel={handleCancel}
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
        <p
          style={{
            border: '1px solid black',
            paddingLeft: 8,
            flex: 1,
          }}
        >{subinfo.name}</p>
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
        <p
          style={{
            border: '1px solid black',
            paddingLeft: 8,
            flex: 1,
          }}
        >{subinfo.email}</p>
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
        <p
          style={{
            border: '1px solid black',
            paddingLeft: 8,
            flex: 1,
          }}
        >{subinfo.phone}</p>
      </div>
    </Modal>
  );
}

export default SubInfo;
