import { notification } from 'antd';

export function arrayBufferToBase64(buffer) {
  var binary = '';
  var bytes = new Uint8Array(buffer);
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

export const openNotification = (placement, type) => {
  const value = {
    message: placement,
    placement,
    placement:'topRight'
  };
  if (type == 'error') {
    notification.error(value);
  } else {
    notification.success(value);
  }
};
