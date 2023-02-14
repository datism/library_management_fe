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
import QrReader from './QRScanner'
import CopyScanner from "./CopyScanner";

function Borrow(props) {
  const [bookDetail, setBookDetail] = useState();
  const [bookID, setBookID] = useState(null);
  const [continuePage, setContinuePage] = useState(false);
  const [bookChecked, setBookChecked] = useState(false);
  const [copyID, setCopyID] = useState(null);

  const handleContinue = () => {
    setContinuePage(true);
  };

  const handleBack = () => {
    setContinuePage(false);
  };

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

  const handleScanQRCode = (e) => {
    setCopyID(e);
  };

  useEffect(() => {
    console.log(copyID);
    if (copyID !== null && copyID !== '')
      fetch(`${BE_URL}/copies/${copyID}`)
        .then((response) => {
          if (response.status === 200)
            return response.json()

          // Request failed handler
          setBookChecked(false);
          setBookDetail(null);
          setCopyID(null);
          setBookID(null);
          return null
        })
        .then((res) => {
          console.log(res);
          if (res !== null)
            setBookID(res.book['_id']);
        })
        .catch((err) => {
          console.log(err.message);
        });
  }, [copyID]);

  useEffect(() => {
    if (bookID !== null && copyID !== null)
      fetch(`${BE_URL}/books/${bookID}`)
        .then((response) => response.json())
        .then((res) => {
          console.log(res);
          setBookDetail(res);
          setBookChecked(true);
        })
        .catch((err) => {console.log(err.message);});
  }, [bookID]);

  return (
    <div>
      {continuePage === false ? (
          <CopyScanner
            bookChecked={bookChecked}
            onResult={handleScanQRCode}
            bookDetail={bookDetail}
            style={{
              flexGrow: 99999999,
              marginBottom: 200
            }}
          />
      ): (
        <ListSub copyID={copyID} />
      )}
      {bookChecked === true && (
        <div>
          <div className="continue-page button-page">
            {!continuePage && (
              <button className="continue-page-button" onClick={handleContinue}>
                <p>Tiếp tục</p>
              </button>
            )}
          </div>
            {continuePage && (
              <div className="continue-page button-page">
                <button className="continue-page-button" onClick={handleBack}>
                  <p>Back</p>
                </button>
              </div>
            )}
        </div>
      )}
    </div>
  );
}

export default Borrow;
