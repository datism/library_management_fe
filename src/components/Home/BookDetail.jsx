import { Button, Modal, Input, Select } from 'antd';
import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { useEffect } from 'react';
import axios from 'axios';
import { BE_URL } from '../../constant';
import { openNotification } from '../../helpers';
import { Context } from '../../App';
const { TextArea } = Input;

function BookDetail(props) {
  const { isModalOpen, handleOk, handleCancel, book, bookID } = props;
  const [value, setValue] = useState({});
  const [date, setDate] = useState('');

  useEffect(() => {
    if (!bookID) {
      setValue({
        title: '',
        description: '',
        publisher: '',
        type: '',
        image: null,
        cover: null,
        category: '',
        author: '',
        //publisherDate: '',
      });
      return;
    }
    if (!book) return;

    setValue({
      title: book.title,
      description: book.description,
      publisher: book.publisher,
      type: book.type,
      author: book.author,
      image: book.cover,
      cover: null,
      category: book.category,
      //publisherDate: book.publisherDate
    });
  }, [bookID]);

  const onChange = (name, userValue) => {
    console.log(name, userValue)
    const newValue = {
      ...value,
      [name]: userValue,
    };
    setValue(newValue);
  };

  const onChangeImage = (e) => {
    const value1 = e.target.files[0];
    setValue({
      ...value,
      image: URL.createObjectURL(value1),
      cover: value1,
    });
  };

  // const onChangePublisherDate = (e) => {
  //   const value1 = e.target.value;
  //   console.log(value1)
  //   //setDate(...value);
  // }

  const onOk = async () => {
    let check = true;
    Object.keys(value).forEach((e) => {
      if (!bookID) {
        if (!value[e]) {
          check = false;
        } else if ((e == 'type' || e == 'category') && value[e] == 'None') {
          check = false;
        }
      } else {
        if (e != 'cover' && !value[e]) {
          check = false;
        } else if ((e == 'type' || e == 'category') && value[e] == 'None') {
          check = false;
        }
      }
    });
    if (!check) {
      openNotification('Vui lòng hoàn thành form', 'error');
      return;
    }
    const formData = new FormData();
    Object.keys(value).forEach((e) => {
      if (value[e]) {
        formData.append(e, value[e]);
      }
    });
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    try {
      if (bookID) {
        await axios.put(`${BE_URL}/books/${book._id}`, formData, config);
        openNotification('Cập nhật thành công');
      } else {
        await axios.post(`${BE_URL}/books/`, formData, config);
        openNotification('Tạo thành công');
      }
      handleOk();
    } catch (e) {
      openNotification(
        'Có lỗi xảy ra: ' + e.response.data.errorMessage,
        'error',
      );
    }
  };

  return (
    <Modal
      style={{
        position: "relative",
        top: 10,
        height: 100,
        width: 100,
      }}
      title="Thông tin về sách"
      visible={isModalOpen}
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
            width: 50,
          }}
        >
          Tiêu đề:
        </p>
        <Input
          style={{
            paddingLeft: 8,
            flex: 1,
          }}
          name="title"
          value={value.title}
          onChange={(e) => onChange('title', e.target.value)}
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
            width: 50,
          }}
        >
          Tác giả:
        </p>
        <Input
          style={{
            paddingLeft: 8,
            flex: 1,
          }}
          name="author"
          value={value.author}
          onChange={(e) => onChange('author', e.target.value)}
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
            width: 50,
          }}
        >
          Xuất bản:
        </p>
        <Input
          style={{
            paddingLeft: 6,
            flex: 1,
          }}
          name="publisher"
          value={value.publisher}
          onChange={(e) => onChange('publisher', e.target.value)}
        />
      </div>

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
            width: 50,
            whiteSpace: 'nowrap',
          }}
        >
          Loại:
        </p>
        <Select
          placeholder="Chọn loại sách"
          optionFilterProp="children"
          value={value.type}
          onChange={(e) => onChange('type', e)}
          options={type.map((t) =>{return {value: t, label: t}})}
        />
      </div>
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
            width: 50,
            whiteSpace: 'nowrap',
          }}
        >
          Thể loại:
        </p>
        <Select
          placeholder="Chọn thể loại sách"
          optionFilterProp="children"
          maxTagTextLength={20}
          value={value.category}
          onChange={(e) => onChange('category', e)}
          options={category.map((t) =>{return {value: t, label: t}})}
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
            marginRight: 22,
            marginBottom: 0,
            width: 50,
          }}
        >
          Mô tả:
        </p>
        <TextArea
          name="description"
          value={value.description}
          onChange={(e) => onChange('description', e.target.value)}
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
            width: 50,
          }}
        >
          Ảnh:
        </p>
        <label
          style={{
            border: '1px solid gray',
            padding: '4px 8px',
            borderRadius: 4,
            background: "white",
          }}
        >
          Tải ảnh bìa lên
          <Input
            type="file"
            style={{
              display: 'none',
            }}
            accept="image/*"
            onChange={onChangeImage}
          />
        </label>
      </div>
      <div>
        {value.image && (
          <img
            style={{
              padding: 0,
              width: '100%',
              marginTop: 8,
              height: 300,
            }}
            src={value.image}
          />
        )}
      </div>
    </Modal>
  );
}

export default BookDetail;

export const type = [
  'Art',
  'Language',
  'Literature',
  'Gymnastics',
  'Physics',
  'Chemistry',
  'Biology',
  'Math',
  'History',
];
const category = ['Essays', 'Case Studies', 'Syllabus', 'Thesis'];
