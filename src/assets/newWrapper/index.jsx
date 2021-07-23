import React from 'react';

const newWrapper = (Component, className) => (props) =>
  (
    <div className={className.join(' ')}>
      <Component {...props} />
    </div>
  );

export default newWrapper;
