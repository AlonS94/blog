import React from 'react';
import PropTypes from 'prop-types';
import './ErrorMessage.scss';

const ErrorMessage = ({ message, type, addInformation }) => {
  const getErrorMessage = (types, addInformations) => {
    switch (types) {
      case 'required':
        return 'Обязательное поле';

      case 'minLength':
        return `Минимальное количество символов ${addInformations.minLength}`;

      case 'maxLength':
        return `Максимальное количество символов ${addInformations.maxLength}`;

      case 'validate':
        return 'Passwords must match';

      default:
        break;
    }
    return null;
  };

  return <p className="ErrorMessage">{getErrorMessage(type, addInformation) || message}</p>;
};
ErrorMessage.propTypes = {
  message: PropTypes.arrayOf(PropTypes.string),
  type: PropTypes.string,
  addInformation: PropTypes.shape({
    minLength: PropTypes.number,
    maxLength: PropTypes.number,
  }),
};

ErrorMessage.defaultProps = {
  message: [],
  type: '',
  addInformation: {},
};

export default ErrorMessage;
