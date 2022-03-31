import { notification } from 'antd';

// eslint-disable-next-line import/prefer-default-export
export function openNotificationWithIcon(type, message, description) {
  notification[type]({
    message,
    description,
  });
}
