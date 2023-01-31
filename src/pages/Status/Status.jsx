import React from 'react';
import { Space, Table, Tag } from 'antd';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { BE_URL } from '../../constant';
import { FilterOutlined, SearchOutlined } from '@ant-design/icons';
import SubInfo from './SubInfo';
import UpdateStatus from './UpdateStatus';

function Status(props) {
  const [borrows, setBorrows] = useState([]);
  const [subscriber, setSubscriber] = useState([]);
  const [status, setStatus] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [total, setTotal] = useState(0);
  const [currentPage, setPage] = useState(1);
  const [borrowID, setBorrowID] = useState(0);

  const [updateModalOpen, setUpdateModalOpen] = useState(false);


  const showModal = () => {
    console.log("Hi")
    setIsModalOpen(true);
  };

  const handleOk = () => {;
    setIsModalOpen(false);
  };

  const showUpdateModal = ()=>{
    setUpdateModalOpen(true);
  }

  const handleUpdateOk = () => {
    requestUser();
    setUpdateModalOpen(false);
  }

  const handleUpdateCancel = () => {
    setUpdateModalOpen(false);
  }

  const onUpdateStatus = () =>{
    showUpdateModal();
  }



  const requestUser = async () => {
    const params = {
      currentPage,
      itemsPerPage: 10,
    };
    if (status) {
      params.status = status;
    }
    const res = await axios.get(`${BE_URL}/borrows`, {
      params,
    });
    console.log(params)
    setBorrows(
      res.data.map((r, i) => ({
        ...r,
        index: i + 1,
      })),
    );

    setTotal(res.data.totalItems);
  };

  useEffect(() => {
    requestUser();
  }, [currentPage, status]);

  const columns = [
    {
      title: 'Số thứ tự',
      dataIndex: 'index',
      key: 'index',
      render: (text) => <p>{text}</p>,
    },
    {
      title: 'SubsriberID',
      dataIndex: 'subscriber',
      key: 'subscriber',
    },
    {
      title: 'Mã sách',
      dataIndex: 'copy',
      key: 'copy',
    },
      {
        title: 'Ngày mượn',
        key: 'startDate',
        dataIndex: 'startDate',
      },
      {
        title: 'Ngày trả',
        key: 'endDate',
        dataIndex: 'endDate',
      },
      {
        title: 'Trạng thái',
        key: 'status',
        dataIndex: 'status',
      },
      {
        title: 'Thông tin chi tiết',
        key: 'subinfo',
        dataIndex: 'subinfo',
        render: (text, record, index) => {
          return (
              <button
                id={record.id}
                onClick={e => hanleShowInfo(record)}
       //record is the row data    
              >Xem</button>
          );
        }
      },
      {
        title: 'Cập nhật trạng thái',
        key: 'updateinfo',
        dataIndex: 'updateinfo',
        render: (text, record, index) => {
          return (
              <button
                id={record.id}
                onClick={e => handleUpdateInfo(record)}
       //record is the row data    
              >Cập nhật</button>
          );
        }
      }
      

  ];

  const handleSearch = () => {
    const input = document.getElementById('search-box').value;
    setStatus(input);
  };
  const onChangePage = (e) => {
    setPage(e);
  };

  const hanleShowInfo = (record) =>{
    api(record);
  }

  const api = async(record)=>{
    const res =await axios.get(`${BE_URL}/subscribers/${record.subscriber}`);
    setSubscriber(await res.data);
    showModal();
    console.log(subscriber);
  }

  const handleUpdateInfo = (record) =>{
    showUpdateModal();
    setBorrowID(record._id);
  }

  

  return (
    <div
      style={{
        marginTop: 40,
      }}
    >
      <p
        style={{
          width: '100%',
          textAlign: 'center',
          fontSize: 28,
          fontWeight: 600,
          color: 'white',
        }}
      >
        Status Borrow
      </p>
      <div className="search-box">
        <input
          className="input-search"
          placeholder="Tìm kiếm"
          id="search-box"
          //   onChange={handleEnter}
        ></input>
        <button className="btn-search" onClick={onUpdateStatus}>
          <SearchOutlined className="icon-search" />
        </button>
      </div>

      <Table
        columns={columns}
        rowKey="index"
        pagination={{
          pageSize: 10,
          total,
          onChange: onChangePage,
          showSizeChanger: false,
          style: {
            display: 'flex',
            flexDirection: 'row',
          },
        }}
        dataSource={borrows}
        
      />
      <SubInfo
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        subinfo={subscriber}
      />

      <UpdateStatus 
        updateModalOpen = {updateModalOpen}
        handleUpdateOk = {handleUpdateOk}
        handleUpdateCancel = {handleUpdateCancel}
        borrowID = {borrowID}
      />
    </div>
  );
}

export default Status;
