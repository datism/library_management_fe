import {Button, Modal, Input, Select} from 'antd';
import React, { useState } from 'react';
// import 'antd/dist/antd.css';
import { useEffect } from 'react';
import axios from 'axios';
import { BE_URL } from '../../constant';
import { openNotification } from '../../helpers';
import { Context } from '../../App';
import QRCode from 'qrcode.react';
const { TextArea } = Input;


function QRCodeModal (props) {
    const {isQRCodeModalOpen, data, closeQRCodeModal} = props

    const downloadQRCode = () => {
        const canvas = document.getElementById('myqrcode');
        const pngUrl = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
        console.log('pngUrl', pngUrl);
        let downloadLink = document.createElement('a');
        downloadLink.href = pngUrl;
        downloadLink.download = 'qrcode.png';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    return (
        <Modal
            // style={{
            //     position: "relative",
            //     top: 10,
            //     height: 100,
            //     width: 100,
            // }}
            title="Mã QR dùng cho sách"
            visible={isQRCodeModalOpen}
            onOk={closeQRCodeModal}
            onCancel={closeQRCodeModal}
        >
            <div style={{
                justifyContent: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <QRCode
                    id='myqrcode'
                    value={data}
                    size={250}
                    level={'H'}
                    includeMargin={true}
                />
                <Button type="primary" onClick={downloadQRCode} style={{
                    marginTop: 20
                }}>
                    Tải mã về
                </Button>
            </div>
        </Modal>
    );
}

export default QRCodeModal;
