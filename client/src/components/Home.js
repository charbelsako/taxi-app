import React, { useEffect, useState } from 'react';
import TextFieldGroup from './TextFieldGroup';
import TextAreaFieldGroup from './TextAreaFieldGroup';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import CreatableSelect from 'react-select/creatable';

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
  const [locations, setLocationsList] = useState([]);

  const onFromChange = option => {
    setFrom(option.value);
  };

  const onToChange = option => {
    setTo(option.value);
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
      const response = await axios.post('/api/v1/customer/create', {
        phone,
        name,
        address,
      });

      if (response.data.data.isUpdated) {
        setSuccess('Updated Customer');
      } else {
        setSuccess('Successfully created a customer');
      }
      setPhone('');
      setName('');
      setAddress('');
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

      if (response.data.data.isUpdated) {
        setPriceSuccess('Updated Price');
      } else {
        setPriceSuccess('Added Price');
      }
      setPriceError('');
    } catch (err) {
      console.error(err);
      setPriceError(err.response.data.error);
      setPriceSuccess('');
    }
  };

  const fetchPrice = async () => {
    try {
      const priceResponse = await axios.get(
        `/api/v1/pricing/search?from=${from}&to=${to}`
      );
      setPrice(priceResponse.data.data.price);
      setPriceError('');
    } catch (err) {
      console.error(err);
      setPriceError('Could not find price');
      setPriceSuccess('');
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

  useEffect(() => {
    const fetchLocationsList = async () => {
      try {
        const locationList = await axios.get('/api/v1/pricing/locations');
        setLocationsList(locationList.data.data);
        setError('');
      } catch (err) {
        setError(err.message);
        setSuccess('');
        console.log(err);
      }
    };
    fetchLocationsList();
  }, [axios]);

  const capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const formatOptions = options => {
    return options.map(option => ({
      value: option,
      label: capitalizeFirstLetter(option),
    }));
  };

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
              isLarge={true}
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
              isLarge={true}
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
              isLarge={true}
            />
          </div>
        </div>
        <div className='row'>
          <div className='col-8'>
            <div className='mt-4 d-flex align-items-center justify-content-end'>
              <button className='btn btn-primary' onClick={createCustomer}>
                Create / Update Customer
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
        <h1>Pricing</h1>
        {priceSuccess && (
          <div className='alert alert-success'>{priceSuccess}</div>
        )}
        {priceError && <div className='alert alert-danger'>{priceError}</div>}
        <div className='row d-flex align-items-center'>
          <div className='col-2'>
            <label htmlFor='from' className='my-auto'>
              From
            </label>
          </div>
          <div className='col-6'>
            <CreatableSelect
              placeholder='Enter From Area'
              value={formatOptions(locations).find(
                option => option.value === from
              )}
              onChange={onFromChange}
              options={formatOptions(locations)}
            />
          </div>
        </div>
        <div className='row align-items-center mt-4'>
          <div className='col-2'>
            <label htmlFor='to' className='my-auto'>
              To
            </label>
          </div>
          <div className='col-6'>
            <CreatableSelect
              placeholder='Enter To Area'
              value={formatOptions(locations).find(
                option => option.value === to
              )}
              onChange={onToChange}
              options={formatOptions(locations)}
            />
          </div>
          <div className='col-2'>
            <button className='btn btn-success' onClick={fetchPrice}>
              Search
            </button>
          </div>
        </div>
        <div className='row align-items-center mt-4 '>
          <div className='col-2'>
            <label htmlFor='price' className='my-auto'>
              Price
            </label>
          </div>
          <div className='col-6'>
            <TextFieldGroup
              placeholder='Enter Price'
              value={price}
              onChange={onPriceChange}
              isLarge={false}
            />
          </div>
        </div>
        <div className='row'>
          <div className='col-8 mt-4 d-flex justify-content-end'>
            <button className='btn btn-primary' onClick={addPrice}>
              Add / Update Price
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
