import axios from '../api/axios';
import useAuth from './useAuth';

const userRefreshToken = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get('/api/v1/auth/refresh', {
      withCredentials: true,
    });
    setAuth(prev => {
      return { ...prev, accessToken: response.data.accessToken };
    });
    return response.data.accessToken;
  };
  return refresh;
};

export default userRefreshToken;
