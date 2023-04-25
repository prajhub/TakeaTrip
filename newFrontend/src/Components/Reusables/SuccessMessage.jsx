import { notification } from 'antd';

export const handleSuccess = (success, successMessage) => {

    
  if (success) {

    setTimeout(() => {
      notification.success({
        message: 'Success',
        description: successMessage,
      });
    }, 100);



  }


};
