import React from 'react';
import { Space, Table, Tag } from 'antd';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { BE_URL } from '../../constant';
import { FilterOutlined, SearchOutlined } from '@ant-design/icons';
import SubInfo from './SubInfo';
import UpdateStatus from './UpdateStatus';
import { useRef } from 'react';
import { Button, Input } from 'antd';
import Highlighter from 'react-highlight-words';
import  { InputRef } from 'antd';

function Status(props) {
  const [borrows, setBorrows] = useState([]);
  const [subscriber, setSubscriber] = useState([]);
  const [status, setStatus] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [total, setTotal] = useState(0);
  const [currentPage, setPage] = useState(1);
  const [borrowID, setBorrowID] = useState(0);

  const [updateModalOpen, setUpdateModalOpen] = useState(false);

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);


  
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = clearFilters => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }} onKeyDown={e => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button type="link" size="small" onClick={clearFilters}>
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined}} />,
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value || '').toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => searchInput.current.select());
      }
    },
    render: (text, record) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text}
        />
      ) : (
        text
      ),
  });


  

  const showModal = () => {
    console.log('Hi');
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const showUpdateModal = () => {
    setUpdateModalOpen(true);
  };

  const handleUpdateOk = () => {
    requestUser();
    setUpdateModalOpen(false);
  };

  const handleUpdateCancel = () => {
    setUpdateModalOpen(false);
  };

  const onUpdateStatus = () => {
    showUpdateModal();
  };

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
    console.log(params);
    setBorrows(
      res.data.map((r, i) => ({
        ...r,
        name: r.subscriber.name,
        phone: r.subscriber.phone,
        email: r.subscriber.email,
        index: i + 1,
        book: r.copy.book.title
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
      title: 'Người mượn',
      dataIndex: 'name',
      key: 'name',
      render: (sub) => {
        return <p>{sub.name}</p>;
      },
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Số điện thoai',
      dataIndex: 'phone',
      key: 'phone',
      render: (sub) => {
        return <p>{sub.phone}</p>;
      },
      ...getColumnSearchProps('phone'),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (sub) => {
        return <p>{sub.email}</p>;
    },
      ...getColumnSearchProps('email'),
    },
    {
      title: 'Tên sách',
      dataIndex: 'book',
      key: 'book',
      render: (sub) => {
        return <p>{sub.book}</p>;
    },
      ...getColumnSearchProps('book'),
    },
    {
      title: 'Ngày mượn',
      key: 'startDate',
      dataIndex: 'startDate',
      ...getColumnSearchProps('startDate'),
    },
    {
      title: 'Ngày trả',
      key: 'endDate',
      dataIndex: 'endDate',
      ...getColumnSearchProps('endDate'),
    },
    {
      title: 'Trạng thái',
      key: 'status',
      dataIndex: 'status',
      ...getColumnSearchProps('status'),
    },
    // {
    //   title: 'Thông tin chi tiết',
    //   key: 'subinfo',
    //   dataIndex: 'subinfo',
    //   render: (text, record, index) => {
    //     return (
    //       <button
    //         id={record.id}
    //         onClick={(e) => hanleShowInfo(record)}
    //         //record is the row data
    //       >
    //         Xem
    //       </button>
    //     );
    //   },
    // },
    {
      title: 'Cập nhật trạng thái',
      key: 'updateinfo',
      dataIndex: 'updateinfo',
      render: (text, record, index) => {
        return (
          <button
            id={record.id}
            onClick={(e) => handleUpdateInfo(record)}
            //record is the row data
          >
            Cập nhật
          </button>
        );
      },
    },
  ];

  // const handleSearch = () => {
  //   const input = document.getElementById('search-box').value;
  //   setStatus(input);
  // };
  const onChangePage = (e) => {
    setPage(e);
  };

  // const NameBook = ({ id }) => {
  //   const [name, setName] = useState(null);

  //   useEffect(() => {
  //     axios.get(`${BE_URL}/books/${id}`)
  //       .then(response => {
  //         setName(response.data.title);
  //       })
  //       .catch(error => {
  //         console.log(error);
  //       });
  //   }, [id]);

  //   return <p>{name ?? 'Loading...'}</p>;
  // };

  // const hanleShowInfo = (record) => {
  //   api(record);
  // };

  // const api = async (record) => {
  //   const res = await axios.get(`${BE_URL}/subscribers/${record.subscriber}`);
  //   setSubscriber(await res.data);
  //   showModal();
  //   console.log(subscriber);
  // };

  // async function handleGetBook (idBook){
  //   const res = await axios.get(`${BE_URL}/books/${idBook}`);
  //   return <p>{res.title}</p>;
  // }

  const handleUpdateInfo = (record) => {
    showUpdateModal();
    setBorrowID(record._id);
  };

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
          marginBottom: 20,

        }}
      >
        Lịch sử mượn sách
      </p>
      {/* <div className="search-box">
        <input
          className="input-search"
          placeholder="Tìm kiếm"
          id="search-box"
          //   onChange={handleEnter}
        ></input>
        <button className="btn-search" onClick={handleSearch}>
          <SearchOutlined className="icon-search" />
        </button>
      </div> */}

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
      {/* <SubInfo
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        subinfo={subscriber}
      /> */}

      <UpdateStatus
        updateModalOpen={updateModalOpen}
        handleUpdateOk={handleUpdateOk}
        handleUpdateCancel={handleUpdateCancel}
        borrowID={borrowID}
      />
    </div>
  );
}

export default Status;
