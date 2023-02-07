import React, { useState } from 'react';
import QRScanner from './QRScanner'
import {Descriptions, Result} from "antd";

export default function CopyScanner (props) {
    const {bookChecked, onResult, bookDetail } = props
    const [QRData, setQRData] = useState('No result');
    const [bookData, setBookData] = useState(null)

    const updateQRData = (e) => {
        onResult(e)
    }

    let copyResult = <div>
        <Result
            status="404"
            title="Không thấy thông tin sách"
            subTitle="Scan mã QR để hiển thị thông tin sách"
        />
    </div>;
    if (bookChecked) {
        console.log(bookDetail)
        copyResult = (
            <div style={{
                marginTop: 60,
            }}>
                <Descriptions title="Thông tin sách" bordered>
                    <Descriptions.Item label="Tên sách" span={3}>{bookDetail.title}</Descriptions.Item>
                    <Descriptions.Item label="Tác giả" span={3}>{bookDetail.author}</Descriptions.Item>
                    <Descriptions.Item label="Miêu tả sách" span={3}>{bookDetail.description}</Descriptions.Item>
                </Descriptions>
            </div>
        )
    }

    return (
        <div style={{
            height: '100%',
            marginBottom: 50,
        }}>
            <p style={{
                width: '100%',
                textAlign: 'center',
                fontSize: 28,
                fontWeight: 600,
                paddingTop: 40,
            }}> Mượn sách</p>
            <div
                style={{
                    margin: 'auto',
                    width: '100%',
                    height: '50%',
                    display: 'flex',
                    flexDirection: 'row',
                }}
            >
                <div style={{
                    height:'100%',
                    width: '50%',
                    borderRightStyle: 'solid',
                    borderRightWidth: 1
                }}>
                    <QRScanner
                        QRData={QRData}
                        updateQRData={updateQRData}
                    />
                </div>
                <div style={{
                    height:'100%',
                    width: '50%',
                }}>
                    {copyResult}
                </div>


            </div>
        </div>
    );
};