import React from 'react';
import useAuth from '../hooks/useAuth';
import { Link } from 'react-router-dom';

const Home = () => {
  const { auth } = useAuth();
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-12'>
          <h1>Home</h1>
        </div>
        <div className='col-12 text-left'>
          <p>Admin links</p>
        </div>
        <ul>
          {' '}
          {auth.role === 'admin' ? (
            <div className='text-left'>
              <li className='link'>
                <Link to='/admin/create-session-type'>Create session type</Link>
              </li>
              <li className='link'>
                <Link to='/admin/create-package-type'>Create package type</Link>
              </li>
              <li className='link'>
                <Link to='/admin/create-membership'>Create membership</Link>
              </li>
              <li className='link'>
                <Link to='/admin/users-list'>View Users List</Link>
              </li>
            </div>
          ) : null}
        </ul>
      </div>
    </div>
  );
};

export default Home;
