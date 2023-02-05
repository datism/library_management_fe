import { notification } from 'antd';

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
