import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './RegistrationForm.scss';
import Input from '../Input';
import SubmitBtn from '../SubmitBtn';
import formsWrapper from '../../../../assets/formsWrapper';
import ErrorMessage from '../ErrorMessage';
import actionsDispatch from '../../../../redux/actions';

const RegistrationForm = ({ registration, profile, getArticles }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm({ mode: 'onTouched' });

  const [error, setError] = useState(false);
  const [disabled, setDisabled] = useState(false);

  function submitForm(event) {
    const body = { username: event.username, email: event.email, password: event.password };
    setError(false);
    registration(body, setError, setDisabled);
  }

  if (profile) {
    getArticles();
    return <Redirect to="/" />;
  }

  return (
    <>
      <form onSubmit={handleSubmit(submitForm)} className="RegistrationForm__form" action="">
        <h1 className="RegistrationForm__heading RegistrationForm__heading_margin">Create new account</h1>
        <Input
          className={errors.username || error.username ? 'error' : null}
          caption="Username"
          type="text"
          name="username"
          required
          register={register}
          options={{ maxLength: 20, minLength: 3, required: true }}
        />
        {error.username && <ErrorMessage message={error.username} />}
        {errors.username && (
          <ErrorMessage type={errors.username?.type} addInformation={{ minLength: 3, maxLength: 20 }} />
        )}
        <Input
          className={errors.email || error.email ? 'error' : null}
          caption="Email address"
          type="email"
          name="email"
          register={register}
          options={{ required: true }}
        />
        {error.email && <ErrorMessage message={error.username} />}
        {errors.email && <ErrorMessage type={errors.email?.type} />}
        <Input
          className={errors.password || error.password ? 'error' : null}
          caption="Password"
          type="password"
          name="password"
          required
          register={register}
          options={{ maxLength: 40, minLength: 8, required: true }}
        />
        {error.password && <ErrorMessage message={error.username} />}
        {errors.password && (
          <ErrorMessage type={errors.password?.type} addInformation={{ minLength: 8, maxLength: 40 }} />
        )}
        <Input
          className={errors['repeat Password'] ? 'RegistrationForm__error' : null}
          caption="Repeat Password"
          type="password"
          name="repeat Password"
          required
          register={register}
          options={{
            validate: (value) => value === watch('password'),
            required: true,
          }}
        />
        {errors['repeat Password'] && <ErrorMessage type={errors['repeat Password']?.type} />}
        <label className="RegistrationForm__label_checkbox RegistrationForm__label_margin">
          <input type="checkbox" name="personalData" {...register('personalData', { required: true })} />
          <p>I agree to the processing of my personal information</p>
          {errors.personalData && <ErrorMessage type={errors.personalData?.type} />}
        </label>
        <SubmitBtn name="Create" disabled={disabled} />
      </form>
      <p className="RegistrationForm__link">
        Already have an account?
        <Link to="/sign-in" className="RegistrationForm__btn ">
          {' '}
          Sign In
        </Link>
        .
      </p>
    </>
  );
};

RegistrationForm.propTypes = {
  registration: PropTypes.func,
  getArticles: PropTypes.func,
  profile: PropTypes.oneOfType([
    PropTypes.shape({
      username: PropTypes.string,
      email: PropTypes.string,
      image: PropTypes.string,
      password: PropTypes.string,
      bio: PropTypes.string,
    }),
    PropTypes.bool,
  ]),
};

RegistrationForm.defaultProps = {
  registration: () => {},
  getArticles: () => {},
  profile: {},
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, actionsDispatch)(formsWrapper(RegistrationForm, ['RegistrationForm']));
