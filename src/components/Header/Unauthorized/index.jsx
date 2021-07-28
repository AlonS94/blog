import React from 'react';
import { Link } from 'react-router-dom';
import newWrapper from '../../../assets/newWrapper';
import './Unauthorized.scss';

const Unauthorized = () => (
  <>
    <Link to="/sign-in" className="Unauthorized__btn Unauthorized__btn_signIn">
      Sign In
    </Link>
    <Link to="/sign-up" className="Unauthorized __btn Unauthorized__btn_signUp">
      Sign Up
    </Link>
  </>
);

export default newWrapper(Unauthorized, ['Unauthorized']);
