import React from 'react';
import classnames from 'classnames';

const TextAreaFieldGroups = ({
  name,
  placeholder,
  value,
  label,
  error,
  info,
  onChange,
  required,
}) => {
  return (
    <>
      {label && (
        <label htmlFor={name}>
          {label}
          {required ? <span className='text-danger'> *</span> : ''}
        </label>
      )}
      <textarea
        className={classnames('form-control form-control-lg', {
          'is-invalid': error,
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      {info && <small className='form-text text-muted'>{info}</small>}
      {error && <div className='invalid-feedback'>{error}</div>}
    </>
  );
};

export default TextAreaFieldGroups;
