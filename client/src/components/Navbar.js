import React from 'react';
import useAuth from '../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import useLogout from '../hooks/useLogout';

const Navbar = () => {
  const { auth } = useAuth();
  const logout = useLogout();
  const navigate = useNavigate();

  const signOut = async () => {
    await logout();
    navigate('/login');
  };
  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light'>
      <div className='container'>
        <Link to='/' className='navbar-brand'>
          MORE gym
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarNav'
          aria-controls='navbarNav'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarNav'>
          <ul className='navbar-nav ml-auto'>
            {auth.email && (
              <>
                <li>
                  <Link to='/' className='nav-link'>
                    Home
                  </Link>
                </li>

                <li>
                  <Link to='/profile' className='nav-link'>
                    My profile
                  </Link>
                </li>
                <li>
                  <button
                    onClick={signOut}
                    className='nav-link btn btn-outline-danger d-inline p-1 m-1'
                  >
                    Logout
                  </button>
                </li>
              </>
            )}

            {!auth.email && (
              <>
                <li>
                  <Link to='/login' className='nav-link'>
                    Login{' '}
                  </Link>
                </li>
                <li>
                  <Link to='/signup' className='nav-link'>
                    Sign up{' '}
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
