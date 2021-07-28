import React from 'react';
import newWrapper from '../../assets/newWrapper';
import './ErrorWindow.scss';
import error from '../../assets/img/Main/Errors/errore.jpg';

const ErrorWindow = () => (
  <>
    <img src={error} alt="Кажется что-то пошло не так, простите" />
  </>
);

export default newWrapper(ErrorWindow, ['ErrorWindow']);
