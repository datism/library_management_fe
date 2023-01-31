import { Button, Modal } from 'antd';
import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { useEffect } from 'react';
import axios from 'axios';
import { BE_URL } from '../../constant';
import { arrayBufferToBase64 } from '../../helpers';

function BookDetail(props) {
  const { isModalOpen, handleOk, handleCancel, book, bookID } = props;
  const [value, setValue] = useState({});
  const [date, setDate] = useState("");

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
        publisherDate: '',
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
      image:
        'data:image/jpeg;base64,' + arrayBufferToBase64(book.cover.image.data),
      cover: null,
      category: book.category,
      publisherDate: book.publisherDate
    });
  }, [bookID]);

  const onChange = (e) => {
    const name = e.target.name;
    const value1 = e.target.value;
    const newValue = {
      ...value,
      [name]: value1,
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
    //console.log(value);
    const updatevalue = new Date(value.publisherDate);
    // setValue(current => {
    //   // 👇️ remove the salary key from an object
    //   const {publisherDate, ...rest} = current;

    //   return rest;
    // });
    console.log(updatevalue)
    value.publisherDate = updatevalue;
    console.log(value)
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
    if (!check) return;
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
    console.log(formData);
    if (bookID) {
      await axios.put(`${BE_URL}/books/${book._id}`, formData, config);
    } else {
      await axios.post(`${BE_URL}/books/`, formData, config);
    }
    handleOk();
  };

  return (
    <Modal
      style={{
        height: 100,
        width: 100,
      }}
      title="Book Detail"
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
        <input
          style={{
            border: '1px solid black',
            paddingLeft: 8,
            flex: 1,
          }}
          name="title"
          value={value.title}
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
            width: 50,
          }}
        >
          Tác giả:
        </p>
        <input
          style={{
            border: '1px solid black',
            paddingLeft: 8,
            flex: 1,
          }}
          name="author"
          value={value.author}
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
            width: 55,
          }}
        >
          Nhà xuất bản:
        </p>
        <input
          style={{
            border: '1px solid black',
            paddingLeft: 8,
            flex: 1,
          }}
          name="publisher"
          value={value.publisher}
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
            width: 55,
          }}
        >
          Ngày xuất bản:
        </p>
        <input
          style={{
            border: '1px solid black',
            paddingLeft: 8,
            flex: 1,
          }}
          name="publisherDate"
          value={value.publisherDate}
          onChange={onChange}
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
        <select
          onChange={onChange}
          name="type"
          style={{ flex: 1 }}
          value={value.type}
        >
          <option value="None">None</option>
          {type.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
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
        <select
          onChange={onChange}
          name="category"
          style={{ flex: 1 }}
          value={value.category}
        >
          <option value="None">None</option>
          {category.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
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
          Mô tả:
        </p>
        <textarea
          style={{
            border: '1px solid black',
            paddingLeft: 8,
            flex: 1,
          }}
          name="description"
          value={value.description}
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
            width: 50,
          }}
        >
          Ảnh:
        </p>
        <label
          style={{
            border: '1px solid black',
            padding: '4px 8px',
            borderRadius: 4,
            background: '#2DD6E3',
          }}
        >
          Upload Image
          <input
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
