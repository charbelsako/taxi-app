// src/context/auth-context.js
import { createContext, useState } from 'react';

const AuthContext = createContext({
  auth: { token: '' },
  setAuth: () => {},
  location: '',
  setLocation: () => {},
});

const { Provider } = AuthContext;

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: '',
  });

  const [location, setLocation] = useState('');

  return (
    <Provider
      value={{
        auth,
        location,
        setAuth,
        setLocation,
      }}
    >
      {children}
    </Provider>
  );
};

export default AuthContext;
