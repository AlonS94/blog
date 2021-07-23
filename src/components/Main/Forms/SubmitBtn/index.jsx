import React from 'react';
import PropTypes from 'prop-types';
import './SubmitBtn.scss';

const SubmitBtn = ({ name, className }) => (
  <button className={`SubmitBtn ${className}`} type="submit">
    {name}
  </button>
);

SubmitBtn.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string,
};

SubmitBtn.defaultProps = {
  name: '',
  className: '',
};

export default SubmitBtn;
