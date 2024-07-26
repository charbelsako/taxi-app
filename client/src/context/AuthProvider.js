// src/context/auth-context.js
import { createContext, useState } from 'react';

const AuthContext = createContext({
  auth: { token: '' },
  setAuth: () => {},
});

const { Provider } = AuthContext;

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: '',
  });

  return (
    <Provider
      value={{
        auth,
        setAuth,
      }}
    >
      {children}
    </Provider>
  );
};

export default AuthContext;
