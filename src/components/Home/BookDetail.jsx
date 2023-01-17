import { Button, Modal } from 'antd';
import React, { useState } from 'react';
import 'antd/dist/antd.css';

function BookDetail(props) {
  const { isModalOpen, handleOk, handleCancel } = props;
  console.log('isModalOpen', isModalOpen);
  return (
    <Modal
      style={{
        height: 100,
        width: 100,
      }}
      title="Basic Modal"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  );
}

export default BookDetail;
