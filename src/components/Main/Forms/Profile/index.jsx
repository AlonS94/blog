import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Profile.scss';
import actionsDispatch from '../../../../Redux/actions';
import formsWrapper from '../../../../assets/formsWrapper';
import Input from '../Input';
import SubmitBtn from '../SubmitBtn';
import ErrorMessage from '../ErrorMessage';

const Profile = ({ profile, onUpdateUSer }) => {
  const { username, email, image, token } = profile;

  const {
    register,
    watch,
    formState: { errors, dirtyFields },
  } = useForm({ mode: 'onTouched', defaultValues: { username, email, password: '', image: image || '' } });

  const [error, setError] = useState(false);

  const getNewObj = (event, obj) => {
    const newObj = {};
    event.preventDefault();
    for (const key in obj) {
      if (Object.hasOwnProperty.call(obj, key)) {
        newObj[key] = watch(key);
      }
    }
    return newObj;
  };

  function submitForm(event, obj) {
    setError(false);
    const newObj = getNewObj(event, obj);
    onUpdateUSer(token, newObj, setError);
  }

  if (!profile) return <Redirect to="/sign-in" />;

  return (
    <>
      <h2 className="Profile__heading">Edit Profile</h2>
      <form
        onSubmit={(event) => {
          submitForm(event, dirtyFields);
        }}
        className="Profile__form"
        action=""
      >
        <Input
          caption="Username"
          type="text"
          name="username"
          className={errors.username || error.username ? 'error' : null}
          values={username}
          register={register}
          options={{ maxLength: 20, minLength: 3, required: true }}
        />
        {error.username && <ErrorMessage message={error.username} />}
        {errors.username && (
          <ErrorMessage type={errors.username?.type} addInformation={{ minLength: 3, maxLength: 20 }} />
        )}
        <Input
          caption="Email address"
          type="email"
          name="email"
          className={errors.email || error.email ? 'error' : null}
          values={email}
          register={register}
          options={{ required: true }}
        />

        {error.email && <ErrorMessage message={error.email} />}
        {errors.email && <ErrorMessage type={errors.email?.type} />}

        <Input
          caption="New password"
          type="password"
          name="password"
          className={errors.password || error.password ? 'error' : null}
          register={register}
          options={{ maxLength: 40, minLength: 8 }}
        />
        {error.password && <ErrorMessage message={error.password} />}
        {errors.password && (
          <ErrorMessage type={errors.password?.type} addInformation={{ minLength: 8, maxLength: 40 }} />
        )}

        <Input
          caption="Avatar image (url)"
          type="url"
          name="image"
          className={errors.image || error.image ? 'error' : null}
          placeholder="Avatar image"
          register={register}
          values={image}
        />
        {error.image && <ErrorMessage message={error.image} />}
        {errors.image && <ErrorMessage type={errors.image?.type} />}
        <SubmitBtn name="Save" className="Profile__subBtn" />
      </form>
    </>
  );
};

Profile.propTypes = {
  profile: PropTypes.shape({
    username: PropTypes.string,
    email: PropTypes.string,
    image: PropTypes.string,
    token: PropTypes.string,
    password: PropTypes.string,
    bio: PropTypes.string,
  }),
  onUpdateUSer: PropTypes.func,
};

Profile.defaultProps = {
  profile: {},
  onUpdateUSer: () => {},
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, actionsDispatch)(formsWrapper(Profile, ['Profile']));
