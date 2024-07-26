import React from 'react';
import TextFieldGroup from './TextFieldGroup';
import TextAreaFieldGroup from './TextAreaFieldGroup';

const Home = () => {
  return (
    <div className='container'>
      <div className=''>
        <div className='text-6xl'>
          <h1>Home</h1>
        </div>
        {/* Phone Input */}
        <div className='row align-items-center mt-4'>
          <div className='col-2'>
            <label htmlFor=''>Phone:</label>
          </div>
          <div className='col-6'>
            <TextFieldGroup placeholder='Enter Phone' />
          </div>
          <div className='col-4'>
            <button className='btn btn-success'>Search</button>
          </div>
        </div>

        {/* Name */}
        <div className='row align-items-center mt-4'>
          <div className='col-2'>
            <label htmlFor=''>Name:</label>
          </div>
          <div className='col-6'>
            <TextFieldGroup placeholder='Enter Name' />
          </div>
        </div>
        {/* Address */}
        <div className='row align-items-center mt-4'>
          <div className='col-2'>
            <label htmlFor=''>Address:</label>
          </div>
          <div className='col-6'>
            <TextAreaFieldGroup placeholder='address' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
