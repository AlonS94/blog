import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Unregistered from './Unregistered';
import './Header.scss';
import LogOut from './LogOut';
import actionsDispatch from '../../Redux/actions';

const Header = ({ profile, getArticles }) => (
  <header className="Header Header_padding">
    <Link
      to="/articles"
      className="Heade__heading"
      onClick={() => {
        const token = profile ? profile.token : false;
        getArticles(token);
      }}
    >
      Realworld Blog
    </Link>
    {profile ? <LogOut /> : <Unregistered />}
  </header>
);

Header.propTypes = {
  profile: PropTypes.oneOfType([
    PropTypes.shape({
      token: PropTypes.string,
    }),
    PropTypes.bool,
  ]),
  getArticles: PropTypes.func,
};

Header.defaultProps = {
  profile: {},
  getArticles: () => {},
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, actionsDispatch)(Header);
