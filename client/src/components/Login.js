import React, { useState } from 'react';
import TextFieldGroup from './TextFieldGroup';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';

const Login = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setAuth } = useAuth();

  const onChangeEmail = e => {
    setEmail(e.target.value);
  };

  const onChangePassword = e => {
    setPassword(e.target.value);
  };

  const onSubmit = async e => {
    try {
      e.preventDefault();

      const data = {
        email: email,
        password: password,
      };

      const response = await axios.post('/api/v1/auth/login', data, {
        withCredentials: true,
      });
      setAuth({
        email: response.data.data.email,
        token: response.data.data.accessToken,
      });
      navigate('/', { replace: true });
    } catch (err) {
      console.log(err);
      if (err.response.data.errors) {
        setErrors(err.response.data.errors);
      } else {
        setError(err.response.data.message);
      }
    }
  };

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-8 m-auto'>
          <h1 className='display-4 text-center'>Log In</h1>
          {error && <p className='text-danger'>{error}</p>}

          <form onSubmit={onSubmit}>
            <div className='form-group'>
              <TextFieldGroup
                name='email'
                type='email'
                placeholder='Email Address'
                value={email}
                onChange={onChangeEmail}
                error={errors.email}
                isLarge={true}
                autoCapitalize='none'
              />
            </div>
            <div className='form-group'>
              <TextFieldGroup
                name='password'
                type='password'
                placeholder='Password'
                value={password}
                onChange={onChangePassword}
                error={errors.password}
                isLarge={true}
              />
            </div>
            <input type='submit' className='btn btn-info btn-block mt-4' />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
