import React from 'react';
import { Link } from 'react-router-dom';
import newWrapper from '../../../assets/newWrapper';
import './Unregistered.scss';

const Unregistered = () => (
  <>
    <Link to="/sign-in" className="Unregistered__btn Unregistered__btn_signIn">
      Sign In
    </Link>
    <Link to="/sign-up" className="Unregistered__btn Unregistered__btn_signUp">
      Sign Up
    </Link>
  </>
);

export default newWrapper(Unregistered, ['Unregistered']);
