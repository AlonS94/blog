import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './SignIn.scss';
import Input from '../Input';
import formsWrapper from '../../../../assets/formsWrapper';
import SubmitBtn from '../SubmitBtn';
import ErrorMessage from '../ErrorMessage';
import actionsDispatch from '../../../../Redux/actions';

const SignIn = ({ onSign, profile }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ mode: 'onTouched' });

  const [error, setError] = useState(false);

  function submitForm(event) {
    setError(false);
    onSign(event.email, event.password);
  }

  if (profile) return <Redirect to="/" />;

  return (
    <>
      <h2 className="SignIn__heading SignIn__heading_margin">Sign In</h2>
      <form onSubmit={handleSubmit(submitForm)} className="SignIn__form SignIn__form_margin" action="">
        <Input
          caption="Email address"
          type="email"
          name="email"
          className={errors.email || error['email or password'] ? 'error' : null}
          register={register}
          options={{ required: true }}
        />
        {error['email or password'] && <ErrorMessage message="email or password is invalid" />}
        {errors.email && <ErrorMessage type={errors.email?.type} />}
        <Input
          caption="Password"
          type="password"
          name="password"
          className={errors.password || error['email or password'] ? 'error' : null}
          register={register}
          options={{ required: true }}
        />
        {error['email or password'] && <ErrorMessage message="email or password is invalid" />}
        {errors.password && <ErrorMessage type={errors.password?.type} />}
        <SubmitBtn name="Login" className="SignIn__submit" />
      </form>
      <p className="SignIn__link">
        Don’t have an account? <Link to="/sign-up"> Sign Up</Link>.
      </p>
    </>
  );
};

SignIn.propTypes = {
  onSign: PropTypes.func,
  profile: PropTypes.shape(),
};

SignIn.defaultProps = {
  onSign: () => {},
  profile: null,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(
  mapStateToProps,
  actionsDispatch
)(formsWrapper(SignIn, ['SignIn', 'SignIn_margin', 'SignIn_padding']));
