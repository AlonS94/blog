import React from 'react';
import './formsWrapper.scss';

const formsWrapper = (Component, className) => (props) =>
  (
    <div className={`formsWrapper ${className.join(' ')}`}>
      <Component {...props} />
    </div>
  );

export default formsWrapper;
