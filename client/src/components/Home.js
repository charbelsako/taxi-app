import React, { useEffect, useState } from 'react';
import TextFieldGroup from './TextFieldGroup';
import TextAreaFieldGroup from './TextAreaFieldGroup';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

const Home = () => {
  const axios = useAxiosPrivate();
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [priceSuccess, setPriceSuccess] = useState('');
  const [priceError, setPriceError] = useState('');
  const [customerList, setCustomerList] = useState([]);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [price, setPrice] = useState('');

  const onFromChange = e => {
    setFrom(e.target.value);
  };

  const onToChange = e => {
    setTo(e.target.value);
  };

  const onPriceChange = e => {
    setPrice(e.target.value);
  };

  const onPhoneChange = e => {
    setPhone(e.target.value);
  };
  const onNameChange = e => {
    setName(e.target.value);
  };
  const onAddressChange = e => {
    setAddress(e.target.value);
  };

  const fetchUserData = async e => {
    try {
      e.preventDefault();
      const customer = await axios.get(`/api/v1/customer/${phone}`);
      setName(customer.data.data.name);
      setAddress(customer.data.data.address);
      setError('');
    } catch (err) {
      setError(err.message);
      setSuccess('');
      console.log(err);
    }
  };
  const createCustomer = async e => {
    try {
      e.preventDefault();
      await axios.post('/api/v1/customer/create', {
        phone,
        name,
        address,
      });
      setSuccess('Successfully created a customer');
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  const addPrice = async () => {
    try {
      const response = await axios.post('/api/v1/pricing/add', {
        from,
        to,
        price,
      });

      setPriceSuccess('Added Price');
    } catch (err) {
      console.error(err);
      setPriceError(err.message);
    }
  };

  useEffect(() => {
    const fetchLastUpdatedUsers = async () => {
      try {
        const customerList = await axios.get('/api/v1/customer/all');
        setCustomerList(customerList.data.data);
        setError('');
      } catch (err) {
        setError(err.message);
        setSuccess('');
        console.log(err);
      }
    };

    fetchLastUpdatedUsers();
  }, [axios]);

  return (
    <div className='container'>
      <div className=''>
        <div className='text-6xl'>
          <h1>Home</h1>
        </div>
        {success && <div className='alert alert-success'>{success}</div>}
        {error && <div className='alert alert-danger'>{error}</div>}
        {/* Phone Input */}
        <div className='row align-items-center mt-4'>
          <div className='col-2'>
            <label htmlFor=''>Phone:</label>
          </div>
          <div className='col-6'>
            <TextFieldGroup
              placeholder='Enter Phone'
              value={phone}
              name='phone'
              onChange={onPhoneChange}
            />
          </div>
          <div className='col-4'>
            <button className='btn btn-success' onClick={fetchUserData}>
              Search
            </button>
          </div>
        </div>

        {/* Name */}
        <div className='row align-items-center mt-4'>
          <div className='col-2'>
            <label htmlFor=''>Name:</label>
          </div>
          <div className='col-6'>
            <TextFieldGroup
              placeholder='Enter Name'
              value={name}
              onChange={onNameChange}
              name='name'
            />
          </div>
        </div>
        {/* Address */}
        <div className='row align-items-center mt-4'>
          <div className='col-2'>
            <label htmlFor=''>Address:</label>
          </div>
          <div className='col-6'>
            <TextAreaFieldGroup
              placeholder='address'
              value={address}
              onChange={onAddressChange}
            />
          </div>
        </div>
        <div className='row'>
          <div className='col-8'>
            <div className='mt-4 d-flex align-items-center justify-content-end'>
              <button className='btn btn-primary' onClick={createCustomer}>
                Create Customer
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h1>Customer List</h1>
        <table className='table table-'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {customerList.map(customer => (
              <tr key={customer._id}>
                <td>{customer.name}</td>
                <td>{customer.phone}</td>
                <td>{customer.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        {success && <div className='alert alert-success'>{priceSuccess}</div>}
        {error && <div className='alert alert-danger'>{priceError}</div>}
        <h1>Pricing</h1>
        <div className='row align-items-center'>
          <div className='col-2'>
            <label htmlFor='from'>From</label>
          </div>
          <div className='col-6'>
            <TextFieldGroup
              placeholder='Enter From Area'
              value={from}
              onChange={onFromChange}
            />
          </div>
        </div>
        <div className='row align-items-center mt-4'>
          <div className='col-2'>
            <label htmlFor='to'>To</label>
          </div>
          <div className='col-6'>
            <TextFieldGroup
              placeholder='Enter To Area'
              value={to}
              onChange={onToChange}
            />
          </div>
        </div>
        <div className='row align-items-center mt-4 '>
          <div className='col-2'>
            <label htmlFor='price'>Price</label>
          </div>
          <div className='col-6'>
            <TextFieldGroup
              placeholder='Enter Price'
              value={price}
              onChange={onPriceChange}
            />
          </div>
        </div>
        <div className='row'>
          <div className='col-8 mt-4 d-flex justify-content-end'>
            <button className='btn btn-primary' onClick={addPrice}>
              Add Price
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
