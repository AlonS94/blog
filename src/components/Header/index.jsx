import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Unauthorized from './Unauthorized';
import './Header.scss';
import LogOut from './LogOut';
import actionsDispatch from '../../redux/actions';

const Header = ({ profile, getArticles }) => (
  <header className="Header Header_padding">
    <Link
      to="/articles"
      className="Heade__heading"
      onClick={() => {
        getArticles();
      }}
    >
      Realworld Blog
    </Link>
    {profile ? <LogOut /> : <Unauthorized />}
  </header>
);

Header.propTypes = {
  profile: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.bool]),
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
