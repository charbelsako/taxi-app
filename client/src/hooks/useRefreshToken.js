import axios from '../api/axios';
import useAuth from './useAuth';
import { useNavigate } from 'react-router-dom';

const useRefreshToken = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const refresh = async () => {
    try {
      const response = await axios.get('/api/v1/auth/refresh', {
        withCredentials: true,
      });
      const { data } = response.data;
      setAuth(prev => {
        return {
          ...prev,
          role: data.role,
          token: data.accessToken,
          email: data.email,
        };
      });
      return data.accessToken;
    } catch (err) {
      setAuth({});
      navigate('/login');
    }
  };
  return refresh;
};

export default useRefreshToken;
