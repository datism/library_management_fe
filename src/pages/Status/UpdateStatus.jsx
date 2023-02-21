import { Button, Modal } from 'antd';
import React, { useState } from 'react';
// import 'antd/dist/antd.css';
import { useEffect } from 'react';
import axios from 'axios';
import { BE_URL } from '../../constant';
import { arrayBufferToBase64, openNotification } from '../../helpers';
import isEmail from 'validator/lib/isEmail';
import isMobilePhone from 'validator/lib/isMobilePhone';

function UpdateStatus(props) {
  const statusList = ['returned', 'lost', 'overdue'];
  const { updateModalOpen, handleUpdateCancel, handleUpdateOk, borrowID } =
    props;
  const defaultStatus = {
    status: '',
  };
  const [status, setStatus] = useState(defaultStatus);

  const onOk = async () => {
    if (status === null) return;
    const json = JSON.stringify({
      status: statusList[status],
    });
    const customConfig = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      await axios.put(`${BE_URL}/borrows/${borrowID}`, json, customConfig);
      setStatus(defaultStatus);
      handleUpdateOk();
      openNotification('Cập nhật thành công');
    } catch (e) {
      openNotification(
        'Cập nhật thất bại: ' + e.response.data.errorMessage,
        'error',
      );
    }
  };

  return (
    <Modal
      style={{
        height: 100,
        width: 200,
      }}
      title="Sửa trạng thái mượn sách"
      visible={updateModalOpen}
      onOk={onOk}
      onCancel={handleUpdateCancel}
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
          Chọn trạng thái:
        </p>
        <div
          style={{
            alignItems: 'center',
            marginLeft: '10%',
            
          }}
        >
          {statusList.map((e, index) => (
            <div key={index} style={{minHeight: 30}}>
              <input
                type="radio"
                checked={index === status}
                onChange={() => setStatus(index)}
              />
              {<label style={{marginLeft: 10, textAlign: 'center'}}>{e}</label>}
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
}

export default UpdateStatus;
