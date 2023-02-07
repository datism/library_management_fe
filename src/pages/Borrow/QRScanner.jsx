import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';

export default function QRScanner (props) {
    const {QRData, updateQRData} = props

    return (
        <div
            style={{
                margin: 'auto',
                width: '500px'
            }}
        >
            <QrReader
                onResult={(result, error) => {
                    if (!!result) {
                        updateQRData(result?.text);
                    }

                    if (!!error) {
                        console.info(error);
                    }
                }}
                style={{ width: '100%', borderRadius: 25 }}
                constraints={{
                    facingMode: 'user'
                }}
            />
        </div>
    );
};
