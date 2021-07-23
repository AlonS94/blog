import React from 'react';
import PropTypes from 'prop-types';
import './Input.scss';

const Input = ({ caption, type, name, className, register, options, values, placeholder }) => (
  <label className={`Input ${className}`}>
    <span>{caption}</span>
    <input
      className="Input__entryField"
      type={type}
      name={name}
      placeholder={placeholder || caption}
      defaultValue={values}
      {...register(name, { ...options })}
    />
  </label>
);

Input.propTypes = {
  caption: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  className: PropTypes.string,
  register: PropTypes.func,
  placeholder: PropTypes.string,
  values: PropTypes.string,
  options: PropTypes.shape({
    minLength: PropTypes.number,
    maxLength: PropTypes.number,
    required: PropTypes.bool,
  }),
};

Input.defaultProps = {
  caption: '',
  type: '',
  name: '',
  className: '',
  register: () => {},
  placeholder: '',
  values: '',
  options: {},
};

export default Input;
