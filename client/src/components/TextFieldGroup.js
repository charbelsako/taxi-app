import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const TextFieldGroup = ({
  name,
  placeholder,
  value,
  label,
  error,
  info,
  type,
  index,
  onChange,
  disabled,
  required,
  isLarge,
}) => {
  return (
    <>
      {label && (
        <label htmlFor={name}>
          {label}
          {required ? <span className='text-danger'> *</span> : ''}
        </label>
      )}
      <input
        type={type}
        className={classnames('form-control', {
          'is-invalid': error,
          'form-control-lg': isLarge,
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        data-index={index}
      />
      {info && <small className='form-text text-muted'>{info}</small>}
      {error && <div className='invalid-feedback'>{error}</div>}
    </>
  );
};

TextFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  // value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
};

TextFieldGroup.defaultProps = {
  type: 'text',
};

export default TextFieldGroup;
