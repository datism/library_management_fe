import React from 'react';
import { Row, Space, Table, Tag } from 'antd';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { BE_URL } from '../../constant';
import { FilterOutlined, SearchOutlined } from '@ant-design/icons';
import './ListSub.css';
import Subscriber from './Subscriber';

function ListSub(props) {
  const { copyID } = props;
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [total, setTotal] = useState(0);
  const [currentPage, setPage] = useState(1);
  const [selectedSub, setSelectedSub] = useState(false);
  const [rowID, setRowID] = useState();

  const showModal = (e) => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    requestUser();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const requestUser = async () => {
    const params = {
      currentPage,
      itemsPerPage: 10,
    };
    if (name) {
      params.name = name;
    }
    const res = await axios.get(`${BE_URL}/subscribers`, {
      params,
    });
    console.log(params);
    setUsers(
      res.data.items.map((r, i) => ({
        ...r,
        index: i + 1,
      })),
    );
    console.log(users);

    setTotal(res.data.totalItems);
  };

  useEffect(() => {
    requestUser();
  }, [currentPage, name]);

  const columns = [
    {
      title: 'Số thứ tự',
      dataIndex: 'index',
      key: 'index',
      render: (text) => <p>{text}</p>,
    },
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Số điện thoại',
      key: 'phone',
      dataIndex: 'phone',
    },
  ];

  const handleChooseSub = (id) => {
    setRowID(id);
    setSelectedSub(true);
  };

  const handleSearch = () => {
    const input = document.getElementById('search-box').value;
    setName(input);
  };
  const onChangePage = (e) => {
    setPage(e);
  };
  const onCreateNewUser = () => {
    showModal();
  };

  return (
    <>
      {selectedSub === false ? (
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
            }}
          >
            Chọn người đọc
          </p>
          <div className="search-box">
            <input
              className="input-search"
              placeholder="Tìm kiếm"
              id="search-box"
              //   onChange={handleEnter}
            ></input>
            <button className="btn-search" onClick={handleSearch}>
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
            dataSource={users}
            onRow={(record, rowIndex) => {
              return {
                onClick: (event) => {
                  handleChooseSub(rowIndex);
                }, // click row
              };
            }}
          />
        </div>
      ) : (
        <Subscriber copyID={copyID} user={users[rowID]} />
      )}
    </>
  );
}

export default ListSub;
