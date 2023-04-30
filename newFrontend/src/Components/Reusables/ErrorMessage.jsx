import { notification } from 'antd';

export const handleError = (error) => {

    

    setTimeout(() => {
      notification.error({
        message: 'Error',
        description: error,
      });
    }, 100);



  }


