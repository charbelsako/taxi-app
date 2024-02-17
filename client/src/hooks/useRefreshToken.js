import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { setAuth } = useAuth();

  const refresh = async () => {
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
  };
  return refresh;
};

export default useRefreshToken;
