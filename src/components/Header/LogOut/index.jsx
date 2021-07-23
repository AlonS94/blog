import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import newWrapper from '../../../assets/newWrapper';
import './LogOut.scss';
import actionsDispatch from '../../../Redux/actions';
import logo from '../../../assets/img/Header/logo.png';

const LogOut = ({ profile, onLogOut }) => {
  function fullOnLogOut() {
    localStorage.removeItem('user');
    onLogOut();
  }

  <Link to="/new-article" className="LogOut__btn LogOut__btn_createArtcl">
    Create article
  </Link>;

  return (
    <>
      <Link to="/new-article" className="LogOut__btn LogOut__btn_createArtcl">
        Create article
      </Link>
      <Link to="/profile" className="LogOut__btn LogOut__btn_profile">
        <span>{profile.username}</span> <img src={profile.image || logo} alt="лого пользователя" />
      </Link>
      <button className="LogOut__btn LogOut__btn_out" type="button" onClick={fullOnLogOut}>
        Log Out
      </button>
    </>
  );
};

LogOut.propTypes = {
  onLogOut: PropTypes.func,
  profile: PropTypes.shape({
    username: PropTypes.string,
    image: PropTypes.string,
  }),
};

LogOut.defaultProps = {
  onLogOut: () => {},
  profile: {},
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, actionsDispatch)(newWrapper(LogOut, ['LogOut']));
