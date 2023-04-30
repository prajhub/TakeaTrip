import { message } from 'antd';
import { setClearSuccess } from '../../Features/auth/authSlice';
import { setClearMessage } from '../../Features/auth/authSlice';
import { useNavigate } from 'react-router';
export const handleSuccess = (success, registerMsg, dispatch) => {

    const navigate = useNavigate()

    
  if (success) {

    setTimeout(() => {
        message.success({
       type: 'success',
        content: registerMsg,
        duration: 5
      });
      dispatch(setClearSuccess())
      dispatch(setClearMessage())

      navigate('http://localhost:5173/login')

    }, 100);



  }


};
