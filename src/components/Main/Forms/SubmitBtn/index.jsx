import React from 'react';
import PropTypes from 'prop-types';
import './SubmitBtn.scss';

const SubmitBtn = ({ name, className, disabled }) => (
  <button className={`SubmitBtn ${className}`} type="submit" disabled={disabled}>
    {name}
  </button>
);

SubmitBtn.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

SubmitBtn.defaultProps = {
  name: '',
  className: '',
  disabled: false,
};

export default SubmitBtn;
