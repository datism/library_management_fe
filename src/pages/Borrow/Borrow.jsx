import React from 'react';
import { Space, Table, Tag } from 'antd';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { BE_URL } from '../../constant';
import { SearchOutlined } from '@ant-design/icons';

import '../../components/Home/home.css';
import './borrow.css';
import User from '../User';
import ListSub from './ListSub';

function Borrow(props) {
  const [bookDetail, setBookDetail] = useState([]);
  const [bookID, setBookID] = useState('');
  const [continuePage, setContinuePage] = useState(false);
  const [bookChecked, setBookChecked] = useState(false);
  const [copyID, setCopyID] = useState();

  const handleContinue = () => {
    setContinuePage(true);
  }

  const handleBack = () => {
    setContinuePage(false);
  }

  const columns = [
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Phạm trù',
      key: 'category',
      dataIndex: 'category',
    },
    {
      title: 'Phân loại',
      key: 'type',
      dataIndex: 'type',
    },
    {
      title: 'Tác giả',
      key: 'author',
      dataIndex: 'author',
    },
    {
      title: 'Nhà xuất bản',
      key: 'publisher',
      dataIndex: 'publisher',
    },
    {
      title: 'Ngày xuất bản',
      key: 'publishedDate',
      dataIndex: 'publishedDate',
    },
  ];

  const handleSearch = () => {
    setCopyID(document.getElementById('search-box').value);
    handleGetBookID(copyID);
  }

  const handleGetBookID = async(copyID)=> {
    let res = {};
    try {
      console.log(copyID)
      res = await axios.get(`${BE_URL}/copies/${copyID}`)
      console.log(res)
      setBookID(res.data.book);
      requestBookDetail()
    } catch (e) {
      console.log(e);
      alert("Mã sách không đúng");
    }
  };

  const requestBookDetail = async() => {
    let res = {};
    try {
      console.log(bookID)
      res = await axios.get(`${BE_URL}/books/${bookID}`);
      console.log(res)
      setBookDetail(
        [res.data]
      )
      setBookChecked(true);
    } catch (e) {
      console.log(e)
      alert("Sách không tồn tại vui lòng nhập lại");
    }
  }


  return (

      <>
        {continuePage === false ? <div
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
          Nhập / quét mã sách
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

        <p style={{
            width: '100%',
            textAlign: 'center',
            fontSize: 28,
            fontWeight: 600,
            color: 'white',
          }}>Thông tin chi tiết về sách</p>
        <Table
          columns={columns}
          rowKey="index"
          pagination={{
            showSizeChanger: false,
            style: {
              display: 'flex',
              flexDirection: 'row',
            },
          }}
          dataSource={bookDetail}
        />

      </div>:
        <ListSub copyID = {copyID}/>
    }
      <div className='continue-page button-page'>
          {!continuePage && bookChecked && <button className='continue-page-button' onClick={handleContinue}>
                <p>Continue</p>
            </button>
          }
        </div>
        <div className='continue-page button-page'>
          {continuePage && bookChecked && <button className='continue-page-button' onClick={handleBack}>
                <p>Back</p>
            </button>
          }
        </div>
    </>


  );
}

export default Borrow;
